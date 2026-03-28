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
    title: "From 12 Features to 4",
    body: [
      "From the competitor analysis, we identified 12+ community features that could potentially address the trust gap. But ARK7 had real constraints — frozen investment periods, limited engineering resources, and a cautious approach to community openness.",
      "We evaluated each feature on two axes: effort and efficiency (impact on trust and engagement). Using an Eisenhower-style matrix, we narrowed the list to four:",
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
    <div className="flex flex-col gap-6 md:gap-7">
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

const TABLE_SERIF = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "15px",
  lineHeight: "150%",
} as const;

function Ark7PersonaBusinessMappingTable() {
  const cellPad = "py-3.5 align-middle md:py-4 max-md:pr-2 md:pr-4";
  const rowLabelPad = `${cellPad} pl-3`;

  return (
    <div className="my-6 w-full overflow-x-auto md:my-8">
      <table
        className="w-full min-w-[18rem] border-collapse text-left"
        style={{ ...TABLE_SERIF, color: "var(--color-ink-80)" }}
      >
        <caption className="sr-only">
          Persona goals, gaps, steps, and business goals for Lisa and Ian
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="w-5 shrink-0 py-3.5 align-middle max-md:pr-2 md:w-10 md:py-4"
              aria-hidden
            />
            <th
              scope="col"
              className={`${cellPad} pl-2 font-semibold text-[var(--color-ink)] md:pl-3`}
            >
              Lisa (Existing)
            </th>
            <th
              scope="col"
              className={`${cellPad} pl-2 font-semibold text-[var(--color-ink)] md:pl-3`}
            >
              Ian (New)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              User goals
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              More influence on decisions, sense of belonging
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Clear understanding and confidence in investments
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Gaps
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Doesn&apos;t know property operations or performance
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Knows little about ARK7&apos;s product and community
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Steps
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Update → Inform → Engage → Invest
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Attract → Learn → Invest
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Business goal
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>Retain and increase investment</td>
            <td className={`${cellPad} pl-2 md:pl-3`}>Convert to regular investor</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Ark7CommunityFeaturesTable() {
  const cellPad = "py-3.5 align-middle md:py-4 max-md:pr-2 md:pr-4";
  const rowLabelPad = `${cellPad} pl-3`;

  return (
    <div className="my-6 w-full overflow-x-auto md:my-8">
      <table
        className="w-full min-w-[20rem] border-collapse text-left"
        style={{ ...TABLE_SERIF, color: "var(--color-ink-80)" }}
      >
        <caption className="sr-only">
          Four community features: what each does and how it builds trust
        </caption>
        <thead>
          <tr>
            <th scope="col" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Feature
            </th>
            <th
              scope="col"
              className={`${cellPad} pl-2 font-semibold text-[var(--color-ink)] md:pl-3`}
            >
              What it does
            </th>
            <th
              scope="col"
              className={`${cellPad} pl-2 font-semibold text-[var(--color-ink)] md:pl-3`}
            >
              How it builds trust
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              News
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              A content feed covering market trends, investment tips, and property updates
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Transparency</span>
              {" — "}keeps users informed about their investments and the platform
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Voting
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Lets seasoned investors weigh in on operational decisions for their properties
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Agency</span>
              {" — "}gives investors a voice, making them feel like owners, not passengers
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Discussion
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Time-limited, pop-up forums tied to specific properties
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Belonging</span>
              {" — "}connects investors with each other around shared stakes
            </td>
          </tr>
          <tr>
            <th scope="row" className={`${rowLabelPad} font-semibold text-[var(--color-ink)]`}>
              Webinar
            </th>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              Live and recorded sessions with real estate experts and ARK7 team
            </td>
            <td className={`${cellPad} pl-2 md:pl-3`}>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>Education</span>
              {" — "}builds confidence through knowledge and direct access to experts
            </td>
          </tr>
        </tbody>
      </table>
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
    <div className="min-h-screen px-6 py-14 md:py-16 lg:px-[72px] lg:py-16">
      <main className="mx-auto grid max-w-[1800px] grid-cols-1 gap-0 md:grid-cols-[1fr_auto_1fr] md:gap-8">
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

        <div className="flex w-full min-w-0 max-w-[800px] flex-col gap-14 md:gap-16">
          <header className="flex flex-col gap-8 md:gap-10">
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

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
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

          <div className="flex flex-col gap-14 md:gap-16">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="flex scroll-mt-24 flex-col gap-4 md:scroll-mt-28"
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

                {section.id === "design" ? <Ark7CommunityFeaturesTable /> : null}

                {section.id === "research" ? (
                  <div className="mt-4 flex flex-col md:mt-5">
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
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
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
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
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
                        Refining the problem
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
                        <mark className="case-text-highlight">Initial question</mark>
                        {": How might we help different users build trust at ARK7?"}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        To sharpen this, I mapped each persona&apos;s goals against business goals:
                      </p>
                      <Ark7PersonaBusinessMappingTable />
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        <mark className="case-text-highlight">Refined question</mark>
                        {": How might we build an engaging experience for users to learn and invest with trust?"}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
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
                        Competitor analysis: understanding how rivals foster trust and engage users
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        I conducted a thorough competitive audit of similar apps to understand their
                        product and design strategies for building trust and engaging users.
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: "16px",
                          lineHeight: "160%",
                          color: "var(--color-ink-80)",
                          margin: 0,
                        }}
                      >
                        Given that there are only two direct competitors, we also examined companies in
                        the broader financial sector.
                      </p>
                      <div className="w-full overflow-hidden">
                        <Image
                          src="/images/ARK7/ark7_competitors.png"
                          alt="Competitive audit: similar apps and broader financial sector companies"
                          width={2589}
                          height={822}
                          sizes="(max-width: 767px) 100vw, 800px"
                          loading="lazy"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p style={BODY_TEXT_STYLE}>Three insights stood out:</p>
                      <p style={BODY_TEXT_STYLE}>
                        <span className="font-semibold text-[var(--color-ink)]">
                          Interactive content drives longer engagement.
                        </span>{" "}
                        Platforms with interactive elements saw more frequent return visits and deeper
                        exploration.
                      </p>
                      <p style={BODY_TEXT_STYLE}>
                        <span className="font-semibold text-[var(--color-ink)]">
                          Community connection makes users feel safer.
                        </span>{" "}
                        When users could see and interact with other investors, their confidence in
                        the platform increased.
                      </p>
                      <p style={BODY_TEXT_STYLE}>
                        <span className="font-semibold text-[var(--color-ink)]">
                          Webinars are the strongest trust signal.
                        </span>{" "}
                        Real-time, expert-led sessions resonated most with users seeking guidance -
                        more than static content or forums.
                      </p>
                    </div>
                  </div>
                ) : null}

                {section.id === "overview" ? (
                  <div className="w-full overflow-hidden">
                    <Image
                      src="/images/ARK7/ARK7_official_site.png"
                      alt="ARK7 official website homepage"
                      width={1500}
                      height={988}
                      className="w-full h-auto object-cover"
                    />
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

                {index < SECTIONS.length - 1 ? (
                  <div className="mt-10 h-px w-full bg-black/10 md:mt-12" />
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <div className="hidden md:block" />
      </main>
    </div>
  );
}
