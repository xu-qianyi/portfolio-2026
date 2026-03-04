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

type PillId = "resume" | "about" | "tools" | null;
type NavItemId = Exclude<PillId, null>;

const NAV_ITEMS: Array<{
  id: NavItemId;
  label: string;
  href: string;
  external?: boolean;
}> = [
  { id: "resume", label: "Resume", href: "https://drive.google.com", external: true },
  { id: "about", label: "About", href: "/about" },
  { id: "tools", label: "Tools", href: "/tools" },
];

export default function Navbar() {
  const [pillHovered, setPillHovered] = useState<PillId>(null);

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
        style={{
          display: "flex",
          height: "fit-content",
          padding: "12px 72px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {/* Logo text only */}
        <Link href="/" style={NAV_LINK}>
          Martta XU
        </Link>

        {/* Right nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              style={{
                ...NAV_LINK,
                ...PILL,
                opacity: pillHovered === item.id ? 0.5 : 1,
              }}
              onMouseEnter={() => setPillHovered(item.id)}
              onMouseLeave={() => setPillHovered(null)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
