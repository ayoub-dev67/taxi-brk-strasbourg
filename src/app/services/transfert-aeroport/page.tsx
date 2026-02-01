import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Wifi,
  Briefcase,
  Shield,
  Eye,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "Transfert Aéroport",
  description:
    "Service de transfert taxi vers les aéroports de Strasbourg-Entzheim, Bâle-Mulhouse et Francfort. Ponctualité garantie, suivi des vols en temps réel.",
};

const airports = [
  {
    name: "Strasbourg-Entzheim",
    code: "SXB",
    distance: "15 km",
    duration: "20 min",
    description: "Aéroport international de Strasbourg",
  },
  {
    name: "Bâle-Mulhouse-Fribourg",
    code: "BSL/MLH/EAP",
    distance: "130 km",
    duration: "1h30",
    description: "EuroAirport binational France-Suisse",
  },
  {
    name: "Francfort",
    code: "FRA",
    distance: "220 km",
    duration: "2h30",
    description: "Hub international allemand",
  },
];

const advantages = [
  {
    icon: Clock,
    title: "Ponctualité garantie",
    description: "Nous arrivons toujours à l'heure. Votre vol n'attend pas.",
  },
  {
    icon: Eye,
    title: "Suivi des vols",
    description: "Nous suivons votre vol en temps réel et adaptons notre arrivée.",
  },
  {
    icon: Briefcase,
    title: "Aide aux bagages",
    description: "Nous vous aidons avec vos bagages du véhicule au terminal.",
  },
  {
    icon: Wifi,
    title: "Véhicule confortable",
    description: "Climatisation, espace pour les bagages, siège confortable.",
  },
  {
    icon: Shield,
    title: "Prix fixe",
    description: "Tarif convenu à l'avance, pas de surprise.",
  },
  {
    icon: MapPin,
    title: "Prise en charge porte",
    description: "Nous venons vous chercher directement chez vous.",
  },
];

const faqs = [
  {
    question: "Combien coûte un taxi vers l'aéroport de Strasbourg ?",
    answer:
      "Le transfert vers l'aéroport de Strasbourg-Entzheim coûte entre 25€ et 35€ depuis le centre-ville. Le prix exact dépend de votre adresse de départ. Le tarif est fixé à l'avance, sans surprise.",
  },
  {
    question: "Comment réserver un taxi pour l'aéroport ?",
    answer:
      "Vous pouvez réserver par téléphone au 07 68 14 94 61, via WhatsApp, ou sur notre site web. Indiquez votre numéro de vol pour que nous puissions le suivre et adapter notre arrivée en cas de retard.",
  },
  {
    question: "Que se passe-t-il si mon vol est en retard ?",
    answer:
      "Nous suivons votre vol en temps réel. Si votre avion a du retard, nous adaptons automatiquement notre heure d'arrivée. Vous n'avez rien à faire, nous serons là quand vous atterrirez.",
  },
  {
    question: "Combien de temps avant mon vol dois-je réserver ?",
    answer:
      "Nous recommandons de réserver au moins 24h à l'avance pour garantir la disponibilité. Pour les vols très tôt le matin (avant 6h), la réservation la veille est indispensable.",
  },
];

export default function TransfertAeroportPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <SchemaMarkup
        customFaq={faqs}
        service={{
          name: "Transfert Taxi Aéroport Strasbourg",
          description: "Service de transfert taxi vers les aéroports de Strasbourg-Entzheim, Bâle-Mulhouse et Francfort. Ponctualité garantie, suivi des vols.",
          serviceType: "Airport Transfer",
          areaServed: "Strasbourg, Alsace",
        }}
        breadcrumbs={[
          { name: "Accueil", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Transfert Aéroport", url: "/services/transfert-aeroport" },
        ]}
      />
        {/* Hero with background image */}
      <div className="relative mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 h-80">
          <Image
            src="/images/service-aeroport.jpg"
            alt="Transfert taxi aéroport Strasbourg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-gold mb-4 inline-flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Transfert Aéroport
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Transfert vers les <span className="text-gold-gradient">aéroports</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Service de navette taxi vers tous les aéroports de la région.
            Ponctualité garantie, suivi de vol en temps réel, aide aux bagages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-gold inline-flex items-center justify-center gap-2">
              Réserver un transfert
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aéroports desservis */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Aéroports desservis
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airports.map((airport) => (
              <div key={airport.code} className="card-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {airport.name}
                    </h3>
                    <p className="text-gold-400 text-sm font-mono">{airport.code}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{airport.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    {airport.distance}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-gold-400" />
                    {airport.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nos avantages */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Pourquoi nous choisir ?
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                    <advantage.icon className="w-6 h-6 text-gold-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mb-16">
          <div className="card-premium max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6">
              Comment réserver votre transfert ?
            </h2>
            <ul className="space-y-4">
              {[
                "Réservez en ligne ou par téléphone en indiquant votre vol",
                "Nous vous confirmons l'heure de prise en charge",
                "Nous suivons votre vol le jour J (avance ou retard)",
                "Nous vous attendons à l'arrivée ou vous déposons au départ",
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-400 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Questions fréquentes
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gold-400/20 rounded-lg bg-black-50 px-6 data-[state=open]:border-gold-400/40"
                >
                  <AccordionTrigger className="text-left text-white hover:text-gold-400 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card-premium inline-block bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 py-8 px-8 sm:px-12">
            <Plane className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Prochain vol à prendre ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Réservez votre transfert aéroport et voyagez l&apos;esprit tranquille.
              Ponctualité et confort garantis.
            </p>
            <Link
              href="/reservation"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Réserver un transfert
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
