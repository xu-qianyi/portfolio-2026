"use client";
import { useState } from "react";

const PANEL_WIDTH = 480;

export default function HomeLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", position: "relative", height: "100dvh", overflow: "hidden" }}>

      {/* Left panel */}
      <div
        style={{
          width: collapsed ? 0 : PANEL_WIDTH,
          flexShrink: 0,
          overflow: "hidden",
          transition: "width 300ms ease",
          background: "#111",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {left}
      </div>

      {/* Drawer toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          position: "absolute",
          left: collapsed ? 0 : PANEL_WIDTH,
          top: "50%",
          transform: "translateY(-50%)",
          transition: "left 300ms ease",
          width: "28px",
          height: "28px",
          background: "rgba(17,17,17,0.9)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "4px",
          color: "rgba(255,255,255,0.6)",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
        aria-label={collapsed ? "Expand panel" : "Collapse panel"}
      >
        {collapsed ? "»" : "«"}
      </button>

      {/* Right panel */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {right}
      </div>

    </div>
  );
}
