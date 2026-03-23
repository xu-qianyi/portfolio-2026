"use client";

import { useEffect, useState, type CSSProperties } from "react";

const TEXT_STYLE: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "1.25",
};

const LINKS = [
  { label: "CHANGELOG", href: "https://github.com/xu-qianyi/portfolio/releases", dataNum: "1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/marttaxu", dataNum: "2" },
  { label: "X", href: "https://x.com/littlemartta", dataNum: "3" },
];

export default function SiteFooter() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
    const tick = () => setTimeStr(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(26,26,26,0.14)",
        padding: "20px 72px 28px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
        <span style={TEXT_STYLE}>
          {timeStr ? `${timeStr.replace(/\s*(am|pm)/i, "")} Boston, MA` : "Boston, MA"}
        </span>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 500,
          }}
          aria-label="Footer links"
        >
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-nav-link"
              data-num={item.dataNum}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
