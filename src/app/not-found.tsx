import Link from "next/link";
import { Home, Phone, ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[150px] sm:text-[200px] font-heading font-bold text-gold-400/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-gold-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Pas de panique, nous pouvons vous aider !
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="btn-gold inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/reservation"
            className="btn-gold-outline inline-flex items-center justify-center gap-2"
          >
            Réserver un taxi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Phone CTA */}
        <div className="card-premium inline-block">
          <p className="text-gray-400 text-sm mb-3">
            Besoin d&apos;aide ? Appelez-nous
          </p>
          <a
            href={`tel:${siteConfig.contact.phoneLink}`}
            className="flex items-center justify-center gap-3 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold">{siteConfig.contact.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
