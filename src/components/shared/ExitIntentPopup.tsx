"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

const SESSION_KEY = "taxi-brk-exit-popup-shown";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Détecter si la souris sort par le haut de la page
    if (e.clientY <= 0) {
      const wasShown = sessionStorage.getItem(SESSION_KEY);
      if (!wasShown) {
        setIsVisible(true);
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-gradient-to-br from-black-50 to-black border border-gold-400/40 rounded-2xl p-6 sm:p-8 max-w-md w-full animate-[scaleIn_0.3s_ease-out] shadow-gold-intense">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
            <span className="text-3xl">🚖</span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white mb-2">
            Vous partez déjà ?
          </h2>

          <p className="text-gray-400 mb-6">
            Obtenez{" "}
            <span className="text-gold-400 font-semibold">
              10% de réduction
            </span>{" "}
            sur votre première course en nous appelant maintenant !
          </p>

          {/* CTA Principal */}
          <a
            href={`tel:${siteConfig.contact.phoneLink}`}
            className="btn-gold w-full flex items-center justify-center gap-2 mb-3"
            onClick={handleClose}
          >
            <Phone className="w-5 h-5" />
            Appeler le {siteConfig.contact.phone}
          </a>

          {/* CTA Secondaire */}
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
          >
            Non merci, je continue ma visite
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </div>
    </div>
  );
}
