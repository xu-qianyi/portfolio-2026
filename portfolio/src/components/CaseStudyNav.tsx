"use client";

type Section = { id: string; label: string };

type Props = {
  sections: Section[];
  activeId: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  navListRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function CaseStudyNav({ sections, activeId, sectionRefs, navListRef }: Props) {
  return (
    <aside className="md:sticky md:top-24 md:h-fit pb-8 md:pb-0 md:flex md:justify-start">
      <nav className="hidden md:block w-[140px]">
        <div ref={navListRef}>
          <div className="flex flex-col" style={{ gap: "1px" }}>
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.4,
                    color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                    background: "transparent",
                    border: 0,
                    padding: "5px 0",
                    cursor: "pointer",
                    transition: "color 0.18s",
                  }}
                  onClick={() => {
                    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    sectionRefs.current[section.id]?.scrollIntoView({
                      behavior: prefersReduced ? "auto" : "smooth",
                      block: "start",
                    });
                  }}
                >
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
