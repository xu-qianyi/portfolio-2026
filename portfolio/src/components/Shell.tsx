"use client";

import Navbar from "./Navbar";
import AnimalGardenFooter from "./AnimalGardenFooter";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "stretch" }}>
      <div
        style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <AnimalGardenFooter />
      </div>
    </div>
  );
}
