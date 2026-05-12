"use client";

import { useEffect, useRef } from "react";

type HighlightVariant = "peach" | "yellow" | "pink" | "green" | "blue";

export default function Highlight({
  children,
  variant = "peach",
  duration = 900,
  delay = 0,
}: {
  children: React.ReactNode;
  variant?: HighlightVariant;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty("--highlight-duration", `${duration}ms`);
          el.style.setProperty("--highlight-delay", `${delay}ms`);
          el.classList.add("highlight--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration, delay]);

  return (
    <mark ref={ref} className={`highlight highlight-${variant}`}>
      {children}
    </mark>
  );
}
