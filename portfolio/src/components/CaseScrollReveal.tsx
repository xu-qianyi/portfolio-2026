"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type CaseScrollRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Scroll / enter reveal. Important: never set `visible` in the same layout frame as mount —
 * that skips CSS transitions. First-screen blocks use double rAF; below-fold uses IO.
 */
export default function CaseScrollReveal({
  children,
  className = "",
  style,
}: CaseScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const onFirstScreen = rect.top < vh * 0.92 && rect.bottom > 12;

    if (onFirstScreen) {
      const handles = { inner: 0 };
      const outer = requestAnimationFrame(() => {
        handles.inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(handles.inner);
      };
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0.05 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cn = [
    "case-scroll-reveal",
    visible ? "case-scroll-reveal--visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cn} style={style}>
      {children}
    </div>
  );
}
