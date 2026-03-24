"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestPos = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 触屏设备不启用自定义光标
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    // Inject a runtime <style> tag appended to <head> so it sits at the highest
    // cascade order — after any browser extension or late-loaded stylesheets.
    const styleEl = document.createElement("style");
    styleEl.textContent =
      "html,body,*,*::before,*::after{cursor:none!important;}";
    document.head.appendChild(styleEl);

    // Belt-and-suspenders: set cursor:none as an inline style on <html>
    // (inline !important beats everything in any external stylesheet).
    document.documentElement.style.setProperty("cursor", "none", "important");

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        el.style.opacity = "1";
      }
    };

    const hide = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        el.style.opacity = "0";
      }
    };

    const onMove = (e: MouseEvent) => {
      latestPos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as Element | null;
      const overGarden = !!target?.closest("[data-garden-section]");
      overGarden ? hide() : show();

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const { x, y } = latestPos.current;
        el.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
      });
    };

    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      styleEl.remove();
      document.documentElement.style.removeProperty("cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        willChange: "transform",
        transform: "translate(-999px, -999px)",
        transition: "opacity 0.15s ease",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 36 36"
        style={{ display: "block" }}
      >
        <polygon
          points="2,2 8.22,25.18 25.18,8.22"
          fill="#EC4523"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
