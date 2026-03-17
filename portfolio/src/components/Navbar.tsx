"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";

const NAV_LINK: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#1a1a1a",
  letterSpacing: "0.32px",
  lineHeight: "normal",
  textDecoration: "none",
  transition: "color 200ms ease, opacity 200ms ease",
};

const PILL: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px",
  borderRadius: "9999px",
};

type PillId = "resume" | "about" | "extras" | null;
type NavItemId = Exclude<PillId, null>;

const NAV_ITEMS: Array<{
  id: NavItemId;
  label: string;
  href: string;
  external?: boolean;
}> = [
  { id: "resume", label: "Resume", href: "https://drive.google.com", external: true },
  { id: "about", label: "About", href: "/about" },
  { id: "extras", label: "Extras", href: "/extras" },
];

export default function Navbar() {
  const [pillHovered, setPillHovered] = useState<PillId>(null);
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "var(--color-surface)",
      }}
    >
      <nav
        className="px-[24px] lg:px-[72px]"
        style={{
          display: "flex",
          height: "fit-content",
          paddingTop: "12px",
          paddingBottom: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ ...NAV_LINK, display: "inline-flex", alignItems: "center", gap: "6px" }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <img src="/yin.svg" alt="" aria-hidden="true" style={{ height: "18px", width: "18px", objectFit: "contain" }} />
          <span style={{ opacity: logoHovered ? 0.7 : 1, transition: "opacity 200ms ease" }}>Martta XU</span>
        </Link>

      </nav>
    </header>
  );
}
