import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de TAXI BRK.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">
          Politique de Confidentialité
        </h1>

        <div className="prose prose-invert prose-gold max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              1. Collecte des données
            </h2>
            <p className="text-gray-300">
              Nous collectons les données personnelles que vous nous fournissez
              volontairement lors de :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>La réservation d&apos;une course (nom, téléphone, email, adresses)</li>
              <li>L&apos;utilisation du formulaire de contact</li>
              <li>La navigation sur notre site (cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              2. Utilisation des données
            </h2>
            <p className="text-gray-300">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>Traiter vos demandes de réservation</li>
              <li>Vous contacter concernant vos courses</li>
              <li>Facturer les transports médicaux à la CPAM</li>
              <li>Répondre à vos questions</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              3. Conservation des données
            </h2>
            <p className="text-gray-300">
              Vos données personnelles sont conservées pendant la durée
              nécessaire au traitement de votre demande, puis archivées
              conformément aux obligations légales (5 ans pour les documents
              comptables).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              4. Partage des données
            </h2>
            <p className="text-gray-300">
              Vos données ne sont jamais vendues. Elles peuvent être partagées avec :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>La CPAM pour les transports conventionnés</li>
              <li>Nos prestataires techniques (hébergement, email)</li>
              <li>Les autorités en cas d&apos;obligation légale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              5. Vos droits
            </h2>
            <p className="text-gray-300">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Pour exercer ces droits, contactez-nous à : {siteConfig.contact.email}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              6. Sécurité
            </h2>
            <p className="text-gray-300">
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non
              autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              7. Contact
            </h2>
            <p className="text-gray-300">
              Pour toute question concernant cette politique de confidentialité,
              contactez-nous :
            </p>
            <p className="text-gray-300 mt-2">
              Email : {siteConfig.contact.email}<br />
              Téléphone : {siteConfig.contact.phone}
            </p>
          </section>
        </div>

        <p className="text-gray-500 text-sm mt-12">
          Dernière mise à jour : Février 2025
        </p>
      </div>
    </div>
  );
}
