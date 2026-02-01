"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Stethoscope,
  Plane,
  Train,
  Package,
  Building2,
  Baby,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Transport Médical VSL",
    description:
      "Taxi conventionné CPAM pour vos rendez-vous médicaux. Prise en charge sur prescription.",
    href: "/services/transport-medical",
    badge: "Conventionné",
    image: "/images/service-medical.jpg",
    imageAlt: "Transport médical conventionné CPAM",
  },
  {
    icon: Plane,
    title: "Transfert Aéroport",
    description:
      "Strasbourg-Entzheim, Bâle-Mulhouse, Francfort. Ponctualité garantie.",
    href: "/services/transfert-aeroport",
    image: "/images/service-aeroport.jpg",
    imageAlt: "Avion sur piste aéroport",
  },
  {
    icon: Train,
    title: "Transfert Gare",
    description:
      "Gare de Strasbourg et toutes gares de la région. Service rapide et confortable.",
    href: "/services/transfert-gare",
    image: "/images/service-gare.jpg",
    imageAlt: "Train SNCF en gare",
  },
  {
    icon: Package,
    title: "Transport de Colis",
    description:
      "Livraison express de plis et colis urgents. Documents importants et marchandises.",
    href: "/services/transport-colis",
    image: "/images/service-colis.jpg",
    imageAlt: "Livraison colis express taxi",
  },
  {
    icon: Building2,
    title: "Service Entreprise",
    description:
      "Compte professionnel, facturation mensuelle, tarifs négociés pour les entreprises.",
    href: "/services/entreprise",
    image: "/images/hero-bg.jpg",
    imageAlt: "Service taxi entreprise Strasbourg",
  },
  {
    icon: Baby,
    title: "Transport Enfants",
    description:
      "Transport sécurisé d'enfants non accompagnés. École, activités, garde alternée.",
    href: "/services/transport-enfants",
    image: "/images/service-enfants.jpg",
    imageAlt: "Enfant souriant transport sécurisé",
  },
];

export function ServicesSection() {
  return (
    <section className="section-premium bg-black">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge-gold mb-4 inline-block"
          >
            Nos Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Un Service <span className="section-title-gold">Sur-Mesure</span> Pour Chaque Besoin
          </motion.h2>
          <div className="divider-gold" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Du transport médical aux transferts aéroport, nous proposons une
            gamme complète de services de taxi premium.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service.href} className="block h-full">
                <div className="group relative overflow-hidden rounded-xl border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300 h-full bg-black-50">
                  {/* Image */}
                  {service.image ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                      {/* Badge on image */}
                      {service.badge && (
                        <span className="badge-gold text-xs absolute top-3 right-3 z-10">
                          {service.badge}
                        </span>
                      )}

                      {/* Icon overlay on image */}
                      <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-black/80 border border-gold-400/30 flex items-center justify-center backdrop-blur-sm">
                        <service.icon className="w-6 h-6 text-gold-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-44 bg-gradient-to-br from-gold-400/10 to-black-50 flex items-center justify-center">
                      {/* Badge */}
                      {service.badge && (
                        <span className="badge-gold text-xs absolute top-3 right-3">
                          {service.badge}
                        </span>
                      )}
                      {/* Icon centered */}
                      <div className="w-16 h-16 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-gold-400" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-gold-400 text-sm font-medium">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-gold-outline inline-flex items-center gap-2">
            Voir tous nos services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
