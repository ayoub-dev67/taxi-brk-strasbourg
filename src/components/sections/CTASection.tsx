"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CTASection() {
  return (
    <section className="section-premium bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-6"
          >
            Prêt à{" "}
            <span className="text-gold-gradient">réserver</span> votre taxi ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Contactez-nous dès maintenant pour réserver votre course ou obtenir
            un devis. Disponible 24h/24, 7j/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/reservation"
              className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Réserver en ligne
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`tel:${siteConfig.contact.phoneLink}`}
              className="btn-gold-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              <Phone className="w-5 h-5" />
              Appeler maintenant
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour, je souhaite réserver un taxi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ou contactez-nous via WhatsApp</span>
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-sm text-gray-500"
          >
            Taxi conventionné CPAM • Tarifs préfectoraux • Véhicule confortable
          </motion.p>
        </div>
      </div>
    </section>
  );
}
