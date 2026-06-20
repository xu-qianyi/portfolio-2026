import type { CSSProperties } from "react";
import Link from "next/link";
import projects from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import FufuCat from "@/components/FufuCat";
import BackToTop from "@/components/BackToTop";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  fontWeight: 500,
  color: "var(--color-ink-65)",
  lineHeight: "1.55",
  letterSpacing: "-0.01em",
  margin: 0,
};


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-[36px] pb-[56px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[36px] lg:pb-[56px] lg:px-[120px] lg:mx-[32px]"
        style={{ alignSelf: "stretch" }}
      >
        <div className="flex w-full min-w-0 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-full lg:max-w-[min(100%,calc(50%-1.5rem))] flex flex-col gap-4">
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "28px",
              lineHeight: "1.15",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              color: "var(--color-ink-deep)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            A product designer who codes.
          </h1>
          <p style={HERO_TEXT}>
            Right now I&apos;m at{" "}
            <span className="hero-company-link">
              Datalign
              <span className="hero-company-link-badge" aria-hidden>
                1
              </span>
            </span>
            , building in wealth management. Previously: design at{" "}
            <Link href="/work/ark7" className="hero-company-link">
              ARK7
              <span className="hero-company-link-badge" aria-hidden>
                2
              </span>
            </Link>
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
          <p
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--color-ink-65)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className="ri-map-pin-2-line" style={{ fontSize: "17px", lineHeight: 1 }} aria-hidden />
            Based in Boston, MA · Open to relocation
          </p>
          </div>
          <FufuCat />
        </div>
      </section>

      {/* Project grid */}
      <section className="grid-layout pb-20">
        <div className="col-start-1 col-end-13 grid grid-cols-1 lg:grid-cols-2 gap-x-[48px] gap-y-[24px] items-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} sizes="(min-width: 1024px) 50vw, 100vw" />
          ))}
        </div>
      </section>
      <BackToTop />
    </>
  );
}
