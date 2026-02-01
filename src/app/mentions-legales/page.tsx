import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site TAXI BRK Strasbourg.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">
          Mentions Légales
        </h1>

        <div className="prose prose-invert prose-gold max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-gray-300 space-y-2">
              <p><strong>Raison sociale :</strong> {siteConfig.name}</p>
              <p><strong>Activité :</strong> Service de taxi conventionné</p>
              <p><strong>Adresse :</strong> {siteConfig.location.city}, {siteConfig.location.department}</p>
              <p><strong>Téléphone :</strong> {siteConfig.contact.phone}</p>
              <p><strong>Email :</strong> {siteConfig.contact.email}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              2. Hébergement
            </h2>
            <p className="text-gray-300">
              Ce site est hébergé par Vercel Inc., situé 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              3. Propriété intellectuelle
            </h2>
            <p className="text-gray-300">
              L&apos;ensemble du contenu de ce site (textes, images, logo, graphismes)
              est la propriété exclusive de {siteConfig.name} ou de ses partenaires.
              Toute reproduction, représentation, modification, publication ou
              adaptation de tout ou partie des éléments du site est interdite
              sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              4. Données personnelles
            </h2>
            <p className="text-gray-300">
              Les informations recueillies via les formulaires de ce site sont
              destinées uniquement à {siteConfig.name} pour le traitement de vos
              demandes. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
              de rectification et de suppression de vos données.
              Consultez notre <a href="/confidentialite" className="text-gold-400 hover:underline">politique de confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              5. Cookies
            </h2>
            <p className="text-gray-300">
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur.
              Pour plus d&apos;informations, consultez notre <a href="/cookies" className="text-gold-400 hover:underline">politique de cookies</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              6. Responsabilité
            </h2>
            <p className="text-gray-300">
              {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              diffusées sur ce site. Toutefois, nous ne pouvons garantir
              l&apos;exhaustivité ou l&apos;absence d&apos;erreurs. Les informations sont données
              à titre indicatif et sont susceptibles d&apos;évoluer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              7. Droit applicable
            </h2>
            <p className="text-gray-300">
              Le présent site et les présentes mentions légales sont soumis au
              droit français. En cas de litige, les tribunaux français seront
              seuls compétents.
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
