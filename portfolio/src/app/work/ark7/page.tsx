"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Section = {
  id: string;
  label: string;
  title: string;
  body: string[];
  subheading?: string;
  mediaCaption: string;
  quote: string;
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    label: "Overview",
    title: "Who's ARK7?",
    body: [
      "ARK7 is a platform that simplifies real estate investment by offering fractional shares for as little as $20 per share in premium residential properties across the United States.",
      "The product vision was to make real estate feel as approachable as buying a stock: transparent listings, clear expected returns, and a guided path from exploration to first investment.",
    ],
    mediaCaption:
      "A redesigned landing experience that introduces ARK7's value proposition in under 30 seconds.",
    quote: "",
  },
  {
    id: "current-challenge",
    label: "Current challenge",
    title: "How to retain existing investors and convert new users into regular investors.",
    body: [
      "While awareness was growing, many first-time visitors still hesitated before making a first investment. They could see attractive returns, but they were not yet sure how to evaluate property quality, risk, and timing in a way that felt personally trustworthy.",
      "The key challenge was to reduce cognitive load without oversimplifying important financial details. We needed an experience that guided users toward confident action while still preserving transparency and control.",
    ],
    subheading: "Problem framing",
    mediaCaption:
      "Challenge map showing where users paused between property discovery and funding.",
    quote:
      "The product did not need louder promises. It needed clearer signals users could trust quickly.",
  },
  {
    id: "research",
    label: "Research",
    title: "Why users were curious but hesitant to invest",
    body: [
      "Through interviews, support tickets, and session recordings, we found that users loved the low entry barrier but struggled to judge risk. They wanted simple answers to: How safe is this property? How soon can I exit? How is rental income distributed?",
      "Competitor audits showed that most platforms overloaded users with financial terms before establishing confidence. This led us to prioritize progressive disclosure: first communicate trust signals, then expand into deeper metrics for advanced investors.",
    ],
    subheading: "Marketing analysis",
    mediaCaption:
      "Early funnel analysis highlighting where confidence dropped before account funding.",
    quote:
      "People did not ask for more data first. They asked for clearer meaning and context.",
  },
  {
    id: "design",
    label: "Design",
    title: "Designing for clarity, confidence, and conversion",
    body: [
      "We introduced a modular property detail structure that surfaces three key trust anchors first: ownership model, projected cash flow, and risk notes. Secondary details such as neighborhood trends and legal docs were grouped in expandable panels.",
      "Onboarding was reworked into a guided journey with lightweight education moments and status indicators. Users could understand what to do next without losing momentum, while still feeling in control of financial decisions.",
    ],
    subheading: "Feature prioritization",
    mediaCaption:
      "New information architecture for property pages, balancing depth with readability.",
    quote:
      "We optimized not for clicks, but for confident decisions users can explain back to themselves.",
  },
  {
    id: "summary",
    label: "Summary",
    title: "Outcome and impact",
    body: [
      "After launch, the new case-study-backed product narrative improved engagement quality: more users completed property deep dives and reached funding steps with fewer support-related detours.",
      "The project also gave the team a reusable framework for future launches, aligning product, marketing, and engineering around one shared story: make fractional real-estate investing understandable and trustworthy from first glance to first transaction.",
    ],
    subheading: "Impact",
    mediaCaption:
      "Cross-functional rollout playbook used to scale future campaign and product updates.",
    quote:
      "Great fintech UX turns complexity into confidence without hiding the truth.",
  },
];

const META_ITEMS = [
  { label: "Role", value: "Product designer" },
  { label: "Timeline", value: "2023.10 - 2024.01" },
  {
    label: "Team",
    value: "1 Lead designer, 2 designers, Product manager, Engineers, Marketing team",
  },
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
      setDotY(Math.round(center));
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
            <div ref={navListRef} className="relative pl-5">
              <div className="absolute left-0 top-0.5 bottom-0.5 w-[6px] rounded-full bg-black/[0.06]">
                <div
                  className="absolute left-1/2 w-[5px] h-[5px] rounded-full bg-[#1a1a1a] transition-all duration-300 ease-out"
                  style={{
                    top: dotY,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
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
                        fontSize: "15px",
                        lineHeight: "160%",
                        fontWeight: 500,
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

        <div className="flex flex-col gap-12 md:gap-12">
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
                ARK7 • FinTech
              </h4>
              <h1
                style={{
                  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                  fontSize: "28px",
                  lineHeight: "110%",
                  fontWeight: 500,
                  color: "#1A1A1A",
                  margin: 0,
                }}
              >
                Cultivating a Trusted Investment Community
              </h1>
            </div>

            <div className="w-full aspect-[16/9] border border-black/10 bg-[#f5f5f5] overflow-hidden">
              <Image
                src="/images/ARK7/ARK7_big.png"
                alt="ARK7 case study hero"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                      opacity: 0.8,
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
                    fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                    fontSize: "24px",
                    lineHeight: "120%",
                    fontWeight: 400,
                    color: "#1A1A1A",
                    borderLeft: "2px solid #3F7A66",
                    paddingLeft: "12px",
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

                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "#1A1A1A",
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    {section.id === "overview" && paragraphIndex === 0 ? (
                      <>
                        <a
                          href="https://ark7.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-inline-link"
                        >
                          ARK7
                        </a>{" "}
                        is a platform that simplifies real estate investment by offering fractional
                        shares for as little as $20 per share in premium residential properties
                        across the United States.
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}

                {section.id === "overview" ? (
                  <div className="my-4">
                    <div className="w-full overflow-hidden">
                      <Image
                        src="/images/ARK7/ARK7_official_site.png"
                        alt="ARK7 official website homepage"
                        width={1500}
                        height={988}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                ) : (
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
                      {section.mediaCaption}
                    </p>
                  </div>
                )}

                {section.quote ? (
                  <blockquote
                    style={{
                      fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                      fontSize: "clamp(20px, 2.8vw, 28px)",
                      lineHeight: "135%",
                      fontStyle: "italic",
                      borderLeft: "2px solid var(--color-accent)",
                      paddingLeft: "16px",
                      margin: "8px 0 0",
                      color: "#1A1A1A",
                    }}
                  >
                    {section.quote}
                  </blockquote>
                ) : null}

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
