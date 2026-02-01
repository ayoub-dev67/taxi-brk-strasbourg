// Configuration des trajets populaires

export interface Trajet {
  slug: string;
  title: string;
  from: string;
  to: string;
  distance: number; // km
  duration: string;
  priceRange: { min: number; max: number };
  description: string;
  metaDescription: string;
  highlights: string[];
  details: string;
}

export const trajets: Trajet[] = [
  {
    slug: "taxi-strasbourg-aeroport-entzheim",
    title: "Taxi Strasbourg → Aéroport Entzheim",
    from: "Strasbourg Centre",
    to: "Aéroport de Strasbourg-Entzheim (SXB)",
    distance: 12,
    duration: "15-20 min",
    priceRange: { min: 25, max: 35 },
    description: "Transfert taxi entre Strasbourg centre et l'aéroport de Strasbourg-Entzheim. Service ponctuel avec suivi de vol.",
    metaDescription: "Taxi Strasbourg Aéroport Entzheim. Prix fixe dès 25€, trajet 15 min. Suivi de vol, prise en charge 24h/24. ☎ 07 44 22 09 60",
    highlights: [
      "Prix fixe convenu à l'avance",
      "Suivi de votre vol en temps réel",
      "Prise en charge à domicile",
      "Aide aux bagages incluse",
      "Disponible 24h/24, 7j/7",
      "Véhicule climatisé et confortable",
    ],
    details: "L'aéroport de Strasbourg-Entzheim (code SXB) est situé à 12 km au sud-ouest de Strasbourg. Notre service de taxi vous garantit une prise en charge ponctuelle pour ne jamais manquer votre vol. En cas de retard de votre avion à l'arrivée, nous adaptons automatiquement l'heure de venue grâce à notre suivi en temps réel.",
  },
  {
    slug: "taxi-strasbourg-gare",
    title: "Taxi Strasbourg → Gare Centrale",
    from: "Tous quartiers Strasbourg",
    to: "Gare de Strasbourg",
    distance: 5,
    duration: "10-15 min",
    priceRange: { min: 12, max: 20 },
    description: "Transport taxi vers la Gare de Strasbourg depuis tous les quartiers. Idéal pour les TGV, TER et ICE.",
    metaDescription: "Taxi vers Gare de Strasbourg. Prix dès 12€, trajet rapide. TGV, TER, ICE. Réservation 24h/24. ☎ 07 44 22 09 60",
    highlights: [
      "Trajet rapide et direct",
      "Connaissance parfaite des accès",
      "Aide avec les bagages",
      "Ponctualité garantie",
      "Suivi des horaires de train",
      "Dépose au plus près des quais",
    ],
    details: "La Gare de Strasbourg est un hub majeur avec des connexions TGV vers Paris (1h50), des TER régionaux et des ICE vers l'Allemagne. Notre service de taxi vous dépose directement devant la gare, au plus près de l'entrée principale, pour faciliter votre correspondance.",
  },
  {
    slug: "taxi-strasbourg-bale-mulhouse",
    title: "Taxi Strasbourg → EuroAirport Bâle-Mulhouse",
    from: "Strasbourg",
    to: "EuroAirport Bâle-Mulhouse-Fribourg (BSL/MLH)",
    distance: 130,
    duration: "1h15-1h30",
    priceRange: { min: 180, max: 220 },
    description: "Transfert longue distance vers l'EuroAirport Bâle-Mulhouse. Confort optimal pour ce trajet d'1h30.",
    metaDescription: "Taxi Strasbourg EuroAirport Bâle-Mulhouse. Prix fixe dès 180€, trajet 1h30. Véhicule confortable, réservation 24h/24. ☎ 07 44 22 09 60",
    highlights: [
      "Prix forfaitaire tout compris",
      "Véhicule grand confort",
      "Wifi disponible sur demande",
      "Suivi de vol inclus",
      "Eau et rafraîchissements offerts",
      "Pas de supplément bagages",
    ],
    details: "L'EuroAirport Bâle-Mulhouse-Fribourg est le 5ème aéroport français. Situé à la frontière franco-suisse, il dessert de nombreuses destinations internationales. Notre transfert premium vous assure un voyage confortable avec un véhicule récent et bien équipé.",
  },
  {
    slug: "taxi-strasbourg-europapark",
    title: "Taxi Strasbourg → Europa-Park",
    from: "Strasbourg",
    to: "Europa-Park (Rust, Allemagne)",
    distance: 55,
    duration: "45-55 min",
    priceRange: { min: 90, max: 120 },
    description: "Transfert taxi vers Europa-Park, le célèbre parc d'attractions allemand. Idéal pour les familles.",
    metaDescription: "Taxi Strasbourg Europa-Park. Prix dès 90€, trajet 50 min. Siège enfant gratuit, famille bienvenue. ☎ 07 44 22 09 60",
    highlights: [
      "Siège enfant fourni gratuitement",
      "Prix forfaitaire aller simple ou A/R",
      "Dépose devant l'entrée du parc",
      "Horaires flexibles",
      "Véhicule spacieux pour la famille",
      "Retour sur réservation",
    ],
    details: "Europa-Park est le plus grand parc d'attractions d'Allemagne, situé à Rust. Avec plus de 100 attractions, c'est une destination idéale pour les familles. Notre service de taxi vous dépose directement à l'entrée et peut vous récupérer à l'heure convenue.",
  },
  {
    slug: "taxi-strasbourg-colmar",
    title: "Taxi Strasbourg → Colmar",
    from: "Strasbourg",
    to: "Colmar",
    distance: 75,
    duration: "50 min-1h",
    priceRange: { min: 110, max: 140 },
    description: "Transfert taxi Strasbourg-Colmar. Découvrez la capitale des vins d'Alsace en tout confort.",
    metaDescription: "Taxi Strasbourg Colmar. Prix dès 110€, trajet 1h. Route des vins, tourisme. Réservation 24h/24. ☎ 07 44 22 09 60",
    highlights: [
      "Trajet direct par autoroute",
      "Possibilité d'arrêts sur la route des vins",
      "Guide des bonnes adresses sur demande",
      "Aller-retour possible",
      "Tarif dégressif pour séjour",
      "Véhicule confortable",
    ],
    details: "Colmar est la capitale des vins d'Alsace et une ville touristique majeure avec sa Petite Venise et ses maisons à colombages. Notre taxi peut vous y conduire directement ou avec des arrêts sur la route des vins (Obernai, Ribeauvillé, Riquewihr...).",
  },
  {
    slug: "taxi-strasbourg-paris",
    title: "Taxi Strasbourg → Paris",
    from: "Strasbourg",
    to: "Paris",
    distance: 490,
    duration: "4h30-5h",
    priceRange: { min: 550, max: 650 },
    description: "Transfert longue distance Strasbourg-Paris. Alternative confortable au train pour groupes ou horaires spéciaux.",
    metaDescription: "Taxi Strasbourg Paris. Transfert longue distance, prix sur devis. Groupes, entreprises, horaires flexibles. ☎ 07 44 22 09 60",
    highlights: [
      "Idéal pour les groupes (jusqu'à 4 pers.)",
      "Bagages illimités",
      "Horaires 100% flexibles",
      "Arrêts possibles en route",
      "Alternative au train de nuit",
      "Devis personnalisé",
    ],
    details: "Pour les trajets vers Paris, le taxi est une excellente alternative au train, surtout pour les groupes, les horaires de nuit ou le transport de bagages volumineux. Nous vous déposons à l'adresse exacte de votre choix dans Paris.",
  },
];

export function getTrajetBySlug(slug: string): Trajet | undefined {
  return trajets.find((trajet) => trajet.slug === slug);
}
