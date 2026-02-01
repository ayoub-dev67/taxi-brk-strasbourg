"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  city: string;
  rating: number;
  date: string;
  type: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie L.",
    initials: "ML",
    city: "Strasbourg",
    rating: 5,
    date: "il y a 2 semaines",
    type: "Transport médical",
    text: "Depuis 2 ans, c'est TAXI BRK qui m'accompagne à mes séances de dialyse. Toujours ponctuel, toujours souriant. Je recommande à 100%.",
  },
  {
    id: 2,
    name: "Pierre D.",
    initials: "PD",
    city: "Illkirch",
    rating: 5,
    date: "il y a 3 semaines",
    type: "Transfert aéroport",
    text: "Vol à 6h du matin, le chauffeur était là à 4h30 comme prévu. Véhicule propre et confortable. Parfait !",
  },
  {
    id: 3,
    name: "Sophie M.",
    initials: "SM",
    city: "Directrice RH",
    rating: 5,
    date: "il y a 1 mois",
    type: "Service entreprise",
    text: "Nous utilisons TAXI BRK pour tous nos déplacements professionnels. Facturation claire, chauffeurs impeccables.",
  },
  {
    id: 4,
    name: "Jean-Marc T.",
    initials: "JT",
    city: "Schiltigheim",
    rating: 5,
    date: "il y a 1 mois",
    type: "Course standard",
    text: "Rapide, efficace, tarif conforme à l'estimation. Que demander de plus ?",
  },
  {
    id: 5,
    name: "Françoise B.",
    initials: "FB",
    city: "Cronenbourg",
    rating: 5,
    date: "il y a 2 mois",
    type: "Transport médical",
    text: "Merci pour votre patience et votre aide avec mon fauteuil roulant. Un service vraiment humain.",
  },
  {
    id: 6,
    name: "Thomas R.",
    initials: "TR",
    city: "Neudorf",
    rating: 5,
    date: "il y a 2 mois",
    type: "Colis express",
    text: "Document urgent livré en 30 minutes à l'autre bout de la ville. Sauvé !",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-gold-400 fill-gold-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card-premium h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar with initials */}
        <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
          <span className="text-gold-400 font-semibold text-sm">
            {testimonial.initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-medium truncate">
              {testimonial.name}
            </h4>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm truncate">
              {testimonial.city}
            </span>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      {/* Type badge */}
      <div className="mb-3">
        <span className="inline-block px-2 py-0.5 bg-gold-400/10 text-gold-400 text-xs rounded-full">
          {testimonial.type}
        </span>
      </div>

      {/* Quote */}
      <div className="flex-1 relative">
        <Quote className="absolute -top-1 -left-1 w-6 h-6 text-gold-400/20" />
        <p className="text-gray-300 text-sm pl-4 leading-relaxed">
          {testimonial.text}
        </p>
      </div>

      {/* Date */}
      <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-gray-800">
        {testimonial.date}
      </p>
    </div>
  );
}

// Swipe threshold in pixels
const SWIPE_THRESHOLD = 50;

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        nextSlide();
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        prevSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  // Auto-play on mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isMobile, nextSlide]);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-gold mb-4 inline-flex items-center gap-2">
            <Star className="w-4 h-4 fill-gold-400" />
            Avis Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Ce que disent nos{" "}
            <span className="text-gold-gradient">clients</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Des centaines de clients satisfaits nous font confiance pour leurs
            déplacements quotidiens.
          </p>
          <div className="divider-gold" />
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative" ref={containerRef}>
          <div className="relative h-80">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x, opacity }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-black-100 border border-gold-400/30 flex items-center justify-center text-gold-400 hover:bg-gold-400/10 transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-black-100 border border-gold-400/30 flex items-center justify-center text-gold-400 hover:bg-gold-400/10 transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-gold-400"
                    : "bg-gold-400/30 hover:bg-gold-400/50"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <p className="text-center text-gray-500 text-xs mt-4">
            Swipez pour voir plus
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-gold-400 fill-gold-400"
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm">Note moyenne 4.9/5</p>
          </div>
          <div className="w-px bg-gray-800 hidden sm:block" />
          <div>
            <p className="text-2xl font-bold text-white">2500+</p>
            <p className="text-gray-400 text-sm">Clients transportés</p>
          </div>
          <div className="w-px bg-gray-800 hidden sm:block" />
          <div>
            <p className="text-2xl font-bold text-gold-400">98%</p>
            <p className="text-gray-400 text-sm">Clients satisfaits</p>
          </div>
        </div>
      </div>
    </section>
  );
}
