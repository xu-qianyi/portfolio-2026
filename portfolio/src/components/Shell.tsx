"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
        <Navbar />
        <main key={pathname} style={{ flex: 1 }}>
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
