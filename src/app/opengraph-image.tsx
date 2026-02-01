import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TAXI BRK - Taxi Conventionné Strasbourg";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Decorative corners */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 100,
            height: 3,
            background: "linear-gradient(90deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 3,
            height: 100,
            background: "linear-gradient(180deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 100,
            height: 3,
            background: "linear-gradient(270deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 3,
            height: 100,
            background: "linear-gradient(180deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 100,
            height: 3,
            background: "linear-gradient(90deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 3,
            height: 100,
            background: "linear-gradient(0deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 100,
            height: 3,
            background: "linear-gradient(270deg, #D4AF37, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 3,
            height: 100,
            background: "linear-gradient(0deg, #D4AF37, transparent)",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: 160,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid rgba(212, 175, 55, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 145,
            width: 150,
            height: 150,
            borderRadius: "50%",
            border: "1px solid rgba(212, 175, 55, 0.1)",
          }}
        />

        {/* Main title TAXI */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: 8,
            background: "linear-gradient(135deg, #F4E4BC 0%, #D4AF37 50%, #B8960C 100%)",
            backgroundClip: "text",
            color: "#D4AF37",
            marginTop: 20,
          }}
        >
          TAXI
        </div>

        {/* BRK */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#FFFFFF",
            marginTop: -20,
          }}
        >
          BRK
        </div>

        {/* Golden separator line */}
        <div
          style={{
            width: 500,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            marginTop: 20,
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#FFFFFF",
            letterSpacing: 2,
            marginTop: 25,
          }}
        >
          Votre taxi premium à Strasbourg
        </div>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 35,
          }}
        >
          <div
            style={{
              padding: "10px 25px",
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              borderRadius: 20,
              color: "#D4AF37",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            CONVENTIONNÉ CPAM
          </div>
          <div
            style={{
              padding: "10px 25px",
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              borderRadius: 20,
              color: "#D4AF37",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            DISPONIBLE 24H/24
          </div>
          <div
            style={{
              padding: "10px 25px",
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              borderRadius: 20,
              color: "#D4AF37",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            SERVICE PREMIUM
          </div>
        </div>

        {/* Phone number */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            background: "linear-gradient(135deg, #F4E4BC 0%, #D4AF37 50%, #B8960C 100%)",
            backgroundClip: "text",
            color: "#D4AF37",
            marginTop: 40,
            letterSpacing: 4,
          }}
        >
          07 44 22 09 60
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
