"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import CaseScrollReveal from "@/components/CaseScrollReveal";

const BG = "#fbfbf7";
const THEME_BLUE = "#3A6FA5";

const BODY = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  lineHeight: "160%",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;

const H2 = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "24px",
  lineHeight: "120%",
  fontWeight: 400,
  color: "var(--color-ink)",
  borderLeft: `2px solid ${THEME_BLUE}`,
  paddingLeft: "12px",
  margin: 0,
} as const;

const H3 = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "18px",
  lineHeight: "130%",
  fontWeight: 400,
  color: "var(--color-ink)",
  margin: 0,
} as const;

const MARK = {
  backgroundColor: "rgba(58, 111, 165, 0.18)",
  color: "inherit",
  padding: "0.08em 0.2em",
} as const;

type NavSection = { id: string; label: string };

const SECTIONS: NavSection[] = [
  { id: "context",        label: "Context in 30 seconds" },
  { id: "starting-point", label: "The starting point" },
  { id: "approach",       label: "What I needed to figure out" },
  { id: "audit",          label: "What the audit revealed" },
  { id: "competitive",    label: "Looking outward" },
  { id: "workshop",       label: "The workshop" },
  { id: "redesign",       label: "The redesign" },
  { id: "testing",        label: "From insight to test" },
  { id: "takeaways",      label: "What I'm taking with me" },
];

const META_ITEMS = [
  { label: "Role",     value: "Product Designer" },
  { label: "Timeline", value: "May – Dec 2025" },
  { label: "Team",     value: "Lead Designer (me), Engineers, Data Analysts" },
];

const AUDIT_ISSUES = [
  { issue: "Sales-driven copy, no warmth",            cost: "Users feel processed, not helped" },
  { issue: 'Generic "Why we ask" copy',               cost: "Users skip or guess" },
  { issue: "Dense option lists, no hierarchy",        cost: "Drop-off on multi-select questions" },
  { issue: "Unlabeled icons, no skip logic",          cost: "Users feel locked in" },
  { issue: 'Sliders defaulting $800K to "Other"',     cost: "Users mistrust the form's accuracy" },
];

const BEHAVIORAL_PATTERNS = [
  {
    title: "The interstitial looked like a finish line.",
    body: 'Our top U-turn exit page was /match — and recordings showed why. Mid-flow, we had a "Did you know?" educational interlude. In session after session, users hit it, paused, and waited. The visual treatment read as a confirmation page. Many sat there expecting a match result. When nothing happened, they closed the tab.',
  },
  {
    title: "Users wanted to verify their numbers — and couldn't.",
    body: "Late in the form, especially after the income and asset questions, users tried to go back to double-check what they'd entered. But there was no jump-to navigation. They had to press the back arrow repeatedly, losing context with each step. Numbered questions made the problem worse — users assumed numbering meant they could navigate to any question directly. They couldn't.",
  },
  {
    title: "Alert-driven U-turns were a hidden killer.",
    body: "The Next button stayed active even on required questions, with no asterisks marking which fields were mandatory. Users would click through quickly, get an alert, and assume the alert referred to the previous page — so they went back. This pattern alone likely accounted for a meaningful share of the ~9% U-turn rate.",
  },
];

const OTHER_PATTERNS = [
  "Step 1 dropped 40% of Forbes traffic — landing copy was failing immediately",
  "Step 10 was the biggest mid-flow drop for Finance Advisors traffic — a complex question with high cognitive load",
  "86% of Finance Advisors traffic was on mobile, but our form was desktop-first",
  'Jargon like "Principal" excluded users with lower financial literacy — invisible in metrics, obvious in replays',
];

const DESIGN_PRINCIPLES = [
  { num: "01", title: "Earn the next question.",           body: "Build trust before asking for sensitive information." },
  { num: "02", title: "Give value back as users give input.", body: "Every answer should make the next moment feel personalized — not just feed a backend." },
  { num: "03", title: "Have a personality.",               body: "A consistent voice that makes users feel seen." },
];

const TEST_PHASES = [
  { phase: "1", ship: "Same questions, new conversational layout",       measure: "Completion rate, step-by-step drop-off" },
  { phase: "2", ship: "Vary question order & phrasing per workshop hypotheses", measure: "Drop-off by flow, sentiment, micro-interactions" },
  { phase: "3", ship: "Standalone landing pages for paid traffic",        measure: "Conversion by traffic source" },
];

const TAKEAWAYS = [
  {
    title: 'Things that "work" can still be undesigned.',
    body: "The form had been shipping leads for years. That didn't mean it had been designed. The first move on any inherited system is asking what's there because it was decided, vs. what's there because it accumulated.",
  },
  {
    title: "The right benchmark is sometimes outside your industry.",
    body: "Looking at TikTok and Airbnb taught me more about matching than any wealth-management competitor did.",
  },
  {
    title: "Workshops aren't a deliverable — they're a forcing function.",
    body: "Bringing Product, Engineering, and RIA Partnerships into the same room turned my research into the team's research. Without that, the AB test plan would have been a document. With it, it became a roadmap.",
  },
];

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

function SectionShell({
  id,
  num,
  title,
  sectionRefs,
  children,
  divider = true,
}: {
  id: string;
  num: string;
  title: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      ref={(el) => { sectionRefs.current[id] = el; }}
      className="scroll-mt-24 md:scroll-mt-28"
    >
      <div className="flex min-w-0 w-full flex-col gap-7">
        <CaseScrollReveal>
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-muted)",
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              {num}
            </p>
            <h2 style={H2}>{title}</h2>
          </div>
        </CaseScrollReveal>
        {children}
        {divider && <div className="h-px w-full bg-[var(--color-ink-14)] mt-4" />}
      </div>
    </section>
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
      className="md:hidden sticky top-14 z-10 border-b border-[var(--color-ink-14)]"
      style={{ backgroundColor: BG }}
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

export default function DatalignCaseStudyPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs  = useRef<Record<string, HTMLButtonElement | null>>({});
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
    <div className="min-h-screen px-6 py-14 md:py-16 lg:px-[72px] lg:py-16" style={{ backgroundColor: BG }}>
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
                        fontSize: "15px",
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
        <div className="flex w-full min-w-0 max-w-[800px] flex-col gap-14 md:gap-16">

          {/* Header */}
          <header className="flex flex-col gap-8 md:gap-10">
            <CaseScrollReveal className="flex flex-col gap-2">
              <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--color-muted)", margin: 0 }}>
                Datalign &bull; FinTech
              </p>
              <h1 style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "28px", lineHeight: "110%", fontWeight: 500, color: "var(--color-ink)", margin: 0 }}>
                Redesigning the front door of a wealth management marketplace
              </h1>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60}>
              <Img label="Hero image — before/after of the form" aspect="16/9" />
            </CaseScrollReveal>

            <CaseScrollReveal delay={120} className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
              {META_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--color-ink)", margin: 0 }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "16px", lineHeight: "150%", color: "var(--color-ink-80)", margin: 0 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </CaseScrollReveal>
          </header>

          <DatalignMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* All sections */}
          <div className="flex flex-col gap-16 md:gap-20">

            {/* 01 — Context in 30 seconds */}
            <SectionShell id="context" num="01" title="Context in 30 seconds" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  Datalign is a lead marketplace for wealth management. Consumers fill out a 20-question intake form to get matched with a registered investment advisor (RIA). Partner firms bid on the lead in an auction, and the user is connected with the winning firm.
                </p>
                <p style={BODY}>
                  The form <em>is</em> the front door. No form, no match, no business.{" "}
                  <mark style={MARK}>Every dollar of revenue starts with someone finishing it.</mark>
                </p>
              </CaseScrollReveal>
              <CaseScrollReveal delay={100}>
                <Img label="Diagram — Consumer → Form → Match auction → RIA firm → Conversation" aspect="3/1" />
              </CaseScrollReveal>
            </SectionShell>

            {/* 02 — The starting point */}
            <SectionShell id="starting-point" num="02" title="The starting point" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  The form had been live for years and shipped leads to advisors. But it had never been <em>designed</em> — it had been built question by question, as the business needed more data.
                </p>
                <p style={BODY}>Two signals told us it was costing us:</p>
                <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                  <li className="flex gap-3 items-start">
                    <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                    <p style={BODY}><strong>Completion rate had been underperforming for years.</strong> Users were dropping off before reaching the match.</p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                    <p style={BODY}><strong>Thousands of SurveyMonkey responses said the same thing</strong> — too long, too clinical, too disconnected from why any of it mattered.</p>
                  </li>
                </ul>
                <p style={BODY}>
                  The brief: <mark style={MARK}>revamp the experience.</mark> Treat the form, for the first time, as a designed product.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 03 — What I needed to figure out */}
            <SectionShell id="approach" num="03" title="What I needed to figure out" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>Before redesigning anything, I wanted answers to three things:</p>
                <ol className="flex flex-col gap-3 pl-0 m-0 list-none">
                  {[
                    { n: "1", text: "Where exactly is the form failing? Completion data shows that users drop off, not why." },
                    { n: "2", text: 'What does "good" look like in this category? And what does it look like outside the category?' },
                    { n: "3", text: "What can the team align on? A redesign that ships needs cross-functional buy-in, not just a Figma file." },
                  ].map((item) => (
                    <li key={item.n} className="flex gap-4 items-start">
                      <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", fontWeight: 600, color: "var(--color-ink)", lineHeight: "160%", flexShrink: 0, minWidth: "20px" }}>{item.n}.</span>
                      <p style={BODY}>{item.text}</p>
                    </li>
                  ))}
                </ol>
                <p style={{ ...BODY, color: "var(--color-muted)", fontSize: "14px" }}>
                  This shaped how the project unfolded — audit, competitive teardown, cross-functional workshop, then design.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 04 — What the audit revealed */}
            <SectionShell id="audit" num="04" title="What the audit revealed" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  I started with a heuristic walkthrough of the live form against Nielsen&apos;s 10 principles. Five recurring issues:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
                    <thead>
                      <tr>
                        <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2 pr-6" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-70)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Issue</th>
                        <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-70)", letterSpacing: "0.02em", textTransform: "uppercase" }}>What it costs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AUDIT_ISSUES.map((row, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-6 border-b border-[var(--color-ink-06)] align-top" style={{ fontSize: "15px", lineHeight: "150%", color: "var(--color-ink)", width: "50%" }}>{row.issue}</td>
                          <td className="py-3 border-b border-[var(--color-ink-06)] align-top" style={{ fontSize: "15px", lineHeight: "150%", color: "var(--color-ink-80)" }}>{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={BODY}>
                  The deeper pattern:{" "}
                  <mark style={MARK}>the form was designed for the auction, not for the person filling it out.</mark>{" "}
                  Each question existed because the matching engine wanted it — not because the user understood why it mattered or got anything in return for answering.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Annotated screenshots of the original form" aspect="4/3" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <h3 style={H3}>Watching what users actually did</h3>
                <p style={BODY}>
                  Heuristics tell you what <em>might</em> be wrong. To find out what <em>was</em> wrong, I needed to see the form through the user&apos;s eyes. So I pulled{" "}
                  <mark style={MARK}>5,162 Forbes SEM sessions and 13,559 Finance Advisors sessions from Hotjar (~18,700 total)</mark>, used AI to analyze them at scale, and ran a follow-up qualitative watch party with our research lead to investigate the patterns we couldn&apos;t explain from data alone.
                </p>
                <p style={BODY}>The combination mattered. Quant told us <em>what</em> and <em>where</em>. Qual told us <em>why</em>.</p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 border border-[var(--color-ink-14)]" style={{ backgroundColor: "var(--color-ink-06)" }}>
                  {[
                    { value: "18.7k", label: "sessions analyzed" },
                    { value: "~9%",   label: "U-turn rate" },
                    { value: "40%",   label: "Step 1 drop-off (Forbes)" },
                    { value: "86%",   label: "mobile traffic (Finance Advisors)" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <p style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "26px", fontWeight: 400, color: "var(--color-ink)", margin: 0, lineHeight: "1.1" }}>{stat.value}</p>
                      <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "var(--color-muted)", margin: 0, lineHeight: "140%" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-4">
                <p style={{ ...BODY, fontWeight: 500 }}>Three behavioral patterns emerged that no static audit could have surfaced:</p>
                <div className="flex flex-col gap-3">
                  {BEHAVIORAL_PATTERNS.map((pattern, i) => (
                    <div key={i} className="flex gap-4 p-5 border border-[var(--color-ink-14)]">
                      <div
                        className="shrink-0 flex items-center justify-center rounded-full"
                        style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "var(--color-ink)", color: "#fff", fontSize: "11px", fontFamily: "var(--font-geist-sans)", fontWeight: 600, lineHeight: 1, marginTop: "2px" }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>{pattern.title}</p>
                        <p style={BODY}>{pattern.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-4">
                <p style={{ ...BODY, fontWeight: 500 }}>Other patterns the analysis surfaced:</p>
                <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                  {OTHER_PATTERNS.map((p, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span style={{ color: "var(--color-muted)", fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>–</span>
                      <p style={BODY}>{p}</p>
                    </li>
                  ))}
                </ul>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Drop-off + U-turn map across the form" aspect="16/9" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80}>
                <p style={BODY}>
                  This changed the redesign brief in concrete ways. The interstitial had to be visually disambiguated from a result screen. The form needed jump-to navigation and required-field markers. Step 1 and step 10 needed targeted rework. And the whole thing needed to be designed mobile-first, not retrofitted.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 05 — Looking outward */}
            <SectionShell id="competitive" num="05" title="Looking outward" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  I mapped 10+ wealth management competitors on a simple matrix: <em>Functional → Decent UX → Well-designed</em>.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Competitive landscape matrix" aspect="4/3" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  The pattern:{" "}
                  <mark style={MARK}>the longer the form, the more experience design becomes necessary, not optional.</mark>{" "}
                  Datalign sits in the long-form camp (20+ questions) but designs like a short-form tool. That gap was the redesign opportunity.
                </p>
                <p style={{ ...BODY, fontWeight: 500 }}>What the best players do:</p>
                <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                  {[
                    { name: "Facet",                      body: "Friendly first-person narrator, gradual engagement, social proof at moments of hesitation." },
                    { name: "Boldin",                     body: "In-line financial analysis as you complete the form, rewarding users for continuing." },
                    { name: "Quinn (NerdWallet, SmartAsset)", body: "Chat-style interaction with logical grouping." },
                  ].map((item) => (
                    <li key={item.name} className="flex gap-3 items-start">
                      <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                      <p style={BODY}><strong>{item.name}</strong> — {item.body}</p>
                    </li>
                  ))}
                </ul>
                <p style={BODY}>Then I looked outside the category. Two insights changed how I thought about the problem:</p>
                <div className="flex flex-col gap-3">
                  {[
                    { co: "TikTok", insight: "Social platforms ask less, not more. TikTok doesn't make you fill out a profile. It learns through interaction. The feedback loop is the form." },
                    { co: "Airbnb", insight: "Airbnb doesn't ask more — it offers more. Filters aren't a barrier; they're a tool. You're not \"giving info.\" You're getting better matches." },
                  ].map((item) => (
                    <div key={item.co} className="flex flex-col gap-1 pl-4" style={{ borderLeft: `2px solid ${THEME_BLUE}` }}>
                      <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", fontWeight: 600, color: "var(--color-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.co}</p>
                      <p style={BODY}>{item.insight}</p>
                    </div>
                  ))}
                </div>
                <p style={BODY}>
                  And then: <strong>personality.</strong> Cleo is bold and cheeky. Lemonade&apos;s Maya is warm and patient. Each has a deliberate tone — and that tone <em>is</em> the experience.{" "}
                  <mark style={MARK}>Datalign had no personality. That was the deepest gap.</mark>
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 06 — The workshop */}
            <SectionShell id="workshop" num="06" title="The workshop: turning research into shared hypotheses" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  Research on its own doesn&apos;t move the metric. To make this work, the team — Product, Engineering, RIA Partnerships — needed to share the same picture. So I organized and facilitated a cross-functional workshop on May 27.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Photo or FigJam screenshot from the workshop" aspect="16/9" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-6">
                <p style={{ ...BODY, fontWeight: 500 }}>The structure was deliberate. We worked through four prompts:</p>

                <div className="flex flex-col gap-2">
                  <p style={{ ...BODY, fontWeight: 500 }}>1. What do we like about the current form?</p>
                  <p style={BODY}>We started here on purpose. If we only talk about what&apos;s broken, we miss what&apos;s worth keeping. The team named: clarity, breadcrumb progress, &ldquo;Why we ask&rdquo; tooltips, professional tone, full ownership of the form.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p style={{ ...BODY, fontWeight: 500 }}>2. What do we not like?</p>
                  <p style={BODY}>Most-named: too long, no motivation, dense, hard to scan, no contextualization, one-size-fits-all, jargon, tedious controls, no skip/back logic.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <p style={{ ...BODY, fontWeight: 500 }}>3. What assumptions are we making — that we&apos;ve never actually tested?</p>
                  <p style={BODY}>This was the most valuable part. The assumptions surfaced were uncomfortable in a productive way:</p>
                  <ul className="flex flex-col gap-2 pl-4 m-0 list-none" style={{ borderLeft: `2px solid var(--color-ink-14)` }}>
                    {[
                      "We assume more questions = better quality matches.",
                      "We assume users understand the questions and are ready for a match.",
                      'We assume "Why we ask" is sufficient as help.',
                      "We assume one form fits all users — researchers, shoppers, and high-intent leads.",
                      "We assume we need every answer before the auction runs.",
                      "We assume advisors actually use every field we collect.",
                    ].map((a, i) => (
                      <li key={i}><p style={{ ...BODY, fontStyle: "italic" }}>{a}</p></li>
                    ))}
                  </ul>
                  <p style={BODY}>Each one became a candidate for testing.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p style={{ ...BODY, fontWeight: 500 }}>4. How do we get there?</p>
                  <p style={BODY}>We translated assumptions into concrete experiments — branching for shoppers vs. high-intent users, moving high-drop questions to the end, testing pre-form intent triage, asking contact info up front, shorter &ldquo;express&rdquo; flows.</p>
                </div>

                <p style={BODY}>
                  The output wasn&apos;t a redesign. It was a{" "}
                  <mark style={MARK}>stack-ranked backlog of testable hypotheses</mark>{" "}
                  that everyone in the room had helped shape — which meant they had buy-in to ship them.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 07 — The redesign */}
            <SectionShell id="redesign" num="07" title="The redesign" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={{ ...BODY, fontWeight: 500 }}>Three principles came out of all of this:</p>
                <div className="flex flex-col gap-3">
                  {DESIGN_PRINCIPLES.map((p) => (
                    <div key={p.num} className="flex gap-4 items-start">
                      <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", fontWeight: 600, color: "var(--color-muted)", flexShrink: 0, lineHeight: "160%", paddingTop: "1px" }}>{p.num}</span>
                      <p style={BODY}><strong>{p.title}</strong> {p.body}</p>
                    </div>
                  ))}
                </div>
                <p style={BODY}>The new form opens with a name, not a question:</p>
                <blockquote
                  className="pl-4 m-0"
                  style={{ borderLeft: `2px solid ${THEME_BLUE}`, fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "18px", lineHeight: "140%", fontStyle: "italic", color: "var(--color-ink)" }}
                >
                  &ldquo;Hi, I&apos;m Claire — your personal financial concierge. How should I call you?&rdquo;
                </blockquote>
                <p style={BODY}>The user isn&apos;t filling out a form. They&apos;re starting a conversation.</p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Step 1 — Claire intro card" aspect="4/3" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={{ ...BODY, fontWeight: 500 }}>Each subsequent step layers in:</p>
                <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                  {[
                    "A persona (Claire) who narrates with warmth, not sales copy",
                    'Data nuggets that contextualize each question ("Investors who work with an advisor are 3× more confident about reaching their goals")',
                    "A progress indicator so users always know where they are",
                    "Branching paths — Plaid auto-complete (4 min), phone call, or manual entry (~10 min)",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                      <p style={BODY}>{item}</p>
                    </li>
                  ))}
                </ul>
                <p style={BODY}>
                  High-friction questions (income, assets) come <em>after</em> trust is built, and use simpler inputs (typed fields, asset buckets) instead of the original sliders.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Branching choice screen + key step UI" aspect="4/3" />
              </CaseScrollReveal>
            </SectionShell>

            {/* 08 — From insight to test */}
            <SectionShell id="testing" num="08" title="From insight to test" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  To validate fast without burning engineering cycles, I proposed shipping the redesign through{" "}
                  <mark style={MARK}>Heyflow</mark> — a no-code platform with conditional logic and built-in AB testing — as a stop-gap before the in-house build.
                </p>
                <p style={{ ...BODY, fontWeight: 500 }}>Three-phase rollout:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
                    <thead>
                      <tr>
                        <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2 pr-5" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-70)", letterSpacing: "0.02em", textTransform: "uppercase", width: "60px" }}>Phase</th>
                        <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2 pr-5" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-70)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Ship</th>
                        <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-70)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Measure</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TEST_PHASES.map((row, i) => (
                        <tr key={i}>
                          <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={{ fontSize: "15px", color: "var(--color-ink)", fontWeight: 600 }}>{row.phase}</td>
                          <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={{ fontSize: "15px", lineHeight: "150%", color: "var(--color-ink-80)" }}>{row.ship}</td>
                          <td className="py-3 border-b border-[var(--color-ink-06)] align-top" style={{ fontSize: "15px", lineHeight: "150%", color: "var(--color-ink-70)" }}>{row.measure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={BODY}>
                  We&apos;re not redesigning blind. We&apos;re learning — first about layout, then about content, then about traffic-source fit — and the in-house build that follows is informed by data, not opinions.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 09 — What I'm taking with me */}
            <SectionShell id="takeaways" num="09" title="What I'm taking with me" sectionRefs={sectionRefs} divider={false}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-6">
                {TAKEAWAYS.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <p style={{ ...BODY, fontWeight: 600, color: "var(--color-ink)" }}>{item.title}</p>
                    <p style={BODY}>{item.body}</p>
                  </div>
                ))}
              </CaseScrollReveal>
              <CaseScrollReveal delay={80}>
                <p style={{ ...BODY, color: "var(--color-muted)", fontStyle: "italic" }}>
                  Phase 1 is shipping. Happy to talk through the research, the workshop design, or the test plan —{" "}
                  <a href="mailto:martta.xu@outlook.com" style={{ color: "var(--color-ink-80)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    reach out
                  </a>.
                </p>
              </CaseScrollReveal>
            </SectionShell>

          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 md:mt-16">
            <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", marginBottom: "2rem" }} />
            <Link
              href="/work/ark7"
              className="group flex flex-col gap-1.5 no-underline"
              aria-label="Next project: ARK7 - Cultivating a Trusted Investment Community"
            >
              <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 400, color: "var(--color-muted)", margin: 0 }}>
                Next Project - ARK7 &middot; 2024
              </p>
              <p
                style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "18px", lineHeight: "140%", fontWeight: 400, margin: 0 }}
                className="text-[var(--color-muted)] transition-colors duration-200 ease-out group-hover:text-[#1A1A1A]"
              >
                Cultivating a Trusted Investment Community{" "}
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">&rarr;</span>
              </p>
            </Link>
          </div>

        </div>

        <div className="hidden md:block" />
      </main>
    </div>
  );
}
