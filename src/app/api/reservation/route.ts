import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Types pour les services externes
interface TwilioMessage {
  body: string;
  from: string;
  to: string;
}

interface ResendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation basique
    if (!data.depart?.adresse || !data.arrivee?.adresse) {
      return NextResponse.json(
        { success: false, error: "Adresses manquantes" },
        { status: 400 }
      );
    }

    if (!data.client?.nom || !data.client?.telephone || !data.client?.email) {
      return NextResponse.json(
        { success: false, error: "Informations client incomplètes" },
        { status: 400 }
      );
    }

    // Générer un ID de réservation
    const reservationId = `RES-${Date.now()}`;

    // Formater le message pour WhatsApp/Email
    const dateFormatted = data.date
      ? format(new Date(data.date), "EEEE d MMMM yyyy", { locale: fr })
      : "Non spécifiée";

    const messageWhatsApp = `
🚕 NOUVELLE RÉSERVATION TAXI BRK

📍 TRAJET
Départ: ${data.depart.adresse}
Arrivée: ${data.arrivee.adresse}

📅 DATE ET HEURE
${dateFormatted} à ${data.heure || "Non spécifiée"}

👥 DÉTAILS
Passagers: ${data.passagers || 1}
Bagages: ${data.bagages || 0}
Animaux: ${data.animaux || 0}
${data.options?.siegeBebe ? "✅ Siège bébé demandé" : ""}
${data.options?.fauteuilRoulant ? "✅ Fauteuil roulant" : ""}

👤 CLIENT
Nom: ${data.client.prenom} ${data.client.nom}
Téléphone: ${data.client.telephone}
Email: ${data.client.email}
${data.client.commentaire ? `\n📝 Commentaire: ${data.client.commentaire}` : ""}

💰 Prix estimé: ${data.prixEstime ? `${data.prixEstime.toFixed(2)}€` : "À calculer"}

🔖 Réf: ${reservationId}
    `.trim();

    console.log("=== NOUVELLE RÉSERVATION ===");
    console.log(messageWhatsApp);
    console.log("============================");

    // Résultats des envois
    const results = {
      whatsapp: { sent: false, error: null as string | null },
      email: { sent: false, error: null as string | null },
    };

    // ═══════════════════════════════════════════════════════════════
    // ENVOI WHATSAPP VIA TWILIO
    // ═══════════════════════════════════════════════════════════════
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

    if (twilioAccountSid && twilioAuthToken) {
      try {
        // Import dynamique de Twilio
        const twilio = await import("twilio");
        const client = twilio.default(twilioAccountSid, twilioAuthToken);

        await client.messages.create({
          body: messageWhatsApp,
          from: "whatsapp:+14155238886", // Numéro Twilio Sandbox ou production
          to: "whatsapp:+33744220960", // Numéro du chauffeur
        } as TwilioMessage);

        results.whatsapp.sent = true;
        console.log("✅ WhatsApp envoyé avec succès");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        results.whatsapp.error = errorMessage;
        console.error("❌ Erreur WhatsApp:", errorMessage);
      }
    } else {
      results.whatsapp.error = "Twilio non configuré (TWILIO_ACCOUNT_SID ou TWILIO_AUTH_TOKEN manquant)";
      console.warn("⚠️ Twilio non configuré - WhatsApp non envoyé");
    }

    // ═══════════════════════════════════════════════════════════════
    // ENVOI EMAIL VIA RESEND
    // ═══════════════════════════════════════════════════════════════
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        // Import dynamique de Resend
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        // Template email client
        const emailHtml = generateEmailTemplate({
          reservationId,
          clientName: `${data.client.prenom} ${data.client.nom}`,
          depart: data.depart.adresse,
          arrivee: data.arrivee.adresse,
          date: dateFormatted,
          heure: data.heure || "Non spécifiée",
          passagers: data.passagers || 1,
          prixEstime: data.prixEstime,
        });

        await resend.emails.send({
          from: "TAXI BRK <reservation@taxi-brk-strasbourg.fr>",
          to: data.client.email,
          subject: `Confirmation de réservation - TAXI BRK (${reservationId})`,
          html: emailHtml,
        } as ResendEmail);

        results.email.sent = true;
        console.log("✅ Email de confirmation envoyé");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        results.email.error = errorMessage;
        console.error("❌ Erreur Email:", errorMessage);
      }
    } else {
      results.email.error = "Resend non configuré (RESEND_API_KEY manquant)";
      console.warn("⚠️ Resend non configuré - Email non envoyé");
    }

    return NextResponse.json({
      success: true,
      message: "Réservation enregistrée avec succès",
      data: {
        id: reservationId,
        notifications: results,
        ...data,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la réservation:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

/**
 * Génère le template HTML pour l'email de confirmation
 */
function generateEmailTemplate(params: {
  reservationId: string;
  clientName: string;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  passagers: number;
  prixEstime?: number;
}): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation - TAXI BRK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #1A1A1A;">
    <!-- Header -->
    <tr>
      <td style="padding: 30px 20px; text-align: center; border-bottom: 2px solid #D4AF37;">
        <h1 style="color: #D4AF37; margin: 0; font-size: 28px;">TAXI BRK</h1>
        <p style="color: #A3A3A3; margin: 10px 0 0; font-size: 14px;">Taxi Conventionné CPAM - Strasbourg</p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 30px 20px;">
        <h2 style="color: #FFFFFF; margin: 0 0 20px; font-size: 20px;">
          ✅ Réservation confirmée
        </h2>

        <p style="color: #A3A3A3; margin: 0 0 20px; font-size: 14px;">
          Bonjour ${params.clientName},<br><br>
          Votre réservation a bien été enregistrée. Voici les détails :
        </p>

        <!-- Reservation Details Box -->
        <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #0A0A0A; border: 1px solid #D4AF37; border-radius: 8px; margin-bottom: 20px;">
          <tr>
            <td>
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Référence</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 16px; font-weight: bold;">${params.reservationId}</p>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid #2D2D2D;">
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Date et heure</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 16px;">${params.date} à ${params.heure}</p>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid #2D2D2D;">
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Départ</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 14px;">📍 ${params.depart}</p>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid #2D2D2D;">
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Arrivée</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 14px;">📍 ${params.arrivee}</p>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid #2D2D2D;">
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Passagers</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 14px;">👥 ${params.passagers} personne(s)</p>
            </td>
          </tr>
          ${params.prixEstime ? `
          <tr>
            <td style="border-top: 1px solid #2D2D2D;">
              <p style="color: #D4AF37; margin: 0 0 5px; font-size: 12px; text-transform: uppercase;">Prix estimé</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: bold;">≈ ${params.prixEstime.toFixed(2)}€</p>
            </td>
          </tr>
          ` : ""}
        </table>

        <!-- Contact Info -->
        <table width="100%" cellpadding="15" cellspacing="0" style="background-color: #0A0A0A; border-radius: 8px; margin-bottom: 20px;">
          <tr>
            <td style="text-align: center;">
              <p style="color: #A3A3A3; margin: 0 0 10px; font-size: 14px;">
                Une question ? Contactez-nous :
              </p>
              <a href="tel:+33744220960" style="color: #D4AF37; text-decoration: none; font-size: 18px; font-weight: bold;">
                📞 07 44 22 09 60
              </a>
            </td>
          </tr>
        </table>

        <p style="color: #737373; margin: 0; font-size: 12px; text-align: center;">
          Le prix final sera calculé au compteur selon les tarifs officiels de la Préfecture du Bas-Rhin.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; border-top: 1px solid #2D2D2D;">
        <p style="color: #737373; margin: 0; font-size: 12px;">
          TAXI BRK - Strasbourg<br>
          <a href="https://www.taxi-brk-strasbourg.fr" style="color: #D4AF37;">www.taxi-brk-strasbourg.fr</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
