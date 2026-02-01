import type { Metadata } from "next";
import Link from "next/link";
import { Route, Phone, ArrowRight, Clock, Euro } from "lucide-react";
import { trajets } from "@/config/trajets";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Trajets Populaires",
  description:
    "Découvrez nos trajets taxi les plus demandés au départ de Strasbourg : aéroport, gare, Colmar, Europa-Park, Paris. Prix et durées indicatifs.",
};

export default function TrajetsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <Route className="w-4 h-4" />
            Destinations
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Trajets <span className="text-gold-gradient">populaires</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Découvrez nos trajets les plus demandés au départ de Strasbourg.
            Prix indicatifs et réservation facile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Réserver un trajet
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
        {/* Trajets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {trajets.map((trajet) => (
            <Link
              key={trajet.slug}
              href={`/trajets/${trajet.slug}`}
              className="card-premium group hover:border-gold-400/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors">
                    {trajet.to}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Depuis {trajet.from}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                  <Route className="w-6 h-6 text-gold-400" />
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {trajet.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Route className="w-4 h-4 text-gold-400" />
                  <span className="text-gray-300">{trajet.distance} km</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <span className="text-gray-300">{trajet.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Euro className="w-4 h-4 text-gold-400" />
                  <span className="text-gray-300">
                    dès {trajet.priceRange.min}€
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <span className="text-gold-400 text-sm font-medium group-hover:underline">
                  Voir détails et réserver
                </span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="card-premium inline-block max-w-xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Destination non listée ?
            </h2>
            <p className="text-gray-400 mb-6">
              Nous effectuons tous types de trajets en Alsace et bien au-delà.
              Contactez-nous pour un devis personnalisé.
            </p>
            <a
              href={`tel:${siteConfig.contact.phoneLink}`}
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
