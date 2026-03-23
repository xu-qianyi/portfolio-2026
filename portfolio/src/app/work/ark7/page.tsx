"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Section = {
  id: string;
  label: string;
  title: string;
  body: string[];
  subheading?: string;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    label: "Overview",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id urna vitae velit feugiat convallis. Nam volutpat, tellus in blandit ultrices, massa velit placerat dolor, id efficitur eros orci sed est.",
      "Suspendisse potenti. Integer feugiat turpis sed turpis porta, vitae vulputate lectus fringilla. Donec interdum pretium nunc, vitae bibendum justo malesuada at.",
    ],
    subheading: "What is ARK7?",
  },
  {
    id: "research",
    label: "Research",
    title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat lacinia tortor, quis feugiat sem mattis nec. Nunc porta, justo nec facilisis ultricies, augue justo posuere ex, at venenatis nibh massa in justo.",
      "Mauris non turpis id est ullamcorper posuere. Phasellus at augue sed ex pretium dapibus. Proin convallis tortor ut dolor dictum, vitae egestas magna pharetra.",
    ],
    subheading: "Marketing analysis",
  },
  {
    id: "design",
    label: "Design",
    title: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien et velit hendrerit gravida. Nullam blandit est et lorem malesuada, a efficitur mi tristique.",
      "Fusce non volutpat augue. Maecenas in luctus lorem. Nulla facilisi. Morbi sit amet lorem a libero placerat viverra et eget metus.",
    ],
    subheading: "Feature prioritization",
  },
  {
    id: "summary",
    label: "Summary",
    title: "Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut bibendum nisi. Integer sed commodo augue. Etiam non eros at ipsum aliquet ullamcorper.",
      "Aliquam posuere egestas sem, id mattis tortor interdum ac. Cras tristique pretium ligula, id aliquet massa consectetur id.",
    ],
    subheading: "Impact",
  },
];

const META_ITEMS = [
  { label: "Role", value: "Lorem ipsum dolor" },
  { label: "Timeline", value: "Lorem ipsum - Dolor sit" },
  { label: "Team", value: "1 PM, 2 Engineers, 1 Designer" },
  { label: "Skills", value: "Product Design, UX Research, Prototyping" },
];

export default function Ark7CaseStudyPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navListRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [dotY, setDotY] = useState(0);

  const sectionIds = useMemo(() => SECTIONS.map((section) => section.id), []);

  useEffect(() => {
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          ratioMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextId = sectionIds[0];
        let maxRatio = -1;

        sectionIds.forEach((id) => {
          const ratio = ratioMap.get(id) ?? 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            nextId = id;
          }
        });

        setActiveId(nextId);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const updateDotPosition = () => {
      const activeItem = itemRefs.current[activeId];
      const listEl = navListRef.current;
      if (!activeItem || !listEl) return;

      const itemRect = activeItem.getBoundingClientRect();
      const listRect = listEl.getBoundingClientRect();
      const center = itemRect.top - listRect.top + itemRect.height / 2;
      setDotY(center);
    };

    updateDotPosition();
    window.addEventListener("resize", updateDotPosition);
    return () => window.removeEventListener("resize", updateDotPosition);
  }, [activeId]);

  return (
    <div className="min-h-screen px-6 lg:px-[72px] py-12">
      <main className="grid mx-auto grid-cols-1 md:grid-cols-[1fr_800px_1fr] gap-0">
        <aside className="md:sticky md:top-20 md:h-fit pb-8 md:pb-0">
          <nav className="hidden md:block mt-4">
            <div ref={navListRef} className="relative pl-4">
              <div className="absolute left-[3px] top-0.5 bottom-0.5 w-px bg-black/10" />
              <div
                className="absolute w-[5px] h-[5px] rounded-full bg-[#1a1a1a] transition-all duration-300 ease-out"
                style={{
                  left: "1px",
                  top: dotY,
                  transform: "translateY(-50%)",
                }}
              />
              <div className="flex flex-col items-start gap-1">
                {SECTIONS.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <button
                      key={section.id}
                      ref={(el) => {
                        itemRefs.current[section.id] = el;
                      }}
                      className="text-left transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "13px",
                        lineHeight: "160%",
                        fontWeight: isActive ? 500 : 400,
                        color: "#1A1A1A",
                        opacity: isActive ? 1 : 0.4,
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        cursor: "inherit",
                      }}
                      onClick={() =>
                        sectionRefs.current[section.id]?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex flex-col gap-12 md:gap-24">
          <header className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgba(26,26,26,0.65)",
                  margin: 0,
                }}
              >
                ARK7 • 2023
              </h4>
              <h1
                style={{
                  fontFamily: "var(--font-playfair-display), Georgia, serif",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  lineHeight: "110%",
                  fontWeight: 500,
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h1>
            </div>

            <div className="w-full aspect-[16/9] border border-black/10 bg-[#f5f5f5] overflow-hidden">
              <Image
                src="/images/preview/website-placeholder.svg"
                alt="ARK7 placeholder hero image"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {META_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <h4
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1A1A1A",
                      margin: 0,
                    }}
                  >
                    {item.label}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#1A1A1A",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-12">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="flex flex-col gap-4 scroll-mt-24"
              >
                <h4
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: "rgba(26,26,26,0.7)",
                    margin: 0,
                  }}
                >
                  {section.label}
                </h4>

                <h2
                  style={{
                    fontFamily: "var(--font-playfair-display), Georgia, serif",
                    fontSize: "clamp(24px, 3.6vw, 40px)",
                    lineHeight: "120%",
                    fontWeight: 500,
                    color: "#1A1A1A",
                    margin: 0,
                  }}
                >
                  {section.title}
                </h2>

                {section.subheading ? (
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "20px",
                      lineHeight: "130%",
                      fontWeight: 500,
                      color: "rgba(26,26,26,0.9)",
                      margin: "16px 0 0",
                    }}
                  >
                    {section.subheading}
                  </h3>
                ) : null}

                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#1A1A1A",
                      margin: 0,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-[60%_auto] md:items-end gap-6 my-4">
                  <div className="w-full border border-black/10 bg-[#f5f5f5] overflow-hidden">
                    <Image
                      src="/images/preview/website-placeholder.svg"
                      alt={`${section.label} placeholder`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14px",
                      lineHeight: "150%",
                      color: "rgba(26,26,26,0.7)",
                      margin: 0,
                    }}
                  >
                    Lorem ipsum caption for {section.label.toLowerCase()} media block.
                  </p>
                </div>

                <blockquote
                  style={{
                    fontFamily: "var(--font-playfair-display), Georgia, serif",
                    fontSize: "clamp(20px, 2.8vw, 28px)",
                    lineHeight: "135%",
                    fontStyle: "italic",
                    borderLeft: "2px solid var(--color-accent)",
                    paddingLeft: "16px",
                    margin: "8px 0 0",
                    color: "#1A1A1A",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </blockquote>

                {index < SECTIONS.length - 1 ? <div className="h-px w-full bg-black/10 mt-8" /> : null}
              </section>
            ))}
          </div>
        </div>

        <div className="hidden md:block" />
      </main>
    </div>
  );
}
