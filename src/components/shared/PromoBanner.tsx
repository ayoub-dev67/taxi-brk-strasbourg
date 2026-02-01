"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "taxi-brk-promo-banner-closed";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si le bandeau a déjà été fermé
    const isClosed = localStorage.getItem(STORAGE_KEY);
    if (!isClosed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-gold-400 to-gold-500 text-black">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center">
          <span className="hidden sm:inline">🚖 </span>
          Réservez maintenant et obtenez une{" "}
          <span className="font-bold">estimation gratuite instantanée</span> !
        </p>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
          aria-label="Fermer le bandeau"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
