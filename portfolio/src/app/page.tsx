import type { CSSProperties } from "react";
import Image from "next/image";
import projects from "@/data/projects.json";
import LottiePreview from "@/components/LottiePreview";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "140%",
  letterSpacing: "0px",
  margin: 0,
};

const PROJECT_META: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(26,26,26,0.5)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const PROJECT_HEADLINE: CSSProperties = {
  fontFamily: "var(--font-playfair-display), 'Playfair Display', Georgia, serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "130%",
  color: "#1A1A1A",
  margin: 0,
};

function DotSeparator() {
  return (
    <span
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "rgba(26,26,26,0.3)",
        flexShrink: 0,
      }}
    />
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div style={{ breakInside: "avoid", marginBottom: "48px" }}>
      <a
        href={project.href}
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: `${project.width} / ${project.height}`,
          border: "1px solid rgba(204,209,218,0.2)",
          overflow: "hidden",
          backgroundColor: "#F5F5F5",
          cursor: "url('/pixel cursor.svg') 0 0, pointer",
        }}
      >
        {project.image.endsWith(".json") ? (
          <LottiePreview src={project.image} />
        ) : (
          <Image
            src={project.image}
            alt={project.headline}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </a>

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={PROJECT_META}>
          <span>{project.company}</span>
          <DotSeparator />
          <span>{project.industry}</span>
          <DotSeparator />
          <span>{project.date}</span>
          <DotSeparator />
          <span>{project.type}</span>
        </p>
        <p style={PROJECT_HEADLINE}>{project.headline}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="grid lg:grid-cols-2 gap-y-[80px] gap-x-[16px]"
        style={{
          padding: "64px 72px",
          alignSelf: "stretch",
        }}
      >
        <p style={HERO_TEXT}>
          My design practice lives in the making - through .fig files, code, and increasingly AI. Right now I’m building in wealth management, where access and clarity matter most. Previously: engineering at{" "}
          <a
            href="https://www.thoughtworks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-company-link"
          >
            Thoughtworks
          </a>
          , user research at{" "}
          <a
            href="https://looklook.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-company-link"
          >
            Looklook
          </a>
          , strategy at{" "}
          <a
            href="https://www.pwc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-company-link"
          >
            PwC
          </a>{" "}
          and{" "}
          <a
            href="https://www.jll.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-company-link"
          >
            JLL
          </a>
          .
        </p>
        {/* Intentional negative space on large screens only */}
        <div aria-hidden="true" className="hidden lg:block" />
      </section>

      {/* Masonry project grid */}
      <section className="columns-1 lg:columns-2 gap-x-[24px]" style={{ padding: "0 72px 80px" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
