"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" });
  };

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink-14)] bg-[var(--color-surface)] text-[var(--color-ink-80)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 11V3M3.5 6.5 7 3l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>,
    document.body
  );
}
