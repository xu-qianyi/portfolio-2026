"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/Img";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import Highlight from "@/components/Highlight";
import BackToTop from "@/components/BackToTop";
import ProjectCard from "@/components/ProjectCard";
import {
  CASE_BODY,
  CASE_H1,
  CASE_H2,
  CASE_H3,
  CASE_EYEBROW,
  CASE_LABEL,
  CASE_CAPTION,
  CASE_STAT,
  SectionDivider,
  SubHeading,
  CaseMetaGrid,
  CaseSubSection,
  CaseMethodGrid,
  CaseStatGrid,
  type MethodItem,
  type StatItem,
} from "@/components/CaseStudy";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PATTERN_DATA = {
  traditional: {
    label: "Traditional",
    image: `${BASE}/images/datalign/traditional.webp`,
    alt: "Traditional form pattern - data-first, sequential",
    pros: ["Efficient. Low friction, familiar pattern", "Works when brand trust is pre-established"],
    cons: ["Feels transactional. Data before relationship", "High drop-off with cold, unfamiliar traffic"],
  },
  conversational: {
    label: "Conversational",
    image: `${BASE}/images/datalign/conversational.webp`,
    alt: "Conversational form pattern - relationship-first",
    pros: ["Builds trust progressively throughout the flow", "Reduces anxiety before sensitive questions"],
    cons: ["Slower. More reading, more steps", "Harder to layer onto a locked question structure"],
  },
} as const;

type PatternKey = keyof typeof PATTERN_DATA;

function PatternTabs() {
  const [active, setActive] = useState<PatternKey>("traditional");
  const data = PATTERN_DATA[active];
  const tablistId = "pattern-tabs";

  return (
    <div className="mt-2 flex flex-col gap-4">
      {/* Pill tab toggle — same style as ark7 */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Form pattern tabs"
          id={tablistId}
          className="inline-flex items-center gap-1"
        >
          {(Object.keys(PATTERN_DATA) as PatternKey[]).map((key) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className="px-3 py-1.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                  cursor: "pointer",
                  border: "none",
                  background: isActive ? "var(--color-ink-06)" : "transparent",
                }}
                onClick={() => setActive(key)}
              >
                {PATTERN_DATA[key].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image panel + pros/cons inside container */}
      <div
        role="tabpanel"
        className="border border-[var(--color-ink-14)] bg-[var(--color-subtle)] p-8 md:p-12 flex flex-col gap-8"
      >
        <p style={{ ...CASE_H3, textAlign: "center" }}>{data.label}</p>

        <div style={{ position: "relative" }}>
          {(Object.keys(PATTERN_DATA) as PatternKey[]).map((key) => {
            const isTraditional = key === "traditional";
            return (
              <img
                key={key}
                src={PATTERN_DATA[key].image}
                alt={PATTERN_DATA[key].alt}
                style={{
                  display: "block",
                  position: isTraditional ? "relative" : "absolute",
                  top: isTraditional ? undefined : 0,
                  left: isTraditional ? undefined : 0,
                  width: isTraditional ? "76%" : "100%",
                  marginLeft: isTraditional ? "auto" : undefined,
                  marginRight: isTraditional ? "auto" : undefined,
                  height: isTraditional ? "auto" : "100%",
                  objectFit: isTraditional ? undefined : "contain",
                  opacity: active === key ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  pointerEvents: active === key ? "auto" : "none",
                }}
              />
            );
          })}
        </div>

        {/* Pros / cons — horizontal row */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {data.pros.map((text) => (
            <div key={text} className="flex gap-2 items-center">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
              <p style={{ ...CASE_CAPTION, margin: 0 }}>{text}</p>
            </div>
          ))}
          {data.cons.map((text) => (
            <div key={text} className="flex gap-2 items-center">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626", flexShrink: 0 }} />
              <p style={{ ...CASE_CAPTION, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AUDIT_ISSUES = [
  { issue: "Sales-driven copy, no warmth",           cost: "Users feel processed, not helped" },
  { issue: 'Generic "Why we ask" copy',              cost: "Users skip or guess" },
  { issue: "Dense option lists, no hierarchy",       cost: "Drop-off on multi-select questions" },
  { issue: "Unlabeled icons, no skip logic",         cost: "Users feel locked in" },
  { issue: 'Sliders defaulting $800K to "Other"',    cost: "Users mistrust the form's accuracy" },
];

const BEHAVIORAL_PATTERNS = [
  {
    title: "The interstitial screen looked like a finish line.",
    body: "Users waited, then closed the tab.",
    image: `${BASE}/images/datalign/interstitial.webp`,
  },
  {
    title: "Users wanted to verify their numbers. They couldn't.",
    body: "No jump-to navigation meant clicking back 5-10 times and losing all context.",
    image: `${BASE}/images/datalign/unable_to_verify_numbers.webp`,
  },
  {
    title: "The Next button was always active.",
    body: "No fields were marked required. Users rage-clicked through, hit an error, and left.",
    image: `${BASE}/images/datalign/alert.webp`,
  },
];

const DATALIGN_BEHAVIORAL_ITEMS: MethodItem[] = [
  {
    step: "01",
    label: "The interstitial screen looked like a finish line.",
    body: "Users waited, then closed the tab.",
  },
  {
    step: "02",
    label: "Users wanted to verify their numbers. They couldn't.",
    body: "No jump-to navigation meant clicking back 5-10 times and losing all context.",
  },
  {
    step: "03",
    label: "The Next button was always active.",
    body: "No fields were marked required. Users rage-clicked through, hit an error, and left.",
  },
];

const DATALIGN_STATS_OVERVIEW: StatItem[] = [
  { value: "12%",    label: "completion rate across paid traffic" },
  { value: "9%",     label: "of sessions ended in a U-turn: users navigated in circles before giving up" },
  { value: "1 in 3", label: "users said they would not recommend the experience" },
];

const DATALIGN_STATS_OUTCOMES: StatItem[] = [
  { value: "12% → 17%", label: "completion rate across paid traffic (40% lift)" },
  { value: "9% → 5%",   label: "U-turn rate" },
  { value: "~half",     label: "Step 1 drop-off" },
];

const OTHER_PATTERNS = [
  { text: "Step 1 dropped 40% of publisher traffic. The landing copy was failing from the start.", image: `${BASE}/images/datalign/step_1.webp` },
  { text: "Step 10 had the highest mid-flow drop-off. The question was too complex.", image: `${BASE}/images/datalign/step_10.webp` },
  { text: 'Jargon like "Principal" excluded users with lower financial literacy. Invisible in metrics, obvious in replays.', image: `${BASE}/images/datalign/jargon.webp` },
];

const DESIGN_DECISIONS = [
  {
    heading: "A guide, not a gatekeeper",
    before: "Users landed on the form with no context, no warmth, no explanation.",
    beforeImage: `${BASE}/images/datalign/before_1.webp`,
    beforeImageStyle: { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" },
    after: "Claire opens the form, explains who Datalign is, and earns each question before asking it.",
    afterImage: `${BASE}/images/datalign/after1.gif`,
  },
  {
    heading: "Navigation that doesn't punish mistakes",
    before: "Fixing a mistake meant clicking back 5-10 times and losing all context.",
    beforeImage: `${BASE}/images/datalign/navigation_before.gif`,
    beforeImageStyle: { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" },
    after: "A step navigator lets users jump back, edit what they've filled in, and pick up where they left off.",
    afterImage: `${BASE}/images/datalign/navigation_after.gif`,
  },
  {
    heading: "Explaining before users have to wonder",
    before: "'Why we ask' was buried and easy to miss.",
    beforeImage: `${BASE}/images/datalign/explaining_before.gif`,
    beforeImageStyle: { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" },
    after: "The reason surfaces inline before users have to wonder.",
    afterImage: `${BASE}/images/datalign/explaining_after.gif`,
  },
  {
    heading: "Interstitial that moves users forward, not out",
    before: "The interstitial looked like a completion screen, so users assumed they were done and left.",
    beforeImage: `${BASE}/images/datalign/interstitial.webp`,
    beforeImageStyle: { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" },
    after: "Claire reads the moment and adjusts her tone to guide users forward.",
    afterImage: `${BASE}/images/datalign/interstitial_after.gif`,
  },
];

const TEST_PHASES = [
  { phase: "1", ship: "Same questions, new conversational layout",            measure: "Completion rate, step-by-step drop-off" },
  { phase: "2", ship: "Vary question order & phrasing per workshop hypotheses", measure: "Drop-off by flow, sentiment, micro-interactions" },
  { phase: "3", ship: "Standalone landing pages for paid traffic",             measure: "Conversion by traffic source" },
];

const META_ITEMS = [
  { label: "Role",     value: "Product Designer (Summer/Fall Co-op)" },
  { label: "Team",     value: "Product Designer (me), 1 Senior Designer, CSM, 2 Engineers, Data Team" },
  { label: "Timeframe", value: "4 weeks" },
];

type NavSection = { id: string; label: string };

const SECTIONS: NavSection[] = [
  { id: "overview",  label: "Overview" },
  { id: "research",  label: "Research" },
  { id: "workshop",  label: "Workshop" },
  { id: "claire",    label: "Introducing Claire" },
  { id: "design",    label: "Design" },
  { id: "outcomes",  label: "Where we are right now" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

function Img({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full flex items-center justify-center border border-dashed border-[var(--color-ink-14)]"
      style={{ aspectRatio: aspect, backgroundColor: "var(--color-ink-06)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--color-muted)",
          margin: 0,
          textAlign: "center",
          padding: "0 24px",
          lineHeight: "1.5",
        }}
      >
        {label}
      </p>
    </div>
  );
}

function DatalignMobileNav({
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

export default function DatalignCaseStudyPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs    = useRef<Record<string, HTMLButtonElement | null>>({});
  const navListRef  = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [dotY, setDotY]         = useState(0);
  const claireRef = useRef<HTMLDivElement | null>(null);
  const [claireVisible, setClaireVisible] = useState(false);
  useEffect(() => {
    const el = claireRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setClaireVisible(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ratioMap = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          ratioMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let nextId = SECTION_IDS[0];
        let maxRatio = -1;
        SECTION_IDS.forEach((id) => {
          const ratio = ratioMap.get(id) ?? 0;
          if (ratio > maxRatio) { maxRatio = ratio; nextId = id; }
        });
        setActiveId(nextId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] },
    );
    SECTION_IDS.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen px-6 py-14 md:py-16 lg:px-[72px] lg:py-16 lg:mx-[32px]">
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
              <p style={CASE_EYEBROW}>
                Datalign / FinTech
              </p>
              <h1 style={CASE_H1}>
                Redesigning the front door of a wealth management marketplace
              </h1>
              <p style={{ ...CASE_BODY, marginTop: "4px" }}>
                The lead generation form had been live for years and converted just 12% of paid traffic. Functional, never designed.{" "}
                <Highlight variant="blue" duration={1600}>I mapped the failure modes, ran a cross-functional workshop, and redesigned the intake experience from scratch.</Highlight>
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="mb-0">
              <video
                src={`${BASE}/images/datalign/part1.webm`}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", display: "block" }}
              />
            </CaseScrollReveal>

            <CaseScrollReveal delay={120}>
              <CaseMetaGrid items={META_ITEMS} />
            </CaseScrollReveal>
          </header>

          <DatalignMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* Sections */}
          <div className="flex flex-col">

            {/* Overview */}
            <section
              id="overview"
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Overview" />
                    <h2 style={CASE_H2}>
                      What Datalign is
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={CASE_BODY}>
                    <a href="https://datalign.com/" target="_blank" rel="noopener noreferrer" className="case-inline-link">Datalign</a> is a lead marketplace for wealth management. Consumers fill out a 20-question intake form to get matched with a registered investment advisor (RIA). Partner firms bid on the lead in an auction, and the user is connected with the winning firm.
                  </p>
                  <p style={CASE_BODY}>
                    The form <em>is</em> the front door.{" "}
                    <Highlight variant="blue" duration={1400}>No form, no match, no business.</Highlight>
                  </p>

                  <div className="mt-6 md:mt-8">
                    <Image
                      src="/images/datalign/who_is_datalign.webp"
                      alt="Diagram showing how Datalign connects consumers through a form to a match auction and then to an RIA firm"
                      width={1200}
                      height={400}
                      unoptimized
                      className="block w-full h-auto mx-auto"
                    />
                  </div>

                  <CaseSubSection heading="The problem" className="mt-6 md:mt-8">
                    <p style={CASE_BODY}>
                      The form had been live for years. It worked: leads came in, matches went out, the business ran.
                    </p>
                    <p style={CASE_BODY}>But &ldquo;worked&rdquo; had a ceiling:</p>
                    <CaseStatGrid items={DATALIGN_STATS_OVERVIEW} variant="card" />
                  </CaseSubSection>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Research */}
            <section
              id="research"
              ref={(el) => { sectionRefs.current["research"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Research" />
                    <h2 style={CASE_H2}>
                      What broke and why
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="mt-0 md:mt-2">
                    <div className="p-8 md:p-16" style={{ backgroundColor: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <img src={`${BASE}/images/datalign/ux_audit.webp`} alt="Annotated screenshots of the original form" style={{ width: "100%", display: "block" }} />
                    </div>
                    <p style={{ ...CASE_CAPTION, marginTop: "12px", textAlign: "center" }}>
                      One typical page. Design and usability issues identified during the audit.
                    </p>
                  </div>

                  <div className="flex flex-col gap-5 mt-10">
                    <p style={CASE_BODY}>I pulled and audited 5,162 SEM sessions and 13,559 Finance Advisors sessions from Hotjar, using ChatGPT to analyze at scale.</p>
                    <CaseMethodGrid items={DATALIGN_BEHAVIORAL_ITEMS} cols={3} />
                  </div>

                  <div className="flex flex-col gap-4 mt-8">
                    <SubHeading>...these are fixable UI problems.<span style={{ opacity: 0.35 }}>...</span></SubHeading>
                    <p style={CASE_BODY}>However, why we need to redesign the entire experience? <Highlight variant="blue" duration={1400}>Because it has the worst experience in the industry.</Highlight></p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" style={{ padding: "8px 0 32px" }}>
                      {/* Functional */}
                      <div className="p-4" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <i className="ri-error-warning-line" style={{ fontSize: 20, color: "var(--color-ink-40)" }} />
                        </div>
                        <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--color-ink-80)", lineHeight: "1.3", marginBottom: "6px" }}>Functional</div>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.6, margin: 0, color: "var(--color-ink-50)" }}>
                          Money Pickle, Wise Advisor, Savvy Wealth, <span style={{ color: "#ef4444" }}>Datalign Advisory</span>
                        </p>
                      </div>
                      {/* Decent UX */}
                      <div className="p-4" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <i className="ri-medal-line" style={{ fontSize: 20, color: "var(--color-ink-40)" }} />
                        </div>
                        <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--color-ink-80)", lineHeight: "1.3", marginBottom: "6px" }}>Decent UX</div>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.6, color: "var(--color-ink-50)", margin: 0 }}>Advisor.com, NerdWallet, Zoe Financial, WealthRamp, Finance HQ, Facet</p>
                      </div>
                      {/* Well-designed */}
                      <div className="p-4" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <i className="ri-trophy-line" style={{ fontSize: 20, color: "var(--color-ink-40)" }} />
                        </div>
                        <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--color-ink-80)", lineHeight: "1.3", marginBottom: "6px" }}>Well-designed</div>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.6, color: "var(--color-ink-50)", margin: 0 }}>Quinn, Boldin</p>
                      </div>
                    </div>
                    <p style={CASE_BODY}>
                      The ones doing it well (Facet, Boldin, Quinn) carry users through with a consistent editorial voice. Datalign had none.
                    </p>
                  </div>

                  <CaseSubSection heading="Outside fintech, two patterns dominate." className="mt-10">
                    <p style={CASE_BODY}>
                      Lead gen and intake forms outside the industry split into two models.
                    </p>
                    <p style={CASE_BODY}>
                      Datalign&apos;s users arrive through paid traffic with no prior relationship and no brand familiarity. The research pointed toward Conversational.
                    </p>
                    <PatternTabs />
                  </CaseSubSection>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Workshop */}
            <section
              id="workshop"
              ref={(el) => { sectionRefs.current["workshop"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Workshop" />
                    <h2 style={CASE_H2}>
                      The workshop pressure-tested the direction and shaped the AB test plan.
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={CASE_BODY}>
                    I brought the research and a Conversational proposal to a cross-functional workshop. Full Conversational was technically feasible, but multiple APIs made the engineering cost hard to justify.
                  </p>
                  <p style={CASE_BODY}>
                    That constraint forced a better question: what actually makes Conversational work? Not the structure. Warmth, presence, the sense of being guided. Those can transfer. <Highlight variant="blue" duration={1400}>So we stopped trying to change the structure and started working on the voice.</Highlight>
                  </p>
<div>
                    <img src={`${BASE}/images/datalign/workshop.webp`} alt="Photo from the workshop" style={{ width: "100%", display: "block" }} />
                    <p style={{ ...CASE_CAPTION, marginTop: "12px", textAlign: "center" }}>Cross-functional workshop with Product, Engineering, and Data to align on hypotheses.</p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Claire */}
            <section
              id="claire"
              ref={(el) => { sectionRefs.current["claire"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <SectionDivider label="Introducing Claire" />
                  <SubHeading>We gave the form a voice.</SubHeading>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80}>
                  <div className="p-8 md:p-16 flex justify-center" ref={claireRef}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 16, maxWidth: 420 }}>
                      <img
                        src={`${BASE}/images/datalign/avatar.svg`}
                        alt="Claire"
                        style={{
                          width: 72, height: 72, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                          opacity: claireVisible ? 1 : 0,
                          transform: claireVisible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)",
                          transition: claireVisible ? "opacity 300ms cubic-bezier(0.22,1,0.36,1), transform 300ms cubic-bezier(0.22,1,0.36,1)" : "none",
                        }}
                      />
                      <div style={{
                        background: "#FAFAFA",
                        borderRadius: "18px 18px 18px 4px",
                        padding: "14px 18px",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: "#1a1a1a",
                        opacity: claireVisible ? 1 : 0,
                        transform: claireVisible ? "translateX(0)" : "translateX(-10px)",
                        transition: claireVisible ? "opacity 280ms cubic-bezier(0.22,1,0.36,1) 120ms, transform 280ms cubic-bezier(0.22,1,0.36,1) 120ms" : "none",
                      }}>
                        Hi there! My name is Claire, your personal financial concierge.
                      </div>
                    </div>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={60}>
                  <div className="flex flex-col gap-3 mt-4">
                    <p style={CASE_BODY}>
                      Replays showed users leaving at moments of uncertainty, with no explanation, no presence. A human avatar on a sister company&apos;s loan form had already lifted conversion by 40%. The pattern is consistent: in high-stakes contexts with cold traffic, a named face builds trust faster than any UI change. That&apos;s Claire. She isn&apos;t a chatbot. She appears at key moments, earns each question before asking it, and adjusts her tone to what the moment calls for.
                    </p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Design */}
            <section
              id="design"
              ref={(el) => { sectionRefs.current["design"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Design" />
                    <h2 style={CASE_H2}>
                      From a transaction to a guided conversation
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-12 md:gap-16 mt-2">
                    {DESIGN_DECISIONS.map((item, i) => (
                      <div key={i} className="flex flex-col gap-4">
                        <h3 style={CASE_H3}>{item.heading}</h3>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:gap-x-4">
                          {/* Before image - row 1 */}
                          <div className="overflow-hidden flex items-center justify-center min-h-0" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                            {item.beforeImage ? (
                              <img src={item.beforeImage} alt="" style={{ maxWidth: "calc(100% - 48px)", maxHeight: "100%", width: "auto", height: "auto", display: "block", ...("beforeImageStyle" in item ? item.beforeImageStyle : {}) }} />
                            ) : (
                              <Img label="Before" aspect="4/3" />
                            )}
                          </div>
                          {/* After image - row 1 */}
                          <div className="overflow-hidden" style={{ background: "var(--color-surface)", border: "1px solid rgba(0,0,0,0.08)" }}>
                            {item.afterImage ? (
                              <img src={item.afterImage} alt="" style={{ width: "100%", display: "block" }} />
                            ) : (
                              <Img label="After" aspect="4/3" />
                            )}
                          </div>
                          {/* Before caption - row 2 */}
                          <div className="flex flex-col gap-1">
                            <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#B91C1C", background: "#FEE2E2", padding: "2px 7px", display: "inline-block" }}>Before</span>
                            <p style={CASE_CAPTION}>{item.before}</p>
                          </div>
                          {/* After caption - row 2 */}
                          <div className="flex flex-col gap-1">
                            <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#166534", background: "#D1EDDA", padding: "2px 7px", display: "inline-block" }}>After</span>
                            <p style={{ ...CASE_CAPTION, color: "var(--color-ink-80)" }}>{item.after}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <CaseSubSection heading="Shipped in Claude Code." className="mt-10">
                    <p style={{ ...CASE_BODY, margin: "16px 0 24px" }}>The entire redesign was built and delivered in Claude Code. That let us go from research to a working MVP in days. Once it was live, we moved the experiment into Heyflow to run A/B testing without touching the backend on every iteration.</p>
                  </CaseSubSection>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Outcomes */}
            <section
              id="outcomes"
              ref={(el) => { sectionRefs.current["outcomes"] = el; }}
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Where we are right now" />
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4 mt-6">
                    <p style={CASE_BODY}>Phase 1 testing has shipped. Early data:</p>
                    <CaseStatGrid items={DATALIGN_STATS_OUTCOMES} variant="card" />
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

          </div>

          {/* Footer nav */}
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
                  id: "looklook-nars",
                  title: "NARS Foundation",
                  headline: "US & China concept testing for a longwear foundation launch",
                  image: "/images/preview/nars_playful.json",
                  href: "/work/nars",
                  width: 1280,
                  height: 720,
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
