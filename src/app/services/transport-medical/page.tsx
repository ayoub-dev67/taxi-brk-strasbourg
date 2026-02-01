import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  FileText,
  Phone,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Heart,
  Activity,
  Pill,
  Building2,
  Dumbbell,
  ClipboardList,
  Calendar,
  Car,
  CreditCard,
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
  title: "Transport Médical VSL",
  description:
    "Taxi conventionné CPAM à Strasbourg. Transport médical VSL pris en charge par la Sécurité Sociale : dialyse, chimiothérapie, consultations, hospitalisations.",
};

const transportTypes = [
  {
    icon: Activity,
    title: "Dialyse",
    description: "Transport régulier vers les centres de dialyse",
  },
  {
    icon: Pill,
    title: "Chimiothérapie",
    description: "Accompagnement pour vos séances de chimio",
  },
  {
    icon: Heart,
    title: "Radiothérapie",
    description: "Transport quotidien pendant votre traitement",
  },
  {
    icon: Stethoscope,
    title: "Consultations",
    description: "Rendez-vous chez spécialistes et médecins",
  },
  {
    icon: Building2,
    title: "Hospitalisations",
    description: "Entrées et sorties d'hôpital",
  },
  {
    icon: Dumbbell,
    title: "Rééducation",
    description: "Kinésithérapie et centres de rééducation",
  },
];

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "Prescription médicale",
    description:
      "Votre médecin vous délivre un bon de transport (Cerfa) indiquant le mode de transport prescrit.",
  },
  {
    number: 2,
    icon: Phone,
    title: "Réservation",
    description:
      "Contactez-nous par téléphone ou en ligne. Nous organisons votre transport selon vos besoins.",
  },
  {
    number: 3,
    icon: Car,
    title: "Transport",
    description:
      "Nous vous accompagnons à votre rendez-vous médical en toute sécurité et confort.",
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Facturation CPAM",
    description:
      "Nous facturons directement la Sécurité Sociale. Vous n'avez rien à avancer.",
  },
];

const documents = [
  "Prescription médicale de transport (bon de transport Cerfa)",
  "Carte Vitale à jour",
  "Attestation de droits (si nécessaire)",
  "Pièce d'identité",
];

const faqs = [
  {
    question: "Comment obtenir une prescription de transport ?",
    answer:
      "La prescription de transport est délivrée par votre médecin traitant ou le médecin hospitalier. Elle doit mentionner le mode de transport adapté à votre état de santé (taxi, VSL, ambulance). Demandez-la lors de votre consultation ou au moment de votre sortie d'hospitalisation.",
  },
  {
    question: "Quels transports sont pris en charge à 100% ?",
    answer:
      "Les transports en lien avec une ALD (Affection Longue Durée), les transports pour hospitalisation, les transports d'urgence, et les transports liés à un accident du travail sont généralement pris en charge à 100%. Pour les autres cas, une participation forfaitaire peut s'appliquer.",
  },
  {
    question: "Puis-je choisir mon taxi conventionné ?",
    answer:
      "Oui, vous êtes libre de choisir le taxi conventionné de votre choix. TAXI BRK est conventionné par la CPAM du Bas-Rhin et assure tous les transports médicaux dans la région de Strasbourg.",
  },
  {
    question: "Que faire si j'ai besoin d'un transport régulier ?",
    answer:
      "Pour les transports réguliers (dialyse, chimio, radio...), nous organisons un planning adapté à vos séances. Contactez-nous pour mettre en place un suivi personnalisé avec les mêmes horaires chaque semaine.",
  },
];

export default function TransportMedicalPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <SchemaMarkup
        customFaq={faqs}
        service={{
          name: "Transport Médical VSL Conventionné CPAM",
          description: "Taxi conventionné CPAM pour transports médicaux à Strasbourg : dialyse, chimiothérapie, consultations, hospitalisations. Prise en charge Sécurité Sociale.",
          serviceType: "Medical Transport",
          areaServed: "Strasbourg, Bas-Rhin, Alsace",
        }}
        breadcrumbs={[
          { name: "Accueil", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Transport Médical VSL", url: "/services/transport-medical" },
        ]}
      />
      {/* Hero with background image */}
      <div className="relative mb-16">
        {/* Background Image */}
        <div className="absolute inset-0 h-80">
          <Image
            src="/images/service-medical.jpg"
            alt="Transport médical conventionné CPAM Strasbourg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="badge-gold mb-4 inline-flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Conventionné CPAM
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Transport Médical <span className="text-gold-gradient">VSL</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Taxi conventionné par la Sécurité Sociale pour tous vos déplacements
              médicaux à Strasbourg et dans le Bas-Rhin. Prise en charge directe
              par la CPAM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservation" className="btn-gold inline-flex items-center justify-center gap-2">
                Réserver un transport
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
        {/* Qu'est-ce que le VSL */}
        <section className="mb-16">
          <div className="card-premium max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Qu&apos;est-ce que le transport VSL ?
            </h2>
            <p className="text-gray-400 mb-4">
              Le <strong className="text-white">VSL (Véhicule Sanitaire Léger)</strong> est
              un mode de transport sanitaire assis, adapté aux patients qui peuvent
              se déplacer mais nécessitent une assistance pour leurs trajets médicaux.
            </p>
            <p className="text-gray-400 mb-4">
              En tant que taxi conventionné, TAXI BRK est agréé par la Caisse Primaire
              d&apos;Assurance Maladie pour effectuer ces transports. Cela signifie que
              vos frais peuvent être pris en charge par la Sécurité Sociale sur
              prescription médicale.
            </p>
            <div className="flex items-center gap-2 text-gold-400 mb-6">
              <CheckCircle className="w-5 h-5" />
              <span>Agrément CPAM Bas-Rhin</span>
            </div>

            {/* Logo Assurance Maladie */}
            <div className="pt-6 border-t border-gold-400/10 flex items-center gap-4">
              <Image
                src="/images/assurance-maladie-logo-png.png"
                alt="Conventionné Assurance Maladie CPAM"
                width={120}
                height={48}
                className="h-10 w-auto"
              />
              <span className="text-gray-400 text-sm">
                Conventionné Sécurité Sociale
              </span>
            </div>
          </div>
        </section>

        {/* Types de transports */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Types de transports pris en charge
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transportTypes.map((type) => (
              <div key={type.title} className="card-premium text-center">
                <div className="w-14 h-14 rounded-xl bg-gold-400/10 flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-400 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Comment ça fonctionne ?
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="card-premium relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-400 text-black font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  <step.icon className="w-5 h-5 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents nécessaires */}
        <section className="mb-16">
          <div className="card-premium max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-6 h-6 text-gold-400" />
              <h2 className="text-xl font-semibold text-white">
                Documents à fournir
              </h2>
            </div>
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <span className="text-gray-300">{doc}</span>
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
            <Calendar className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Besoin d&apos;un transport médical ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Réservez votre taxi conventionné dès maintenant. Nous nous occupons
              de toutes les formalités avec la CPAM.
            </p>
            <Link
              href="/reservation"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Réserver un transport médical
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
