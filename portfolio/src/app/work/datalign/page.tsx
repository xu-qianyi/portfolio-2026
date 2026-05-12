"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import Highlight from "@/components/Highlight";
import BackToTop from "@/components/BackToTop";

const BODY = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  lineHeight: "1.6",
  letterSpacing: "-0.005em",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;

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
  { num: "01", title: "Earn the next question.",             body: "Build trust before asking sensitive info." },
  { num: "02", title: "Give value back as users give input.", body: "Every answer should make the next moment feel personalized, not just feed a backend." },
  { num: "03", title: "Have a personality.",                 body: "A consistent voice that makes users feel seen." },
];

const TEST_PHASES = [
  { phase: "1", ship: "Same questions, new conversational layout",            measure: "Completion rate, step-by-step drop-off" },
  { phase: "2", ship: "Vary question order & phrasing per workshop hypotheses", measure: "Drop-off by flow, sentiment, micro-interactions" },
  { phase: "3", ship: "Standalone landing pages for paid traffic",             measure: "Conversion by traffic source" },
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

const META_ITEMS = [
  { label: "Role",     value: "Product Designer (Summer/Fall Co-op)" },
  { label: "Timeline", value: "May - Dec 2025" },
  { label: "Team",     value: "Product Designer (me), 1 Senior designer, CSM, 2 Engineers, Data team" },
];

type NavSection = { id: string; label: string };

const SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "workshop", label: "The workshop" },
  { id: "design",   label: "Design" },
  { id: "outcomes", label: "Outcomes" },
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
        lineHeight: "1.3",
        fontWeight: 500,
        color: "var(--color-ink)",
        margin: 0,
        textWrap: "balance" as const,
      }}
    >
      {children}
    </h3>
  );
}

function Img({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full flex items-center justify-center rounded-lg border border-dashed border-[var(--color-ink-14)]"
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
  const itemRefs    = useRef<Record<string, HTMLButtonElement | null>>({});
  const navListRef  = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [dotY, setDotY]         = useState(0);

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
                Datalign / FinTech
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
                  textWrap: "balance" as const,
                }}
              >
                Redesigning the front door of a wealth management marketplace
              </h1>
              <p style={{ ...BODY, marginTop: "4px" }}>
                The form had been live for years and converted just 12% of paid traffic - it was functional, never designed.{" "}
                <Highlight variant="blue" duration={1200}>I researched the failure modes, facilitated a cross-functional workshop, and redesigned the intake experience end-to-end</Highlight>{" "}
                to earn user trust question by question.
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="mb-0">
              <Img label="Hero image - before/after of the form" aspect="16/9" />
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

          <DatalignMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* Sections */}
          <div className="flex flex-col">

            {/* Overview */}
            <section
              id="overview"
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Overview" />
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.2",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                        textWrap: "balance" as const,
                      }}
                    >
                      What Datalign is
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  <p style={BODY}>
                    <a href="https://datalign.com/" target="_blank" rel="noopener noreferrer" className="case-inline-link">Datalign</a> is a lead marketplace for wealth management. Consumers fill out a 20-question intake form to get matched with a registered investment advisor (RIA). Partner firms bid on the lead in an auction, and the user is connected with the winning firm.
                  </p>
                  <p style={BODY}>
                    The form <em>is</em> the front door.{" "}
                    <Highlight variant="blue" duration={800}>No form, no match, no business.</Highlight>
                  </p>

                  <div className="mt-6 md:mt-8">
                    <Image
                      src="/images/Datalign form/who is datalign.svg"
                      alt="Diagram showing how Datalign connects consumers through a form to a match auction and then to an RIA firm"
                      width={1200}
                      height={400}
                      unoptimized
                      className="block w-full h-auto mx-auto"
                    />
                  </div>

                  <div className="flex flex-col gap-3.5 mt-6 md:mt-8">
                    <SubHeading>The problem</SubHeading>
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
                          <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                          <p style={BODY}><strong>{item.stat}</strong> - {item.detail}</p>
                        </li>
                      ))}
                    </ul>
                    <p style={BODY}>The form was functional. It had never been designed.</p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Research */}
            <section
              id="research"
              ref={(el) => { sectionRefs.current["research"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Research" />
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.2",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                        textWrap: "balance" as const,
                      }}
                    >
                      The audit
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
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
                            <td className="py-3 pr-6 border-b border-[var(--color-ink-06)] align-top" style={{ ...BODY, color: "var(--color-ink)", width: "50%" }}>{row.issue}</td>
                            <td className="py-3 border-b border-[var(--color-ink-06)] align-top" style={BODY}>{row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={BODY}>
                    Across all five issues, one thing was clear:{" "}
                    <Highlight variant="blue" duration={800}>the form was built for the auction, not for the person filling it out.</Highlight>{" "}
                    Each question existed because the matching engine needed it, not because the user understood why it mattered.
                  </p>

                  <div className="mt-6 md:mt-8">
                    <Img label="Annotated screenshots of the original form" aspect="4/3" />
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>Watching what users actually did</SubHeading>
                    <p style={BODY}>
                      Heuristics show what <em>might</em> be wrong. To find out what <em>was</em> actually wrong, I needed to see the form through real user behavior.
                    </p>
                    <p style={BODY}>
                      I pulled{" "}
                      <Highlight variant="blue" duration={800}>5,162 Forbes SEM sessions and 13,559 Finance Advisors sessions from Hotjar (18,700 total)</Highlight>, used AI to analyze them at scale, and ran a follow-up watch party with a peer designer on the sessions the data couldn&apos;t explain on its own.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>Three behaviors stood out:</p>
                    <div className="flex flex-col gap-3">
                      {BEHAVIORAL_PATTERNS.map((pattern, i) => (
                        <div key={i} className="flex gap-4 rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] p-5">
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
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>A few more patterns from the data:</p>
                    <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                      {OTHER_PATTERNS.map((p, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                          <p style={BODY}>{p}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <Img label="Drop-off + U-turn map across the form" aspect="16/9" />
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>Looking outward</SubHeading>
                    <p style={BODY}>
                      I mapped 10+ wealth management competitors on a matrix: <em>Functional &rarr; Decent UX &rarr; Well-designed</em>.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Img label="Competitive landscape matrix" aspect="4/3" />
                    </div>

                    <p style={BODY}>
                      <Highlight variant="blue" duration={800}>The longer the form, the more the experience design matters.</Highlight>{" "}
                      Datalign sits in the long-form camp (20+ questions) but designs like a short-form tool.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>A few competitors I looked at closely:</p>
                    <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                      {[
                        { name: "Facet",                          body: "Friendly first-person narrator, gradual engagement, social proof at moments of hesitation." },
                        { name: "Boldin",                         body: "In-line financial analysis as you complete the form, rewarding users for continuing." },
                        { name: "Quinn (NerdWallet, SmartAsset)", body: "Chat-style interaction with logical grouping." },
                      ].map((item) => (
                        <li key={item.name} className="flex gap-3 items-start">
                          <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                          <p style={BODY}><strong>{item.name}</strong> - {item.body}</p>
                        </li>
                      ))}
                    </ul>
                    <p style={BODY}>Then I looked outside the category. One thing stuck with me.</p>
                    <p style={BODY}>
                      <strong>Personality is the experience.</strong> Cleo and Lemonade are intake-form products like ours - users answer a series of questions before they get value. But their forms have a voice. Cleo is bold and cheeky. Lemonade&apos;s Maya is warm and patient. The mechanic is the same as ours. The feel is not.{" "}
                      Datalign had no voice at all.
                    </p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

            {/* The workshop */}
            <section
              id="workshop"
              ref={(el) => { sectionRefs.current["workshop"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="The workshop" />
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.2",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                        textWrap: "balance" as const,
                      }}
                    >
                      Turning research into shared hypotheses
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  <p style={BODY}>
                    I organized and facilitated a cross-functional workshop with Product, Engineering, and Data team. Four prompts structured the session:
                  </p>

                  <div className="mt-6 md:mt-8">
                    <Img label="Photo or FigJam screenshot from the workshop" aspect="16/9" />
                  </div>

                  <div className="flex flex-col gap-2 mt-6">
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
                  <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                    {[
                      "Does adding a real human avatar drive higher completion?",
                      "Does rewording financial jargon reduce user confusion?",
                      "Is the interstitial screen helping, or hurting?",
                    ].map((a, i) => (
                      <li key={i} className="flex gap-3 items-baseline">
                        <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                        <p style={{ ...BODY, fontStyle: "italic" }}>{a}</p>
                      </li>
                    ))}
                  </ul>
                  <p style={BODY}>
                    These became the core of our AB testing plan. Bringing the team into the same room turned my research into{" "}
                    <Highlight variant="blue" duration={800}>the team&apos;s research</Highlight> - which meant they had buy-in to ship it.
                  </p>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Design */}
            <section
              id="design"
              ref={(el) => { sectionRefs.current["design"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Design" />
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.2",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                        textWrap: "balance" as const,
                      }}
                    >
                      The redesign
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>Three principles came out of the research and the workshop:</p>
                  <div className="flex flex-col gap-4">
                    {DESIGN_PRINCIPLES.map((p) => (
                      <div key={p.num} className="flex gap-4 items-start">
                        <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(26,26,26,0.35)", flexShrink: 0, lineHeight: "160%", paddingTop: "2px" }}>{p.num}</span>
                        <p style={BODY}><strong>{p.title}</strong> {p.body}</p>
                      </div>
                    ))}
                  </div>
                  <p style={BODY}>The new form opens with a name, not a question:</p>
                  <blockquote
                    className="pl-5 my-2"
                    style={{ borderLeft: "1.5px solid rgba(0, 0, 0, 0.08)", margin: 0 }}
                  >
                    <p className="text-[14px] font-[450] leading-[1.6] italic text-[rgba(0,0,0,.65)]">
                      &ldquo;Hi, I&apos;m Claire - your personal financial concierge. How should I call you?&rdquo;
                    </p>
                  </blockquote>

                  <div className="mt-6 md:mt-8">
                    <Img label="Step 1 - Claire intro card" aspect="4/3" />
                  </div>

                  <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>Each step that follows layers in:</p>
                  <ul className="flex flex-col gap-2 pl-0 m-0 list-none">
                    {[
                      "A persona (Claire) who narrates with warmth instead of sales copy",
                      'Data nuggets that contextualize each question ("Investors who work with an advisor are 3x more confident about reaching their goals")',
                      "A progress indicator so users know where they are",
                      "Branching paths - Plaid auto-complete (4 min), phone call, or manual entry (10 min)",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                        <p style={BODY}>{item}</p>
                      </li>
                    ))}
                  </ul>
                  <p style={BODY}>
                    High-friction questions (income, assets) come <em>after</em> trust is built, and use simpler inputs (typed fields, asset buckets) instead of the original sliders.
                  </p>

                  <div className="mt-6 md:mt-8">
                    <Img label="Branching choice screen + key step UI" aspect="4/3" />
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>From insight to test</SubHeading>
                    <p style={BODY}>
                      Our form is deeply wired into the system. It plugs into the matching engine, multiple internal APIs, and our publishers&apos; APIs. Even a one-character change can take an engineer two days to ship. Testing redesign hypotheses through the in-house build wasn&apos;t viable at the speed we needed.
                    </p>
                    <p style={BODY}>
                      So I proposed shipping the redesign through{" "}
                      <Highlight variant="blue" duration={800}>Heyflow</Highlight> - a no-code platform with conditional logic and built-in AB testing - as a stop-gap before the in-house build.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>Three-phase rollout:</p>
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
                              <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={{ ...BODY, fontWeight: 600, color: "var(--color-ink)" }}>{row.phase}</td>
                              <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={BODY}>{row.ship}</td>
                              <td className="py-3 border-b border-[var(--color-ink-06)] align-top" style={{ ...BODY, color: "var(--color-ink-70)" }}>{row.measure}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p style={BODY}>
                      Layout first, then content, then traffic-source fit. The in-house build that follows is shaped by what we learn here.
                    </p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

            {/* Outcomes */}
            <section
              id="outcomes"
              ref={(el) => { sectionRefs.current["outcomes"] = el; }}
              className="scroll-mt-24 pt-16"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Outcomes" />
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.2",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                        textWrap: "balance" as const,
                      }}
                    >
                      What I&apos;m taking with me
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  {TAKEAWAYS.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2" style={{ marginTop: i > 0 ? "1rem" : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(26,26,26,0.35)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", lineHeight: "150%", fontWeight: 400, color: "var(--color-ink)", margin: 0 }}>
                          {item.title}
                        </p>
                      </div>
                      <p style={BODY}>{item.body}</p>
                    </div>
                  ))}

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>Where we are right now</SubHeading>
                    <p style={BODY}>Phase 1 has shipped. Early data:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 mt-1">
                      {[
                        { value: "12% → 17%", label: "completion rate across paid traffic (40% lift)" },
                        { value: "9% → 5%",   label: "U-turn rate" },
                        { value: "~half",     label: "Step 1 drop-off" },
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-3 pt-4" style={{ borderTop: "1px solid var(--color-ink-06)" }}>
                          <p style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "36px",
                            lineHeight: "1",
                            fontWeight: 400,
                            letterSpacing: "-0.03em",
                            color: "var(--color-ink)",
                            margin: 0,
                          }}>
                            {stat.value}
                          </p>
                          <p style={BODY}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <p style={BODY}>Phase 2 is testing now.</p>
                  </div>
                </CaseScrollReveal>
              </div>
            </section>

          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 md:mt-16">
            <Link
              href="/work/ark7"
              className="group flex flex-col gap-3 no-underline"
              aria-label="Next project: ARK7 - Cultivating a Trusted Investment Community"
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
                Cultivating a Trusted Investment Community{" "}
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">&rarr;</span>
              </p>
            </Link>
          </div>

        </div>

        <div className="hidden md:block" />
      </main>
      <BackToTop />
    </div>
  );
}
