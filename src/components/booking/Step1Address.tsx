"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AddressAutocomplete } from "@/components/maps";
import type { ReservationData } from "@/types";

interface Step1AddressProps {
  data: Partial<ReservationData>;
  updateData: (data: Partial<ReservationData>) => void;
  onNext: () => void;
}

export function Step1Address({ data, updateData, onNext }: Step1AddressProps) {
  const [errors, setErrors] = useState<{ depart?: string; arrivee?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { depart?: string; arrivee?: string } = {};

    if (!data.depart?.adresse?.trim()) {
      newErrors.depart = "L'adresse de départ est requise";
    }
    if (!data.arrivee?.adresse?.trim()) {
      newErrors.arrivee = "L'adresse d'arrivée est requise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  const handleDepartChange = (data: {
    adresse: string;
    lat?: number;
    lng?: number;
    placeId?: string;
  }) => {
    updateData({
      depart: {
        adresse: data.adresse,
        lat: data.lat,
        lng: data.lng,
        placeId: data.placeId,
      },
    });
    if (errors.depart) {
      setErrors((prev) => ({ ...prev, depart: undefined }));
    }
  };

  const handleArriveeChange = (data: {
    adresse: string;
    lat?: number;
    lng?: number;
    placeId?: string;
  }) => {
    updateData({
      arrivee: {
        adresse: data.adresse,
        lat: data.lat,
        lng: data.lng,
        placeId: data.placeId,
      },
    });
    if (errors.arrivee) {
      setErrors((prev) => ({ ...prev, arrivee: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Où pouvons-nous vous <span className="text-gold-gradient">accompagner</span> ?
        </h2>
        <p className="text-gray-400">
          Indiquez vos adresses de départ et d&apos;arrivée
        </p>
      </div>

      {/* Adresse de départ */}
      <AddressAutocomplete
        id="depart"
        label="Adresse de départ"
        placeholder="Ex: 1 Place Kléber, 67000 Strasbourg"
        value={data.depart?.adresse || ""}
        onChange={handleDepartChange}
        iconColor="gold"
        error={errors.depart}
        showGeolocation
      />

      {/* Indicateur de direction */}
      <div className="flex justify-center">
        <div className="w-px h-8 bg-gold-400/30" />
      </div>

      {/* Adresse d'arrivée */}
      <AddressAutocomplete
        id="arrivee"
        label="Adresse d'arrivée"
        placeholder="Ex: Aéroport de Strasbourg, 67960 Entzheim"
        value={data.arrivee?.adresse || ""}
        onChange={handleArriveeChange}
        iconColor="green"
        error={errors.arrivee}
      />

      {/* Suggestions rapides */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Destinations fréquentes :</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Aéroport de Strasbourg", full: "Aéroport de Strasbourg, 67960 Entzheim" },
            { label: "Gare de Strasbourg", full: "Gare de Strasbourg, Place de la Gare, 67000 Strasbourg" },
            { label: "Hôpital Civil", full: "Hôpital Civil, 1 Place de l'Hôpital, 67000 Strasbourg" },
            { label: "CHU Hautepierre", full: "CHU Hautepierre, Avenue Molière, 67200 Strasbourg" },
          ].map((destination) => (
            <button
              key={destination.label}
              type="button"
              onClick={() =>
                updateData({
                  arrivee: { ...data.arrivee, adresse: destination.full },
                })
              }
              className="px-3 py-1.5 text-sm bg-black-100 text-gray-300 rounded-full border border-gold-400/20 hover:border-gold-400/50 hover:text-gold-400 transition-all"
            >
              {destination.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
        Continuer
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
