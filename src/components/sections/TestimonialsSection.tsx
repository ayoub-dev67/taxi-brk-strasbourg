"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    rating: 5,
    comment:
      "Excellent service pour mes rendez-vous médicaux. Le chauffeur est toujours ponctuel, courtois et prend soin de m'aider. Je recommande vivement !",
    service: "Transport médical",
  },
  {
    id: 2,
    name: "Pierre D.",
    rating: 5,
    comment:
      "Transfert aéroport impeccable. Véhicule propre et confortable, chauffeur professionnel. Arrivé à l'heure malgré la circulation.",
    service: "Transfert aéroport",
  },
  {
    id: 3,
    name: "Sophie M.",
    rating: 5,
    comment:
      "Je fais appel à TAXI BRK pour le transport de ma fille à l'école. Service fiable et sécurisé. Très rassurée en tant que parent.",
    service: "Transport enfants",
  },
  {
    id: 4,
    name: "Jean-Paul R.",
    rating: 5,
    comment:
      "Notre entreprise utilise régulièrement ce service. Facturation claire, chauffeurs professionnels, véhicules toujours impeccables. Partenaire de confiance.",
    service: "Service entreprise",
  },
  {
    id: 5,
    name: "Catherine B.",
    rating: 5,
    comment:
      "Accompagnement de qualité pour mes séances de dialyse. Le chauffeur connaît mes besoins et est toujours aux petits soins. Merci !",
    service: "Transport médical",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="section-premium bg-black overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-gold mb-4 inline-block"
          >
            Témoignages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Ce que disent{" "}
            <span className="section-title-gold">nos clients</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-4 left-4 md:left-0">
            <Quote className="w-12 h-12 text-gold-400/20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="card-premium text-center py-8 md:py-12 px-6 md:px-12"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gold-400 fill-gold-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
                &ldquo;{testimonials[currentIndex].comment}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="text-gold-400 font-semibold">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonials[currentIndex].service}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 hover:bg-gold-400/10 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gold-400"
                      : "bg-gold-400/30 hover:bg-gold-400/50"
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 hover:bg-gold-400/10 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
