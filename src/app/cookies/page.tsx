import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de Cookies",
  description: "Politique d'utilisation des cookies sur le site TAXI BRK.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">
          Politique de Cookies
        </h1>

        <div className="prose prose-invert prose-gold max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              Qu&apos;est-ce qu&apos;un cookie ?
            </h2>
            <p className="text-gray-300">
              Un cookie est un petit fichier texte stocké sur votre appareil
              lorsque vous visitez un site web. Les cookies permettent au site
              de mémoriser vos actions et préférences pendant une période
              donnée.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              Cookies utilisés sur ce site
            </h2>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Cookies essentiels
            </h3>
            <p className="text-gray-300">
              Ces cookies sont nécessaires au fonctionnement du site. Ils
              permettent d&apos;utiliser les fonctionnalités de base comme la
              navigation et l&apos;accès aux zones sécurisées.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Cookies de performance
            </h3>
            <p className="text-gray-300">
              Ces cookies nous aident à comprendre comment les visiteurs
              interagissent avec notre site en collectant des informations
              anonymes.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">
              Cookies de fonctionnalité
            </h3>
            <p className="text-gray-300">
              Ces cookies permettent de mémoriser vos choix (comme vos
              préférences de formulaire) pour personnaliser votre expérience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              Gestion des cookies
            </h2>
            <p className="text-gray-300">
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le
              souhaitez. Vous pouvez supprimer tous les cookies déjà présents
              sur votre ordinateur et configurer la plupart des navigateurs
              pour les bloquer.
            </p>
            <p className="text-gray-300 mt-4">
              Voici comment gérer les cookies dans les principaux navigateurs :
            </p>
            <ul className="text-gray-300 list-disc list-inside space-y-2 mt-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-400 mb-4">
              Contact
            </h2>
            <p className="text-gray-300">
              Pour toute question concernant notre utilisation des cookies,
              contactez-nous à : {siteConfig.contact.email}
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
