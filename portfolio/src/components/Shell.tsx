"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import AnimalGardenFooter from "./AnimalGardenFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setFooterH(entry.contentRect.height);
    });
    ro.observe(footerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* ── Main content: covers the footer while scrolling ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "var(--color-surface)",
          minHeight: "100vh",
          marginBottom: footerH,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </div>
      </div>

      {/* ── Footer: sticky at the bottom, revealed when main scrolls away ── */}
      <div
        ref={footerRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      >
        <AnimalGardenFooter />
      </div>
    </>
  );
}
