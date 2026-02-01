import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Resend } from "resend";

// Types pour les services externes
interface TwilioMessage {
  body: string;
  from: string;
  to: string;
}

// Initialiser Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email du taxi
const TAXI_EMAIL = "taxibrk@icloud.com";

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
    const reservationId = `BRK-${Date.now().toString(36).toUpperCase()}`;

    // Formater la date
    const dateFormatted = data.date
      ? format(new Date(data.date), "EEEE d MMMM yyyy", { locale: fr })
      : "Non spécifiée";

    // Formater le message pour WhatsApp
    const messageWhatsApp = `
🚕 NOUVELLE RÉSERVATION TAXI BRK

📍 TRAJET
Départ: ${data.depart.adresse}
Arrivée: ${data.arrivee.adresse}
Type: ${data.typeTrajet === "aller-retour" ? "Aller-retour" : "Aller simple"}

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
      emailClient: { sent: false, error: null as string | null },
      emailTaxi: { sent: false, error: null as string | null },
    };

    // ═══════════════════════════════════════════════════════════════
    // ENVOI WHATSAPP VIA TWILIO
    // ═══════════════════════════════════════════════════════════════
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

    if (twilioAccountSid && twilioAuthToken) {
      try {
        const twilio = await import("twilio");
        const client = twilio.default(twilioAccountSid, twilioAuthToken);

        await client.messages.create({
          body: messageWhatsApp,
          from: "whatsapp:+14155238886",
          to: "whatsapp:+33744220960",
        } as TwilioMessage);

        results.whatsapp.sent = true;
        console.log("✅ WhatsApp envoyé avec succès");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        results.whatsapp.error = errorMessage;
        console.error("❌ Erreur WhatsApp:", errorMessage);
      }
    } else {
      results.whatsapp.error = "Twilio non configuré";
      console.warn("⚠️ Twilio non configuré - WhatsApp non envoyé");
    }

    // ═══════════════════════════════════════════════════════════════
    // ENVOI EMAILS VIA RESEND
    // ═══════════════════════════════════════════════════════════════
    if (resend) {
      const emailData = {
        reservationId,
        clientName: `${data.client.prenom} ${data.client.nom}`,
        clientEmail: data.client.email,
        clientPhone: data.client.telephone,
        depart: data.depart.adresse,
        arrivee: data.arrivee.adresse,
        date: dateFormatted,
        heure: data.heure || "Non spécifiée",
        passagers: data.passagers || 1,
        bagages: data.bagages || 0,
        animaux: data.animaux || 0,
        typeTrajet: data.typeTrajet || "aller-simple",
        options: data.options || {},
        prixEstime: data.prixEstime,
        distance: data.distance,
        commentaire: data.client.commentaire,
      };

      // EMAIL 1 - Confirmation au client
      try {
        await resend.emails.send({
          from: "TAXI BRK <onboarding@resend.dev>",
          to: data.client.email,
          subject: `Confirmation de réservation - TAXI BRK`,
          html: generateClientEmailTemplate(emailData),
        });

        results.emailClient.sent = true;
        console.log("✅ Email client envoyé");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        results.emailClient.error = errorMessage;
        console.error("❌ Erreur Email client:", errorMessage);
      }

      // EMAIL 2 - Notification au taxi
      try {
        await resend.emails.send({
          from: "TAXI BRK <onboarding@resend.dev>",
          to: TAXI_EMAIL,
          subject: `🚖 Nouvelle réservation - ${data.client.prenom} ${data.client.nom}`,
          html: generateTaxiEmailTemplate(emailData),
        });

        results.emailTaxi.sent = true;
        console.log("✅ Email taxi envoyé");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        results.emailTaxi.error = errorMessage;
        console.error("❌ Erreur Email taxi:", errorMessage);
      }
    } else {
      const errorMsg = "Resend non configuré (RESEND_API_KEY manquant)";
      results.emailClient.error = errorMsg;
      results.emailTaxi.error = errorMsg;
      console.warn("⚠️ Resend non configuré - Emails non envoyés");
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

interface EmailData {
  reservationId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  passagers: number;
  bagages: number;
  animaux: number;
  typeTrajet: string;
  options: { siegeBebe?: boolean; fauteuilRoulant?: boolean };
  prixEstime?: number;
  distance?: number;
  commentaire?: string;
}

/**
 * Template email pour le CLIENT (confirmation)
 */
function generateClientEmailTemplate(data: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation - TAXI BRK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #111111;">

    <!-- Header avec logo -->
    <tr>
      <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-bottom: 3px solid #D4AF37;">
        <h1 style="color: #D4AF37; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">TAXI BRK</h1>
        <p style="color: #888888; margin: 8px 0 0; font-size: 13px; letter-spacing: 1px;">TAXI CONVENTIONNÉ CPAM • STRASBOURG</p>
      </td>
    </tr>

    <!-- Message de confirmation -->
    <tr>
      <td style="padding: 40px 30px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); border-radius: 50%; width: 70px; height: 70px; line-height: 70px; font-size: 32px;">✓</div>
        </div>
        <h2 style="color: #FFFFFF; margin: 0 0 15px; font-size: 24px; text-align: center; font-weight: 600;">
          Votre réservation a bien été enregistrée
        </h2>
        <p style="color: #999999; margin: 0; font-size: 15px; text-align: center; line-height: 1.6;">
          Bonjour ${data.clientName},<br>
          Notre chauffeur vous contactera pour confirmer votre course.
        </p>
      </td>
    </tr>

    <!-- Détails de la réservation -->
    <tr>
      <td style="padding: 20px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border: 1px solid #333333; border-radius: 12px; overflow: hidden;">

          <!-- Référence -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Référence</td>
                  <td style="color: #FFFFFF; font-size: 16px; font-weight: bold; text-align: right;">${data.reservationId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Date et heure -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <p style="color: #D4AF37; margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">📅 Date et heure</p>
              <p style="color: #FFFFFF; margin: 0; font-size: 16px; font-weight: 500;">${data.date}</p>
              <p style="color: #FFFFFF; margin: 5px 0 0; font-size: 20px; font-weight: bold;">${data.heure}</p>
            </td>
          </tr>

          <!-- Trajet -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <p style="color: #D4AF37; margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">📍 Trajet</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 30px; vertical-align: top;">
                    <div style="width: 12px; height: 12px; background-color: #22C55E; border-radius: 50%; margin-top: 4px;"></div>
                  </td>
                  <td style="padding-bottom: 15px;">
                    <p style="color: #888888; margin: 0; font-size: 11px;">DÉPART</p>
                    <p style="color: #FFFFFF; margin: 4px 0 0; font-size: 14px;">${data.depart}</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30px; vertical-align: top;">
                    <div style="width: 12px; height: 12px; background-color: #EF4444; border-radius: 50%; margin-top: 4px;"></div>
                  </td>
                  <td>
                    <p style="color: #888888; margin: 0; font-size: 11px;">ARRIVÉE</p>
                    <p style="color: #FFFFFF; margin: 4px 0 0; font-size: 14px;">${data.arrivee}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Type de trajet -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #888888; font-size: 13px;">Type de trajet</td>
                  <td style="color: #FFFFFF; font-size: 14px; text-align: right; font-weight: 500;">
                    ${data.typeTrajet === "aller-retour" ? "↔️ Aller-retour" : "→ Aller simple"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Passagers -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #888888; font-size: 13px;">👥 Passagers</td>
                  <td style="color: #FFFFFF; font-size: 14px; text-align: right;">${data.passagers}</td>
                </tr>
                ${data.bagages > 0 ? `
                <tr>
                  <td style="color: #888888; font-size: 13px; padding-top: 8px;">🧳 Bagages</td>
                  <td style="color: #FFFFFF; font-size: 14px; text-align: right; padding-top: 8px;">${data.bagages}</td>
                </tr>
                ` : ""}
                ${data.animaux > 0 ? `
                <tr>
                  <td style="color: #888888; font-size: 13px; padding-top: 8px;">🐕 Animaux</td>
                  <td style="color: #FFFFFF; font-size: 14px; text-align: right; padding-top: 8px;">${data.animaux}</td>
                </tr>
                ` : ""}
              </table>
            </td>
          </tr>

          ${data.options.siegeBebe || data.options.fauteuilRoulant ? `
          <!-- Options -->
          <tr>
            <td style="padding: 20px; border-bottom: 1px solid #2A2A2A;">
              <p style="color: #D4AF37; margin: 0 0 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Options</p>
              ${data.options.siegeBebe ? '<p style="color: #FFFFFF; margin: 0; font-size: 13px;">✅ Siège bébé / rehausseur</p>' : ""}
              ${data.options.fauteuilRoulant ? '<p style="color: #FFFFFF; margin: 5px 0 0; font-size: 13px;">✅ Fauteuil roulant (PMR)</p>' : ""}
            </td>
          </tr>
          ` : ""}

          <!-- Prix estimé -->
          ${data.prixEstime ? `
          <tr>
            <td style="padding: 25px 20px; background: linear-gradient(135deg, #1a1a0a 0%, #0d0d00 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #D4AF37; font-size: 13px; font-weight: 500;">💰 Prix estimé</td>
                  <td style="color: #D4AF37; font-size: 26px; font-weight: bold; text-align: right;">≈ ${data.prixEstime.toFixed(2)}€</td>
                </tr>
              </table>
              <p style="color: #666666; margin: 10px 0 0; font-size: 11px; text-align: right;">
                Prix final au compteur selon tarifs Préfecture 67
              </p>
            </td>
          </tr>
          ` : ""}
        </table>
      </td>
    </tr>

    <!-- Contact -->
    <tr>
      <td style="padding: 20px 30px 40px;">
        <table width="100%" cellpadding="20" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; text-align: center;">
          <tr>
            <td>
              <p style="color: #888888; margin: 0 0 15px; font-size: 14px;">
                Une question ? Appelez-nous :
              </p>
              <a href="tel:+33744220960" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #000000; text-decoration: none; font-size: 20px; font-weight: bold; padding: 15px 40px; border-radius: 8px;">
                📞 07 44 22 09 60
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #0A0A0A; border-top: 1px solid #222222;">
        <p style="color: #D4AF37; margin: 0 0 5px; font-size: 14px; font-weight: bold;">TAXI BRK</p>
        <p style="color: #666666; margin: 0 0 15px; font-size: 12px;">
          Taxi Conventionné CPAM • Strasbourg et environs
        </p>
        <a href="https://www.taxi-brk-strasbourg.fr" style="color: #D4AF37; font-size: 12px;">www.taxi-brk-strasbourg.fr</a>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Template email pour le TAXI (notification)
 */
function generateTaxiEmailTemplate(data: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle réservation - TAXI BRK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #111111;">

    <!-- Header alerte -->
    <tr>
      <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);">
        <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">🚖 NOUVELLE RÉSERVATION</h1>
        <p style="color: #333333; margin: 10px 0 0; font-size: 14px;">${data.reservationId}</p>
      </td>
    </tr>

    <!-- Infos client -->
    <tr>
      <td style="padding: 25px 30px; background-color: #1A1A1A; border-bottom: 2px solid #D4AF37;">
        <h2 style="color: #D4AF37; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">👤 Client</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0;">
              <span style="color: #888888; font-size: 13px;">Nom :</span>
              <span style="color: #FFFFFF; font-size: 16px; font-weight: bold; margin-left: 10px;">${data.clientName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <span style="color: #888888; font-size: 13px;">Téléphone :</span>
              <a href="tel:${data.clientPhone}" style="color: #D4AF37; font-size: 18px; font-weight: bold; margin-left: 10px; text-decoration: none;">${data.clientPhone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <span style="color: #888888; font-size: 13px;">Email :</span>
              <a href="mailto:${data.clientEmail}" style="color: #FFFFFF; font-size: 14px; margin-left: 10px; text-decoration: none;">${data.clientEmail}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Date et heure -->
    <tr>
      <td style="padding: 25px 30px; background-color: #0D0D0D;">
        <h2 style="color: #D4AF37; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">📅 Date & Heure</h2>
        <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: bold;">${data.date}</p>
        <p style="color: #D4AF37; margin: 8px 0 0; font-size: 28px; font-weight: bold;">${data.heure}</p>
      </td>
    </tr>

    <!-- Trajet -->
    <tr>
      <td style="padding: 25px 30px; background-color: #1A1A1A;">
        <h2 style="color: #D4AF37; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">📍 Trajet</h2>

        <!-- Départ -->
        <div style="background-color: #0D0D0D; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #22C55E;">
          <p style="color: #22C55E; margin: 0 0 5px; font-size: 11px; text-transform: uppercase;">Départ</p>
          <p style="color: #FFFFFF; margin: 0; font-size: 15px; font-weight: 500;">${data.depart}</p>
        </div>

        <!-- Flèche -->
        <div style="text-align: center; padding: 5px 0;">
          <span style="color: #D4AF37; font-size: 20px;">↓</span>
        </div>

        <!-- Arrivée -->
        <div style="background-color: #0D0D0D; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444;">
          <p style="color: #EF4444; margin: 0 0 5px; font-size: 11px; text-transform: uppercase;">Arrivée</p>
          <p style="color: #FFFFFF; margin: 0; font-size: 15px; font-weight: 500;">${data.arrivee}</p>
        </div>

        <!-- Distance et prix -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
          <tr>
            ${data.distance ? `
            <td style="width: 50%; padding: 10px; background-color: #0D0D0D; border-radius: 8px; text-align: center;">
              <p style="color: #888888; margin: 0; font-size: 11px;">DISTANCE</p>
              <p style="color: #FFFFFF; margin: 5px 0 0; font-size: 18px; font-weight: bold;">≈ ${data.distance} km</p>
            </td>
            ` : ""}
            ${data.prixEstime ? `
            <td style="width: 50%; padding: 10px; background-color: #0D0D0D; border-radius: 8px; text-align: center; ${data.distance ? "margin-left: 10px;" : ""}">
              <p style="color: #888888; margin: 0; font-size: 11px;">PRIX ESTIMÉ</p>
              <p style="color: #D4AF37; margin: 5px 0 0; font-size: 18px; font-weight: bold;">≈ ${data.prixEstime.toFixed(2)}€</p>
            </td>
            ` : ""}
          </tr>
        </table>
      </td>
    </tr>

    <!-- Options -->
    <tr>
      <td style="padding: 25px 30px; background-color: #0D0D0D;">
        <h2 style="color: #D4AF37; margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">⚙️ Détails</h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #2A2A2A;">
              <span style="color: #888888; font-size: 13px;">Type de trajet</span>
              <span style="color: #FFFFFF; font-size: 14px; float: right; font-weight: 500;">
                ${data.typeTrajet === "aller-retour" ? "↔️ Aller-retour (Tarif A/B)" : "→ Aller simple (Tarif C/D)"}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #2A2A2A;">
              <span style="color: #888888; font-size: 13px;">👥 Passagers</span>
              <span style="color: #FFFFFF; font-size: 14px; float: right;">${data.passagers}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #2A2A2A;">
              <span style="color: #888888; font-size: 13px;">🧳 Bagages</span>
              <span style="color: #FFFFFF; font-size: 14px; float: right;">${data.bagages}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; ${data.options.siegeBebe || data.options.fauteuilRoulant ? "border-bottom: 1px solid #2A2A2A;" : ""}">
              <span style="color: #888888; font-size: 13px;">🐕 Animaux</span>
              <span style="color: #FFFFFF; font-size: 14px; float: right;">${data.animaux}</span>
            </td>
          </tr>
          ${data.options.siegeBebe ? `
          <tr>
            <td style="padding: 12px 15px; border-bottom: 1px solid #2A2A2A;">
              <span style="color: #22C55E; font-size: 13px;">✅ Siège bébé / rehausseur demandé</span>
            </td>
          </tr>
          ` : ""}
          ${data.options.fauteuilRoulant ? `
          <tr>
            <td style="padding: 12px 15px;">
              <span style="color: #22C55E; font-size: 13px;">✅ Fauteuil roulant (PMR)</span>
            </td>
          </tr>
          ` : ""}
        </table>
      </td>
    </tr>

    ${data.commentaire ? `
    <!-- Commentaire -->
    <tr>
      <td style="padding: 0 30px 25px;">
        <div style="background-color: #1A1A0A; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37;">
          <p style="color: #D4AF37; margin: 0 0 8px; font-size: 11px; text-transform: uppercase;">💬 Commentaire du client</p>
          <p style="color: #FFFFFF; margin: 0; font-size: 14px; line-height: 1.5;">${data.commentaire}</p>
        </div>
      </td>
    </tr>
    ` : ""}

    <!-- Bouton appeler -->
    <tr>
      <td style="padding: 20px 30px 40px; text-align: center;">
        <a href="tel:${data.clientPhone}" style="display: inline-block; background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); color: #FFFFFF; text-decoration: none; font-size: 18px; font-weight: bold; padding: 18px 50px; border-radius: 10px;">
          📞 Appeler le client
        </a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0A0A0A; border-top: 1px solid #222222;">
        <p style="color: #666666; margin: 0; font-size: 12px;">
          Email automatique - TAXI BRK Réservation en ligne
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
