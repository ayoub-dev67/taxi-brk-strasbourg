"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, MapPin, Calendar, Users, Phone, MessageCircle, Home, Send } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { ReservationData } from "@/types";

interface Step6ConfirmProps {
  data: Partial<ReservationData>;
}

export function Step6Confirm({ data }: Step6ConfirmProps) {
  // Formater la date pour le message WhatsApp
  const dateFormatted = data.date
    ? format(data.date, "EEEE d MMMM yyyy", { locale: fr })
    : "Non spécifiée";

  // Construire le message WhatsApp pré-rempli
  const messageWhatsApp = `🚖 NOUVELLE RÉSERVATION TAXI BRK

📅 Date : ${dateFormatted} à ${data.heure || "Non spécifiée"}
📍 Départ : ${data.depart?.adresse || "Non spécifié"}
📍 Arrivée : ${data.arrivee?.adresse || "Non spécifié"}
${data.distance ? `📏 Distance : ${data.distance} km` : ""}
${data.prixEstime ? `💰 Prix estimé : ${data.prixEstime.toFixed(2)}€` : ""}
🔄 Type : ${data.typeTrajet === "aller-retour" ? "Aller-retour" : "Aller simple"}

👤 Client : ${data.client?.prenom || ""} ${data.client?.nom || ""}
📞 Tél : ${data.client?.telephone || "Non spécifié"}
📧 Email : ${data.client?.email || "Non spécifié"}

📝 Passagers : ${data.passagers || 1}
🧳 Bagages : ${data.bagages || 0}
${data.animaux ? `🐕 Animaux : ${data.animaux}` : ""}
${data.options?.siegeBebe ? "👶 Siège bébé demandé" : ""}
${data.options?.fauteuilRoulant ? "♿ Fauteuil roulant" : ""}
${data.client?.commentaire ? `\n💬 Commentaire : ${data.client.commentaire}` : ""}

Réservation via taxi-brk-strasbourg.vercel.app`.trim();

  const numeroTaxi = "33768149461";
  const lienWhatsApp = `https://wa.me/${numeroTaxi}?text=${encodeURIComponent(messageWhatsApp)}`;

  return (
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>

      {/* Message */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Parfait ! Votre taxi est <span className="text-gold-gradient">réservé</span>
        </h2>
        <p className="text-gray-400">
          Votre demande de réservation a été transmise avec succès.
          <br />
          <span className="text-gold-400 font-medium">Nous vous appelons dans les 5 minutes</span> pour confirmer votre course.
        </p>
      </div>

      {/* Bouton WhatsApp principal */}
      <div className="space-y-3">
        <p className="text-gray-300 text-sm">
          📱 Envoyez votre réservation directement au chauffeur via WhatsApp
        </p>
        <a
          href={lienWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send className="w-6 h-6" />
          Envoyer la réservation sur WhatsApp
        </a>
        <p className="text-gray-500 text-xs">
          Cela ouvrira WhatsApp avec un message pré-rempli
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="card-premium text-left space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          Récapitulatif de votre réservation
        </h3>

        {/* Trajet */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
          <div>
            <p className="text-gray-400 text-sm">Trajet</p>
            <p className="text-white">{data.depart?.adresse}</p>
            <p className="text-gold-400">→</p>
            <p className="text-white">{data.arrivee?.adresse}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-gray-400 text-sm">Date et heure</p>
            <p className="text-white">
              {data.date && format(data.date, "EEEE d MMMM yyyy", { locale: fr })} à {data.heure}
            </p>
          </div>
        </div>

        {/* Passagers */}
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gold-400" />
          <div>
            <p className="text-gray-400 text-sm">Passagers</p>
            <p className="text-white">{data.passagers} personne(s)</p>
          </div>
        </div>

        {/* Prix estimé */}
        {data.prixEstime && (
          <div className="pt-3 mt-3 border-t border-gold-400/20">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Prix estimé</span>
              <span className="text-gold-400 text-xl font-bold">≈ {data.prixEstime.toFixed(2)}€</span>
            </div>
          </div>
        )}
      </div>

      {/* Contact alternatif */}
      <div className="space-y-3">
        <p className="text-gray-400 text-sm">
          Vous préférez appeler ?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${siteConfig.contact.phoneLink}`}
            className="btn-gold-outline inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp simple
          </a>
        </div>
      </div>

      {/* Retour accueil */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
      >
        <Home className="w-5 h-5" />
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
