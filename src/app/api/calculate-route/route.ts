import { NextRequest, NextResponse } from "next/server";

interface RouteResult {
  distance: number; // km
  duration: number; // minutes
  durationText: string;
}

export async function POST(request: NextRequest) {
  try {
    const { origin, destination } = await request.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { success: false, error: "Adresses de départ et d'arrivée requises" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;

    // Si pas de clé API, utiliser une estimation basée sur des valeurs connues
    if (!apiKey) {
      console.warn("GOOGLE_MAPS_SERVER_KEY non configurée - utilisation d'une estimation");
      const estimatedResult = estimateDistance(origin, destination);
      return NextResponse.json({
        success: true,
        data: estimatedResult,
        estimated: true,
      });
    }

    // Appel à l'API Google Distance Matrix
    const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
    url.searchParams.set("origins", origin);
    url.searchParams.set("destinations", destination);
    url.searchParams.set("mode", "driving");
    url.searchParams.set("language", "fr");
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Erreur Google Maps:", data.status, data.error_message);
      // Fallback sur estimation
      const estimatedResult = estimateDistance(origin, destination);
      return NextResponse.json({
        success: true,
        data: estimatedResult,
        estimated: true,
      });
    }

    const element = data.rows?.[0]?.elements?.[0];

    if (!element || element.status !== "OK") {
      console.error("Élément non trouvé:", element?.status);
      const estimatedResult = estimateDistance(origin, destination);
      return NextResponse.json({
        success: true,
        data: estimatedResult,
        estimated: true,
      });
    }

    const result: RouteResult = {
      distance: Math.round(element.distance.value / 1000 * 10) / 10, // km avec 1 décimale
      duration: Math.round(element.duration.value / 60), // minutes
      durationText: element.duration.text,
    };

    return NextResponse.json({
      success: true,
      data: result,
      estimated: false,
    });
  } catch (error) {
    console.error("Erreur lors du calcul de l'itinéraire:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * Estimation de distance basée sur des trajets connus à Strasbourg
 */
function estimateDistance(origin: string, destination: string): RouteResult {
  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();

  // Aéroports
  if (destLower.includes("entzheim") || destLower.includes("sxb") ||
      originLower.includes("entzheim") || originLower.includes("sxb")) {
    return { distance: 15, duration: 20, durationText: "20 min" };
  }

  if (destLower.includes("bâle") || destLower.includes("mulhouse") || destLower.includes("euroairport") ||
      originLower.includes("bâle") || originLower.includes("mulhouse") || originLower.includes("euroairport")) {
    return { distance: 130, duration: 90, durationText: "1h 30min" };
  }

  if (destLower.includes("francfort") || destLower.includes("frankfurt") ||
      originLower.includes("francfort") || originLower.includes("frankfurt")) {
    return { distance: 220, duration: 150, durationText: "2h 30min" };
  }

  // Gare
  if (destLower.includes("gare") || originLower.includes("gare")) {
    return { distance: 5, duration: 12, durationText: "12 min" };
  }

  // Hôpitaux
  if (destLower.includes("hôpital") || destLower.includes("hopital") ||
      destLower.includes("chu") || destLower.includes("clinique") ||
      originLower.includes("hôpital") || originLower.includes("hopital") ||
      originLower.includes("chu") || originLower.includes("clinique")) {
    return { distance: 8, duration: 18, durationText: "18 min" };
  }

  // Communes périphériques
  const peripheralCities = [
    { name: "schiltigheim", distance: 4, duration: 10 },
    { name: "bischheim", distance: 5, duration: 12 },
    { name: "hoenheim", distance: 6, duration: 15 },
    { name: "illkirch", distance: 7, duration: 15 },
    { name: "lingolsheim", distance: 6, duration: 14 },
    { name: "ostwald", distance: 5, duration: 12 },
    { name: "kehl", distance: 8, duration: 15 },
    { name: "haguenau", distance: 35, duration: 35 },
    { name: "sélestat", distance: 50, duration: 45 },
    { name: "colmar", distance: 75, duration: 55 },
  ];

  for (const city of peripheralCities) {
    if (destLower.includes(city.name) || originLower.includes(city.name)) {
      return {
        distance: city.distance,
        duration: city.duration,
        durationText: city.duration < 60 ? `${city.duration} min` : `${Math.floor(city.duration / 60)}h ${city.duration % 60}min`
      };
    }
  }

  // Par défaut, estimation moyenne pour Strasbourg intra-muros
  return { distance: 6, duration: 15, durationText: "15 min" };
}
