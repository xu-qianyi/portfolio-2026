import type { CSSProperties } from "react";
import extrasProjects from "@/data/extrasProjects.json";
import ProjectCard from "@/components/ProjectCard";
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

export default function Fun() {
  return (
    <>
      {/* Intro */}
      <section
        className="pt-[44px] pb-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[44px] lg:pb-[64px] lg:px-[120px] lg:mx-[32px]"
        style={{ alignSelf: "stretch" }}
      >
        <p className="min-w-0 max-w-full lg:max-w-[min(100%,calc(50%-1.5rem))]" style={HERO_TEXT}>
          Experiments, games, and small things I built for the joy of it - mostly with Claude code, on weekends.
        </p>
      </section>

      {/* Project grid */}
      <section className="grid-layout pb-20">
        <div className="col-start-1 col-end-13 grid grid-cols-1 lg:grid-cols-3 gap-x-[24px] gap-y-[24px] items-start">
          {extrasProjects.map((project) => (
            <ProjectCard key={project.id} project={project} sizes="(min-width: 1024px) 33vw, 100vw" />
          ))}
        </div>
      </section>
      <BackToTop />
    </>
  );
}
