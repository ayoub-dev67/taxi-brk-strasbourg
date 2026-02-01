"use client";

import { Shield, Car, Stethoscope, CreditCard, Clock } from "lucide-react";

const badges = [
  {
    icon: Shield,
    label: "Chauffeur vérifié",
    color: "text-green-400",
  },
  {
    icon: Car,
    label: "Véhicule récent",
    color: "text-blue-400",
  },
  {
    icon: Stethoscope,
    label: "Conventionné CPAM",
    color: "text-purple-400",
  },
  {
    icon: CreditCard,
    label: "Paiement sécurisé",
    color: "text-gold-400",
  },
  {
    icon: Clock,
    label: "Disponible 24h/24",
    color: "text-orange-400",
  },
];

export function TrustBadges() {
  return (
    <section className="py-8 border-y border-gold-400/20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2"
            >
              <badge.icon className={`w-5 h-5 ${badge.color}`} />
              <span className="text-gray-300 text-sm font-medium">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadgesCompact() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 border border-gray-800 rounded-full"
        >
          <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
          <span className="text-gray-400 text-xs">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export function TrustBadgesVertical() {
  return (
    <div className="space-y-3">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black/50 border border-gray-800 flex items-center justify-center">
            <badge.icon className={`w-4 h-4 ${badge.color}`} />
          </div>
          <span className="text-gray-300 text-sm">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
