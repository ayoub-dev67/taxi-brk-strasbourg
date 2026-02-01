import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Phone,
  ArrowRight,
  Calendar,
  CreditCard,
  Stethoscope,
  Car,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Questions Fréquentes",
  description:
    "Trouvez les réponses à vos questions sur nos services de taxi à Strasbourg. Réservation, tarifs, transport médical et plus.",
};

const faqCategories = [
  {
    id: "reservation",
    icon: Calendar,
    title: "Réservation",
    questions: [
      {
        question: "Comment puis-je réserver un taxi ?",
        answer:
          "Vous pouvez réserver par téléphone au 07 44 22 09 60, via WhatsApp, ou directement sur notre site web via le formulaire de réservation. Nous vous confirmons rapidement votre course.",
      },
      {
        question: "Combien de temps à l'avance dois-je réserver ?",
        answer:
          "Pour une course immédiate, appelez-nous directement. Pour une réservation à l'avance, nous recommandons de réserver au minimum 24h avant, surtout pour les transferts aéroport ou les rendez-vous médicaux importants.",
      },
      {
        question: "Puis-je annuler ou modifier ma réservation ?",
        answer:
          "Oui, vous pouvez annuler ou modifier votre réservation gratuitement en nous prévenant au plus tôt. Pour les annulations de dernière minute, des frais peuvent s'appliquer selon les cas.",
      },
      {
        question: "Que se passe-t-il si mon vol ou train a du retard ?",
        answer:
          "Pour les transferts aéroport et gare, nous suivons votre vol/train en temps réel. En cas de retard, nous adaptons automatiquement l'heure de prise en charge. Aucun supplément n'est appliqué.",
      },
    ],
  },
  {
    id: "tarifs",
    icon: CreditCard,
    title: "Tarifs et paiement",
    questions: [
      {
        question: "Comment sont calculés vos tarifs ?",
        answer:
          "Nos tarifs sont réglementés par la Préfecture du Bas-Rhin. Le prix comprend une prise en charge (3,02€) plus un tarif kilométrique qui varie selon l'heure (jour/nuit) et si le véhicule est en charge ou en approche.",
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Nous acceptons les espèces, les cartes bancaires (Visa, Mastercard), et les virements bancaires pour les clients entreprise avec facturation mensuelle.",
      },
      {
        question: "Y a-t-il des suppléments ?",
        answer:
          "Des suppléments peuvent s'appliquer pour : les bagages volumineux (0,50€), le 4ème passager (3€), les animaux (2€), et les réservations à l'avance (4€). Tous les suppléments sont affichés dans le véhicule.",
      },
      {
        question: "Proposez-vous des forfaits ?",
        answer:
          "Oui, nous proposons des forfaits pour les trajets réguliers (école, travail) et les entreprises. Contactez-nous pour un devis personnalisé adapté à vos besoins.",
      },
    ],
  },
  {
    id: "medical",
    icon: Stethoscope,
    title: "Transport médical",
    questions: [
      {
        question: "Qu'est-ce qu'un taxi conventionné ?",
        answer:
          "Un taxi conventionné est agréé par la CPAM pour le transport de patients. Les frais sont pris en charge à 65% par l'Assurance Maladie, et le reste par votre mutuelle si vous en avez une.",
      },
      {
        question: "Que dois-je faire pour un transport médical ?",
        answer:
          "Vous devez avoir une prescription médicale de transport (bon de transport) établie par votre médecin. Présentez-la lors de la course. Nous nous occupons de la facturation directe à la CPAM.",
      },
      {
        question: "Quels types de rendez-vous médicaux couvrez-vous ?",
        answer:
          "Nous assurons le transport pour tous les rendez-vous médicaux : consultations, hospitalisations, séances de dialyse, chimiothérapie, kinésithérapie, radiologie, et tout autre soin prescrit.",
      },
      {
        question: "Proposez-vous l'attente sur place ?",
        answer:
          "Oui, nous proposons un service d'attente pour vos rendez-vous médicaux. L'attente est facturée selon les tarifs réglementaires et peut être prise en charge sur prescription.",
      },
    ],
  },
  {
    id: "services",
    icon: Car,
    title: "Services",
    questions: [
      {
        question: "Proposez-vous des sièges enfants ?",
        answer:
          "Oui, nous fournissons gratuitement des sièges bébé et rehausseurs adaptés à l'âge de votre enfant. Précisez-le lors de votre réservation.",
      },
      {
        question: "Transportez-vous des animaux ?",
        answer:
          "Oui, les animaux de compagnie sont acceptés (supplément de 2€). Les chiens doivent être tenus en laisse et les chats dans une cage de transport.",
      },
      {
        question: "Jusqu'où pouvez-vous me transporter ?",
        answer:
          "Nous assurons les courses dans toute l'Eurométropole de Strasbourg ainsi que les longues distances : aéroports (Strasbourg, Bâle-Mulhouse, Francfort), toute l'Alsace et au-delà.",
      },
      {
        question: "Proposez-vous un service entreprise ?",
        answer:
          "Oui, nous offrons aux entreprises un compte dédié avec facturation mensuelle, tarifs préférentiels, et reporting détaillé. Contactez-nous pour ouvrir un compte.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <SchemaMarkup includeFaq />
      <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Hero */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Questions <span className="text-gold-gradient">Fréquentes</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Retrouvez les réponses aux questions les plus courantes sur nos
            services de taxi à Strasbourg.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {faqCategories.map((category) => (
            <section key={category.id} className="card-premium">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {category.title}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.id}-${index}`}
                    className="border border-gray-800 rounded-lg px-4 data-[state=open]:border-gold-400/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-gold-400 hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="card-premium inline-block bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 py-8 px-8 sm:px-12">
            <HelpCircle className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Contactez-nous directement, nous serons ravis de vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                Nous contacter
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
    </>
  );
}
