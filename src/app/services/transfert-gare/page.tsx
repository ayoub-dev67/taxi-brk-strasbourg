import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Train,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Briefcase,
  Shield,
  CheckCircle,
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
  title: "Transfert Gare",
  description:
    "Service de taxi pour vos transferts vers la gare de Strasbourg et toutes les gares de la région Grand Est. Ponctualité et confort.",
};

const gares = [
  {
    name: "Gare de Strasbourg",
    type: "Gare TGV",
    description: "Gare centrale avec liaisons TGV vers Paris, Lyon, Marseille",
    lines: ["TGV", "TER", "ICE"],
  },
  {
    name: "Gare de Kehl",
    type: "Gare régionale",
    description: "Connexion vers l'Allemagne",
    lines: ["RE", "S-Bahn"],
  },
  {
    name: "Gares TER Alsace",
    type: "Réseau régional",
    description: "Toutes les gares du réseau TER Grand Est",
    lines: ["TER"],
  },
];

const services = [
  {
    icon: Clock,
    title: "Horaires flexibles",
    description: "Nous nous adaptons aux horaires de vos trains, tôt le matin ou tard le soir.",
  },
  {
    icon: Briefcase,
    title: "Aide aux bagages",
    description: "Nous vous aidons à charger et décharger vos valises.",
  },
  {
    icon: MapPin,
    title: "Dépose au plus près",
    description: "Nous vous déposons directement devant l'entrée de la gare.",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Jamais de retard pour que vous ne ratiez pas votre train.",
  },
];

const faqs = [
  {
    question: "Combien coûte un taxi vers la gare de Strasbourg ?",
    answer:
      "Le prix dépend de votre adresse de départ. Depuis le centre-ville, comptez entre 12€ et 20€. Pour les quartiers périphériques ou les communes de l'Eurométropole, le tarif varie selon la distance. Contactez-nous pour un devis précis.",
  },
  {
    question: "Combien de temps avant mon train dois-je réserver ?",
    answer:
      "Nous recommandons de réserver au moins 2h à l'avance pour garantir la disponibilité. Pour les trains très tôt le matin (avant 7h), la réservation la veille est conseillée.",
  },
  {
    question: "Que se passe-t-il si mon train a du retard à l'arrivée ?",
    answer:
      "Nous suivons les horaires SNCF. Si votre train a du retard, nous adaptons notre venue. Une fois sur place, nous vous attendons gratuitement jusqu'à 15 minutes après l'heure d'arrivée prévue.",
  },
  {
    question: "Pouvez-vous m'aider avec mes bagages ?",
    answer:
      "Oui, notre chauffeur vous aide à charger et décharger vos bagages. Ce service est inclus dans le prix de la course, sans supplément.",
  },
];

export default function TransfertGarePage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <SchemaMarkup
        customFaq={faqs}
        service={{
          name: "Transfert Taxi Gare de Strasbourg",
          description: "Service de taxi pour vos transferts vers la gare de Strasbourg et toutes les gares de la région Grand Est. Ponctualité garantie.",
          serviceType: "Train Station Transfer",
          areaServed: "Strasbourg, Grand Est",
        }}
        breadcrumbs={[
          { name: "Accueil", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Transfert Gare", url: "/services/transfert-gare" },
        ]}
      />
      {/* Hero with background image */}
      <div className="relative mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 h-80">
          <Image
            src="/images/service-gare.jpg"
            alt="Transfert taxi gare Strasbourg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-gold mb-4 inline-flex items-center gap-2">
              <Train className="w-4 h-4" />
              Transfert Gare
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Transfert vers les <span className="text-gold-gradient">gares</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Service de taxi pour vos déplacements vers la gare de Strasbourg et
              toutes les gares de la région. Ne ratez plus jamais votre train.
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
        {/* Gares desservies */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Gares desservies
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gares.map((gare) => (
              <div key={gare.name} className="card-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <Train className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {gare.name}
                    </h3>
                    <p className="text-gold-400 text-sm">{gare.type}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{gare.description}</p>
                <div className="flex flex-wrap gap-2">
                  {gare.lines.map((line) => (
                    <span
                      key={line}
                      className="px-2 py-1 text-xs bg-gold-400/10 text-gold-400 rounded"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nos services */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Nos services
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-gold-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informations pratiques */}
        <section className="mb-16">
          <div className="card-premium max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6">
              Bon à savoir
            </h2>
            <ul className="space-y-3">
              {[
                "Réservation conseillée la veille pour les départs matinaux",
                "Nous attendons gratuitement en cas de retard de train (arrivée)",
                "Tarifs selon grille préfectorale, pas de supplément gare",
                "Paiement par carte bancaire accepté",
              ].map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{info}</span>
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
            <Train className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Un train à prendre ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Réservez votre taxi pour la gare et voyagez sereinement.
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
