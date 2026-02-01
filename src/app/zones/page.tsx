import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, Clock } from "lucide-react";
import { zones } from "@/config/zones";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Zones Desservies",
  description:
    "Découvrez toutes les zones desservies par TAXI BRK à Strasbourg et dans l'Eurométropole. Strasbourg centre, Neudorf, Robertsau, Schiltigheim et plus.",
};

export default function ZonesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Couverture
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Zones <span className="text-gold-gradient">desservies</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            TAXI BRK dessert l&apos;ensemble de l&apos;Eurométropole de Strasbourg
            et au-delà. Retrouvez ci-dessous nos principales zones de prise en
            charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Réserver un taxi
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.phoneLink}`}
              className="btn-gold-outline inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <Link
              key={zone.slug}
              href={`/zones/${zone.slug}`}
              className="card-premium group hover:border-gold-400/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                    {zone.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{zone.distances.centreville.duration} du centre</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {zone.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-gold-400 text-sm font-medium group-hover:underline">
                  En savoir plus
                </span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Info supplémentaire */}
        <div className="mt-12 card-premium max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Votre quartier n&apos;est pas listé ?
          </h2>
          <p className="text-gray-400 mb-6">
            Nous desservons l&apos;ensemble de l&apos;Alsace et au-delà.
            Contactez-nous pour toute destination.
          </p>
          <a
            href={`tel:${siteConfig.contact.phoneLink}`}
            className="btn-gold inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Appelez-nous
          </a>
        </div>
      </div>
    </div>
  );
}
