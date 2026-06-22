import projects from "@/data/projects.json";
import ProjectCard from "@/components/ProjectCard";
import FufuCat from "@/components/FufuCat";
import BackToTop from "@/components/BackToTop";

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
            className="group"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "24px",
              lineHeight: "1.25",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              color: "var(--color-ink-deep)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Hi, I am Martta{" "}
            <span
              className="relative inline-block align-baseline"
              style={{ perspective: "200px", color: "var(--color-accent)" }}
            >
              {/* invisible spacer keeps layout width stable */}
              <span aria-hidden style={{ visibility: "hidden" }}>XU</span>
              <span
                className="absolute inset-0 transition-transform duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
              >
                <span className="absolute inset-0 [backface-visibility:hidden]">XU</span>
                <span className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">UX</span>
              </span>
            </span>
            .
            <br />
            <span style={{ color: "var(--color-ink-65)" }}>A product designer who codes.</span>
          </h1>
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
