import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  FileText,
  Building2,
  CheckCircle,
  ArrowRight,
  Phone,
  Stethoscope,
  Heart,
  Pill,
  Activity,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Taxi Conventionné CPAM",
  description:
    "TAXI BRK est un taxi conventionné par la Sécurité Sociale. Transport médical VSL pris en charge par la CPAM sur prescription médicale.",
};

const steps = [
  {
    number: 1,
    title: "Prescription médicale",
    description:
      "Votre médecin vous prescrit un bon de transport (formulaire Cerfa) indiquant le mode de transport adapté.",
  },
  {
    number: 2,
    title: "Réservation",
    description:
      "Contactez-nous par téléphone ou via notre site pour réserver votre transport médical.",
  },
  {
    number: 3,
    title: "Transport",
    description:
      "Nous vous transportons en toute sécurité vers votre rendez-vous médical.",
  },
  {
    number: 4,
    title: "Facturation CPAM",
    description:
      "Nous nous occupons de la facturation directe auprès de votre caisse d'assurance maladie.",
  },
];

const eligibleTransports = [
  { icon: Stethoscope, text: "Consultations médicales" },
  { icon: Building2, text: "Hospitalisations" },
  { icon: Activity, text: "Séances de dialyse" },
  { icon: Pill, text: "Séances de chimiothérapie" },
  { icon: Heart, text: "Rééducation, kinésithérapie" },
  { icon: FileText, text: "Examens médicaux" },
];

export default function TaxiConventionnePage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">
            <Shield className="w-4 h-4 inline mr-2" />
            Conventionné CPAM
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Taxi conventionné <span className="text-gold-gradient">Sécurité Sociale</span>
          </h1>
          <p className="text-gray-400 text-lg">
            TAXI BRK est agréé par la Caisse Primaire d&apos;Assurance Maladie pour
            le transport sanitaire. Vos frais de transport médical peuvent être
            pris en charge.
          </p>
          <div className="divider-gold mt-8" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Qu'est-ce qu'un taxi conventionné */}
        <div className="mb-16">
          <div className="card-premium max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Qu&apos;est-ce qu&apos;un taxi conventionné ?
            </h2>
            <p className="text-gray-400 mb-4">
              Un taxi conventionné est un véhicule de transport sanitaire agréé
              par la Sécurité Sociale (CPAM). Il permet aux patients de
              bénéficier d&apos;une prise en charge de leurs frais de transport pour
              se rendre à leurs rendez-vous médicaux.
            </p>
            <p className="text-gray-400">
              En tant que taxi conventionné, TAXI BRK facture directement la
              CPAM. Vous n&apos;avez donc pas à avancer les frais (sauf participation
              forfaitaire éventuelle).
            </p>

            {/* Logo Assurance Maladie */}
            <div className="mt-6 pt-6 border-t border-gold-400/10 flex items-center gap-4">
              <Image
                src="/images/assurance-maladie-logo-png.png"
                alt="Conventionné Assurance Maladie CPAM"
                width={120}
                height={48}
                className="h-10 w-auto"
              />
              <span className="text-gray-400 text-sm">
                Conventionné par la Caisse Primaire d&apos;Assurance Maladie du Bas-Rhin
              </span>
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">
            Comment ça fonctionne ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="card-premium relative">
                <div className="w-10 h-10 rounded-full bg-gold-400 text-black font-bold flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transports éligibles */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-white mb-8 text-center">
            Transports éligibles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {eligibleTransports.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg border border-gold-400/20 bg-black-50"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold-400" />
                </div>
                <span className="text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-16">
          <div className="card-premium max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-white mb-6">
              Conditions de prise en charge
            </h2>

            <ul className="space-y-4">
              {[
                "Prescription médicale de transport (bon de transport Cerfa)",
                "Accord préalable de la CPAM pour certains transports",
                "Transport lié à un soin, examen ou traitement",
                "Incapacité de se déplacer par ses propres moyens",
              ].map((condition, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="card-premium inline-block bg-gradient-to-br from-gold-400/10 to-transparent border-gold-400/40 py-8 px-12">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Besoin d&apos;un transport médical ?
            </h2>
            <p className="text-gray-400 mb-6">
              Contactez-nous pour réserver votre transport ou obtenir plus d&apos;informations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${siteConfig.contact.phoneLink}`}
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.contact.phone}
              </a>
              <Link
                href="/reservation"
                className="btn-gold-outline inline-flex items-center justify-center gap-2"
              >
                Réserver en ligne
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
