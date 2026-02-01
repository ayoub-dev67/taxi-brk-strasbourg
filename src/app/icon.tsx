import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        {/* Border */}
        <div
          style={{
            position: "absolute",
            inset: 1,
            borderRadius: "3px",
            border: "2px solid #D4AF37",
          }}
        />
        {/* TB Text */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 16,
            background: "linear-gradient(135deg, #F4E4BC, #D4AF37, #B8960C)",
            backgroundClip: "text",
            color: "#D4AF37",
          }}
        >
          TB
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
