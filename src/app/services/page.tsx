import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Plane,
  Train,
  Package,
  Building2,
  Baby,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Services",
  description:
    "Découvrez tous nos services de taxi à Strasbourg : transport médical VSL, transferts aéroport et gare, transport de colis, service entreprise.",
};

const services = [
  {
    icon: Stethoscope,
    title: "Transport Médical VSL",
    description:
      "Taxi conventionné CPAM pour tous vos rendez-vous médicaux. Prise en charge sur prescription médicale, facturation directe à la Sécurité Sociale.",
    href: "/services/transport-medical",
    features: [
      "Conventionné Sécurité Sociale",
      "Prise en charge CPAM",
      "Dialyse, chimio, consultations",
      "Véhicule adapté PMR",
    ],
    badge: "Conventionné CPAM",
  },
  {
    icon: Plane,
    title: "Transfert Aéroport",
    description:
      "Service de navette vers tous les aéroports de la région. Suivi de vol en temps réel, ponctualité garantie.",
    href: "/services/transfert-aeroport",
    features: [
      "Strasbourg-Entzheim",
      "Bâle-Mulhouse",
      "Francfort",
      "Suivi de vol en temps réel",
    ],
  },
  {
    icon: Train,
    title: "Transfert Gare",
    description:
      "Transport confortable vers et depuis la gare de Strasbourg et toutes les gares de la région Grand Est.",
    href: "/services/transfert-gare",
    features: [
      "Gare de Strasbourg",
      "Toutes gares régionales",
      "Aide aux bagages",
      "Service ponctuel",
    ],
  },
  {
    icon: Package,
    title: "Transport de Colis",
    description:
      "Livraison express de plis et colis urgents. Documents importants, marchandises, livraison le jour même.",
    href: "/services/transport-colis",
    features: [
      "Livraison express",
      "Plis et documents",
      "Colis urgents",
      "Suivi de livraison",
    ],
  },
  {
    icon: Building2,
    title: "Service Entreprise",
    description:
      "Solutions de transport sur mesure pour les entreprises. Compte professionnel, facturation mensuelle, tarifs négociés.",
    href: "/services/entreprise",
    features: [
      "Compte professionnel",
      "Facturation mensuelle",
      "Tarifs négociés",
      "Reporting détaillé",
    ],
  },
  {
    icon: Baby,
    title: "Transport d'Enfants",
    description:
      "Transport sécurisé d'enfants non accompagnés vers l'école, les activités ou en garde alternée.",
    href: "/services/transport-enfants",
    features: [
      "Chauffeur de confiance",
      "Siège auto fourni",
      "Trajets réguliers",
      "Communication parents",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">Nos Services</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Des services <span className="text-gold-gradient">premium</span> pour tous vos besoins
          </h1>
          <p className="text-gray-400 text-lg">
            Du transport médical aux transferts aéroport, TAXI BRK vous propose
            une gamme complète de services de taxi à Strasbourg et dans tout le
            Bas-Rhin.
          </p>
          <div className="divider-gold mt-8" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="block group">
              <div className="card-premium h-full">
                {/* Badge */}
                {service.badge && (
                  <span className="badge-gold text-xs absolute top-4 right-4">
                    {service.badge}
                  </span>
                )}

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gold-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/20 transition-colors">
                    <service.icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-400 mt-1">{service.description}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-gold-400 font-medium">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="card-premium bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 text-center py-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Besoin d&apos;un service spécifique ?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Contactez-nous pour discuter de vos besoins particuliers.
            Nous trouverons la solution adaptée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-gold">
              Réserver maintenant
            </Link>
            <Link href="/contact" className="btn-gold-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
