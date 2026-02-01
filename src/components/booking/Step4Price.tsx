"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CreditCard, MapPin, Calendar, Users, Briefcase, Dog, ArrowRight, ArrowLeft, ArrowLeftRight, Info, AlertTriangle, Map } from "lucide-react";
import { formatPrix } from "@/lib/price-calculator";
import { useAnalytics } from "@/hooks/useAnalytics";
import { RouteMap } from "@/components/maps";
import type { ReservationData } from "@/types";

interface Step4PriceProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface PriceEstimate {
  min: number;
  max: number;
  distance: number;
  duration: string;
  isEstimated: boolean;
}

export function Step4Price({ data, updateData, onNext, onPrev }: Step4PriceProps) {
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { trackPriceCalculated } = useAnalytics();
  const hasTrackedPrice = useRef(false);

  const calculatePrice = useCallback(async () => {
    if (!data.depart?.adresse || !data.arrivee?.adresse) {
      setError("Adresses manquantes");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Étape 1: Calculer la distance via l'API route
      // Envoie les coordonnées si disponibles pour un calcul plus précis
      const routeResponse = await fetch("/api/calculate-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: data.depart.adresse,
          destination: data.arrivee.adresse,
          originLat: data.depart.lat,
          originLng: data.depart.lng,
          destinationLat: data.arrivee.lat,
          destinationLng: data.arrivee.lng,
        }),
      });

      const routeData = await routeResponse.json();

      if (!routeData.success) {
        throw new Error(routeData.error || "Erreur lors du calcul de l'itinéraire");
      }

      const { distance, duration, durationText } = routeData.data;
      const isEstimated = routeData.estimated || false;

      // Étape 2: Calculer le prix via l'API price
      // Construire la date/heure complète
      let dateHeure = new Date();
      if (data.date) {
        dateHeure = new Date(data.date);
        if (data.heure) {
          const [heures, minutes] = data.heure.split(":").map(Number);
          dateHeure.setHours(heures, minutes, 0, 0);
        }
      }

      // Déterminer si retour à vide selon le type de trajet
      // Aller simple = le taxi rentre sans passager = retour à vide
      // Aller-retour = le taxi a un passager au retour = retour en charge
      const isRetourVide = data.typeTrajet === "aller-simple";

      // Calculer le prix avec le tarif correct (jour)
      const priceResponse = await fetch("/api/calculate-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          distanceKm: distance,
          dateHeure: dateHeure.toISOString(),
          passagers: data.passagers || 1,
          bagages: data.bagages || 0,
          animaux: data.animaux || 0,
          retourVide: isRetourVide,
        }),
      });

      const priceData = await priceResponse.json();

      if (!priceData.success) {
        throw new Error(priceData.error || "Erreur lors du calcul du prix");
      }

      // Calculer le prix max (même type de trajet, mais tarif nuit pour la fourchette)
      // On simule le tarif nuit en créant une date à 22h
      const dateNuit = new Date(dateHeure);
      dateNuit.setHours(22, 0, 0, 0);

      const priceNuitResponse = await fetch("/api/calculate-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          distanceKm: distance,
          dateHeure: dateNuit.toISOString(),
          passagers: data.passagers || 1,
          bagages: data.bagages || 0,
          animaux: data.animaux || 0,
          retourVide: isRetourVide,
        }),
      });

      const priceNuitData = await priceNuitResponse.json();

      // Le prix min est le tarif jour, le prix max est le tarif nuit (pour le même type de trajet)
      const priceMin = priceData.data.total;
      const priceMax = priceNuitData.success ? priceNuitData.data.total : priceMin * 1.42;

      setPriceEstimate({
        min: priceMin,
        max: priceMax,
        distance: distance,
        duration: durationText || `${duration} min`,
        isEstimated,
      });

      // Track price calculation
      if (!hasTrackedPrice.current) {
        trackPriceCalculated({
          price: Math.round((priceMin + priceMax) / 2),
          distance: `${distance} km`,
          duration: durationText || `${duration} min`,
        });
        hasTrackedPrice.current = true;
      }

      // Mettre à jour les données
      updateData({
        distance: distance,
        prixEstime: (priceMin + priceMax) / 2,
      });

    } catch (err) {
      console.error("Erreur calcul prix:", err);
      setError(err instanceof Error ? err.message : "Erreur lors du calcul");

      // Fallback: estimation basique
      const fallbackDistance = 10;
      const fallbackMin = 8 + fallbackDistance * 1.00;
      const fallbackMax = 8 + fallbackDistance * 2.00;

      setPriceEstimate({
        min: fallbackMin,
        max: fallbackMax,
        distance: fallbackDistance,
        duration: "25 min",
        isEstimated: true,
      });

      updateData({
        distance: fallbackDistance,
        prixEstime: (fallbackMin + fallbackMax) / 2,
      });
    } finally {
      setIsLoading(false);
    }
  }, [data.depart?.adresse, data.depart?.lat, data.depart?.lng, data.arrivee?.adresse, data.arrivee?.lat, data.arrivee?.lng, data.date, data.heure, data.passagers, data.bagages, data.animaux, data.typeTrajet, updateData, trackPriceCalculated]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Préparer les coordonnées pour la carte
  const originCoords = data.depart?.lat && data.depart?.lng
    ? { adresse: data.depart.adresse, lat: data.depart.lat, lng: data.depart.lng }
    : undefined;
  const destinationCoords = data.arrivee?.lat && data.arrivee?.lng
    ? { adresse: data.arrivee.adresse, lat: data.arrivee.lat, lng: data.arrivee.lng }
    : undefined;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Votre tarif en toute <span className="text-gold-gradient">transparence</span>
        </h2>
        <p className="text-gray-400">
          Récapitulatif de votre course
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="card-premium space-y-4">
        {/* Trajet */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-gray-400 text-sm">Trajet</p>
            <p className="text-white">{data.depart?.adresse}</p>
            <div className="w-px h-4 bg-gold-400/30 ml-2 my-1" />
            <p className="text-white">{data.arrivee?.adresse}</p>
          </div>
        </div>

        {/* Date/Heure */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-gray-400 text-sm">Date et heure</p>
            <p className="text-white">
              {data.date && format(data.date, "EEEE d MMMM yyyy", { locale: fr })} à {data.heure}
            </p>
          </div>
        </div>

        {/* Type de trajet */}
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-gray-400 text-sm">Type de trajet</p>
            <p className="text-white">
              {data.typeTrajet === "aller-retour" ? "Aller-retour" : "Aller simple"}
              <span className="text-gray-500 text-sm ml-2">
                (Tarif {data.typeTrajet === "aller-retour" ? "A/B" : "C/D"})
              </span>
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold-400" />
            <span className="text-white">{data.passagers || 1} passager(s)</span>
          </div>
          {(data.bagages || 0) > 0 && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gold-400" />
              <span className="text-white">{data.bagages} bagage(s)</span>
            </div>
          )}
          {(data.animaux || 0) > 0 && (
            <div className="flex items-center gap-2">
              <Dog className="w-4 h-4 text-gold-400" />
              <span className="text-white">{data.animaux} animal(aux)</span>
            </div>
          )}
        </div>
      </div>

      {/* Carte de l'itinéraire */}
      <div className="card-premium">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <Map className="w-5 h-5 text-gold-400" />
            <span className="text-white font-medium">Voir l&apos;itinéraire sur la carte</span>
          </div>
          <span className="text-gold-400 text-sm">
            {showMap ? "Masquer" : "Afficher"}
          </span>
        </button>

        {showMap && (
          <div className="mt-4 rounded-lg overflow-hidden border border-gold-400/20">
            <RouteMap
              origin={originCoords}
              destination={destinationCoords}
              className="h-[250px]"
            />
          </div>
        )}
      </div>

      {/* Erreur */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p className="text-yellow-500 text-sm">
            {error} - Estimation approximative affichée.
          </p>
        </div>
      )}

      {/* Prix estimé */}
      <div className="card-premium bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-gold-400" />
          <p className="text-white font-medium">Estimation du prix</p>
          {priceEstimate?.isEstimated && (
            <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full">
              Estimé
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-10 bg-gold-400/10 rounded-lg w-1/2" />
            <div className="h-4 bg-gold-400/10 rounded w-3/4" />
          </div>
        ) : priceEstimate ? (
          <>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-gold-400">
                {formatPrix(priceEstimate.min)}
              </span>
              <span className="text-gray-400">à</span>
              <span className="text-3xl font-bold text-gold-400">
                {formatPrix(priceEstimate.max)}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Distance : {priceEstimate.distance} km • Durée : {priceEstimate.duration}
            </p>
          </>
        ) : null}

        <div className="mt-4 flex items-start gap-2 p-3 bg-black/30 rounded-lg">
          <Info className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
          <p className="text-gray-400 text-xs">
            Le prix final sera calculé au compteur selon les tarifs officiels de la Préfecture du Bas-Rhin.
            Les fourchettes ci-dessus sont indicatives.
          </p>
        </div>

        {/* Reassurance badges */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">💳</span>
            <span>Paiement à bord - CB acceptée</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">🔒</span>
            <span>Aucun prépaiement requis</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">❌</span>
            <span>Annulation gratuite 2h avant</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="btn-gold-outline flex-1 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          className="btn-gold flex-1 flex items-center justify-center gap-2"
        >
          Continuer
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
