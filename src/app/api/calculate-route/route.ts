import { NextRequest, NextResponse } from "next/server";

interface RouteResult {
  distance: number; // km
  duration: number; // minutes
  durationText: string;
}

interface RequestBody {
  origin: string;
  destination: string;
  originLat?: number;
  originLng?: number;
  destinationLat?: number;
  destinationLng?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { origin, destination, originLat, originLng, destinationLat, destinationLng } = body;

    if (!origin || !destination) {
      return NextResponse.json(
        { success: false, error: "Adresses de départ et d'arrivée requises" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY;
    const hasCoordinates = originLat && originLng && destinationLat && destinationLng;

    // Essayer d'abord avec Google Maps API si la clé est disponible
    if (apiKey) {
      try {
        // Utiliser les coordonnées si disponibles, sinon les adresses
        const originParam = hasCoordinates ? `${originLat},${originLng}` : origin;
        const destParam = hasCoordinates ? `${destinationLat},${destinationLng}` : destination;

        const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
        url.searchParams.set("origins", originParam);
        url.searchParams.set("destinations", destParam);
        url.searchParams.set("mode", "driving");
        url.searchParams.set("language", "fr");
        url.searchParams.set("key", apiKey);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status === "OK") {
          const element = data.rows?.[0]?.elements?.[0];

          if (element && element.status === "OK") {
            const result: RouteResult = {
              distance: Math.round(element.distance.value / 1000 * 10) / 10,
              duration: Math.round(element.duration.value / 60),
              durationText: element.duration.text,
            };

            console.log("Google Maps API success:", result);

            return NextResponse.json({
              success: true,
              data: result,
              estimated: false,
            });
          }
        }

        console.warn("Google Maps API fallback - status:", data.status, data.error_message);
      } catch (googleError) {
        console.error("Google Maps API error:", googleError);
      }
    } else {
      console.warn("GOOGLE_MAPS_SERVER_KEY non configurée");
    }

    // Fallback: Calcul avec coordonnées (Haversine) si disponibles
    if (hasCoordinates) {
      const haversineDistance = calculateHaversineDistance(
        originLat!,
        originLng!,
        destinationLat!,
        destinationLng!
      );

      // Multiplier par 1.3 pour estimer la distance route (vs vol d'oiseau)
      const routeDistance = Math.round(haversineDistance * 1.3 * 10) / 10;

      // Estimer la durée: ~2 min par km en ville, ~1 min par km sur autoroute
      const avgSpeedFactor = routeDistance > 50 ? 1.0 : 2.0;
      const estimatedDuration = Math.round(routeDistance * avgSpeedFactor);

      const result: RouteResult = {
        distance: routeDistance,
        duration: estimatedDuration,
        durationText: formatDuration(estimatedDuration),
      };

      console.log("Haversine calculation:", {
        haversineKm: haversineDistance,
        routeKm: routeDistance,
        duration: estimatedDuration,
      });

      return NextResponse.json({
        success: true,
        data: result,
        estimated: true,
      });
    }

    // Dernier fallback: estimation basée sur le texte des adresses
    const estimatedResult = estimateDistanceFromText(origin, destination);
    console.log("Text-based estimation:", estimatedResult);

    return NextResponse.json({
      success: true,
      data: estimatedResult,
      estimated: true,
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
 * Calcule la distance à vol d'oiseau entre deux points (formule Haversine)
 * @returns Distance en km
 */
function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Estimation de distance basée sur des trajets connus à Strasbourg
 */
function estimateDistanceFromText(origin: string, destination: string): RouteResult {
  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();

  // Aéroports
  if (destLower.includes("entzheim") || destLower.includes("sxb") ||
      destLower.includes("strasbourg") && destLower.includes("aéroport") ||
      originLower.includes("entzheim") || originLower.includes("sxb") ||
      originLower.includes("strasbourg") && originLower.includes("aéroport")) {
    return { distance: 15, duration: 20, durationText: "20 min" };
  }

  if (destLower.includes("bâle") || destLower.includes("basel") ||
      destLower.includes("mulhouse") || destLower.includes("euroairport") ||
      originLower.includes("bâle") || originLower.includes("basel") ||
      originLower.includes("mulhouse") || originLower.includes("euroairport")) {
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
      destLower.includes("hautepierre") || destLower.includes("civil") ||
      originLower.includes("hôpital") || originLower.includes("hopital") ||
      originLower.includes("chu") || originLower.includes("clinique") ||
      originLower.includes("hautepierre") || originLower.includes("civil")) {
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
    { name: "selestat", distance: 50, duration: 45 },
    { name: "colmar", distance: 75, duration: 55 },
    { name: "obernai", distance: 30, duration: 30 },
    { name: "molsheim", distance: 25, duration: 25 },
    { name: "saverne", distance: 45, duration: 40 },
    { name: "wissembourg", distance: 65, duration: 55 },
  ];

  for (const city of peripheralCities) {
    if (destLower.includes(city.name) || originLower.includes(city.name)) {
      return {
        distance: city.distance,
        duration: city.duration,
        durationText: formatDuration(city.duration),
      };
    }
  }

  // Par défaut, estimation moyenne pour Strasbourg intra-muros
  return { distance: 6, duration: 15, durationText: "15 min" };
}
