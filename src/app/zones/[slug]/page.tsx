import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  ArrowRight,
  Clock,
  Train,
  Plane,
  Building2,
  CheckCircle,
} from "lucide-react";
import { zones, getZoneBySlug } from "@/config/zones";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Générer les pages statiques pour toutes les zones
export async function generateStaticParams() {
  return zones.map((zone) => ({
    slug: zone.slug,
  }));
}

// Générer les métadonnées dynamiques
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZoneBySlug(slug);

  if (!zone) {
    return {
      title: "Zone non trouvée",
    };
  }

  return {
    title: `Taxi ${zone.name}`,
    description: zone.metaDescription,
    openGraph: {
      title: `Taxi ${zone.name} | ${siteConfig.name}`,
      description: zone.metaDescription,
    },
  };
}

export default async function ZonePage({ params }: PageProps) {
  const { slug } = await params;
  const zone = getZoneBySlug(slug);

  if (!zone) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-gold-400">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/zones" className="hover:text-gold-400">
            Zones desservies
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold-400">{zone.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Zone desservie
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Taxi <span className="text-gold-gradient">{zone.name}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">{zone.description}</p>
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
        {/* Distances */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Temps de trajet depuis {zone.name}
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Centre-ville */}
            <div className="card-premium text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Centre-ville
              </h3>
              <div className="flex items-center justify-center gap-2 text-gold-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {zone.distances.centreville.duration}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {zone.distances.centreville.km} km
              </p>
            </div>

            {/* Gare */}
            <div className="card-premium text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Train className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Gare de Strasbourg
              </h3>
              <div className="flex items-center justify-center gap-2 text-gold-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {zone.distances.gare.duration}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{zone.distances.gare.km} km</p>
            </div>

            {/* Aéroport */}
            <div className="card-premium text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Plane className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Aéroport Entzheim
              </h3>
              <div className="flex items-center justify-center gap-2 text-gold-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {zone.distances.aeroport.duration}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {zone.distances.aeroport.km} km
              </p>
            </div>
          </div>
        </section>

        {/* Points forts */}
        <section className="mb-12">
          <div className="card-premium max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6">
              Pourquoi choisir TAXI BRK à {zone.name} ?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {zone.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quartiers desservis */}
        {zone.neighborhoods && zone.neighborhoods.length > 0 && (
          <section className="mb-12">
            <div className="card-premium max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-white mb-4">
                Secteurs desservis à {zone.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {zone.neighborhoods.map((neighborhood, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gold-400/10 border border-gold-400/20 rounded-full text-gold-400 text-sm"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Nos services à {zone.name}
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Courses quotidiennes", href: "/reservation" },
              { label: "Transport médical", href: "/services/transport-medical" },
              { label: "Transfert aéroport", href: "/services/transfert-aeroport" },
              { label: "Transport enfants", href: "/services/transport-enfants" },
            ].map((service) => (
              <Link
                key={service.label}
                href={service.href}
                className="card-premium text-center py-4 hover:border-gold-400/50 transition-colors"
              >
                <span className="text-gray-300 text-sm">{service.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card-premium inline-block bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 py-8 px-8 sm:px-12">
            <MapPin className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Besoin d&apos;un taxi à {zone.name} ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Réservez en ligne ou appelez-nous pour une prise en charge rapide.
            </p>
            <Link
              href="/reservation"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Réserver maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
