"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work",   href: "/" },
  { label: "About",  href: "/about" },
  { label: "Extras", href: "/extras" },
];

const RESUME_HREF = "https://drive.google.com"; // TODO: replace with actual resume link

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 backdrop-blur-md"
      style={{
        zIndex: 40,
        backgroundColor: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
        transition: "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      <div className="flex items-center justify-between py-5 px-6 lg:px-[72px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)] text-[rgba(26,26,26,0.85)] hover:text-[#000000] transition-colors duration-150"
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Martta XU
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="outline-none rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)] transition-colors h-8 px-3 flex items-center hover:bg-[var(--color-subtle)]"
              style={{
                fontSize: "12px",
                fontWeight: 450,
                color: "rgba(26, 26, 26, 0.55)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-ink)] transition-colors h-8 px-3 flex items-center hover:bg-[var(--color-subtle)]"
            style={{
              fontSize: "12px",
              fontWeight: 450,
              color: "rgba(26, 26, 26, 0.55)",
              textDecoration: "none",
            }}
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <button
            aria-expanded={menuOpen}
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
                  fontSize: "14px",
                  fontWeight: 450,
                  color: "rgba(26, 26, 26, 0.55)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md h-10 flex items-center px-3 transition-colors hover:bg-[var(--color-subtle)]"
              style={{
                fontSize: "14px",
                fontWeight: 450,
                color: "rgba(26, 26, 26, 0.55)",
                textDecoration: "none",
              }}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
