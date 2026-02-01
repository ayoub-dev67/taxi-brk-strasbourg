"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, MapPin, Calendar, Users, Phone, MessageCircle, Home } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { ReservationData } from "@/types";

interface Step6ConfirmProps {
  data: Partial<ReservationData>;
}

export function Step6Confirm({ data }: Step6ConfirmProps) {
  return (
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
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
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <p className="text-gray-400">
          Une question ? Contactez-nous directement :
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
            className="btn-gold inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
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
