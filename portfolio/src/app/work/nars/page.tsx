"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "@/components/Img";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import Highlight from "@/components/Highlight";
import BackToTop from "@/components/BackToTop";
import ProjectCard from "@/components/ProjectCard";
import {
  CASE_BODY,
  CASE_H1,
  CASE_H2,
  CASE_EYEBROW,
  SectionDivider,
  SubHeading,
  CaseMetaGrid,
  CaseSubSection,
  CaseMethodGrid,
  type MethodItem,
} from "@/components/CaseStudy";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "outcome", label: "Outcome" },
];

const META_ITEMS = [
  { label: "Team", value: "3 Researchers" },
  { label: "Timeframe", value: "1 month" },
  { label: "Tools", value: "LookLook Analytics, MS PowerPoint, MS Excel" },
];

const NARS_METHOD_ITEMS: MethodItem[] = [
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
];

const NARS_OUTCOME_ITEMS: MethodItem[] = [
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
];

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
      className="md:hidden sticky top-[61px] z-10 bg-[var(--color-surface)] border-b border-[var(--color-ink-14)]"
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
                fontSize: "15px",
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
  const navListRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

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

  return (
    <div className="min-h-screen py-14 md:py-16">
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 px-4 md:px-8 md:grid-cols-[1fr_minmax(0,840px)_1fr] md:items-start">

        {/* Sidebar nav */}
        <CaseStudyNav
          sections={SECTIONS}
          activeId={activeId}
          sectionRefs={sectionRefs}
          navListRef={navListRef}
        />

        {/* Main content */}
        <div className="flex w-full min-w-0 max-w-[840px] flex-col gap-0">

          {/* Header */}
          <header className="pb-8">
            <CaseScrollReveal className="flex flex-col gap-3 mb-4">
              <p style={CASE_EYEBROW}>
                LookLook &times; NARS / User Research
              </p>
              <h1 style={{ ...CASE_H1, textWrap: "pretty" }}>
                NARS Longwear Foundation concept testing<br />- US &amp; China insights
              </h1>
              <p style={{ ...CASE_BODY, marginTop: "4px" }}>
                <Highlight variant="peach" duration={1200}>I designed a cross-cultural research framework</Highlight> to surface divergent consumer expectations across the US and Chinese beauty markets - synthesizing findings that directly shaped NARS&apos;s formulation direction, regional naming strategy, and market positioning for a product now on shelves.
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal
              delay={60}
              className="w-full overflow-hidden border border-[var(--color-ink-14)] bg-[var(--color-subtle)] mb-0"
            >
              <div className="relative">
                <Image
                  src="/images/nars/preview.webp"
                  alt="NARS project files organized in LookLook workspace"
                  width={2400}
                  height={1588}
                  className="block w-full"
                  priority
                />
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.08)" }}
                />
              </div>
            </CaseScrollReveal>

            <CaseScrollReveal delay={120}>
              <CaseMetaGrid items={META_ITEMS} />
            </CaseScrollReveal>
          </header>

          <NarsMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* Sections */}
          <div className="flex flex-col">

            {/* Overview */}
            <section
              id="overview"
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <CaseScrollReveal>
                <SectionDivider label="Overview" />
                <h2 style={CASE_H2}>
                  Decoding cross-market complexity before the product brief locked
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={CASE_BODY}>
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
                <p style={CASE_BODY}>
                  I designed and ran the research end-to-end - from participant screener to final synthesis - structured to isolate where the two markets converged and where they required separate strategies.
                </p>
                <CaseSubSection heading="The challenge" className="mt-6">
                  <p style={CASE_BODY}>
                    NARS had strong category intuition but no cross-market data to validate it. With a formulation decision and naming brief both approaching deadlines, the team needed fast, credible signal on which product attributes would land - and which required different positioning in each market.
                  </p>
                  <p style={CASE_BODY}>
                    Going in without that data meant committing to a strategy built on assumptions. The research brief was designed to eliminate that risk before the product brief locked.
                  </p>
                </CaseSubSection>
              </CaseScrollReveal>
            </section>

            {/* Research */}
            <section
              id="research"
              ref={(el) => { sectionRefs.current["research"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <CaseScrollReveal>
                <SectionDivider label="Research" />
                <h2 style={CASE_H2}>
                  Listening to both markets at once
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={CASE_BODY}>
                  The study ran in parallel across both markets. Running them simultaneously was a deliberate design choice: it let us separate universal consumer truths from market-specific preferences, rather than over-indexing on either.
                </p>
                <CaseSubSection heading="What we did" className="mt-6">
                  <CaseMethodGrid items={NARS_METHOD_ITEMS} cols={2} />
                </CaseSubSection>
              </CaseScrollReveal>
            </section>

            {/* Outcome */}
            <section
              id="outcome"
              ref={(el) => { sectionRefs.current["outcome"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <CaseScrollReveal>
                <SectionDivider label="Outcome" />
                <h2 style={CASE_H2}>
                  What the data decided
                </h2>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <CaseSubSection heading="Key findings">
                  <CaseMethodGrid items={NARS_OUTCOME_ITEMS} cols={1} />
                </CaseSubSection>
              </CaseScrollReveal>

              <CaseScrollReveal delay={120} className="mt-8">
                <CaseSubSection heading="Full findings in the slide deck">
                  <p style={CASE_BODY}>
                    The complete output - methodology, verbatim quotes, concept rankings, and synthesis - is in the 103-page slide deck below. It was delivered to the NARS team and used to inform the final product brief.
                  </p>
                  <a
                    href="https://drive.google.com/file/d/14pRJPMr1qvlEUS57hHj04Kv8DfdzimoV/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block no-underline"
                    aria-label="Open NARS Longwear Foundation concept testing slide deck in Google Drive (opens in new tab)"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src="/images/nars/slide_preview.webp"
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
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 500, color: "#fff", margin: 0 }}>
                          Open slide deck &rarr;
                        </p>
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", color: "var(--color-muted)", marginTop: "8px" }}>
                      NARS Longwear Foundation Concept Testing Study &middot; Report by Gretchen, Martta, Luca &middot; Google Drive
                    </p>
                  </a>
                </CaseSubSection>
              </CaseScrollReveal>
            </section>

          </div>

          {/* Next case */}
          <div className="mt-12 pt-8 md:mt-16">
            <SectionDivider label="More case studies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectCard
                variant="framed"
                className="!mb-0"
                project={{
                  id: "ark7",
                  title: "ARK7",
                  headline: "Cultivating a trusted investment community for fractional real estate",
                  image: "/images/preview/ark7.webp",
                  href: "/work/ark7",
                  width: 1280,
                  height: 720,
                }}
              />
              <ProjectCard
                variant="framed"
                className="!mb-0"
                project={{
                  id: "datalign",
                  title: "Datalign",
                  headline: "Redesigning the front door of a wealth management marketplace",
                  image: "/images/preview/datalign.webp",
                  href: "/work/datalign",
                  width: 1280,
                  height: 720,
                  bg: "#fbfbf7",
                }}
              />
            </div>
          </div>

        </div>

        <div className="hidden md:block" />
      </main>
      <BackToTop />
    </div>
  );
}
