import type { CSSProperties } from "react";

const HEADLINE: CSSProperties = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "48px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "52px",
  letterSpacing: "0.96px",
  margin: 0,
  textAlign: "center",
};

export default function NotFound() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 24px",
      }}
    >
      {/* 404 background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "12rem",
            fontWeight: 700,
            color: "rgba(26,26,26,0.06)",
            lineHeight: 1,
          }}
        >
          404
        </span>
      </div>

      {/* Content */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={HEADLINE}>This page can&apos;t be found</h1>
      </div>
    </div>
  );
}
