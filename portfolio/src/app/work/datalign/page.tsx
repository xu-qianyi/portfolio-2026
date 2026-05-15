"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    icon: "ri-time-line",
    title: "The interstitial screen looked like a finish line.",
    body: 'Our mid-flow "Did you know?" educational interlude looked like a match result. Users waited 30+ seconds for something to happen, then closed the tab. /match became our top U-turn exit.',
    image: "/images/Datalign form/interstitial.png",
  },
  {
    icon: "ri-arrow-go-back-line",
    title: "Users wanted to verify their numbers - and couldn't.",
    body: "After entering income and assets, users tried to jump back to double-check. There was no jump-to navigation. They had to click back 5-10 times, losing context each step. Many gave up.",
  },
  {
    icon: "ri-error-warning-line",
    title: "Alert-driven U-turns.",
    body: "The Next button stayed active on required questions. No asterisks. Users clicked through, got an alert, assumed it referred to the previous page, and went back. A likely driver of the 9% U-turn rate.",
  },
];

const OTHER_PATTERNS = [
  { text: "Step 1 (Landing screen) dropped 40% of publisher traffic - landing copy was failing immediately.", image: "/images/Datalign form/step 1.png" },
  { text: "Step 10 (Asset breakdown) had the highest mid-flow drop-off - the question was too complex.", image: "/images/Datalign form/step 10.png" },
  { text: 'Jargon like "Principal" excluded users with lower financial literacy - invisible in metrics, obvious in replays', image: "/images/Datalign form/jargon.png" },
];

const DESIGN_PRINCIPLES = [
  { num: "01", title: "Earn the next question.",             body: "Build trust before asking sensitive info." },
  { num: "02", title: "Give value back as users give input.", body: "Every answer should make the next moment feel personalized, not just feed a backend." },
  { num: "03", title: "Have a personality.",                 body: "A consistent voice that reduces cognitive friction and builds institutional trust." },
];

const TEST_PHASES = [
  { phase: "1", ship: "Same questions, new conversational layout",            measure: "Completion rate, step-by-step drop-off" },
  { phase: "2", ship: "Vary question order & phrasing per workshop hypotheses", measure: "Drop-off by flow, sentiment, micro-interactions" },
  { phase: "3", ship: "Standalone landing pages for paid traffic",             measure: "Conversion by traffic source" },
];

const TAKEAWAYS = [
  {
    title: "Phased delivery was the design, not the workaround.",
    body: "The form's 20 visible questions ran through a web of internal and publisher APIs where even small changes carried real shipping risk. That depth set the strategy: layout first, content second, traffic optimization third. Each phase was scoped to what we could safely change - not to what felt comfortable.",
  },
];

const META_ITEMS = [
  { label: "Role",     value: "Product Designer (Summer/Fall Co-op)" },
  { label: "Timeline", value: "May - Dec 2025" },
  { label: "Team",     value: "Product Designer (me), 1 Senior Designer, CSM, 2 Engineers, Data Team" },
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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  useEffect(() => {
    document.body.style.overflow = lightboxSrc ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxSrc]);

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
                to address the structural failure modes behind an 88% abandonment rate.
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                      {[
                        { stat: "12%", detail: "completion rate across paid traffic" },
                        { stat: "9%", detail: "of sessions ended in a U-turn - users navigated in circles before giving up" },
                        { stat: "1 in 3", detail: "users said they would not recommend the experience, citing the form as too long, too clinical, and lacking contextual justification for each question" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-3 rounded-lg p-4" style={{ background: "#fff", boxShadow: "none" }}>
                          <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "36px", lineHeight: 1, fontWeight: 400, letterSpacing: "-0.03em", color: "var(--color-ink)", margin: 0 }}>{item.stat}</p>
                          <p style={BODY}>{item.detail}</p>
                        </div>
                      ))}
                    </div>
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
                      What broke and why
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  <p style={BODY}>
                    Across all five issues, one thing was clear:{" "}
                    <Highlight variant="blue" duration={800}>the form was built for the auction, not for the person filling it out.</Highlight>{" "}
                    Each question existed because the matching engine needed it, not because the user understood why it mattered.
                  </p>

                  <div className="mt-6 md:mt-8">
                    <div className="p-8 md:p-16 rounded-xl" style={{ backgroundColor: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <img src="/images/Datalign form/UX audit.svg" alt="Annotated screenshots of the original form" style={{ width: "100%", display: "block" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-50)", marginTop: "8px", textAlign: "center", opacity: 0.65 }}>
                      One typical page - design and usability issues identified during the audit.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>Watching what users actually did</SubHeading>
                    <p style={BODY}>
                      To validate the heuristics, I analyzed real user behavior at scale.
                    </p>
                    <p style={BODY}>
                      I pulled{" "}
                      <Highlight variant="blue" duration={800}>5,162 Forbes SEM sessions and 13,559 Finance Advisors sessions from Hotjar (18,700 total)</Highlight>, used ChatGPT to clean and analyze the data at scale, and <Highlight variant="blue" duration={800}>ran a follow-up watch party</Highlight> with a peer designer on the sessions the data couldn&apos;t explain on its own.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>Three behaviors stood out:</p>
                    <div className="flex flex-col gap-3">
                      {BEHAVIORAL_PATTERNS.map((pattern, i) => (
                        <div key={i} className="flex gap-4 rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] p-5">
                          <div
                            className="shrink-0 flex items-center justify-center"
                            style={{ width: "24px", height: "24px", minWidth: "24px", marginTop: "2px" }}
                          >
                            <i className={pattern.icon} style={{ fontSize: "18px", color: "var(--color-ink-50)" }} />
                          </div>
                          <div className="flex gap-4 flex-1 min-w-0 items-end">
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                              <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>{pattern.title}</p>
                              <p style={{ ...BODY, color: "var(--color-ink-50)", opacity: 0.5 }}>{pattern.body}</p>
                            </div>
                            {pattern.image && (
                              <button
                                onClick={() => setLightboxSrc(pattern.image!)}
                                className="relative shrink-0 rounded overflow-hidden"
                                style={{ width: "80px", border: "1px solid var(--color-ink-14)", background: "none", padding: 0, cursor: "zoom-in" }}
                                aria-label="Expand image"
                              >
                                <img src={pattern.image} alt="" style={{ width: "80px", display: "block" }} />
                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.18)" }}>
                                  <i className="ri-zoom-in-line" style={{ fontSize: "14px", color: "#fff" }} />
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3.5 mt-6 mb-2">
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>A few more patterns identified during watch parties:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-xl" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      {OTHER_PATTERNS.map((p, i) => (
                        <div key={i} className="flex flex-col gap-3">
                          <img src={p.image} alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }} />
                          <p style={{ ...BODY, color: "var(--color-ink-50)", opacity: 0.5 }}>{p.text}</p>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <SubHeading>Looking outward</SubHeading>
                    <p style={BODY}>
                      I mapped 10+ wealth management competitors on a matrix: <em>Functional &rarr; Decent UX &rarr; Well-designed</em>.
                    </p>

                    <div className="mt-6 md:mt-8 p-8 md:p-16 rounded-xl" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <img src="/images/Datalign form/Landscape.png" alt="Competitive landscape matrix" style={{ width: "100%", display: "block", borderRadius: 8 }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-50)", marginTop: "8px", textAlign: "center", opacity: 0.65 }}>
                      Datalign lands in the functional quadrant - with one of the longest forms on the map.
                    </p>

                    <p style={BODY}>
                      <Highlight variant="blue" duration={800}>The longer the form, the more the experience design matters.</Highlight>{" "}
                      Datalign sits in the long-form camp (20+ questions) but designs like a short-form tool.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>A few competitors I looked at closely:</p>
                    <ul className="flex flex-col gap-3 pl-0 m-0 list-none">
                      {[
                        { name: "Facet",                          body: "First-person narrator, gradual engagement, social proof at decision points." },
                        { name: "Boldin",                         body: "In-line financial analysis as you complete the form, rewarding users for continuing." },
                        { name: "Quinn (NerdWallet, SmartAsset)", body: "Chat-style interaction with logical grouping." },
                      ].map((item) => (
                        <li key={item.name} className="flex gap-3 items-start">
                          <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                          <p style={BODY}><span style={{ fontWeight: 600 }}>{item.name}</span> - {item.body}</p>
                        </li>
                      ))}
                    </ul>
                    <p style={BODY}>
                      <span style={{ fontWeight: 600 }}>Looking outside the category surfaced one consistent pattern.</span> Cleo and Lemonade use the same intake-form mechanic as Datalign - users answer a series of questions before they get value - but both sustain completion through a consistent editorial voice. Datalign had none.
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
                    <img src="/images/Datalign form/workshop.png" alt="Photo from the workshop" style={{ width: "100%", display: "block", borderRadius: 8 }} />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { num: "Question 1", q: "What do we like about the current form?" },
                      { num: "Question 2", q: "What do we not like?" },
                      { num: "Question 3", q: "What assumptions have we never tested?" },
                      { num: "Question 4", q: "How do we get there?" },
                    ].map(({ num, q }) => (
                      <div key={num} className="flex flex-col gap-2 rounded-lg p-4" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.5, fontWeight: 550, letterSpacing: "-0.005em", color: "rgba(26,26,26,0.85)", margin: 0 }}>{num}</p>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: 1.5, letterSpacing: "-0.005em", color: "rgba(26,26,26,0.45)", margin: 0 }}>{q}</p>
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
                    These became the core of our AB testing plan.{" "}
                    <Highlight variant="blue" duration={800}>Structuring the session this way converted individual research findings into a shared testing roadmap</Highlight>{" "}
                    - with Product and Engineering aligned on priorities before a line of design was drawn.
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
                  <div className="flex flex-col gap-5">
                    {DESIGN_PRINCIPLES.map((p) => (
                      <div key={p.num} className="flex flex-col gap-1.5">
                        <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(26,26,26,0.35)" }}>{p.num}</div>
                        <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", lineHeight: "150%", fontWeight: 500, color: "var(--color-ink)", margin: 0 }}>{p.title}</p>
                        <p style={BODY}>{p.body}</p>
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
                      "A persona (Claire) who provides contextual narration instead of transactional copy",
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
                      The form connects to the matching engine, internal scoring APIs, and publisher contracts that lock question order and field names. A single letter change takes two days of engineering effort. So I proposed shipping the redesign through{" "}
                      <Highlight variant="blue" duration={800}>Heyflow</Highlight>
                      , an online form testing platform, on Datalign&apos;s live traffic. Build the form twice, test in weeks not quarters.
                    </p>
                    <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink)" }}>We had 20+ variables to test. They broke down into three phases:</p>
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
                      Layout before content before traffic fit. Any lift has a clean explanation. The in-house build inherits only what we prove.
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
                      Learnings
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-6">
                    {TAKEAWAYS.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
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
                  </div>

                  <div className="flex flex-col gap-3.5 mt-8 md:mt-10">
                    <h2 style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "24px", lineHeight: "1.2", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--color-ink)", marginBottom: "1rem", marginTop: 0, textWrap: "balance" }}>Where we are right now</h2>
                    <p style={BODY}>Phase 1 has shipped. Early data:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 mt-1">
                      {[
                        { value: "12% → 17%", label: "completion rate across paid traffic (40% lift)" },
                        { value: "9% → 5%",   label: "U-turn rate" },
                        { value: "~half",     label: "Step 1 drop-off" },
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-3">
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
      {lightboxSrc && typeof document !== "undefined" && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.75)", cursor: "zoom-out" }}
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "8px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)", cursor: "zoom-out", display: "block" }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
