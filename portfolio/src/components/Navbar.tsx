"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINK: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
};

const NAV_ITEMS = [
  { label: "Work",   href: "/" },
  { label: "About",  href: "/about" },
  { label: "Extras", href: "/extras" },
];

const RESUME_HREF = "https://drive.google.com";

export default function Navbar() {
  const pathname = usePathname();
  const [indicatorLeft, setIndicatorLeft] = useState<number | null>(null);
  const [menuOpen,      setMenuOpen]      = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeIdx = NAV_ITEMS.findIndex(item =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    const el        = linkRefs.current[activeIdx];
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect        = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicatorLeft(elRect.left - containerRect.left + elRect.width / 2);
  }, [pathname]);

  // Close menu on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "var(--color-surface)",
      }}
    >
      <nav className="grid-layout items-center py-[12px]">
        {/* Logo */}
        <Link
          href="/"
          className="col-start-1 col-span-6 md:col-span-1"
          style={{ ...NAV_LINK, color: "var(--color-ink)", display: "inline-flex", alignItems: "center" }}
        >
          <span style={{ whiteSpace: "nowrap" }}>
            Martta XU
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          ref={containerRef}
          className="col-start-7 col-span-4 md:col-start-2 md:col-span-11 hidden md:flex items-center"
          style={{ position: "relative", gap: "24px" }}
        >
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              ref={el => { linkRefs.current[i] = el; }}
              className="nav-tab"
              style={NAV_LINK}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-tab"
            style={NAV_LINK}
          >
            Resume
          </a>

          {indicatorLeft !== null && (
            <span
              style={{
                position: "absolute",
                bottom: "-5px",
                left: indicatorLeft,
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "3px solid transparent",
                borderRight: "3px solid transparent",
                borderBottom: "3px solid var(--color-accent)",
                transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="col-start-7 col-span-6 md:hidden flex justify-end items-center"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className="md:hidden"
        style={{
          display: "grid",
          gridTemplateRows: menuOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: menuOpen ? "1px solid #e5e5e5" : "1px solid transparent",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "8px 24px 28px", display: "flex", flexDirection: "column" }}>
            {NAV_ITEMS.map(item => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ ...NAV_LINK, color: "var(--color-ink)", fontSize: "15px", opacity: isActive ? 1 : 0.4, padding: "9px 0" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...NAV_LINK, color: "var(--color-ink)", fontSize: "15px", opacity: 0.4, padding: "9px 0" }}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const bar: CSSProperties = {
    position: "absolute",
    left: 0,
    width: 22,
    height: 1.5,
    backgroundColor: "#1a1a1a",
    borderRadius: 1,
  };
  return (
    <div style={{ width: 22, height: 14, position: "relative" }}>
      <span style={{
        ...bar,
        top: 0,
        transformOrigin: "center",
        transform: open ? "translateY(6.25px) rotate(45deg)" : "none",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
      <span style={{
        ...bar,
        top: "50%",
        marginTop: -0.75,
        opacity: open ? 0 : 1,
        transform: open ? "scaleX(0.3)" : "scaleX(1)",
        transition: "opacity 0.2s ease, transform 0.25s ease",
      }} />
      <span style={{
        ...bar,
        bottom: 0,
        transformOrigin: "center",
        transform: open ? "translateY(-6.25px) rotate(-45deg)" : "none",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
    </div>
  );
}
