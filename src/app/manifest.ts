import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TAXI BRK Strasbourg",
    short_name: "TAXI BRK",
    description:
      "Service de taxi premium à Strasbourg. Conventionné CPAM, transferts aéroport, transport médical. Disponible 24h/24.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#D4AF37",
    orientation: "portrait",
    scope: "/",
    lang: "fr",
    categories: ["transportation", "travel", "business"],
    icons: [
      {
        src: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Réserver un taxi",
        short_name: "Réserver",
        description: "Réserver un taxi maintenant",
        url: "/reservation",
        icons: [{ src: "/icons/icon-192x192.svg", sizes: "96x96" }],
      },
      {
        name: "Appeler",
        short_name: "Appeler",
        description: "Appeler TAXI BRK",
        url: "tel:+33768149461",
        icons: [{ src: "/icons/icon-192x192.svg", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
