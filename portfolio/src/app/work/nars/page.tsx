"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import Highlight from "@/components/Highlight";

const BODY = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  lineHeight: "1.45rem",
  letterSpacing: "-0.005em",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;


type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "outcome", label: "Outcome" },
];

const META_ITEMS = [
  { label: "Team", value: "3 Researchers" },
  { label: "Timeframe", value: "2022 (1 month)" },
  { label: "Tools", value: "LookLook Analytics, MS PowerPoint, MS Excel" },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 550,
          letterSpacing: "-0.005em",
          color: "var(--color-ink-80)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--color-ink-14)]" />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
        fontSize: "18px",
        lineHeight: "1.4",
        fontWeight: 500,
        color: "var(--color-ink)",
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

function NarsMobileNav({
  activeId,
  sectionRefs,
}: {
  activeId: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}) {
  return (
    <nav
      aria-label="Case study sections"
      className="md:hidden sticky top-14 z-10 bg-[var(--color-surface)] border-b border-[var(--color-ink-14)]"
    >
      <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                sectionRefs.current[section.id]?.scrollIntoView({
                  behavior: prefersReduced ? "auto" : "smooth",
                  block: "start",
                });
              }}
              className={`shrink-0 min-h-11 px-3 py-2.5 border-b-2 transition-[color,border-color] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isActive
                  ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-muted)]"
              }`}
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: isActive ? 500 : 400,
                background: "transparent",
                cursor: "inherit",
              }}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function NarsCaseStudyPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navListRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [dotY, setDotY] = useState(0);

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);

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
          if (ratio > maxRatio) { maxRatio = ratio; nextId = id; }
        });
        setActiveId(nextId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] },
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
      setDotY(Math.round(itemRect.top - listRect.top + itemRect.height / 2));
    };
    updateDotPosition();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateDotPosition, 150); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(resizeTimer); };
  }, [activeId]);

  return (
    <div className="min-h-screen px-6 py-14 md:py-16 lg:px-[72px] lg:py-16">
      <main className="mx-auto grid max-w-[1800px] grid-cols-1 gap-0 md:grid-cols-[1fr_auto_1fr] md:gap-8">

        {/* Sidebar nav */}
        <aside className="md:sticky md:top-20 md:h-fit pb-8 md:pb-0 min-w-0 md:min-w-40">
          <nav className="hidden md:block mt-4">
            <div ref={navListRef} className="relative pl-5">
              <div className="absolute left-0 top-0.5 bottom-0.5 w-[6px] rounded-full bg-[var(--color-ink-06)]">
                <div
                  className="absolute left-1/2 w-[5px] h-[5px] rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-out"
                  style={{ top: dotY, transform: "translate(-50%, -50%)" }}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                {SECTIONS.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      ref={(el) => { itemRefs.current[section.id] = el; }}
                      className="text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "12px",
                        lineHeight: "160%",
                        fontWeight: 500,
                        color: "var(--color-ink)",
                        opacity: isActive ? 1 : 0.4,
                        background: "transparent",
                        border: 0,
                        padding: 0,
                        cursor: "inherit",
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

        {/* Main content */}
        <div className="flex w-full min-w-0 max-w-[800px] flex-col gap-0">

          {/* Header */}
          <header className="pb-8">
            <CaseScrollReveal className="flex flex-col gap-3 mb-4">
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-70)",
                  margin: 0,
                }}
              >
                LookLook &times; NARS / User Research
              </p>
              <h1
                style={{
                  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                NARS Longwear Foundation concept testing - US &amp; China insights
              </h1>
              <p style={{ ...BODY, marginTop: "4px" }}>
                <Highlight variant="peach" duration={1200}>I designed a cross-cultural research framework</Highlight> to surface divergent consumer expectations across the US and Chinese beauty markets - synthesizing findings that directly shaped NARS&apos;s formulation direction, regional naming strategy, and market positioning for a product now on shelves.
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal
              delay={60}
              className="w-full overflow-hidden rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-subtle)] mb-0"
            >
              <div className="relative">
                <Image
                  src="/images/NARS/Nars_preview.webp"
                  alt="NARS project files organized in LookLook workspace"
                  width={2400}
                  height={1588}
                  className="block w-full"
                  priority
                />
                <span
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.08)" }}
                />
              </div>
            </CaseScrollReveal>

            <CaseScrollReveal delay={120}>
              <div
                className="grid grid-cols-3 gap-x-8 gap-y-4 mt-6 pt-5"
                style={{ borderTop: "1px solid var(--color-ink-06)" }}
              >
                {META_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <div
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: ".04em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-70)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "13px",
                        lineHeight: "1.45",
                        color: "var(--color-ink-65)",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </CaseScrollReveal>
          </header>

          <NarsMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* Sections */}
          <div className="flex flex-col">

            {/* Overview */}
            <section
              id="overview"
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <CaseScrollReveal>
                <SectionDivider label="Overview" />
                <h2
                  style={{
                    fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                    fontSize: "24px",
                    lineHeight: "1.4",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  Decoding cross-market complexity before the product brief locked
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                <p style={BODY}>
                  NARS came to{" "}
                  <a
                    href="https://www.looklook.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-inline-link"
                  >
                    LookLook
                  </a>
                  {" "}with an unresolved question: which formulation direction and product story would resonate across two structurally different beauty markets. Without US-China comparative data, any positioning decision carried real commercial risk.
                </p>
                <p style={BODY}>
                  I designed and ran the research end-to-end - from participant screener to final synthesis - structured to isolate where the two markets converged and where they required separate strategies.
                </p>

                <div className="flex flex-col gap-3 mt-2">
                  <SubHeading>The challenge</SubHeading>
                  <p style={BODY}>
                    NARS had strong category intuition but no cross-market data to validate it. With a formulation decision and naming brief both approaching deadlines, the team needed fast, credible signal on which product attributes would land - and which required different positioning in each market.
                  </p>
                  <p style={BODY}>
                    Going in without that data meant committing to a strategy built on assumptions. The research brief was designed to eliminate that risk before the product brief locked.
                  </p>
                </div>
              </CaseScrollReveal>
            </section>

            {/* Research */}
            <section
              id="research"
              ref={(el) => { sectionRefs.current["research"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <CaseScrollReveal>
                <SectionDivider label="Research" />
                <h2
                  style={{
                    fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                    fontSize: "24px",
                    lineHeight: "1.4",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  Listening to both markets at once
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                <p style={BODY}>
                  The study ran in parallel across both markets. Running them simultaneously was a deliberate design choice: it let us separate universal consumer truths from market-specific preferences, rather than over-indexing on either.
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  <SubHeading>What we did</SubHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
                    {[
                      {
                        step: "01",
                        label: "Recruitment & screening",
                        body: "Screened participants across both markets for representative coverage of skin tones, foundation experience, and usage frequency - ensuring the sample could surface meaningful differences, not just noise.",
                      },
                      {
                        step: "02",
                        label: "In-depth interviews",
                        body: "One-on-one sessions probing current foundation routines, pain points, and reactions to longwear claims - including how users evaluate and trust those claims in each market.",
                      },
                      {
                        step: "03",
                        label: "Concept testing",
                        body: "Presented multiple formulation directions and product concepts, capturing preference rankings and the reasoning behind them to identify which attributes were genuinely valued versus merely tolerated.",
                      },
                      {
                        step: "04",
                        label: "Naming feedback",
                        body: "Tested candidate product names for comprehension, resonance, and brand fit in both cultural contexts - a critical input given how differently English and phonetic names perform in the Chinese market.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg p-4"
                        style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            color: "rgba(26,26,26,0.85)",
                            marginBottom: "4px",
                          }}
                        >
                          {item.step}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            color: "rgba(26,26,26,0.85)",
                            marginBottom: "6px",
                            lineHeight: "1.3",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "13px",
                            lineHeight: "1.45",
                            color: "rgba(26,26,26,0.5)",
                          }}
                        >
                          {item.body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </CaseScrollReveal>
            </section>

            {/* Outcome */}
            <section
              id="outcome"
              ref={(el) => { sectionRefs.current["outcome"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <CaseScrollReveal>
                <SectionDivider label="Outcome" />
                <h2
                  style={{
                    fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                    fontSize: "24px",
                    lineHeight: "1.4",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--color-ink)",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  What the data decided
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-4">
                  <SubHeading>Key findings</SubHeading>
                  <div className="flex flex-col gap-4 my-1">
                    {[
                      {
                        label: "Breathability ranked above shade range",
                        body: "Both markets put breathability and transfer-resistance first - ahead of shade range and finish. This challenged NARS's initial formulation assumptions and redirected the brief.",
                      },
                      {
                        label: "Markets split on what \"good\" means",
                        body: "Chinese consumers prioritized ingredient transparency and skin-friendly claims. US consumers prioritized longevity and color payoff. The same product required two distinct positioning stories.",
                      },
                      {
                        label: "Names don't translate - they lose",
                        body: "English-derived names outperformed phonetic transliterations in the Chinese market. This finding directly determined the final go-to-market naming approach.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg p-4"
                        style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            color: "rgba(26,26,26,0.85)",
                            marginBottom: "6px",
                            lineHeight: "1.3",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "13px",
                            lineHeight: "1.45",
                            color: "rgba(26,26,26,0.5)",
                          }}
                        >
                          {item.body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CaseScrollReveal>

              <CaseScrollReveal delay={120} className="flex flex-col gap-3.5 mt-8">
                <div className="flex flex-col gap-3">
                  <SubHeading>Full findings in the slide deck</SubHeading>
                  <p style={BODY}>
                    The complete output - methodology, verbatim quotes, concept rankings, and synthesis - is in the 103-page slide deck below. It was delivered to the NARS team and used to inform the final product brief.
                  </p>
                </div>

                <a
                  href="https://drive.google.com/file/d/14pRJPMr1qvlEUS57hHj04Kv8DfdzimoV/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block no-underline mt-1"
                  aria-label="Open NARS Longwear Foundation concept testing slide deck in Google Drive (opens in new tab)"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src="/images/NARS/Nars_slide_preview.webp"
                      alt="NARS Longwear Foundation concept testing slide deck preview"
                      width={1602}
                      height={906}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        Open slide deck &rarr;
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "12px",
                      color: "var(--color-muted)",
                      margin: "8px 0 0 0",
                    }}
                  >
                    NARS Longwear Foundation Concept Testing Study &middot; Report by Gretchen, Martta, Luca &middot; Google Drive
                  </p>
                </a>
              </CaseScrollReveal>
            </section>

          </div>

          {/* Next case */}
          <div className="mt-12 pt-8 md:mt-16">
            <a
              href="/work/ark7"
              className="group flex flex-col gap-3 no-underline"
              aria-label="Next project: ARK7, 2023 — Building trust in fractional real estate investing"
            >
              <SectionDivider label="Next project" />
              <p
                style={{
                  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                  fontSize: "18px",
                  lineHeight: "140%",
                  fontWeight: 400,
                  margin: 0,
                }}
                className="text-[var(--color-muted)] transition-colors duration-200 ease-out group-hover:text-[#1A1A1A]"
              >
                Building trust in fractional real estate investing{" "}
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                  &rarr;
                </span>
              </p>
            </a>
          </div>

        </div>

        <div className="hidden md:block" />
      </main>
    </div>
  );
}
