"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

const SECTION_EYEBROW_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-70)",
  margin: 0,
};

type Section = {
  id: string;
  label: string;
  title: string;
  body: string[];
  continuationTitle?: string;
  continuationBody?: string[];
};

const SECTIONS: Section[] = [
  {
    id: "overview",
    label: "Overview",
    title: "Who's ARK7?",
    body: [
      "ARK7 is a platform that simplifies real estate investment by offering fractional shares for as little as $20 per share in premium residential properties across the United States.",
    ],
    continuationTitle: "The challenge",
    continuationBody: [
      "ARK7 faced a dual retention problem. Despite attracting new users through its referral rewards system, these users often failed to continue investing. Meanwhile, many existing investors were withdrawing their funds post-freeze period and ceasing further investment.",
    ],
  },
  {
    id: "research",
    label: "Research",
    title: "No direct access to users - so I found them elsewhere",
    body: [
      "The client managed all user communication directly to maintain consistency and confidentiality. This meant no user interviews, no surveys, no direct contact.",
      "Rather than treating this as a dead end, I looked for where users were already talking.",
      "I mined four public channels - TrustPilot, App Store reviews, Reddit, and YouTube comments - and paired these findings with interviews with ARK7's customer service team and an analysis of the company's marketing channels. I also conducted a competitive audit of similar platforms.",
      "Across every channel, one theme surfaced again and again: a lack of trust.",
    ],
  },
  {
    id: "design",
    label: "Design",
    title: "Designing for clarity, confidence, and conversion",
    body: [
      "We introduced a modular property detail structure that surfaces three key trust anchors first: ownership model, projected cash flow, and risk notes. Secondary details such as neighborhood trends and legal docs were grouped in expandable panels.",
      "Onboarding was reworked into a guided journey with lightweight education moments and status indicators. Users could understand what to do next without losing momentum, while still feeling in control of financial decisions.",
    ],
  },
  {
    id: "summary",
    label: "Summary",
    title: "Outcome and impact",
    body: [
      "After launch, the new case-study-backed product narrative improved engagement quality: more users completed property deep dives and reached funding steps with fewer support-related detours.",
      "The project also gave the team a reusable framework for future launches, aligning product, marketing, and engineering around one shared story: make fractional real-estate investing understandable and trustworthy from first glance to first transaction.",
    ],
  },
];

const RESEARCH_CHANNELS_HIGHLIGHT =
  "TrustPilot, App Store reviews, Reddit, and YouTube comments";

function ark7SectionParagraph(
  sectionId: string,
  paragraphIndex: number,
  paragraph: string,
): ReactNode {
  if (sectionId === "overview" && paragraphIndex === 0) {
    return (
      <>
        <a
          href="https://ark7.com"
          target="_blank"
          rel="noopener noreferrer"
          className="case-inline-link"
        >
          ARK7
        </a>{" "}
        is a platform that simplifies real estate investment by offering fractional shares for as
        little as $20 per share in premium residential properties across the United States.
      </>
    );
  }
  if (sectionId === "research" && paragraph.includes(RESEARCH_CHANNELS_HIGHLIGHT)) {
    const [before, after] = paragraph.split(RESEARCH_CHANNELS_HIGHLIGHT);
    return (
      <>
        {before}
        <mark className="case-text-highlight">{RESEARCH_CHANNELS_HIGHLIGHT}</mark>
        {after}
      </>
    );
  }
  return paragraph;
}

const ARK7_PERSONAS = [
  {
    name: "Lisa",
    role: "Existing Investor",
    tags: ["ENTJ", "Social Investor", "Tech-Savvy"],
    needs: [
      "Has been investing with ARK7 for a year",
      "Doesn't know how her properties are managed or how ARK7 performs",
      "Has no idea who the other shared owners are",
      "Feels she has no control over her investments",
      "Considering withdrawal due to feeling isolated and powerless",
    ],
    goalLabel: "Her goal",
    goal: "More influence on decisions. A sense of belonging and trust.",
  },
  {
    name: "Ian",
    role: "New User",
    tags: ["ENFP", "Busy", "Influence-Seeker", "Novice Investor"],
    needs: [
      "Discovered ARK7 through a YouTube ad and received a $50 bonus",
      "Cautious about who to trust — available information feels limited",
      "Wants to know who else is investing",
      "Doesn't want to invest alone",
      "Hesitating to invest because the platform feels opaque",
    ],
    goalLabel: "His goal",
    goal: "Transparency, guidance, and confidence before committing money.",
  },
] as const;

const BODY_TEXT_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  lineHeight: "160%",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;

function Ark7PersonaCards() {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {ARK7_PERSONAS.map((p) => (
        <article
          key={p.name}
          className="flex flex-col gap-3.5 rounded-lg border border-black/10 bg-[var(--color-surface)] px-4 py-3.5 md:px-5 md:py-4"
        >
          <header>
            <h3
              className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "14px",
                lineHeight: "150%",
                fontWeight: 400,
                color: "var(--color-ink-80)",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                }}
              >
                {p.name}
              </span>
              <span
                className="min-w-0 max-w-full text-right sm:max-w-[min(100%,28rem)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "14px",
                  lineHeight: "150%",
                }}
              >
                <span style={{ color: "var(--color-ink-70)" }}>{p.role}</span>
                <span style={{ color: "var(--color-muted)" }}> · </span>
                <span style={{ color: "var(--color-ink-65)", letterSpacing: "0.02em" }}>
                  {p.tags.join(" · ")}
                </span>
              </span>
            </h3>
          </header>

          <div className="flex flex-col gap-2 border-t border-black/10 pt-3.5">
            <p style={{ ...SECTION_EYEBROW_STYLE, fontSize: "12px" }}>User needs</p>
            <ul
              className="m-0 list-disc space-y-1.5 pl-4 marker:text-[var(--color-ink-65)]"
              style={{
                fontFamily: BODY_TEXT_STYLE.fontFamily,
                fontSize: "14px",
                lineHeight: "150%",
                color: "var(--color-ink-80)",
              }}
            >
              {p.needs.map((line) => (
                <li key={line} className="pl-0.5">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-black/10 bg-[var(--color-subtle)] px-3.5 py-2.5">
            <p style={{ ...SECTION_EYEBROW_STYLE, fontSize: "12px" }}>User goals</p>
            <p style={{ ...BODY_TEXT_STYLE, fontSize: "14px", lineHeight: "150%", marginTop: "6px" }}>
              {p.goalLabel}: {p.goal}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

const META_ITEMS = [
  { label: "Role", value: "Product designer(contract)" },
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
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateDotPosition, 150); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(resizeTimer); };
  }, [activeId]);

  return (
    <div className="min-h-screen px-6 lg:px-[72px] py-12">
      <main className="grid max-w-[1800px] mx-auto grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8">
        <aside className="md:sticky md:top-20 md:h-fit pb-8 md:pb-0 min-w-0 md:min-w-40">
          <nav className="hidden md:block mt-4">
            <div ref={navListRef} className="relative pl-5">
              <div className="absolute left-0 top-0.5 bottom-0.5 w-[6px] rounded-full bg-black/[0.06]">
                <div
                  className="absolute left-1/2 w-[5px] h-[5px] rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-out"
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

        <div className="w-full min-w-0 max-w-[800px] flex flex-col gap-12 md:gap-12">
          <header className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                ARK7 • FinTech
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
                <p style={SECTION_EYEBROW_STYLE}>{section.label}</p>
                <h2
                  style={{
                    fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                    fontSize: "24px",
                    lineHeight: "120%",
                    fontWeight: 400,
                    color: "var(--color-ink)",
                    borderLeft: "2px solid var(--color-accent-green)",
                    paddingLeft: "12px",
                    margin: 0,
                  }}
                >
                  {section.title}
                </h2>

                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id}-${paragraphIndex}`}
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "16px",
                      lineHeight: "160%",
                      color: "var(--color-ink-80)",
                      margin: 0,
                    }}
                  >
                    {ark7SectionParagraph(section.id, paragraphIndex, paragraph)}
                  </p>
                ))}

                {section.id === "research" ? (
                  <div className="my-4 flex flex-col">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
                      <div className="w-full overflow-hidden">
                        <Image
                          src="/images/ARK7/ARK7-market%20analysis.png"
                          alt="ARK7 marketing analysis across mobile app, website, and social channels"
                          width={3494}
                          height={1462}
                          sizes="(max-width: 767px) 100vw, 392px"
                          loading="lazy"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="w-full overflow-hidden">
                        <Image
                          src="/images/ARK7/Arrived-market%20analysis.png"
                          alt="Arrived marketing analysis across mobile app, website, and social channels"
                          width={3498}
                          height={1468}
                          sizes="(max-width: 767px) 100vw, 392px"
                          loading="lazy"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                    <div className="mt-7 flex flex-col gap-4 md:mt-9">
                      <blockquote
                        style={{
                          fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                          fontSize: "24px",
                          lineHeight: "120%",
                          fontWeight: 400,
                          color: "var(--color-ink)",
                          borderLeft: "2px solid var(--color-accent-green)",
                          paddingLeft: "12px",
                          margin: 0,
                        }}
                      >
                        Two users, one shared problem
                      </blockquote>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        The research revealed two distinct user profiles whose frustrations pointed to
                        the same root cause.
                      </p>
                      <Ark7PersonaCards />
                    </div>
                  </div>
                ) : null}

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
                ) : null}

                {section.continuationTitle && section.continuationBody ? (
                  <>
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "120%",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        borderLeft: "2px solid var(--color-accent-green)",
                        paddingLeft: "12px",
                        margin: 0,
                      }}
                    >
                      {section.continuationTitle}
                    </h2>
                    {section.continuationBody.map((paragraph) => (
                      <p
                        key={paragraph}
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </>
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
