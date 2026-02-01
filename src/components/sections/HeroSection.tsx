"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Phone, Shield, Clock, Star, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Taxi lumineux Strasbourg"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/80" />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.9) 100%)",
          }}
        />
        {/* Gold accent line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </motion.div>

      {/* Content with fade on scroll */}
      <motion.div className="relative z-10 w-full px-4 py-24 sm:px-6 lg:px-8" style={{ opacity }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 badge-gold mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>Taxi Conventionné CPAM</span>
          </motion.div>

          {/* Titre principal - Mobile first */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
          >
            Votre{" "}
            <span className="text-gold-gradient">Chauffeur Privé</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>à Strasbourg
          </motion.h1>

          {/* Sous-titre avec points clés */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            <span className="text-gold-400">Transport premium 24h/24</span>
            {" • "}
            <span className="text-white">Conventionné CPAM</span>
            {" • "}
            <span className="text-gold-400">Réponse en 5 min</span>
          </motion.p>

          {/* CTA Buttons - Stack on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/reservation"
              className="relative btn-gold w-full sm:w-auto group inline-flex items-center justify-center gap-2"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-lg animate-ping-slow bg-gold-400/30" />
              {/* Glow */}
              <motion.span
                className="absolute inset-0 rounded-lg bg-gold-400/20 blur-md"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Réserver maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href={`tel:${siteConfig.contact.phoneLink}`}
              className="btn-gold-outline w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
          </motion.div>

          {/* Trust badges - Horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            {[
              { icon: Shield, text: "Conventionné CPAM" },
              { icon: Clock, text: "Disponible 24h/24" },
              { icon: Star, text: "Service Premium" },
              { icon: CheckCircle, text: "Chauffeur expérimenté" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-gray-400"
              >
                <item.icon className="w-5 h-5 text-gold-400" />
                <span className="text-sm whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold-400/50 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-gold-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
