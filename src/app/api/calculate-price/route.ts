import { NextRequest, NextResponse } from "next/server";
import { calculerPrix, type CalculPrixParams } from "@/lib/price-calculator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      distanceKm,
      dateHeure,
      passagers = 1,
      bagages = 0,
      animaux = 0,
      retourVide = false,
    } = body;

    // Validation
    if (!distanceKm || distanceKm <= 0) {
      return NextResponse.json(
        { success: false, error: "Distance invalide" },
        { status: 400 }
      );
    }

    if (!dateHeure) {
      return NextResponse.json(
        { success: false, error: "Date/heure manquante" },
        { status: 400 }
      );
    }

    // Calcul du prix
    const params: CalculPrixParams = {
      distanceKm,
      dateHeure: new Date(dateHeure),
      passagers,
      bagages,
      animaux,
      retourVide,
    };

    const resultat = calculerPrix(params);

    return NextResponse.json({
      success: true,
      data: resultat,
    });
  } catch (error) {
    console.error("Erreur lors du calcul du prix:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
