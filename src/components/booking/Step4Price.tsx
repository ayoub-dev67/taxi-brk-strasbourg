"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CreditCard, MapPin, Calendar, Users, Briefcase, Dog, ArrowRight, ArrowLeft, ArrowLeftRight, Info, Map, Clock } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { RouteMap } from "@/components/maps";
import type { ReservationData } from "@/types";

// Tarifs Préfecture du Bas-Rhin (67)
const TARIFS = {
  priseEnCharge: 3.02,
  minimum: 8.00,
  tarifA: { prixKm: 1.00, description: "Jour, aller-retour" },
  tarifB: { prixKm: 1.42, description: "Nuit/dimanche/férié, aller-retour" },
  tarifC: { prixKm: 2.00, description: "Jour, aller simple" },
  tarifD: { prixKm: 2.84, description: "Nuit/dimanche/férié, aller simple" },
  supplements: {
    bagage: 2.00,
    animal: 2.00,
    passagerSupp: 4.00, // à partir du 5ème
  },
};

// Jours fériés 2024-2026 (Alsace inclut le 26 décembre)
const JOURS_FERIES = [
  "01-01", "04-01", "05-01", "05-08", "05-09", "05-20", "07-14", "08-15", "11-01", "11-11", "12-25", "12-26",
];

interface Step4PriceProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Calcule la distance à vol d'oiseau (Haversine) × 1.3 pour estimer la route
 */
function calculerDistanceKm(lat1?: number, lng1?: number, lat2?: number, lng2?: number): number {
  if (!lat1 || !lng1 || !lat2 || !lng2) return 10; // Distance par défaut

  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceVolOiseau = R * c;

  // Multiplier par 1.3 pour estimer la distance route
  return Math.round(distanceVolOiseau * 1.3 * 10) / 10;
}

/**
 * Estime la durée du trajet (~2 min/km en ville, ~1 min/km sur route)
 */
function estimerDuree(distanceKm: number): string {
  const facteur = distanceKm > 30 ? 1.2 : 2;
  const minutes = Math.round(distanceKm * facteur);
  if (minutes < 60) return `~${minutes} min`;
  const heures = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `~${heures}h ${mins}min` : `~${heures}h`;
}

/**
 * Détermine si c'est un tarif de nuit
 */
function estTarifNuit(dateHeure: Date): boolean {
  const heure = dateHeure.getHours();
  const jour = dateHeure.getDay();
  const dateStr = format(dateHeure, "MM-dd");

  // Nuit: 19h-7h
  if (heure >= 19 || heure < 7) return true;

  // Dimanche
  if (jour === 0) return true;

  // Jour férié
  if (JOURS_FERIES.includes(dateStr)) return true;

  return false;
}

/**
 * Calcule le prix d'une course
 */
function calculerPrix(
  distanceKm: number,
  dateHeure: Date,
  typeTrajet: "aller-simple" | "aller-retour",
  passagers: number,
  bagages: number,
  animaux: number
): { total: number; tarif: string; tarifDescription: string; details: string[] } {
  const isNuit = estTarifNuit(dateHeure);
  const isAllerSimple = typeTrajet === "aller-simple";

  // Déterminer le tarif
  let tarif: string;
  let prixKm: number;
  let tarifDescription: string;

  if (isAllerSimple) {
    if (isNuit) {
      tarif = "D";
      prixKm = TARIFS.tarifD.prixKm;
      tarifDescription = TARIFS.tarifD.description;
    } else {
      tarif = "C";
      prixKm = TARIFS.tarifC.prixKm;
      tarifDescription = TARIFS.tarifC.description;
    }
  } else {
    if (isNuit) {
      tarif = "B";
      prixKm = TARIFS.tarifB.prixKm;
      tarifDescription = TARIFS.tarifB.description;
    } else {
      tarif = "A";
      prixKm = TARIFS.tarifA.prixKm;
      tarifDescription = TARIFS.tarifA.description;
    }
  }

  const details: string[] = [];

  // Prise en charge
  let total = TARIFS.priseEnCharge;
  details.push(`Prise en charge: ${TARIFS.priseEnCharge.toFixed(2)}€`);

  // Distance
  const montantDistance = distanceKm * prixKm;
  total += montantDistance;
  details.push(`${distanceKm} km × ${prixKm.toFixed(2)}€ = ${montantDistance.toFixed(2)}€`);

  // Suppléments bagages
  if (bagages > 0) {
    const suppBagages = bagages * TARIFS.supplements.bagage;
    total += suppBagages;
    details.push(`${bagages} bagage(s): +${suppBagages.toFixed(2)}€`);
  }

  // Suppléments animaux
  if (animaux > 0) {
    const suppAnimaux = animaux * TARIFS.supplements.animal;
    total += suppAnimaux;
    details.push(`${animaux} animal(aux): +${suppAnimaux.toFixed(2)}€`);
  }

  // Passagers supplémentaires (à partir du 5ème)
  if (passagers >= 5) {
    const passagersSupp = passagers - 4;
    const suppPassagers = passagersSupp * TARIFS.supplements.passagerSupp;
    total += suppPassagers;
    details.push(`${passagersSupp} passager(s) supp.: +${suppPassagers.toFixed(2)}€`);
  }

  // Minimum
  if (total < TARIFS.minimum) {
    total = TARIFS.minimum;
    details.push(`Minimum appliqué: ${TARIFS.minimum.toFixed(2)}€`);
  }

  return { total: Math.round(total * 100) / 100, tarif, tarifDescription, details };
}

function formatPrix(prix: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(prix);
}

export function Step4Price({ data, updateData, onNext, onPrev }: Step4PriceProps) {
  const [showMap, setShowMap] = useState(false);
  const { trackPriceCalculated } = useAnalytics();
  const hasTrackedPrice = useRef(false);

  // Calcul instantané côté client
  const priceEstimate = useMemo(() => {
    // Calculer la distance
    const distance = calculerDistanceKm(
      data.depart?.lat,
      data.depart?.lng,
      data.arrivee?.lat,
      data.arrivee?.lng
    );

    // Construire la date/heure
    let dateHeure = new Date();
    if (data.date) {
      dateHeure = new Date(data.date);
      if (data.heure) {
        const [heures, minutes] = data.heure.split(":").map(Number);
        dateHeure.setHours(heures, minutes, 0, 0);
      }
    }

    // Calculer le prix jour (tarif normal)
    const prixJour = calculerPrix(
      distance,
      dateHeure,
      data.typeTrajet || "aller-simple",
      data.passagers || 1,
      data.bagages || 0,
      data.animaux || 0
    );

    // Calculer le prix nuit (pour la fourchette)
    const dateNuit = new Date(dateHeure);
    dateNuit.setHours(22, 0, 0, 0);
    const prixNuit = calculerPrix(
      distance,
      dateNuit,
      data.typeTrajet || "aller-simple",
      data.passagers || 1,
      data.bagages || 0,
      data.animaux || 0
    );

    // Durée estimée
    const duree = estimerDuree(distance);

    // Vérifier si les coordonnées sont disponibles
    const hasCoords = !!(data.depart?.lat && data.depart?.lng && data.arrivee?.lat && data.arrivee?.lng);

    return {
      distance,
      duree,
      prixMin: prixJour.total,
      prixMax: prixNuit.total,
      tarif: prixJour.tarif,
      tarifDescription: prixJour.tarifDescription,
      details: prixJour.details,
      isEstimated: !hasCoords,
    };
  }, [data.depart?.lat, data.depart?.lng, data.arrivee?.lat, data.arrivee?.lng, data.date, data.heure, data.typeTrajet, data.passagers, data.bagages, data.animaux]);

  // Mettre à jour les données et tracker
  useEffect(() => {
    updateData({
      distance: priceEstimate.distance,
      prixEstime: (priceEstimate.prixMin + priceEstimate.prixMax) / 2,
    });

    if (!hasTrackedPrice.current) {
      trackPriceCalculated({
        price: Math.round((priceEstimate.prixMin + priceEstimate.prixMax) / 2),
        distance: `${priceEstimate.distance} km`,
        duration: priceEstimate.duree,
      });
      hasTrackedPrice.current = true;
    }
  }, [priceEstimate, updateData, trackPriceCalculated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Préparer les coordonnées pour la carte
  const originCoords = data.depart?.lat && data.depart?.lng
    ? { adresse: data.depart.adresse || "", lat: data.depart.lat, lng: data.depart.lng }
    : undefined;
  const destinationCoords = data.arrivee?.lat && data.arrivee?.lng
    ? { adresse: data.arrivee.adresse || "", lat: data.arrivee.lat, lng: data.arrivee.lng }
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
                (Tarif {priceEstimate.tarif} - {priceEstimate.tarifDescription})
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

      {/* Prix estimé */}
      <div className="card-premium bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-gold-400" />
          <p className="text-white font-medium">Estimation du prix</p>
          {priceEstimate.isEstimated && (
            <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full">
              Estimé
            </span>
          )}
        </div>

        {/* Prix principal */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-bold text-gold-400">
            {formatPrix(priceEstimate.prixMin)}
          </span>
          {priceEstimate.prixMin !== priceEstimate.prixMax && (
            <>
              <span className="text-gray-400">à</span>
              <span className="text-4xl font-bold text-gold-400">
                {formatPrix(priceEstimate.prixMax)}
              </span>
            </>
          )}
        </div>

        {/* Distance et durée */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{priceEstimate.distance} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{priceEstimate.duree}</span>
          </div>
        </div>

        {/* Détails du calcul */}
        <div className="bg-black/30 rounded-lg p-3 mb-4">
          <p className="text-gray-500 text-xs mb-2">Détail du calcul (Tarif {priceEstimate.tarif}):</p>
          <ul className="space-y-1">
            {priceEstimate.details.map((detail, index) => (
              <li key={index} className="text-gray-400 text-xs flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-2 p-3 bg-black/30 rounded-lg">
          <Info className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
          <p className="text-gray-400 text-xs">
            Le prix final sera calculé au compteur selon les tarifs officiels de la Préfecture du Bas-Rhin.
            Les fourchettes ci-dessus sont indicatives (jour/nuit).
          </p>
        </div>

        {/* Reassurance badges */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">💳</span>
            <span>CB acceptée</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">🔒</span>
            <span>Aucun prépaiement</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-lg">❌</span>
            <span>Annulation gratuite</span>
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
