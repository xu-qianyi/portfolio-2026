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
    title: "The interstitial screen looked like a finish line.",
    body: "Users waited, then closed the tab.",
    image: "/images/Datalign form/interstitial.png",
  },
  {
    title: "Users wanted to verify their numbers. They couldn't.",
    body: "No jump-to navigation meant clicking back 5-10 times and losing all context.",
    image: "/images/Datalign form/unable to verify numbers.png",
  },
  {
    title: "The Next button was always active.",
    body: "No fields were marked required. Users rage-clicked through, hit an error, and left.",
    image: "/images/Datalign form/alert.png",
  },
];

const OTHER_PATTERNS = [
  { text: "Step 1 dropped 40% of publisher traffic. The landing copy was failing from the start.", image: "/images/Datalign form/step 1.png" },
  { text: "Step 10 had the highest mid-flow drop-off. The question was too complex.", image: "/images/Datalign form/step 10.png" },
  { text: 'Jargon like "Principal" excluded users with lower financial literacy. Invisible in metrics, obvious in replays.', image: "/images/Datalign form/jargon.png" },
];

const DESIGN_DECISIONS = [
  {
    pain: "The form opened with a question, not a name. Clinical copy, no warmth, no explanation for why questions were being asked. Users felt processed.",
    solution: "Claire - a personal financial concierge - opens the form and guides users through. Each step gives something back: a data point, a reason, a sense that the next question was earned.",
    image: "Step 1 - Claire intro card",
  },
  {
    pain: "Users had no idea how far they were or how much was left. The interstitial screen looked like a finish line - users waited, then closed the tab.",
    solution: "A persistent progress bar so users always know where they are. Branching entry paths upfront: Plaid auto-complete (4 min), phone call, or manual entry (10 min) - users choose their commitment level before they start.",
    image: "Progress bar + branching choice screen",
  },
  {
    pain: "Income and asset questions came before the form had earned them. Sliders defaulted to 'Other' at $800K, making the form feel inaccurate.",
    solution: "High-friction questions move to the end, after trust is built. Sliders replaced with typed fields and asset buckets.",
    image: "High-friction question redesign",
  },
];

const TEST_PHASES = [
  { phase: "1", ship: "Same questions, new conversational layout",            measure: "Completion rate, step-by-step drop-off" },
  { phase: "2", ship: "Vary question order & phrasing per workshop hypotheses", measure: "Drop-off by flow, sentiment, micro-interactions" },
  { phase: "3", ship: "Standalone landing pages for paid traffic",             measure: "Conversion by traffic source" },
];

const TAKEAWAYS = [
  {
    title: "Phased delivery was the design, not the workaround.",
    body: "The form's 20 questions ran through internal and publisher APIs. Small changes had real shipping risk. So we phased: layout first, content second, traffic last. Each phase shipped only what we could safely touch.",
  },
];

const META_ITEMS = [
  { label: "Role",     value: "Product Designer (Summer/Fall Co-op)" },
  { label: "Product type", value: "Lead generation form (Web)" },
  { label: "Team",     value: "Product Designer (me), 1 Senior Designer, CSM, 2 Engineers, Data Team" },
];

type NavSection = { id: string; label: string };

const SECTIONS: NavSection[] = [
  { id: "overview",  label: "Overview" },
  { id: "research",  label: "Research" },
  { id: "workshop",  label: "Workshop" },
  { id: "design",    label: "Design" },
  { id: "outcomes",  label: "Outcomes" },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          color: "var(--color-ink-50)",
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
                The lead generation form had been live for years and converted just 12% of paid traffic. Functional, never designed.{" "}
                <Highlight variant="blue" duration={1200}>I mapped the failure modes, ran a cross-functional workshop, and redesigned the intake experience from scratch.</Highlight>
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="mb-0">
              <video
                src="/images/Datalign form/part1.webm"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", display: "block", borderRadius: 8 }}
              />
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
                        color: "var(--color-ink-50)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "13px",
                        lineHeight: "1.45",
                        color: "var(--color-ink-80)",
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
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Overview" />
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={BODY}>
                    <a href="https://datalign.com/" target="_blank" rel="noopener noreferrer" className="case-inline-link">Datalign</a> matches consumers with financial advisors through a 20-question intake form. Partner firms bid on the lead in an auction. <Highlight variant="blue" duration={800}>No form, no match, no business.</Highlight>
                  </p>

                  <div className="mt-2 md:mt-4">
                    <Image
                      src="/images/Datalign form/who is datalign.svg"
                      alt="Diagram showing how Datalign connects consumers through a form to a match auction and then to an RIA firm"
                      width={1200}
                      height={400}
                      unoptimized
                      className="block w-full h-auto mx-auto"
                    />
                  </div>

                  <div className="flex flex-col gap-4 mt-10 md:mt-12">
                    <SubHeading>The problem</SubHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                      {[
                        { stat: "12%", detail: "completion rate across paid traffic" },
                        { stat: "9%", detail: "of sessions ended in a U-turn. Users navigated in circles before giving up." },
                        { stat: "1 in 3", detail: "users said they wouldn't recommend it - too long, too clinical, no explanation for why each question was being asked" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-3 rounded-lg p-4" style={{ background: "#fff", boxShadow: "none" }}>
                          <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "36px", lineHeight: 1, fontWeight: 400, letterSpacing: "-0.03em", color: "var(--color-ink)", margin: 0 }}>{item.stat}</p>
                          <p style={{ ...BODY, color: "var(--color-ink-50)" }}>{item.detail}</p>
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
              className="scroll-mt-24 pt-20"
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

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="mt-0 md:mt-2">
                    <div className="p-8 md:p-16 rounded-xl" style={{ backgroundColor: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <img src="/images/Datalign form/UX audit.svg" alt="Annotated screenshots of the original form" style={{ width: "100%", display: "block" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-50)", marginTop: "8px", textAlign: "center" }}>
                      One typical page. Design and usability issues identified during the audit.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-12 md:mt-14">
                    <SubHeading>18,700 sessions revealed where users gave up - and why</SubHeading>
                    <p style={BODY}>
                      I pulled{" "}
                      <Highlight variant="blue" duration={800}>5,162 Forbes SEM sessions and 13,559 Finance Advisors sessions from Hotjar</Highlight>, used ChatGPT to clean and analyze the data at scale, and <Highlight variant="blue" duration={800}>ran a follow-up watch party</Highlight> with a peer designer on the sessions the data couldn&apos;t explain on its own.
                    </p>
                    <div className="rounded-xl p-5 md:p-8 mt-1" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <p style={{ fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontSize: "18px", lineHeight: "1.3", fontWeight: 500, color: "var(--color-ink-65)", margin: "0 0 2rem", textAlign: "center", textWrap: "balance" as const }}>Confusing design was driving U-turns and drop-offs</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {BEHAVIORAL_PATTERNS.map((pattern, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <button
                              onClick={() => setLightboxSrc(pattern.image)}
                              className="relative rounded-lg overflow-hidden"
                              style={{ padding: 0, background: "none", border: "none", cursor: "zoom-in", display: "block", width: "100%", aspectRatio: "4/3" }}
                              aria-label="Expand image"
                            >
                              <img src={pattern.image} alt="" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "top center", borderRadius: 6 }} />
                              <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 hover:opacity-100 transition-opacity duration-150" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)", borderRadius: 6 }}>
                                <i className="ri-zoom-in-line" style={{ fontSize: "13px", color: "#fff" }} />
                              </div>
                            </button>
                            <div className="flex flex-col gap-1">
                              <p style={{ ...BODY, fontWeight: 500, color: "var(--color-ink-80)" }}>{pattern.title}</p>
                              <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.55", letterSpacing: "-0.005em", color: "var(--color-ink-40)" }}>{pattern.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-12 md:mt-14">
                    <SubHeading>The best competitors had a consistent voice. Datalign had none.</SubHeading>
                    <p style={BODY}>
                      I mapped 10+ competitors across a <em>Functional &rarr; Decent UX &rarr; Well-designed</em> axis. <Highlight variant="blue" duration={800}>The longer the form, the more experience design matters</Highlight> - Datalign runs 20+ questions but designs like a short-form tool.
                    </p>

                    <div className="mt-6 md:mt-8 p-8 md:p-16 rounded-xl" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <img src="/images/Datalign form/Landscape.png" alt="Competitive landscape matrix" style={{ width: "100%", display: "block", borderRadius: 8 }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-50)", marginTop: "8px", textAlign: "center" }}>
                      Datalign lands in the functional quadrant, with one of the longest forms on the map.
                    </p>

                    <p style={BODY}>
                      The ones doing it well - Facet, Boldin, Quinn - carry users through with a consistent editorial voice. Datalign had none.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-12 md:mt-14">
                    <SubHeading>Outside fintech, two patterns dominate.</SubHeading>
                    <p style={BODY}>
                      Lead gen and intake forms outside the industry split into two models.
                    </p>
                    <div className="flex flex-col gap-4 mt-2">
                      {/* Traditional */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                        <div className="p-6 md:p-10" style={{ background: "var(--color-subtle)" }}>
                          <img src="/images/Datalign form/Traditional.svg" alt="Traditional form pattern - data-first, sequential" style={{ width: "100%", display: "block" }} />
                        </div>
                        <div className="flex flex-col gap-3 p-6 md:p-8 justify-center" style={{ background: "var(--color-surface)" }}>
                          <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--color-ink)", margin: 0 }}>Traditional</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-start"><i className="ri-checkbox-circle-fill" style={{ fontSize: "15px", color: "#16A34A", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Efficient - low friction, familiar pattern</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-checkbox-circle-fill" style={{ fontSize: "15px", color: "#16A34A", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Works when brand trust is pre-established</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-close-circle-fill" style={{ fontSize: "15px", color: "#DC2626", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Feels transactional - data before relationship</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-close-circle-fill" style={{ fontSize: "15px", color: "#DC2626", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>High drop-off with cold, unfamiliar traffic</p></div>
                          </div>
                        </div>
                      </div>
                      {/* Conversational */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                        <div className="p-6 md:p-10" style={{ background: "var(--color-subtle)" }}>
                          <img src="/images/Datalign form/Conversational.svg" alt="Conversational form pattern - relationship-first" style={{ width: "100%", display: "block" }} />
                        </div>
                        <div className="flex flex-col gap-3 p-6 md:p-8 justify-center" style={{ background: "var(--color-surface)" }}>
                          <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", fontWeight: 600, color: "var(--color-ink)", margin: 0 }}>Conversational</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-start"><i className="ri-checkbox-circle-fill" style={{ fontSize: "15px", color: "#16A34A", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Builds trust progressively throughout the flow</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-checkbox-circle-fill" style={{ fontSize: "15px", color: "#16A34A", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Reduces anxiety before sensitive questions</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-close-circle-fill" style={{ fontSize: "15px", color: "#DC2626", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Slower - more reading, more steps</p></div>
                            <div className="flex gap-2 items-start"><i className="ri-close-circle-fill" style={{ fontSize: "15px", color: "#DC2626", flexShrink: 0, marginTop: "1px" }} /><p style={{ ...BODY, margin: 0 }}>Harder to layer onto a locked question structure</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p style={BODY}>
                      <Highlight variant="blue" duration={800}>Datalign&apos;s users arrive through paid traffic - no prior relationship, no brand familiarity. The research pointed toward Conversational.</Highlight>
                    </p>
                  </div>
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
                      Pressure-testing the research with the team
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={BODY}>
                    I brought the research and a Conversational design proposal to a cross-functional workshop with Product, Engineering, and Data. The goal: align on the direction, then pressure-test the hypotheses.
                  </p>
                  <div className="rounded-xl p-6 md:p-10 flex flex-col gap-4" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-ink-50)", margin: 0 }}>V1 - Conversational</p>
                    <img src="/images/Datalign form/v1.svg" alt="V1 design - pure conversational form proposal" style={{ width: "100%", display: "block" }} />
                  </div>
                  <p style={BODY}>
                    The API locked question order and field names - a single change took two days of engineering effort.
                  </p>
                  <p style={BODY}>
                    That left one question: what actually makes a Conversational form work? Not the structure - the feeling. Warmth, a real human presence, the sense of being guided rather than processed. Those qualities aren&apos;t structural. They could transfer - and that became the working principle: <Highlight variant="blue" duration={800}>Conversational tone, Traditional structure.</Highlight>
                  </p>
                  <p style={BODY}>
                    I mapped three hypotheses around what Conversational does well: a real avatar for human presence, plain language over jargon for warmth, and removing the interstitial screen to maintain guided momentum. These became the AB test plan.
                  </p>

                  <div className="mt-2 md:mt-4 mb-2">
                    <img src="/images/Datalign form/workshop.png" alt="Photo from the workshop" style={{ width: "100%", display: "block", borderRadius: 8 }} />
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
                      From a transaction to a conversation
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-10 md:gap-14 mt-2">
                    {DESIGN_DECISIONS.map((item, i) => (
                      <div key={i} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 rounded-lg p-4 md:p-5" style={{ background: "var(--color-subtle)", border: "1px solid rgba(0,0,0,0.06)" }}>
                          <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-ink-40)" }}>Pain</span>
                          <p style={{ ...BODY, color: "var(--color-ink-65)" }}>{item.pain}</p>
                        </div>
                        <div className="flex flex-col gap-3 pl-1">
                          <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-ink-50)" }}>Solution</span>
                          <p style={BODY}>{item.solution}</p>
                          <div className="mt-2">
                            <Img label={item.image} aspect="4/3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-12 md:mt-14">
                    <SubHeading>Shipping the redesign without touching the backend</SubHeading>
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
                            <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2 pr-5" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-50)", letterSpacing: "0.02em", textTransform: "uppercase", width: "60px" }}>Phase</th>
                            <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2 pr-5" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-50)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Ship</th>
                            <th className="text-left border-b-2 border-[var(--color-ink-14)] py-2" style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink-50)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Measure</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TEST_PHASES.map((row, i) => (
                            <tr key={i}>
                              <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={{ ...BODY, fontWeight: 600, color: "var(--color-ink)" }}>{row.phase}</td>
                              <td className="py-3 pr-5 border-b border-[var(--color-ink-06)] align-top" style={BODY}>{row.ship}</td>
                              <td className="py-3 border-b border-[var(--color-ink-06)] align-top" style={{ ...BODY, color: "var(--color-ink-50)" }}>{row.measure}</td>
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
              className="scroll-mt-24 pt-20"
            >
              <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-0">
                    <SectionDivider label="Outcomes" />
                    <h3
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
                      What I took away
                    </h3>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-6">
                    {TAKEAWAYS.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--color-ink-50)" }}>
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", lineHeight: "150%", fontWeight: 500, color: "var(--color-ink)", margin: 0 }}>
                            {item.title}
                          </p>
                        </div>
                        <p style={{ ...BODY, color: "var(--color-ink-50)" }}>{item.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-12 md:mt-14">
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
                          <p style={{ ...BODY, color: "var(--color-ink-50)" }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                </CaseScrollReveal>
              </div>
            </section>

          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-10 md:mt-24">
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
