// Tarifs officiels - Préfecture du Bas-Rhin (67)
// Source: Arrêté préfectoral des tarifs de taxi

export const TARIFS_PREFECTURE_67 = {
  // Frais fixes
  priseEnCharge: 3.02,          // EUR - Prise en charge
  heureAttente: 37.41,          // EUR - Heure d'attente
  minimumCourse: 8.00,          // EUR - Tarif minimum, suppléments inclus

  // Tarifs au kilomètre
  tarifA: {
    nom: "Tarif A",
    description: "Course de jour avec retour en charge à la station",
    prixKm: 1.00,
    periode: "jour" as const,
    retour: "charge" as const,
  },
  tarifB: {
    nom: "Tarif B",
    description: "Course de nuit avec retour en charge à la station",
    prixKm: 1.42,
    periode: "nuit" as const,
    retour: "charge" as const,
  },
  tarifC: {
    nom: "Tarif C",
    description: "Course de jour avec retour à vide à la station",
    prixKm: 2.00,
    periode: "jour" as const,
    retour: "vide" as const,
  },
  tarifD: {
    nom: "Tarif D",
    description: "Course de nuit avec retour à vide à la station",
    prixKm: 2.84,
    periode: "nuit" as const,
    retour: "vide" as const,
  },

  // Suppléments
  supplements: {
    passagerSupplementaire: {
      description: "Par personne adulte à partir de la 5ème personne",
      prix: 4.00,
      aPartirDe: 5,
    },
    bagage: {
      description: "Bagages ne pouvant être transportés sur les genoux (hors appareillages handicapés)",
      prix: 2.00,
      unite: "par unité",
    },
    animal: {
      description: "Animaux encombrants non protégés",
      prix: 2.00,
      unite: "par animal",
    },
  },

  // Horaires jour/nuit
  horaires: {
    jour: { debut: 7, fin: 19 },
    nuit: { debut: 19, fin: 7 },
    tarifNuitSpecial: [
      "Dimanches",
      "Jours fériés",
      "Routes enneigées ou verglacées avec équipements spéciaux",
    ],
  },
};

// Jours fériés français (incluant le 26 décembre en Alsace)
export const JOURS_FERIES_2024 = [
  "2024-01-01", // Jour de l'An
  "2024-04-01", // Lundi de Pâques
  "2024-05-01", // Fête du Travail
  "2024-05-08", // Victoire 1945
  "2024-05-09", // Ascension
  "2024-05-20", // Lundi de Pentecôte
  "2024-07-14", // Fête Nationale
  "2024-08-15", // Assomption
  "2024-11-01", // Toussaint
  "2024-11-11", // Armistice
  "2024-12-25", // Noël
  "2024-12-26", // Saint-Étienne (Alsace)
];

export const JOURS_FERIES_2025 = [
  "2025-01-01", // Jour de l'An
  "2025-04-21", // Lundi de Pâques
  "2025-05-01", // Fête du Travail
  "2025-05-08", // Victoire 1945
  "2025-05-29", // Ascension
  "2025-06-09", // Lundi de Pentecôte
  "2025-07-14", // Fête Nationale
  "2025-08-15", // Assomption
  "2025-11-01", // Toussaint
  "2025-11-11", // Armistice
  "2025-12-25", // Noël
  "2025-12-26", // Saint-Étienne (Alsace)
];

export const JOURS_FERIES_2026 = [
  "2026-01-01", // Jour de l'An
  "2026-04-06", // Lundi de Pâques
  "2026-05-01", // Fête du Travail
  "2026-05-08", // Victoire 1945
  "2026-05-14", // Ascension
  "2026-05-25", // Lundi de Pentecôte
  "2026-07-14", // Fête Nationale
  "2026-08-15", // Assomption
  "2026-11-01", // Toussaint
  "2026-11-11", // Armistice
  "2026-12-25", // Noël
  "2026-12-26", // Saint-Étienne (Alsace)
];

export const TOUS_JOURS_FERIES = [
  ...JOURS_FERIES_2024,
  ...JOURS_FERIES_2025,
  ...JOURS_FERIES_2026,
];

// Types pour le calcul
export type TarifType = "A" | "B" | "C" | "D";
export type PeriodeType = "jour" | "nuit";
export type RetourType = "charge" | "vide";

export interface CalculPrixParams {
  distanceKm: number;
  dateHeure: Date;
  passagers: number;
  bagages: number;
  animaux: number;
  retourVide?: boolean;
}

export interface ResultatCalcul {
  tarifApplique: TarifType;
  priseEnCharge: number;
  prixKm: number;
  distanceKm: number;
  montantDistance: number;
  supplements: {
    passagers: number;
    bagages: number;
    animaux: number;
    total: number;
  };
  sousTotal: number;
  total: number;
  estMinimum: boolean;
  details: string[];
}
