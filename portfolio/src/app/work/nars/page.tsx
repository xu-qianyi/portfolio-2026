"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import CaseScrollReveal from "@/components/CaseScrollReveal";

const SECTION_EYEBROW_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-70)",
  margin: 0,
};

const BODY_TEXT_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  lineHeight: "160%",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;

const H3_STYLE = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "24px",
  lineHeight: "120%",
  fontWeight: 400,
  color: "var(--color-ink)",
  borderLeft: "2px solid var(--color-accent-brown)",
  paddingLeft: "12px",
  margin: 0,
} as const;

/** Inline emphasis — same peach mark as Key findings highlights */
const CASE_INLINE_MARK_STYLE = {
  backgroundColor: "var(--color-accent-peach)",
  color: "inherit",
  padding: "0.08em 0.2em",
} as const;

type Section = {
  id: string;
  label: string;
};

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
];

const META_ITEMS = [
  { label: "Role", value: "Lead User Researcher" },
  { label: "Timeframe", value: "2022 (1 month)" },
  { label: "Tools", value: "LookLook Analytics, MS PowerPoint, MS Excel, Python" },
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
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                LookLook &times; NARS &bull; User Research
              </p>
              <h1
                style={{
                  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                  fontSize: "28px",
                  lineHeight: "110%",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                NARS Longwear Foundation concept testing - US &amp; China insights
              </h1>
            </CaseScrollReveal>

            <CaseScrollReveal
              delay={60}
              className="w-full overflow-hidden rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-subtle)]"
            >
              <Image
                src="/images/NARS/Nars_preview.webp"
                alt="NARS project files organized in LookLook workspace"
                width={2400}
                height={1588}
                className="w-full h-auto"
                priority
              />
            </CaseScrollReveal>

            <CaseScrollReveal delay={120} className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {META_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      margin: 0,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "var(--color-ink-80)",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </CaseScrollReveal>
          </header>

          <NarsMobileNav activeId={activeId} sectionRefs={sectionRefs} />

          {/* Sections */}
          <div className="flex flex-col gap-16 md:gap-20">

            {/* Overview */}
            <section
              id="overview"
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              className="scroll-mt-24 md:scroll-mt-28"
            >
              <div className="flex min-w-0 w-full flex-col gap-7">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-2">
                    <p style={SECTION_EYEBROW_STYLE}>Overview</p>
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "120%",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        borderLeft: "2px solid var(--color-accent-brown)",
                        paddingLeft: "12px",
                        margin: 0,
                      }}
                    >
                      Helping NARS launch a foundation users actually want
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={BODY_TEXT_STYLE}>
                    At{" "}
                    <a
                      href="https://www.looklook.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-inline-link"
                    >
                      LookLook
                    </a>
                    , I led a comprehensive user research initiative for NARS&apos;s longwear foundation, focusing on user needs in the U.S. and China. Leveraging LookLook&apos;s user testing platform, I recruited and screened participants, conducted in-depth interviews, concept testing, and naming feedback to identify key user pain points and preferences.
                  </p>
                  <p style={BODY_TEXT_STYLE}>
                    These insights were instrumental in shaping NARS&apos;s product design, branding, and market positioning. The longwear foundation is now launched - the research directly shaped a product aligned with consumer expectations.
                  </p>

                  <div className="mt-3 flex flex-col gap-4">
                    <h3 style={H3_STYLE}>The challenge</h3>
                    <p style={BODY_TEXT_STYLE}>
                      As NARS prepared to expand its longwear foundation line, the brand faced a highly competitive market where consumer expectations were rapidly evolving. Users in the U.S. and China had diverse needs - breathable formulas, long-lasting wear, clean ingredients, and a wide shade range.
                    </p>
                    <p style={BODY_TEXT_STYLE}>
                      Existing longwear foundations were frequently criticized for discomfort, poor shade matching, and transferability. NARS needed research-backed direction before committing to a formulation and positioning strategy.
                    </p>
                  </div>

                  <div className="h-px w-full bg-[var(--color-ink-14)] mt-3" />
                </CaseScrollReveal>
              </div>
            </section>

            {/* Research */}
            <section
              id="research"
              ref={(el) => { sectionRefs.current["research"] = el; }}
              className="scroll-mt-24 md:scroll-mt-28"
            >
              <div className="flex min-w-0 w-full flex-col gap-7">
                <CaseScrollReveal>
                  <div className="flex flex-col gap-2">
                    <p style={SECTION_EYEBROW_STYLE}>Research</p>
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "120%",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        borderLeft: "2px solid var(--color-accent-brown)",
                        paddingLeft: "12px",
                        margin: 0,
                      }}
                    >
                      Listening to both markets at once
                    </h2>
                  </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                  <p style={BODY_TEXT_STYLE}>
                    The research ran in parallel across two distinct markets. U.S. and Chinese consumers approach beauty products differently - from how they evaluate shade range to how much they trust ingredient lists. Running both simultaneously meant we could identify what was universal and what was market-specific.
                  </p>

                  <div className="flex flex-col gap-4">
                    <h3 style={H3_STYLE}>What we did</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        {
                          label: "Recruitment & screening",
                          body: "Identified and screened participants across both markets to ensure representative coverage of skin tones, usage habits, and foundation experience levels.",
                        },
                        {
                          label: "In-depth interviews",
                          body: "One-on-one sessions exploring current foundation routines, pain points, and unmet needs - with particular focus on longwear claims and how users evaluate them.",
                        },
                        {
                          label: "Concept testing",
                          body: "Presented multiple product concepts and formulation directions to gauge reactions, preference rankings, and the reasoning behind them.",
                        },
                        {
                          label: "Naming feedback",
                          body: "Tested candidate product names for clarity, memorability, and brand fit across both cultural contexts.",
                        },
                      ].map((item) => (
                        <p key={item.label} style={BODY_TEXT_STYLE}>
                          <mark style={CASE_INLINE_MARK_STYLE}>{item.label}</mark>
                          . {item.body}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <h3 style={H3_STYLE}>Key findings</h3>
                    <p style={BODY_TEXT_STYLE}>
                      Across both markets, users consistently rated <mark style={CASE_INLINE_MARK_STYLE}>breathability and transfer-resistance</mark> as the top two priorities - over shade range and finish. This directly challenged NARS&apos;s initial assumption that shade diversity would be the primary differentiator in China.
                    </p>
                    <p style={BODY_TEXT_STYLE}>
                      Chinese consumers showed significantly higher sensitivity to ingredient transparency and &ldquo;skin-friendly&rdquo; claims, while U.S. users prioritized longevity and color payoff. The naming research revealed that English-derived names performed better than phonetic transliterations in the Chinese market - informing the final go-to-market naming approach.
                    </p>
                  </div>

                  <div className="h-px w-full bg-[var(--color-ink-14)] mt-3" />
                </CaseScrollReveal>

                <CaseScrollReveal delay={120} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    <h3 style={H3_STYLE}>Full findings in the slide deck</h3>
                    <p style={BODY_TEXT_STYLE}>
                      The complete research output - methodology, verbatim quotes, concept rankings, and strategic recommendations - lives in the slide deck below. The deck was delivered to the NARS team and used to inform the final product brief.
                    </p>
                  </div>

                  <a
                    href="https://drive.google.com/file/d/14pRJPMr1qvlEUS57hHj04Kv8DfdzimoV/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block no-underline"
                    aria-label="Open NARS Longwear Foundation concept testing slide deck in Google Drive (opens in new tab)"
                  >
                    <div className="relative overflow-hidden rounded-lg border border-[var(--color-ink-14)] transition-[border-color,box-shadow] duration-200 ease-out group-hover:border-[var(--color-ink-70)] group-hover:shadow-sm">
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
                        fontSize: "13px",
                        color: "var(--color-muted)",
                        margin: "8px 0 0 0",
                      }}
                    >
                      NARS Longwear Foundation Concept Testing Study &middot; Report by Gretchen, Martta, Luca &middot; Google Drive
                    </p>
                  </a>
                </CaseScrollReveal>
              </div>
            </section>

          </div>

          {/* Next case */}
          <div className="mt-12 pt-8 md:mt-16">
            <hr style={{ border: "none", borderTop: "1px solid var(--color-ink-14)", marginBottom: "2rem" }} />
            <a
              href="/work/ark7"
              className="group flex flex-col gap-1.5 no-underline"
              aria-label="Next project: ARK7, 2023 — Building trust in fractional real estate investing"
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                Next Project &mdash; ARK7 &middot; 2023
              </p>
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
