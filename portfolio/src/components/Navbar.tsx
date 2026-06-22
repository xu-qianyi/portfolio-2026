"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work", href: "/" },
  { label: "Fun", href: "/fun" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0"
      style={{
        zIndex: 40,
        backgroundColor: "color-mix(in srgb, var(--color-surface) 40%, transparent)",
        backdropFilter: "blur(20px) saturate(130%)",
        WebkitBackdropFilter: "blur(20px) saturate(130%)",
        borderBottom: "1px solid color-mix(in srgb, var(--color-ink) 4%, transparent)",
        transition: "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div className="flex items-center justify-between py-5 px-6 lg:px-[120px] lg:mx-[32px]">
        {/* Logo */}
        <Link
          href="/"
          className="group outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)] transition-colors duration-150"
          style={{
            color: "var(--color-ink)",
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="outline-none rounded-md transition-colors h-8 px-3 flex items-center hover:bg-[var(--color-subtle)]"
              style={{
                fontSize: "13px",
                fontWeight: 450,
                color: "var(--color-muted)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <button
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(o => !o)}
            className="relative flex items-center justify-center w-10 h-10 -mr-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)]"
          >
            <span
              className="absolute rounded-full bg-[var(--color-ink)] transition-transform duration-200"
              style={{
                width: 18,
                height: 2,
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transform: menuOpen
                  ? "translateY(0px) rotate(45deg)"
                  : "translateY(-4px) rotate(0deg)",
              }}
            />
            <span
              className="absolute rounded-full bg-[var(--color-ink)] transition-transform duration-200"
              style={{
                width: 18,
                height: 2,
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transform: menuOpen
                  ? "translateY(0px) rotate(-45deg)"
                  : "translateY(4px) rotate(0deg)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="mobile-menu"
        className="sm:hidden"
        style={{
          display: "grid",
          gridTemplateRows: menuOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          borderBottom: menuOpen ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="flex flex-col px-6 pb-6 pt-1 gap-0.5">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md h-10 flex items-center px-3 transition-colors hover:bg-[var(--color-subtle)]"
                style={{
                  fontSize: "15px",
                  fontWeight: 450,
                  color: "var(--color-muted)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
