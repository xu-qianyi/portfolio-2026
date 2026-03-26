import type { CSSProperties } from "react";
import Image from "next/image";
import projects from "@/data/projects.json";
import { FOOTER_EXTERNAL_LINKS } from "@/data/footerLinks";
import LottiePreview from "@/components/LottiePreview";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "150%",
  letterSpacing: "0px",
  margin: 0,
};

/** Home hero external links: row on tablet/mobile, column from lg (matches old footer stack on desktop) */
const HERO_NAV_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: 15,
  fontWeight: 500,
};

const PROJECT_META: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--color-muted)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const PROJECT_HEADLINE: CSSProperties = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
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
        className="project-card-link"
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: `${project.width} / ${project.height}`,
          border: "1px solid rgba(204,209,218,0.2)",
          overflow: "hidden",
          backgroundColor: "#F5F5F5",
        }}
      >
        <div className="project-card-media">
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
        </div>
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
        className="py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]"
        style={{ alignSelf: "stretch" }}
      >
        <div className="flex w-full min-w-0 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="min-w-0 max-w-full lg:max-w-[min(100%,calc(50%-1.5rem))]" style={HERO_TEXT}>
            My design practice lives in the making - through .fig files, code, and increasingly AI. And in the curating - knowing where to linger, and where to let go. Right now I&apos;m at{" "}
            <span className="hero-company-link">
              Datalign
              <span className="hero-company-link-badge" aria-hidden>
                1
              </span>
            </span>
            , building in wealth management. Previously: design(contract) at{" "}
            <a href="/work/ark7" className="hero-company-link">
              ARK7
              <span className="hero-company-link-badge" aria-hidden>
                2
              </span>
            </a>
            , engineering at{" "}
            <a
              href="https://www.thoughtworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              Thoughtworks
              <span className="hero-company-link-badge" aria-hidden>
                3
              </span>
            </a>
            , user research at{" "}
            <a
              href="https://looklook.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              Looklook
              <span className="hero-company-link-badge" aria-hidden>
                4
              </span>
            </a>
            , strategy at{" "}
            <a
              href="https://www.pwc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              PwC
              <span className="hero-company-link-badge" aria-hidden>
                5
              </span>
            </a>{" "}
            and{" "}
            <a
              href="https://www.jll.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              JLL
              <span className="hero-company-link-badge" aria-hidden>
                6
              </span>
            </a>
            .
          </p>
          <nav
            style={HERO_NAV_TEXT}
            className="flex shrink-0 self-end flex-row flex-wrap items-baseline justify-end gap-x-5 gap-y-2 lg:flex-col lg:items-end lg:gap-1 lg:self-auto"
            aria-label="External links"
          >
            {FOOTER_EXTERNAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-nav-link"
                data-num={item.dataNum}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Project grid */}
      <section className="grid-layout pb-20">
        <div className="col-start-1 col-end-13 columns-1 lg:columns-2 gap-x-[24px]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
