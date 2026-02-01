"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment réserver un taxi ?",
    answer:
      "Réserver votre taxi n'a jamais été aussi simple ! Vous avez trois options : appelez-nous directement au 07 68 14 94 61 pour une réponse immédiate, envoyez-nous un message WhatsApp si vous préférez l'écrit, ou utilisez notre formulaire de réservation en ligne disponible 24h/24. Nous confirmons chaque réservation par SMS pour votre tranquillité d'esprit. Pour les transferts aéroport ou rendez-vous médicaux importants, nous vous conseillons de réserver au moins 24h à l'avance pour garantir votre créneau. Réservez maintenant en quelques clics !",
  },
  {
    question: "Êtes-vous conventionné par la CPAM ?",
    answer:
      "Absolument ! TAXI BRK est officiellement conventionné par la Sécurité Sociale depuis plusieurs années. Cela signifie que vos transports médicaux peuvent être pris en charge à 100% sur présentation d'une prescription médicale de transport (bon de transport). Nous nous occupons de TOUTES les démarches administratives avec votre CPAM : vous n'avez rien à avancer ni aucun papier à remplir. Des milliers de patients strasbourgeois nous font confiance chaque année pour leurs soins. Appelez-nous au 07 68 14 94 61 pour organiser votre prochain transport médical !",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Nos tarifs sont strictement réglementés par la Préfecture du Bas-Rhin, ce qui vous garantit des prix justes et transparents. La prise en charge est de 3,02€, puis le tarif au kilomètre varie de 1,00€ à 2,84€ selon l'horaire (jour/nuit) et le type de trajet. Vous connaissez le prix AVANT de réserver grâce à notre simulateur de prix en ligne - aucune mauvaise surprise à l'arrivée ! Nous acceptons tous les moyens de paiement : CB, espèces, et même Apple Pay. Testez notre simulateur de prix gratuit pour obtenir votre estimation instantanée !",
  },
  {
    question: "Proposez-vous des transferts aéroport ?",
    answer:
      "Oui, les transferts aéroport sont notre spécialité ! Nous desservons Strasbourg-Entzheim (20 min), Bâle-Mulhouse (1h15) et même Francfort (2h). Ce qui nous différencie : nous suivons votre vol en temps réel. Si votre avion a du retard, nous adaptons notre arrivée automatiquement - pas de stress, pas de supplément. Nous vous attendons en zone d'arrivée avec une pancarte à votre nom. Plus de 500 voyageurs nous font confiance chaque mois pour leurs transferts. Réservez votre transfert aéroport dès maintenant pour voyager l'esprit tranquille !",
  },
  {
    question: "Pouvez-vous transporter des enfants non accompagnés ?",
    answer:
      "Bien sûr, et c'est un service que les parents adorent ! Nous transportons vos enfants en toute sécurité vers l'école, les activités extra-scolaires, chez leurs grands-parents ou dans le cadre de la garde alternée. Chaque trajet est confirmé par SMS aux parents au départ ET à l'arrivée. Nous disposons de sièges auto homologués adaptés à tous les âges (de 0 à 10 ans). Notre chauffeur est habitué aux enfants et sait les mettre en confiance. Appelez-nous au 07 68 14 94 61 pour mettre en place un transport régulier pour vos enfants !",
  },
  {
    question: "Comment fonctionne le transport médical ?",
    answer:
      "C'est très simple, on s'occupe de tout ! Il vous suffit d'avoir une prescription médicale de transport (ordonnance) établie par votre médecin. Ensuite, nous prenons en charge l'intégralité des démarches administratives avec la CPAM : vous n'avez absolument rien à payer ni aucun formulaire à remplir. Ce service couvre toutes les situations : consultations spécialisées, hospitalisations, séances de dialyse, radiothérapie, kinésithérapie, etc. Nous accompagnons certains patients depuis plus de 5 ans pour leurs soins réguliers. Contactez-nous dès maintenant au 07 68 14 94 61 pour organiser votre transport médical !",
  },
  {
    question: "Acceptez-vous les animaux ?",
    answer:
      "Oui, vos compagnons à quatre pattes sont les bienvenus à bord ! Les petits animaux en cage ou sac de transport voyagent gratuitement. Pour les animaux plus grands, un petit supplément de 2€ s'applique. Nous vous demandons simplement de nous prévenir lors de la réservation pour que nous puissions préparer le véhicule avec une protection adaptée. Notre chauffeur aime les animaux et fera tout pour que votre compagnon voyage confortablement. Réservez maintenant votre course avec votre animal de compagnie !",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer:
      "Nous acceptons TOUS les modes de paiement pour votre confort ! Carte bancaire (Visa, Mastercard, sans minimum d'achat), espèces, Apple Pay et Google Pay directement dans le véhicule. Pour les entreprises, nous proposons la facturation mensuelle avec paiement par virement. Et pour les transports médicaux conventionnés, c'est encore plus simple : vous ne payez rien, la CPAM est facturée directement. Le paiement se fait toujours à la fin de la course, jamais d'avance. Réservez en toute confiance, payez comme vous voulez !",
  },
];

export function FAQSection() {
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
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Questions <span className="section-title-gold">fréquentes</span>
          </motion.h2>
          <div className="divider-gold" />
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gold-400/20 rounded-lg bg-black-50 px-6 data-[state=open]:border-gold-400/40"
              >
                <AccordionTrigger className="text-left text-white hover:text-gold-400 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
