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
  { id: "overview",    label: "Overview" },
  { id: "audit",       label: "The audit" },
  { id: "behavior",    label: "User behavior" },
  { id: "competitive", label: "Looking outward" },
  { id: "workshop",    label: "The workshop" },
  { id: "redesign",    label: "The redesign" },
  { id: "testing",     label: "From insight to test" },
  { id: "takeaways",   label: "What I'm taking with me" },
  { id: "results",     label: "Where we are right now" },
];

const META_ITEMS = [
  { label: "Role",     value: "Product Designer (Summer/Fall Co-op)" },
  { label: "Timeline", value: "May - Dec 2025" },
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
    title: "The interstitial screen looked like a finish line.",
    body: 'Our mid-flow "Did you know?" educational interlude looked like a match result. Users waited 30+ seconds for something to happen, then closed the tab. /match became our top U-turn exit.',
  },
  {
    title: "Users wanted to verify their numbers - and couldn't.",
    body: "After entering income and assets, users tried to jump back to double-check. There was no jump-to navigation. They had to click back 5-10 times, losing context each step. Many gave up.",
  },
  {
    title: "Alert-driven U-turns.",
    body: "The Next button stayed active on required questions. No asterisks. Users clicked through, got an alert, assumed it referred to the previous page, and went back. A likely driver of the 9% U-turn rate.",
  },
];

const OTHER_PATTERNS = [
  "Step 1 dropped 40% of Forbes traffic - landing copy was failing immediately",
  "Step 10 was the biggest mid-flow drop for Finance Advisors traffic - a complex question with high cognitive load",
  "86% of Finance Advisors traffic was on mobile, but our form was desktop-first",
  'Jargon like "Principal" excluded users with lower financial literacy - invisible in metrics, obvious in replays',
];

const DESIGN_PRINCIPLES = [
  { num: "01", title: "Earn the next question.",           body: "Build trust before asking sensitive info." },
  { num: "02", title: "Give value back as users give input.", body: "Every answer should make the next moment feel personalized, not just feed a backend." },
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
    body: "The form had shipped leads for years. That didn't mean it had been designed. On any inherited system, the first question is what's there because someone decided, versus what's there because it accumulated.",
  },
  {
    title: "Simple things sit on top of complex systems.",
    body: "Our form was 20 questions on the surface, a web of APIs underneath. Shipping the redesign step by step, not all at once, wasn't slow. It was the only path the system could absorb.",
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
                Redesigning Datalign&apos;s lead gen form - the front door of a wealth management marketplace
              </h1>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60}>
              <Img label="Hero image - before/after of the form" aspect="16/9" />
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

            {/* 01 — Overview */}
            <SectionShell id="overview" num="01" title="Overview" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <h3 style={H3}>What Datalign is</h3>
                <p style={BODY}>
                  Datalign is a lead marketplace for wealth management. Consumers fill out a 20-question intake form to get matched with a registered investment advisor (RIA). Partner firms bid on the lead in an auction, and the user is connected with the winning firm.
                </p>
                <p style={BODY}>
                  The form <em>is</em> the front door.{" "}
                  <mark style={MARK}>No form, no match, no business.</mark>
                </p>
              </CaseScrollReveal>
              <CaseScrollReveal delay={100}>
                <Img label="Diagram - Consumer → Form → Match auction → RIA firm → Conversation" aspect="3/1" />
              </CaseScrollReveal>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <h3 style={H3}>The problem</h3>
                <p style={BODY}>
                  The form had been live for years. It worked: leads came in, matches went out, the business ran.
                </p>
                <p style={BODY}>But &ldquo;worked&rdquo; had a ceiling:</p>
                <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                  {[
                    { stat: "12% completion rate", detail: "across paid traffic" },
                    { stat: "9% of sessions ended in a U-turn", detail: "users navigated in circles before giving up" },
                    { stat: "1 in 3 users said they would not recommend the experience", detail: "citing the form as too long, too clinical, and disconnected from why any of it mattered" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                      <p style={BODY}><strong>{item.stat}</strong> - {item.detail}</p>
                    </li>
                  ))}
                </ul>
                <p style={BODY}>The form was functional. It had never been designed.</p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 02 — The audit */}
            <SectionShell id="audit" num="02" title="The audit" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  I ran a heuristic walkthrough of the live form against Nielsen&apos;s 10 principles. Five recurring issues:
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
                  Across all five issues, one thing was clear:{" "}
                  <mark style={MARK}>the form was built for the auction, not for the person filling it out.</mark>{" "}
                  Each question existed because the matching engine needed it, not because the user understood why it mattered.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Annotated screenshots of the original form" aspect="4/3" />
              </CaseScrollReveal>
            </SectionShell>

            {/* 03 — User behavior */}
            <SectionShell id="behavior" num="03" title="Watching what users actually did" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  Heuristics show what <em>might</em> be wrong. To find out what <em>was</em> actually wrong, I needed to see the form through real user behavior.
                </p>
                <p style={BODY}>
                  I pulled{" "}
                  <mark style={MARK}>5,162 Forbes SEM sessions and 13,559 Finance Advisors sessions from Hotjar (18,700 total)</mark>, used AI to analyze them at scale, and ran a follow-up watch party with a peer designer on the sessions the data couldn&apos;t explain on its own.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-4">
                <p style={{ ...BODY, fontWeight: 500 }}>Three behaviors stood out:</p>
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
                <p style={{ ...BODY, fontWeight: 500 }}>A few more patterns from the data:</p>
                <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                  {OTHER_PATTERNS.map((p, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span style={{ color: "var(--color-muted)", fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>-</span>
                      <p style={BODY}>{p}</p>
                    </li>
                  ))}
                </ul>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Drop-off + U-turn map across the form" aspect="16/9" />
              </CaseScrollReveal>
            </SectionShell>

            {/* 04 — Looking outward */}
            <SectionShell id="competitive" num="04" title="Looking outward" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  I mapped 10+ wealth management competitors on a matrix: <em>Functional &rarr; Decent UX &rarr; Well-designed</em>.
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Competitive landscape matrix" aspect="4/3" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  <mark style={MARK}>The longer the form, the more the experience design matters.</mark>{" "}
                  Datalign sits in the long-form camp (20+ questions) but designs like a short-form tool.
                </p>
                <p style={{ ...BODY, fontWeight: 500 }}>A few competitors I looked at closely:</p>
                <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                  {[
                    { name: "Facet",                            body: "Friendly first-person narrator, gradual engagement, social proof at moments of hesitation." },
                    { name: "Boldin",                           body: "In-line financial analysis as you complete the form, rewarding users for continuing." },
                    { name: "Quinn (NerdWallet, SmartAsset)",   body: "Chat-style interaction with logical grouping." },
                  ].map((item) => (
                    <li key={item.name} className="flex gap-3 items-start">
                      <span style={{ color: THEME_BLUE, fontWeight: 600, fontSize: "16px", lineHeight: "160%", flexShrink: 0 }}>→</span>
                      <p style={BODY}><strong>{item.name}</strong> - {item.body}</p>
                    </li>
                  ))}
                </ul>
                <p style={BODY}>Then I looked outside the category. One thing stuck with me.</p>
                <p style={BODY}>
                  <strong>Personality is the experience.</strong> Cleo and Lemonade are intake-form products like ours - users answer a series of questions before they get value. But their forms have a voice. Cleo is bold and cheeky. Lemonade&apos;s Maya is warm and patient. The mechanic is the same as ours. The feel is not.{" "}
                  <mark style={MARK}>Datalign had no voice at all.</mark>
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 05 — The workshop */}
            <SectionShell id="workshop" num="05" title="The workshop: turning research into shared hypotheses" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  I organized and facilitated a cross-functional workshop with Product, Engineering, and Data team. Four prompts structured the session:
                </p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Photo or FigJam screenshot from the workshop" aspect="16/9" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {[
                    "What do we like about the current form?",
                    "What do we not like?",
                    "What assumptions have we never tested?",
                    "How do we get there?",
                  ].map((q, i) => (
                    <div key={i} className="flex gap-4 items-start py-3 border-b border-[var(--color-ink-06)]">
                      <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", fontWeight: 600, color: "var(--color-muted)", flexShrink: 0, lineHeight: "160%", minWidth: "20px" }}>{i + 1}.</span>
                      <p style={{ ...BODY, fontStyle: "italic" }}>&ldquo;{q}&rdquo;</p>
                    </div>
                  ))}
                </div>
                <p style={BODY}>
                  The output was a list of testable hypotheses - design decisions we had been making on instinct without ever measuring:
                </p>
                <ul className="flex flex-col gap-2 pl-4 m-0 list-none" style={{ borderLeft: `2px solid var(--color-ink-14)` }}>
                  {[
                    "Does adding a real human avatar drive higher completion?",
                    "Does rewording financial jargon reduce user confusion?",
                    "Is the interstitial screen helping, or hurting?",
                  ].map((a, i) => (
                    <li key={i}><p style={{ ...BODY, fontStyle: "italic" }}>{a}</p></li>
                  ))}
                </ul>
                <p style={BODY}>
                  These became the core of our AB testing plan. Bringing the team into the same room turned my research into{" "}
                  <mark style={MARK}>the team&apos;s research</mark> - which meant they had buy-in to ship it.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 06 — The redesign */}
            <SectionShell id="redesign" num="06" title="The redesign" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={{ ...BODY, fontWeight: 500 }}>Three principles came out of the research and the workshop:</p>
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
                  &ldquo;Hi, I&apos;m Claire - your personal financial concierge. How should I call you?&rdquo;
                </blockquote>
              </CaseScrollReveal>

              <CaseScrollReveal delay={60}>
                <Img label="Step 1 - Claire intro card" aspect="4/3" />
              </CaseScrollReveal>

              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={{ ...BODY, fontWeight: 500 }}>Each step that follows layers in:</p>
                <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                  {[
                    "A persona (Claire) who narrates with warmth instead of sales copy",
                    'Data nuggets that contextualize each question ("Investors who work with an advisor are 3x more confident about reaching their goals")',
                    "A progress indicator so users know where they are",
                    "Branching paths - Plaid auto-complete (4 min), phone call, or manual entry (10 min)",
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

            {/* 07 — From insight to test */}
            <SectionShell id="testing" num="07" title="From insight to test" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>
                  Our form is deeply wired into the system. It plugs into the matching engine, multiple internal APIs, and our publishers&apos; APIs. Even a one-character change can take an engineer two days to ship. Testing redesign hypotheses through the in-house build wasn&apos;t viable at the speed we needed.
                </p>
                <p style={BODY}>
                  So I proposed shipping the redesign through{" "}
                  <mark style={MARK}>Heyflow</mark> - a no-code platform with conditional logic and built-in AB testing - as a stop-gap before the in-house build.
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
                  Layout first, then content, then traffic-source fit. The in-house build that follows is shaped by what we learn here.
                </p>
              </CaseScrollReveal>
            </SectionShell>

            {/* 08 — What I'm taking with me */}
            <SectionShell id="takeaways" num="08" title="What I'm taking with me" sectionRefs={sectionRefs}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-6">
                {TAKEAWAYS.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <p style={{ ...BODY, fontWeight: 600, color: "var(--color-ink)" }}>{item.title}</p>
                    <p style={BODY}>{item.body}</p>
                  </div>
                ))}
              </CaseScrollReveal>
            </SectionShell>

            {/* 09 — Where we are right now */}
            <SectionShell id="results" num="09" title="Where we are right now" sectionRefs={sectionRefs} divider={false}>
              <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                <p style={BODY}>Phase 1 has shipped. Early data:</p>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 border border-[var(--color-ink-14)]" style={{ backgroundColor: "var(--color-ink-06)" }}>
                  {[
                    { value: "12% → 17%", label: "completion rate across paid traffic (40% lift)" },
                    { value: "9% → 5%",   label: "U-turn rate" },
                    { value: "~half",     label: "Step 1 drop-off" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <p style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "26px", fontWeight: 400, color: "var(--color-ink)", margin: 0, lineHeight: "1.1" }}>{stat.value}</p>
                      <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "var(--color-muted)", margin: 0, lineHeight: "140%" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CaseScrollReveal>

              <CaseScrollReveal delay={80}>
                <p style={BODY}>Phase 2 is testing now.</p>
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
