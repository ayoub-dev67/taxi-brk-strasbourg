// Configuration du site TAXI BRK

export const siteConfig = {
  name: "TAXI BRK",
  nameGoogle: "Taxi VSL Strasbourg",
  description: "Service de taxi conventionné CPAM à Strasbourg. Transport médical VSL, courses toutes distances, transferts aéroports. Disponible 24h/24, 7j/7.",
  url: "https://www.taxi-brk-strasbourg.fr",

  // Coordonnées
  contact: {
    phone: "07 68 14 94 61",
    phoneLink: "+33768149461",
    email: "taxibrk@icloud.com",
    whatsapp: "33768149461",
    whatsappLink: "https://wa.me/33768149461",
  },

  // Localisation
  location: {
    city: "Strasbourg",
    region: "Grand Est",
    department: "Bas-Rhin (67)",
    country: "France",
    address: "Strasbourg, 67000",
  },

  // Horaires
  hours: {
    open: "24h/24",
    days: "7j/7",
    description: "Disponible tous les jours, à toute heure",
  },

  // Réseaux sociaux
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  // SEO
  keywords: [
    "taxi strasbourg",
    "taxi conventionné strasbourg",
    "vsl strasbourg",
    "transport médical strasbourg",
    "taxi cpam strasbourg",
    "taxi aéroport strasbourg",
    "taxi gare strasbourg",
    "taxi 67",
    "taxi bas-rhin",
  ],

  // Images
  images: {
    logo: "/images/logo.svg",
    ogImage: "/images/og-image.svg",
    hero: "/images/hero-bg.webp",
  },
};

export const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/reservation", label: "Réserver" },
  { href: "/services", label: "Services" },
  { href: "/taxi-conventionne", label: "Taxi Conventionné" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export const servicesLinks = [
  { href: "/services/transport-medical", label: "Transport Médical VSL" },
  { href: "/services/transfert-aeroport", label: "Transfert Aéroport" },
  { href: "/services/transfert-gare", label: "Transfert Gare" },
  { href: "/services/transport-colis", label: "Transport Colis" },
  { href: "/services/entreprise", label: "Service Entreprise" },
  { href: "/services/transport-enfants", label: "Transport Enfants" },
];

export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "CGV" },
  { href: "/cookies", label: "Cookies" },
];
