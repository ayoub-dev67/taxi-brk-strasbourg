"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Ne montrer le loader qu'au premier chargement
    const hasLoaded = sessionStorage.getItem("taxi_brk_loaded");

    if (!hasLoaded) {
      setShouldShow(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("taxi_brk_loaded", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              scale: { type: "spring", damping: 15 }
            }}
            className="text-center"
          >
            {/* Logo animé */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="TAXI BRK - Taxi conventionné Strasbourg"
                  width={200}
                  height={80}
                  priority
                  className="h-20 w-auto"
                />
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gold-400/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Ligne dorée animée */}
            <motion.div
              className="mt-8 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />

            {/* Texte de chargement */}
            <motion.p
              className="mt-4 text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Strasbourg
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
