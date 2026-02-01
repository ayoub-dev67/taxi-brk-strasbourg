"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CreditCard, Award, Car, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Conventionné CPAM",
    description:
      "Taxi agréé par la Sécurité Sociale. Prise en charge de vos frais de transport médical sur prescription.",
  },
  {
    icon: Clock,
    title: "Disponible 24h/24",
    description:
      "Service de taxi disponible jour et nuit, 7 jours sur 7, y compris les jours fériés.",
  },
  {
    icon: CreditCard,
    title: "Tarifs Officiels",
    description:
      "Tarifs réglementés par la Préfecture du Bas-Rhin. Transparence totale sur les prix.",
  },
  {
    icon: Award,
    title: "Chauffeur Expérimenté",
    description:
      "Chauffeur professionnel, courtois et ponctuel. Connaissance parfaite de Strasbourg et sa région.",
  },
  {
    icon: Car,
    title: "Véhicule Confortable",
    description:
      "Véhicule récent, climatisé et parfaitement entretenu pour votre confort et sécurité.",
  },
  {
    icon: HeartHandshake,
    title: "Service Personnalisé",
    description:
      "Attention particulière aux personnes à mobilité réduite et aux besoins spécifiques.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-premium bg-black-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-gold mb-4 inline-block"
          >
            Pourquoi Nous Choisir
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Pourquoi <span className="section-title-gold">2500+ Strasbourgeois</span> Nous Font Confiance
          </motion.h2>
          <div className="divider-gold" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-gold-400" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
