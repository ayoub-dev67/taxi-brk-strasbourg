import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Phone,
  ArrowRight,
  Award,
  Clock,
  Heart,
  Shield,
  Car,
  Sparkles,
  ThumbsUp,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez TAXI BRK, votre service de taxi conventionné à Strasbourg. Notre histoire, nos valeurs, notre engagement pour un transport de qualité.",
};

const values = [
  {
    icon: Clock,
    title: "Ponctualité",
    description:
      "Nous arrivons toujours à l'heure. Votre temps est précieux, nous le respectons.",
  },
  {
    icon: Heart,
    title: "Courtoisie",
    description:
      "Un accueil chaleureux et un service attentionné pour chaque client.",
  },
  {
    icon: Shield,
    title: "Sécurité",
    description:
      "Conduite prudente, véhicule entretenu, assurance complète. Votre sécurité est notre priorité.",
  },
  {
    icon: ThumbsUp,
    title: "Professionnalisme",
    description:
      "Service irréprochable, transparence sur les tarifs, engagement qualité.",
  },
];

const vehicleFeatures = [
  "Véhicule récent et confortable",
  "Climatisation automatique",
  "Intérieur cuir premium",
  "Espace bagages généreux",
  "Chargeurs USB disponibles",
  "Véhicule non-fumeur",
  "Nettoyage quotidien",
  "Entretien régulier",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <User className="w-4 h-4" />À Propos
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            À Propos de{" "}
            <span className="text-gold-gradient">{siteConfig.name}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Votre partenaire de confiance pour tous vos déplacements à
            Strasbourg et en Alsace.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notre Histoire */}
        <section className="mb-16">
          <div className="card-premium max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-gold-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Notre Histoire & Engagement
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-gold-400">{siteConfig.name}</strong> est
                né d&apos;une passion pour le service et d&apos;un constat
                simple : les Strasbourgeois méritent un service de taxi fiable,
                ponctuel et de qualité.
              </p>
              <p>
                Chauffeur professionnel expérimenté et conventionné par la CPAM,
                je mets mon expertise au service de tous vos déplacements :
                courses quotidiennes, transferts aéroport, transports médicaux,
                et bien plus.
              </p>
              <p>
                Mon engagement ? Vous offrir un service premium à chaque course.
                Que vous soyez un particulier, un professionnel de santé ou une
                entreprise, vous bénéficiez de la même qualité de service et de
                la même attention.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Chauffeur */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Votre chauffeur
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="card-premium max-w-3xl mx-auto bg-gradient-to-br from-gold-400/5 to-transparent">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold-400/30 flex-shrink-0 relative">
                <Image
                  src="/images/about.jpg"
                  alt="Chauffeur TAXI BRK Strasbourg"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Chauffeur Professionnel
                </h3>
                <p className="text-gold-400 text-sm mb-4">
                  Taxi conventionné CPAM • Strasbourg
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    Expérience confirmée en transport de personnes
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Shield className="w-4 h-4 text-gold-400" />
                    Formation aux premiers secours (PSC1)
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <Heart className="w-4 h-4 text-gold-400" />
                    Spécialisé transport médical et PMR
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    Connaissance parfaite de Strasbourg et environs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Véhicule */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Notre véhicule
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="card-premium max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Berline Premium
                </h3>
                <p className="text-gray-400 text-sm">
                  Confort et sécurité pour tous vos trajets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicleFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold-400" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                <strong className="text-white">Équipements spéciaux :</strong>{" "}
                Siège bébé et rehausseur disponibles sur demande, espace pour
                fauteuil roulant pliant.
              </p>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Nos valeurs
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="card-premium">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zone de couverture */}
        <section className="mb-16">
          <div className="card-premium max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gold-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Zone de couverture
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Basé à <strong className="text-white">Strasbourg</strong>, je
                couvre l&apos;ensemble de l&apos;
                <strong className="text-white">Eurométropole</strong> et au-delà
                :
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Strasbourg centre et périphérie",
                  "Schiltigheim, Bischheim",
                  "Illkirch-Graffenstaden",
                  "Lingolsheim, Ostwald",
                  "Haguenau, Sélestat",
                  "Colmar et le Haut-Rhin",
                  "Aéroport de Strasbourg-Entzheim",
                  "EuroAirport Bâle-Mulhouse",
                  "Aéroport de Francfort",
                  "Gares TGV et ICE",
                ].map((zone, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span className="text-sm">{zone}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card-premium inline-block bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 py-8 px-8 sm:px-12">
            <User className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Besoin d&apos;un taxi de confiance ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Réservez dès maintenant et découvrez un service de qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reservation"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                Réserver maintenant
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
        </section>
      </div>
    </div>
  );
}
