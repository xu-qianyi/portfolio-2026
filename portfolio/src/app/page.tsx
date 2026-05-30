import type { CSSProperties } from "react";
// CSSProperties used by SECTION_LABEL
import projects from "@/data/projects.json";
import extrasProjects from "@/data/extrasProjects.json";
import { FOOTER_EXTERNAL_LINKS } from "@/data/footerLinks";
import ProjectCard from "@/components/ProjectCard";
import AskMartta from "@/components/AskMartta";

const SECTION_LABEL: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.35)",
  marginBottom: "16px",
};

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row" style={{ height: "100dvh", overflow: "hidden" }}>

      {/* Left panel - black */}
      <div
        className="term-widget lg:flex-shrink-0 lg:w-[480px] flex flex-col"
        style={{ background: "#111" }}
      >
        {/* macOS title bar */}
        <div style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E", flexShrink: 0 }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
          <span style={{
            flex: 1,
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          }}>
            zsh
          </span>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto flex flex-col" style={{ padding: "52px 48px" }}>
          <AskMartta />

          {/* Nav links - bottom */}
          <nav
            style={{ marginTop: "auto", paddingTop: "48px" }}
            aria-label="External links"
          >
            {FOOTER_EXTERNAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="left-panel-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Right panel - white, scrollable */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "52px 48px" }}>

        {/* Main projects - 2 col */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Extras projects */}
        <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <p style={SECTION_LABEL}>Side projects</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {extrasProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="framed" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
