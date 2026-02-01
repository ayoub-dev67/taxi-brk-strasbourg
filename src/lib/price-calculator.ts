import {
  TARIFS_PREFECTURE_67,
  TOUS_JOURS_FERIES,
  type TarifType,
  type CalculPrixParams,
  type ResultatCalcul,
} from "./pricing";
import { format } from "date-fns";

// Re-export types for convenience
export type { CalculPrixParams, ResultatCalcul, TarifType } from "./pricing";

/**
 * Détermine si une date/heure correspond au tarif de nuit
 */
export function estTarifNuit(dateHeure: Date): boolean {
  const heure = dateHeure.getHours();
  const { jour, nuit } = TARIFS_PREFECTURE_67.horaires;

  // Entre 19h et 7h = nuit
  if (heure >= nuit.debut || heure < nuit.fin) {
    return true;
  }

  // Dimanche
  if (dateHeure.getDay() === 0) {
    return true;
  }

  // Jour férié
  const dateStr = format(dateHeure, "yyyy-MM-dd");
  if (TOUS_JOURS_FERIES.includes(dateStr)) {
    return true;
  }

  return false;
}

/**
 * Détermine le tarif applicable (A, B, C ou D)
 */
export function determinerTarif(
  dateHeure: Date,
  retourVide: boolean
): TarifType {
  const estNuit = estTarifNuit(dateHeure);

  if (estNuit) {
    return retourVide ? "D" : "B";
  }
  return retourVide ? "C" : "A";
}

/**
 * Obtient les infos du tarif
 */
export function getInfosTarif(tarifType: TarifType) {
  const tarifs = {
    A: TARIFS_PREFECTURE_67.tarifA,
    B: TARIFS_PREFECTURE_67.tarifB,
    C: TARIFS_PREFECTURE_67.tarifC,
    D: TARIFS_PREFECTURE_67.tarifD,
  };
  return tarifs[tarifType];
}

/**
 * Calcule le prix d'une course
 */
export function calculerPrix(params: CalculPrixParams): ResultatCalcul {
  const {
    distanceKm,
    dateHeure,
    passagers,
    bagages,
    animaux,
    retourVide = false,
  } = params;

  const details: string[] = [];

  // 1. Déterminer le tarif applicable
  const tarifType = determinerTarif(dateHeure, retourVide);
  const tarifInfo = getInfosTarif(tarifType);
  details.push(`Tarif ${tarifType}: ${tarifInfo.description}`);

  // 2. Prix de base
  const priseEnCharge = TARIFS_PREFECTURE_67.priseEnCharge;
  details.push(`Prise en charge: ${priseEnCharge.toFixed(2)} EUR`);

  // 3. Prix au kilomètre
  const prixKm = tarifInfo.prixKm;
  const montantDistance = distanceKm * prixKm;
  details.push(
    `Distance: ${distanceKm.toFixed(1)} km x ${prixKm.toFixed(2)} EUR = ${montantDistance.toFixed(2)} EUR`
  );

  // 4. Suppléments
  const supplements = {
    passagers: 0,
    bagages: 0,
    animaux: 0,
    total: 0,
  };

  // Passagers supplémentaires (à partir du 5ème)
  const passagersSupp = Math.max(
    0,
    passagers - TARIFS_PREFECTURE_67.supplements.passagerSupplementaire.aPartirDe + 1
  );
  if (passagersSupp > 0) {
    supplements.passagers =
      passagersSupp * TARIFS_PREFECTURE_67.supplements.passagerSupplementaire.prix;
    details.push(
      `Passagers supplémentaires: ${passagersSupp} x ${TARIFS_PREFECTURE_67.supplements.passagerSupplementaire.prix.toFixed(2)} EUR = ${supplements.passagers.toFixed(2)} EUR`
    );
  }

  // Bagages
  if (bagages > 0) {
    supplements.bagages = bagages * TARIFS_PREFECTURE_67.supplements.bagage.prix;
    details.push(
      `Bagages: ${bagages} x ${TARIFS_PREFECTURE_67.supplements.bagage.prix.toFixed(2)} EUR = ${supplements.bagages.toFixed(2)} EUR`
    );
  }

  // Animaux
  if (animaux > 0) {
    supplements.animaux = animaux * TARIFS_PREFECTURE_67.supplements.animal.prix;
    details.push(
      `Animaux: ${animaux} x ${TARIFS_PREFECTURE_67.supplements.animal.prix.toFixed(2)} EUR = ${supplements.animaux.toFixed(2)} EUR`
    );
  }

  supplements.total =
    supplements.passagers + supplements.bagages + supplements.animaux;

  // 5. Calcul du total
  const sousTotal = priseEnCharge + montantDistance + supplements.total;
  let total = sousTotal;
  let estMinimum = false;

  // Appliquer le minimum
  if (total < TARIFS_PREFECTURE_67.minimumCourse) {
    total = TARIFS_PREFECTURE_67.minimumCourse;
    estMinimum = true;
    details.push(
      `Minimum de perception appliqué: ${TARIFS_PREFECTURE_67.minimumCourse.toFixed(2)} EUR`
    );
  }

  return {
    tarifApplique: tarifType,
    priseEnCharge,
    prixKm,
    distanceKm,
    montantDistance,
    supplements,
    sousTotal,
    total,
    estMinimum,
    details,
  };
}

/**
 * Formate le prix pour l'affichage
 */
export function formatPrix(prix: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(prix);
}

/**
 * Génère une estimation de fourchette de prix
 */
export function estimerFourchettePrix(
  distanceKm: number,
  dateHeure: Date
): { min: number; max: number } {
  // Prix minimum (tarif A, pas de suppléments)
  const prixMin = calculerPrix({
    distanceKm,
    dateHeure,
    passagers: 1,
    bagages: 0,
    animaux: 0,
    retourVide: false,
  }).total;

  // Prix maximum (tarif D, quelques suppléments)
  const prixMax = calculerPrix({
    distanceKm,
    dateHeure,
    passagers: 1,
    bagages: 2,
    animaux: 0,
    retourVide: true,
  }).total;

  return { min: prixMin, max: prixMax };
}
