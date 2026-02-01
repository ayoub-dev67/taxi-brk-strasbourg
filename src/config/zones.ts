// Configuration des zones/quartiers desservis

export interface Zone {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  metaDescription: string;
  distances: {
    centreville: { km: number; duration: string };
    gare: { km: number; duration: string };
    aeroport: { km: number; duration: string };
  };
  highlights: string[];
  neighborhoods?: string[];
}

export const zones: Zone[] = [
  {
    slug: "strasbourg-centre",
    name: "Strasbourg Centre",
    fullName: "Strasbourg Centre-Ville",
    description: "Votre taxi au cœur de Strasbourg, disponible 24h/24. Prise en charge rapide dans tout le centre historique, la Grande Île et les quais.",
    metaDescription: "Taxi Strasbourg Centre-Ville. Réservation 24h/24, prise en charge immédiate. Cathédrale, Petite France, Gare. Tarifs officiels. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 0, duration: "Sur place" },
      gare: { km: 1, duration: "5 min" },
      aeroport: { km: 12, duration: "15 min" },
    },
    highlights: [
      "Prise en charge devant la Cathédrale",
      "Accès Petite France et Grande Île",
      "Proximité immédiate de la gare",
      "Transferts hôtels du centre",
    ],
    neighborhoods: ["Petite France", "Grande Île", "Krutenau", "Gare", "République"],
  },
  {
    slug: "strasbourg-neudorf",
    name: "Neudorf",
    fullName: "Strasbourg Neudorf",
    description: "Service de taxi à Neudorf, le plus grand quartier de Strasbourg. Desserte rapide vers le centre-ville, la gare et l'aéroport.",
    metaDescription: "Taxi Neudorf Strasbourg. Réservation 24h/24, quartier résidentiel et commercial. Transport médical, courses quotidiennes. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 3, duration: "10 min" },
      gare: { km: 4, duration: "12 min" },
      aeroport: { km: 10, duration: "15 min" },
    },
    highlights: [
      "Desserte du Neuhof et Port du Rhin",
      "Accès rapide au centre commercial",
      "Transport médical vers les cliniques",
      "Proche du campus universitaire",
    ],
    neighborhoods: ["Neudorf Nord", "Neudorf Sud", "Musau", "Port du Rhin"],
  },
  {
    slug: "strasbourg-robertsau",
    name: "Robertsau",
    fullName: "Strasbourg Robertsau",
    description: "Taxi à la Robertsau, quartier résidentiel proche des institutions européennes. Service premium pour le Parlement et le Conseil de l'Europe.",
    metaDescription: "Taxi Robertsau Strasbourg. Quartier européen, Parlement, Conseil de l'Europe. Service premium 24h/24. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 5, duration: "15 min" },
      gare: { km: 6, duration: "18 min" },
      aeroport: { km: 17, duration: "25 min" },
    },
    highlights: [
      "Transferts Parlement Européen",
      "Desserte Conseil de l'Europe",
      "Quartier résidentiel calme",
      "Accès parc de la Robertsau",
    ],
    neighborhoods: ["Robertsau village", "Wacken", "Quartier Européen"],
  },
  {
    slug: "strasbourg-cronenbourg",
    name: "Cronenbourg",
    fullName: "Strasbourg Cronenbourg",
    description: "Service de taxi à Cronenbourg, quartier historique de Strasbourg. Prise en charge rapide vers le centre-ville et toutes destinations.",
    metaDescription: "Taxi Cronenbourg Strasbourg. Réservation 24h/24, tarifs préfecture. Transport médical, courses quotidiennes. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 4, duration: "12 min" },
      gare: { km: 5, duration: "15 min" },
      aeroport: { km: 15, duration: "20 min" },
    },
    highlights: [
      "Quartier historique brassicole",
      "Accès A35 et A4 facilité",
      "Proche zone commerciale",
      "Transport médical Hautepierre",
    ],
    neighborhoods: ["Cronenbourg bas", "Cronenbourg cité"],
  },
  {
    slug: "strasbourg-hautepierre",
    name: "Hautepierre",
    fullName: "Strasbourg Hautepierre",
    description: "Taxi à Hautepierre, proche du CHU et du centre commercial. Service spécialisé transport médical vers l'hôpital de Hautepierre.",
    metaDescription: "Taxi Hautepierre Strasbourg. CHU Hautepierre, transport médical conventionné CPAM. Réservation 24h/24. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 5, duration: "15 min" },
      gare: { km: 6, duration: "18 min" },
      aeroport: { km: 18, duration: "25 min" },
    },
    highlights: [
      "Transport médical CHU Hautepierre",
      "Conventionné CPAM",
      "Centre commercial Hautepierre",
      "Accès autoroute A351",
    ],
    neighborhoods: ["Hautepierre", "Poteries", "Hohberg"],
  },
  {
    slug: "illkirch",
    name: "Illkirch-Graffenstaden",
    fullName: "Illkirch-Graffenstaden",
    description: "Votre taxi à Illkirch-Graffenstaden, commune au sud de Strasbourg. Desserte du campus universitaire et des zones d'activités.",
    metaDescription: "Taxi Illkirch-Graffenstaden. Campus universitaire, Pôle API, zone commerciale. Réservation 24h/24. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 7, duration: "15 min" },
      gare: { km: 8, duration: "18 min" },
      aeroport: { km: 8, duration: "12 min" },
    },
    highlights: [
      "Campus universitaire d'Illkirch",
      "Pôle API et entreprises",
      "Proche aéroport Entzheim",
      "Accès A35 direct",
    ],
    neighborhoods: ["Illkirch centre", "Graffenstaden", "Lixenbuhl"],
  },
  {
    slug: "schiltigheim",
    name: "Schiltigheim",
    fullName: "Schiltigheim",
    description: "Service de taxi à Schiltigheim, la « Cité des Brasseurs ». Prise en charge rapide vers Strasbourg centre et toutes destinations.",
    metaDescription: "Taxi Schiltigheim. Réservation 24h/24, proche Strasbourg centre. Transport médical, transferts aéroport. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 3, duration: "10 min" },
      gare: { km: 4, duration: "12 min" },
      aeroport: { km: 15, duration: "20 min" },
    },
    highlights: [
      "Cité des Brasseurs",
      "Proche centre de Strasbourg",
      "Accès A35 et A4",
      "Marché et commerces",
    ],
    neighborhoods: ["Centre-ville", "Marais", "Liberté"],
  },
  {
    slug: "lingolsheim",
    name: "Lingolsheim",
    fullName: "Lingolsheim",
    description: "Taxi à Lingolsheim, commune résidentielle proche de Strasbourg. Service rapide vers le centre-ville, la gare et l'aéroport.",
    metaDescription: "Taxi Lingolsheim. Réservation 24h/24, commune résidentielle. Transport vers Strasbourg, gare, aéroport. ☎ 07 44 22 09 60",
    distances: {
      centreville: { km: 6, duration: "12 min" },
      gare: { km: 7, duration: "15 min" },
      aeroport: { km: 10, duration: "15 min" },
    },
    highlights: [
      "Commune résidentielle calme",
      "Proche Ostwald et Illkirch",
      "Accès A35 rapide",
      "Transport scolaire disponible",
    ],
    neighborhoods: ["Centre", "Tiergaertel", "Alouettes"],
  },
];

export function getZoneBySlug(slug: string): Zone | undefined {
  return zones.find((zone) => zone.slug === slug);
}
