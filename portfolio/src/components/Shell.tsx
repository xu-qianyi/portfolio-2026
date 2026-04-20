"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";

function scrollToHashElement() {
  if (typeof window === "undefined") return;
  const raw = window.location.hash;
  if (!raw || raw.length < 2) return;
  const id = decodeURIComponent(raw.slice(1));
  document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname === "/extras/garden";

  useEffect(() => {
    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHashElement);
      });
    };
    run();
    window.addEventListener("hashchange", scrollToHashElement);
    return () => window.removeEventListener("hashchange", scrollToHashElement);
  }, [pathname]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!hideChrome && <Navbar />}
        <main
          key={pathname}
          className="page-shell-main"
          style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          {children}
        </main>
      </div>
      {!hideChrome && <SiteFooter />}
    </div>
  );
}
