import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente et d'utilisation des services TAXI BRK.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">
          Conditions Générales de Vente
        </h1>

        <div className="prose prose-invert prose-gold max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              1. Objet
            </h2>
            <p className="text-gray-300">
              Les présentes conditions générales régissent les relations entre
              {siteConfig.name} et ses clients pour tout service de transport
              de personnes par taxi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              2. Services proposés
            </h2>
            <p className="text-gray-300">
              {siteConfig.name} propose les services suivants :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>Transport de personnes (courses urbaines et longue distance)</li>
              <li>Transport médical conventionné (VSL)</li>
              <li>Transferts aéroports et gares</li>
              <li>Transport de colis et plis urgents</li>
              <li>Service entreprise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              3. Tarification
            </h2>
            <p className="text-gray-300">
              Les tarifs appliqués sont ceux fixés par arrêté préfectoral du
              Bas-Rhin. Le prix de la course est calculé au compteur et comprend :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>La prise en charge</li>
              <li>Le prix au kilomètre (tarif jour ou nuit)</li>
              <li>Les éventuels suppléments (bagages, passagers, animaux)</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Un minimum de perception s&apos;applique. Les tarifs sont affichés dans
              le véhicule et disponibles sur notre page Tarifs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              4. Réservation
            </h2>
            <p className="text-gray-300">
              La réservation peut se faire par téléphone, via WhatsApp ou sur
              notre site internet. Une réservation n&apos;est confirmée qu&apos;après
              notre validation. Pour les transports médicaux, une prescription
              médicale est requise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              5. Annulation
            </h2>
            <p className="text-gray-300">
              Toute annulation doit être signalée le plus tôt possible. En cas
              d&apos;annulation tardive ou de non-présentation sans prévenir, des
              frais peuvent s&apos;appliquer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              6. Paiement
            </h2>
            <p className="text-gray-300">
              Le paiement s&apos;effectue à la fin de la course. Nous acceptons :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>Les espèces</li>
              <li>Les cartes bancaires</li>
              <li>Le virement (clients entreprise)</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Pour les transports conventionnés, la facturation est adressée
              directement à la CPAM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              7. Responsabilité
            </h2>
            <p className="text-gray-300">
              {siteConfig.name} est assuré pour le transport de personnes.
              Nous déclinons toute responsabilité en cas de retard dû à des
              circonstances indépendantes de notre volonté (embouteillages,
              intempéries, accidents).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              8. Réclamations
            </h2>
            <p className="text-gray-300">
              Toute réclamation doit être adressée par email à {siteConfig.contact.email}
              dans un délai de 48 heures suivant la course.
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
