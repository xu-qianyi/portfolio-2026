import type { CSSProperties } from "react";
import extrasProjects from "@/data/extrasProjects.json";
import ProjectCard from "@/components/ProjectCard";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "var(--color-ink)",
  lineHeight: "150%",
  letterSpacing: "0px",
  margin: 0,
};

export default function Extras() {
  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-x-clip">
      <section
        className="py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]"
        style={{ alignSelf: "stretch" }}
        aria-label="Extras"
      >
        <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="min-w-0 lg:col-start-1 flex flex-col gap-4">
            <p style={{ ...HERO_TEXT, color: "var(--color-muted)" }}>
              <span style={{ color: "var(--color-ink)" }}>Side projects and AI prototypes</span>
              {" - things I build on weekends to stay close to the tools, and to find out what a new model can actually do."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid-layout pb-20">
        <div className="col-start-1 col-end-13 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {extrasProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="framed"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
