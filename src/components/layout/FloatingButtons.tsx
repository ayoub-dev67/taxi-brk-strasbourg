"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useAnalytics } from "@/hooks/useAnalytics";

export function FloatingButtons() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const { trackPhoneClick, trackWhatsAppClick } = useAnalytics();

  // Afficher la bulle après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!bubbleDismissed) {
        setShowBubble(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [bubbleDismissed]);

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setBubbleDismissed(true);
  };

  const whatsappMessage = encodeURIComponent(
    "Bonjour, je souhaite réserver un taxi pour..."
  );

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 lg:bottom-6">
      {/* WhatsApp Button with Bubble */}
      <div className="relative">
        {/* Chat Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="relative bg-white text-black px-4 py-2 rounded-lg shadow-lg">
                <button
                  type="button"
                  onClick={handleDismissBubble}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                <p className="text-sm font-medium">Besoin d&apos;aide ? 💬</p>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          aria-label="Contacter via WhatsApp"
          onClick={() => {
            setShowBubble(false);
            trackWhatsAppClick("floating_button");
          }}
        >
          <MessageCircle className="w-7 h-7 text-white" />

          {/* Pulse ring */}
          {showBubble && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-40" />
          )}
        </motion.a>
      </div>

      {/* Call Button */}
      <motion.a
        href={`tel:${siteConfig.contact.phoneLink}`}
        className="relative w-14 h-14 bg-gold-400 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        aria-label="Appeler maintenant"
        onClick={() => trackPhoneClick("floating_button")}
      >
        <Phone className="w-7 h-7 text-black" />
        {/* Animated ring */}
        <span className="absolute inset-0 rounded-full animate-pulse-gold" />
      </motion.a>
    </div>
  );
}
