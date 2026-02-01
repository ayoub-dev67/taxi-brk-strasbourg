import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation
    if (!data.nom || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    const message = `
📧 NOUVEAU MESSAGE DE CONTACT

👤 DE: ${data.nom}
📱 Téléphone: ${data.telephone || "Non renseigné"}
✉️ Email: ${data.email}

📋 SUJET: ${data.sujet || "Non spécifié"}

💬 MESSAGE:
${data.message}
    `.trim();

    console.log("=== NOUVEAU MESSAGE CONTACT ===");
    console.log(message);
    console.log("===============================");

    // TODO: Envoyer email via Resend

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
