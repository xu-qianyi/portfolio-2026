import type { CSSProperties } from "react";
import Link from "next/link";
import projects from "@/data/projects.json";
import extrasProjects from "@/data/extrasProjects.json";
import ProjectCard from "@/components/ProjectCard";
import FufuCat from "@/components/FufuCat";
import BackToTop from "@/components/BackToTop";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: 450,
  color: "rgba(0,0,0,0.8)",
  lineHeight: "1.45rem",
  letterSpacing: "-0.005em",
  margin: 0,
};


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-[44px] pb-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[44px] lg:pb-[64px] lg:px-[72px] lg:mx-[32px]"
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
          <FufuCat />
        </div>
      </section>

      {/* Project grid */}
      <section className="grid-layout pb-20">
        <div className="col-start-1 col-end-13 grid grid-cols-1 lg:grid-cols-3 gap-x-[24px] items-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Divider */}
          <div className="col-span-1 lg:col-span-3 flex items-center gap-3 pt-6 pb-10">
            <span style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 550,
              letterSpacing: "-0.005em",
              color: "var(--color-ink-80)",
              whiteSpace: "nowrap",
            }}>
              Prototypes &amp; Vault
            </span>
            <div className="flex-1 h-px bg-[var(--color-ink-14)]" />
          </div>

          {extrasProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <BackToTop />
    </>
  );
}
