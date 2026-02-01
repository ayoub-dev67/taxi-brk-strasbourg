import type { Metadata } from "next";
import Link from "next/link";
import { Info, Sun, Moon, Calculator } from "lucide-react";
import { TARIFS_PREFECTURE_67 } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Consultez les tarifs officiels des taxis à Strasbourg. Tarifs réglementés par la Préfecture du Bas-Rhin. Transparence totale sur les prix.",
};

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">Tarifs</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Tarifs <span className="text-gold-gradient">officiels</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Nos tarifs sont réglementés par la Préfecture du Bas-Rhin.
            Transparence totale, pas de surprise.
          </p>
          <div className="divider-gold mt-8" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Frais de base */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-premium text-center">
            <p className="text-gray-400 mb-2">Prise en charge</p>
            <p className="text-3xl font-bold text-gold-400">
              {TARIFS_PREFECTURE_67.priseEnCharge.toFixed(2)} &euro;
            </p>
          </div>
          <div className="card-premium text-center">
            <p className="text-gray-400 mb-2">Minimum de course</p>
            <p className="text-3xl font-bold text-gold-400">
              {TARIFS_PREFECTURE_67.minimumCourse.toFixed(2)} &euro;
            </p>
          </div>
          <div className="card-premium text-center">
            <p className="text-gray-400 mb-2">Heure d&apos;attente</p>
            <p className="text-3xl font-bold text-gold-400">
              {TARIFS_PREFECTURE_67.heureAttente.toFixed(2)} &euro;
            </p>
          </div>
        </div>

        {/* Tarifs au km */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
            Tarifs au kilomètre
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarif Jour */}
            <div className="card-premium">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Tarif Jour</h3>
                  <p className="text-gray-400 text-sm">7h - 19h (lun-sam)</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Tarif A</p>
                    <p className="text-gray-500 text-sm">Retour en charge</p>
                  </div>
                  <p className="text-gold-400 font-bold text-xl">
                    {TARIFS_PREFECTURE_67.tarifA.prixKm.toFixed(2)} &euro;/km
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Tarif C</p>
                    <p className="text-gray-500 text-sm">Retour à vide</p>
                  </div>
                  <p className="text-gold-400 font-bold text-xl">
                    {TARIFS_PREFECTURE_67.tarifC.prixKm.toFixed(2)} &euro;/km
                  </p>
                </div>
              </div>
            </div>

            {/* Tarif Nuit */}
            <div className="card-premium">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Tarif Nuit</h3>
                  <p className="text-gray-400 text-sm">19h - 7h, dim, fériés</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Tarif B</p>
                    <p className="text-gray-500 text-sm">Retour en charge</p>
                  </div>
                  <p className="text-gold-400 font-bold text-xl">
                    {TARIFS_PREFECTURE_67.tarifB.prixKm.toFixed(2)} &euro;/km
                  </p>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Tarif D</p>
                    <p className="text-gray-500 text-sm">Retour à vide</p>
                  </div>
                  <p className="text-gold-400 font-bold text-xl">
                    {TARIFS_PREFECTURE_67.tarifD.prixKm.toFixed(2)} &euro;/km
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suppléments */}
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
            Suppléments
          </h2>

          <div className="card-premium">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border-b border-gold-400/10">
                <div>
                  <p className="text-white font-medium">Passager supplémentaire</p>
                  <p className="text-gray-500 text-sm">
                    À partir de la 5ème personne
                  </p>
                </div>
                <p className="text-gold-400 font-bold">
                  {TARIFS_PREFECTURE_67.supplements.passagerSupplementaire.prix.toFixed(2)} &euro;
                </p>
              </div>
              <div className="flex justify-between items-center p-3 border-b border-gold-400/10">
                <div>
                  <p className="text-white font-medium">Bagage volumineux</p>
                  <p className="text-gray-500 text-sm">Par bagage</p>
                </div>
                <p className="text-gold-400 font-bold">
                  {TARIFS_PREFECTURE_67.supplements.bagage.prix.toFixed(2)} &euro;
                </p>
              </div>
              <div className="flex justify-between items-center p-3">
                <div>
                  <p className="text-white font-medium">Animal</p>
                  <p className="text-gray-500 text-sm">Par animal encombrant</p>
                </div>
                <p className="text-gold-400 font-bold">
                  {TARIFS_PREFECTURE_67.supplements.animal.prix.toFixed(2)} &euro;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="card-premium bg-gold-400/5 border-gold-400/30">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">Information</h3>
              <p className="text-gray-400 text-sm">
                Ces tarifs sont fixés par arrêté préfectoral du Bas-Rhin et sont
                affichés dans le véhicule. Le prix de la course est calculé au
                compteur. Pour les transports médicaux conventionnés (VSL), la
                facturation est faite directement à la CPAM.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/reservation"
            className="btn-gold inline-flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Estimer ma course
          </Link>
        </div>
      </div>
    </div>
  );
}
