"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import LottiePreview from "@/components/LottiePreview";

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
      "From the competitor analysis, we identified 12+ community features that could potentially address the trust gap. But ARK7 had real constraints - frozen investment periods, limited engineering resources, and a cautious approach to community openness.",
      "We evaluated each feature on two axes: effort and efficiency (impact on trust and engagement). Using an Eisenhower-style matrix, we narrowed the list to four:",
    ],
  },
  {
    id: "iteration",
    label: "Iteration",
    title: "Iteration",
    body: [],
  },
  {
    id: "final-solution",
    label: "Final solution",
    title: "Ian's journey - from hesitation to confidence",
    body: [
      "With the card foundation stable, we built the four community features on top of it. Here's how they landed for each user.",
    ],
  },
  {
    id: "summary",
    label: "Summary",
    title: "Outcome and impact",
    body: [],
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
      "Cautious about who to trust - available information feels limited",
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

const ARK7_DESIGN_AUDIT_FINDINGS = [
  {
    image: "/images/ARK7/different_shades_of_greens.webp",
    title: "Different shades of green",
    body: "In our design audit, we discovered that 12 different shades of green are used throughout our platform, adding unnecessary cognitive load for users.",
  },
  {
    image: "/images/ARK7/font_a11y.webp",
    title: "Font usage and accessibility",
    body: "The style guide lists 14 fonts but gives no guidance on when to use them - resulting in poor visual hierarchy and up to 5 different fonts on a single card. Some are too small to meet WCAG standards.",
  },
  {
    image: "/images/ARK7/inconsistent_card_layout.webp",
    title: "Inconsistent card layout",
    body: "The platform lacks clear design guidelines for card usage, resulting in varied CTA placements - some on the left, some on the right - and mixed placement of images and text. This slows down users' interactions and reduces overall task efficiency.",
  },
  {
    image: "/images/ARK7/cramped_spacing.webp",
    title: "Cramped spacing",
    body: "Inconsistent spacing between fonts of the same hierarchy within the same card can lead to visual clutter and confusion, making it difficult for users to quickly process and understand the information presented.",
  },
] as const;

const ARK7_STORE_REVIEW_QUOTES = [
  {
    source: "Google Play",
    quote:
      "Poor GUI. Basically its a green hog that makes navigation to the rest of the phone annoying. Stop hiring teenagers to design",
    author: "Jamie",
  },
  {
    source: "Trustpilot",
    quote:
      "Seriously, what's with all the green in this app? It's like walking into a room painted top to bottom in neon lime 🤢.",
    author: "Tian",
  },
] as const;

function ark7StoreQuoteInner(text: string): ReactNode {
  const glyph = "\u{1F92E}";
  if (!text.includes(glyph)) {
    return text;
  }
  const parts = text.split(glyph);
  return (
    <>
      {parts[0]}
      <span
        className="not-italic"
        style={{
          fontStyle: "normal",
          fontFamily:
            'ui-sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
        }}
      >
        {glyph}
      </span>
      {parts.slice(1).join(glyph)}
    </>
  );
}

function Ark7DesignAuditGrid() {
  return (
    <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {ARK7_DESIGN_AUDIT_FINDINGS.map((item) => (
        <div key={item.title} className="flex flex-col gap-3">
          <div className="relative rounded-lg p-3" style={{ backgroundColor: "var(--color-subtle)" }}>
            <div className="relative h-96 w-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain object-top"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "150%",
                fontWeight: 600,
                color: "var(--color-ink)",
                margin: 0,
              }}
            >
              {item.title}
            </p>
            <p style={{ ...BODY_TEXT_STYLE }}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Ark7IterationStoreQuotes() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2 md:gap-6">
      {ARK7_STORE_REVIEW_QUOTES.map((item) => (
        <article
          key={item.source}
          className="flex flex-col gap-3.5 rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] px-4 py-4 md:gap-4 md:px-5 md:py-5"
        >
          <p
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            {item.source}
          </p>
          <p
            style={{
              fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
              fontSize: "17px",
              lineHeight: "150%",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            &ldquo;{ark7StoreQuoteInner(item.quote)}&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "14px",
              lineHeight: "150%",
              fontWeight: 500,
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            - {item.author}
          </p>
        </article>
      ))}
    </div>
  );
}

function Ark7PersonaCards() {
  return (
    <div className="flex flex-col gap-6 md:gap-7">
      {ARK7_PERSONAS.map((p) => (
        <article
          key={p.name}
          className="flex flex-col gap-3.5 rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] px-4 py-3.5 md:px-5 md:py-4"
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

          <div className="flex flex-col gap-2 border-t border-[var(--color-ink-14)] pt-3.5">
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

          <div className="rounded-md border border-[var(--color-ink-14)] bg-[var(--color-subtle)] px-3.5 py-2.5">
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
              {" - "}keeps users informed about their investments and the platform
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
              {" - "}gives investors a voice, making them feel like owners, not passengers
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
              {" - "}connects investors with each other around shared stakes
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
              {" - "}builds confidence through knowledge and direct access to experts
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

type Ark7LayoutOption = {
  id: string;
  tabLabel: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  title: string;
  points: ReactNode[];
};

const ARK7_LAYOUT_OPTIONS: Ark7LayoutOption[] = [
  {
    id: "information-home",
    tabLabel: "Option 1",
    imageSrc: "/images/ARK7/option1.webp",
    imageWidth: 1002,
    imageHeight: 2214,
    imageAlt: "Mobile wireframe: information cards and feature tiles on the home tab",
    title: "Information cards on the home tab",
    points: [
      <>
        Users can{" "}
        <span className="font-semibold text-[var(--color-ink)]">quickly identify the purpose</span>{" "}
        of each feature and decide which one they want to explore.
      </>,
      <>Optimize page load times so it is easier to develop.</>,
      <>
        Users&apos;{" "}
        <span className="font-semibold text-[var(--color-ink)]">attention may be diverted</span> by
        features they find uninteresting and are not willing to explore further.
      </>,
      <>
        An abundance of options and entrances could{" "}
        <span className="font-semibold text-[var(--color-ink)]">overwhelm users</span>.
      </>,
    ],
  },
  {
    id: "feed-home",
    tabLabel: "Option 2",
    imageSrc: "/images/ARK7/option2.webp",
    imageWidth: 1040,
    imageHeight: 2214,
    imageAlt: "Mobile wireframe: home and feed tabs with a vertical content feed",
    title: "Feed in the home tab",
    points: [
      <>
        A feed provides a{" "}
        <span className="font-semibold text-[var(--color-ink)]">more cohesive</span> approach to
        interaction.
      </>,
      <>
        A mixed feed{" "}
        <span className="font-semibold text-[var(--color-ink)]">increases content discovery</span> and
        engagement by exposing users to diverse content.
      </>,
      <>
        Home and feed have{" "}
        <span className="font-semibold text-[var(--color-ink)]">
          two different types of interaction
        </span>
        , and serve two different functions.
      </>,
    ],
  },
  {
    id: "feed-new-tab",
    tabLabel: "Option 3",
    imageSrc: "/images/ARK7/option3.webp",
    imageWidth: 1040,
    imageHeight: 2215,
    imageAlt: "Mobile wireframe: dedicated news feed tab with bottom navigation",
    title: "Dedicated tab with a feed",
    points: [
      <>
        A feed provides a{" "}
        <span className="font-semibold text-[var(--color-ink)]">more cohesive</span> approach to
        interaction.
      </>,
      <>
        A mixed feed{" "}
        <span className="font-semibold text-[var(--color-ink)]">increases content discovery</span> and
        engagement by exposing users to diverse content.
      </>,
      <>
        All four features serve the same intention: giving users a shared{" "}
        <span className="font-semibold text-[var(--color-ink)]">community experience</span>.
      </>,
    ],
  },
];

const ARK7_CARD_REVAMP_TABS = [
  { id: "overall",  label: "Overall",    src: "/images/ARK7/design_revamp_overall.webp", alt: "Card revamp overall before and after" },
  { id: "anatomy",  label: "Anatomy",    src: "/images/ARK7/atonomy.webp",               alt: "Card anatomy breakdown" },
  { id: "cta",      label: "CTA button", src: "/images/ARK7/CTA.webp",                   alt: "CTA button changes before and after" },
  { id: "content",  label: "Content",    src: "/images/ARK7/content.webp",               alt: "Content changes before and after" },
] as const;

function Ark7CardRevampTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const tablistId = "ark7-card-revamp-tabs";
  const active = ARK7_CARD_REVAMP_TABS[activeIndex];

  const select = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);
    setEpoch((e) => e + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(Math.min(activeIndex + 1, ARK7_CARD_REVAMP_TABS.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(ARK7_CARD_REVAMP_TABS.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div
        role="tablist"
        aria-label="Card component revamp tabs"
        id={tablistId}
        onKeyDown={handleKeyDown}
        className="flex flex-wrap justify-end gap-x-1"
      >
        {ARK7_CARD_REVAMP_TABS.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${tablistId}-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${tablistId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`min-h-11 border-b-2 bg-transparent px-3 py-2.5 text-left transition-[color,border-color] duration-200 ease-out motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isActive
                  ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink-80)]"
              }`}
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "14px",
                lineHeight: "140%",
                fontWeight: isActive ? 500 : 400,
                cursor: "inherit",
              }}
              onClick={() => select(i)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${active.id}`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className="rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] p-5 md:p-8"
      >
        <Image
          key={`${active.id}-${epoch}`}
          src={active.src}
          alt={active.alt}
          width={1600}
          height={1200}
          className="w-full h-auto rounded-md ark7-layout-tab-panel-enter"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function Ark7LayoutOptionsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [layoutPanelMotionEpoch, setLayoutPanelMotionEpoch] = useState(0);
  const active = ARK7_LAYOUT_OPTIONS[activeIndex];
  const tablistId = "ark7-layout-options-tabs";

  const selectLayoutTab = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setActiveIndex(nextIndex);
    setLayoutPanelMotionEpoch((e) => e + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectLayoutTab(Math.min(activeIndex + 1, ARK7_LAYOUT_OPTIONS.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectLayoutTab(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      selectLayoutTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectLayoutTab(ARK7_LAYOUT_OPTIONS.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div
        role="tablist"
        aria-label="Three layout options compared"
        id={tablistId}
        onKeyDown={handleKeyDown}
        className="flex flex-wrap justify-end gap-x-1"
      >
        {ARK7_LAYOUT_OPTIONS.map((opt, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              id={`${tablistId}-${opt.id}`}
              aria-selected={isActive}
              aria-controls={`${tablistId}-panel-${opt.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`min-h-11 border-b-2 bg-transparent px-3 py-2.5 text-left transition-[color,border-color] duration-200 ease-out motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isActive
                  ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                  : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink-80)]"
              }`}
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "14px",
                lineHeight: "140%",
                fontWeight: isActive ? 500 : 400,
                cursor: "inherit",
              }}
              onClick={() => selectLayoutTab(i)}
            >
              {opt.tabLabel}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${active.id}`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className="rounded-lg border border-[var(--color-ink-14)] bg-[var(--color-surface)] px-5 py-7 md:px-8 md:py-9"
      >
        <div
          key={`${active.id}-${layoutPanelMotionEpoch}`}
          className={`grid grid-cols-1 gap-9 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:items-start md:gap-10 lg:gap-12${layoutPanelMotionEpoch > 0 ? " ark7-layout-tab-panel-enter" : ""}`}
        >
          <div className="mx-auto flex w-full max-w-[200px] shrink-0 justify-center md:mx-0">
            <Image
              src={active.imageSrc}
              alt={active.imageAlt}
              width={active.imageWidth}
              height={active.imageHeight}
              sizes="(max-width: 767px) min(100vw, 200px), 200px"
              loading="lazy"
              className={
                active.id === "information-home"
                  ? "h-auto w-full origin-top scale-y-[0.92] object-contain motion-reduce:scale-y-100"
                  : "h-auto w-full object-contain"
              }
            />
          </div>
          <div className="flex min-w-0 flex-col gap-5 md:gap-6 md:pt-0.5">
            <h3
              style={{
                fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                fontSize: "20px",
                lineHeight: "124%",
                fontWeight: 500,
                color: "var(--color-ink)",
                margin: 0,
              }}
            >
              {active.title}
            </h3>
            <p style={{ ...SECTION_EYEBROW_STYLE, color: "var(--color-muted)" }}>
              Design consideration
            </p>
            <ul className="m-0 flex list-none flex-col gap-4 p-0 md:gap-5">
              {active.points.map((node, idx) => (
                <li
                  key={`${active.id}-pt-${idx}`}
                  style={{
                    ...BODY_TEXT_STYLE,
                    paddingLeft: "1rem",
                    borderLeft: "2px solid var(--color-ink-14)",
                  }}
                >
                  {node}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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

function Ark7MobileNav({
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
                const prefersReduced = window.matchMedia(
                  "(prefers-reduced-motion: reduce)"
                ).matches;
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
              <div className="absolute left-0 top-0.5 bottom-0.5 w-[6px] rounded-full bg-[var(--color-ink-06)]">
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
                      type="button"
                      ref={(el) => {
                        itemRefs.current[section.id] = el;
                      }}
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

        <div className="flex w-full min-w-0 max-w-[800px] flex-col gap-14 md:gap-16">
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
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="w-full aspect-[16/9] border border-[var(--color-ink-14)] bg-[var(--color-subtle)] overflow-hidden relative">
              <LottiePreview src="/images/ARK7/ARK7_Case study_Preview.json" loop={false} />
            </CaseScrollReveal>

            <CaseScrollReveal delay={120} className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
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

          <Ark7MobileNav activeId={activeId} sectionRefs={sectionRefs} />

          <div className="flex flex-col gap-16 md:gap-20">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="scroll-mt-24 md:scroll-mt-28"
              >
                <div className="flex min-w-0 w-full flex-col gap-7">
                <CaseScrollReveal>
                <div className="flex flex-col gap-2">
                  <p style={SECTION_EYEBROW_STYLE}>{section.label}</p>
                  {section.id !== "iteration" && section.id !== "final-solution" && section.id !== "summary" ? (
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
                  ) : null}
                </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
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

                {section.id === "iteration" ? (
                  <div className="flex flex-col gap-5">
                    <h3
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
                      Fixing the foundation first
                    </h3>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      Before shipping the community features, we had to address something more
                      fundamental. The existing design system was undermining user trust at a visual
                      level.
                    </p>
                    <Ark7IterationStoreQuotes />
                    <p style={{ ...BODY_TEXT_STYLE }}>Our design audit revealed:</p>
                    <Ark7DesignAuditGrid />
                    <h3
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "120%",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        borderLeft: "2px solid var(--color-accent-green)",
                        paddingLeft: "12px",
                        marginTop: "2rem",
                        marginBottom: 0,
                      }}
                    >
                      The Card Component Revamp
                    </h3>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      Given time constraints, we focused our design system work on the card component - the most heavily used element across the platform, and the building block for all four community features.
                    </p>
                    <Ark7CardRevampTabs />
                  </div>
                ) : null}

                {section.id === "final-solution" ? (
                  <>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    {[
                      {
                        title: "Ian's journey - from hesitation to confidence",
                        body: "Ian discovered ARK7 through a YouTube ad and received a $50 bonus. But as a novice investor, he hesitated - he knew little about the platform or its investment offerings.",
                      },
                      {
                        title: "Lisa's journey - from isolation to ownership",
                        body: "Lisa has been investing with ARK7 for a year. But after the frozen period ended, she was considering withdrawing - she felt isolated and had no sense of control over her properties.",
                      },
                    ].map((col) => (
                      <div key={col.title} className="flex flex-col gap-4">
                        <h3
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
                          {col.title}
                        </h3>
                        <p style={{ ...BODY_TEXT_STYLE }}>{col.body}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ ...BODY_TEXT_STYLE }}>
                    <mark className="case-text-highlight">News</mark>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "As I browse the feed, I become familiar with the investment offerings that ARK7 provides and ARK7 itself.",
                        author: "Ian",
                      },
                      {
                        quote: "I'm eager to see detailed management of my properties. Now, with daily updates and monthly summary, I feel more secure.",
                        author: "Lisa",
                      },
                    ].map((item) => (
                      <article
                        key={item.author}
                        className="flex flex-col gap-3.5 md:gap-4"
                      >
                        <p
                          style={{
                            fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                            fontSize: "15px",
                            lineHeight: "150%",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "var(--color-ink)",
                            margin: 0,
                          }}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: 500,
                            color: "var(--color-muted)",
                            margin: 0,
                          }}
                        >
                          - {item.author}
                        </p>
                      </article>
                    ))}
                  </div>
                  <Image
                    src="/images/ARK7/news.webp"
                    alt="News feature screens - short news, property detail, long article, comment, and notification"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <p style={{ ...BODY_TEXT_STYLE }}>
                    <mark className="case-text-highlight">Voting</mark>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "As a new user, I can't participate, but viewing the results and comments gives me a valuable peek into the community's decisions and perspectives.",
                        author: "Ian",
                      },
                      {
                        quote: "Voting empowers me to directly influence key aspects and stay actively involved in our investment community.",
                        author: "Lisa",
                      },
                    ].map((item) => (
                      <article
                        key={item.author}
                        className="flex flex-col gap-3.5 md:gap-4"
                      >
                        <p
                          style={{
                            fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                            fontSize: "15px",
                            lineHeight: "150%",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "var(--color-ink)",
                            margin: 0,
                          }}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: 500,
                            color: "var(--color-muted)",
                            margin: 0,
                          }}
                        >
                          - {item.author}
                        </p>
                      </article>
                    ))}
                  </div>
                  <Image
                    src="/images/ARK7/voting.webp"
                    alt="Voting feature screens"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <p style={{ ...BODY_TEXT_STYLE }}>
                    <mark className="case-text-highlight">Webinar</mark>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "The webinars offer clear, beginner-friendly insights that simplify real estate investing basics and boost my confidence to invest.",
                        author: "Ian",
                      },
                      {
                        quote: "I rely on the webinar for deep market insights and quarterly reviews, perfect for refining strategies and learning from industry leaders.",
                        author: "Lisa",
                      },
                    ].map((item) => (
                      <article
                        key={item.author}
                        className="flex flex-col gap-3.5 md:gap-4"
                      >
                        <p
                          style={{
                            fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                            fontSize: "15px",
                            lineHeight: "150%",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "var(--color-ink)",
                            margin: 0,
                          }}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: 500,
                            color: "var(--color-muted)",
                            margin: 0,
                          }}
                        >
                          - {item.author}
                        </p>
                      </article>
                    ))}
                  </div>
                  <Image
                    src="/images/ARK7/webinar.webp"
                    alt="Webinar feature screens"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <p style={{ ...BODY_TEXT_STYLE }}>
                    <mark className="case-text-highlight">Discussion</mark>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "It is incredibly helpful for a newcomer like me. It allows me to observe and learn from investment gurus and enhances my understanding of the market quickly.",
                        author: "Ian",
                      },
                      {
                        quote: "This pop-up format offers a platform where I can actively engage and share strategies with fellow owners, enhancing our returns through collective knowledge.",
                        author: "Lisa",
                      },
                    ].map((item) => (
                      <article
                        key={item.author}
                        className="flex flex-col gap-3.5 md:gap-4"
                      >
                        <p
                          style={{
                            fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                            fontSize: "15px",
                            lineHeight: "150%",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "var(--color-ink)",
                            margin: 0,
                          }}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: 500,
                            color: "var(--color-muted)",
                            margin: 0,
                          }}
                        >
                          - {item.author}
                        </p>
                      </article>
                    ))}
                  </div>
                  <Image
                    src="/images/ARK7/discussion.webp"
                    alt="Discussion feature screens"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  </>
                ) : null}

                {section.id === "design" ? (
                  <>
                    <Ark7CommunityFeaturesTable />
                    <div className="mt-8 flex flex-col gap-6 md:mt-10">
                      <div className="flex flex-col gap-4">
                        <h3
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
                          Entry point: one tab, four touchpoints
                        </h3>
                        <p style={{ ...BODY_TEXT_STYLE }}>
                          We evaluated three layout options for integrating the community features. The
                          winning approach:{" "}
                          <mark className="case-text-highlight">
                            a dedicated tab with a feed flow
                          </mark>
                          , using information cards at the top to surface each feature.
                        </p>
                      </div>
                      <Ark7LayoutOptionsTabs />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
                      <h3
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
                        Core flow: mapping out the overall UX in the feed with a user flow
                      </h3>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        We developed user flows to systematically map out each step a user takes
                        within our application, from initial entry to final interaction. This approach
                        not only helps in understanding and predicting user behavior but also ensures
                        a seamless navigation experience.
                      </p>
                      <div className="mt-6 mb-3 w-full overflow-hidden md:mt-8 md:mb-5">
                        <Image
                          src="/images/ARK7/user%20flow.webp"
                          alt="User flow diagram mapping entry through feed interactions in the ARK7 app"
                          width={4432}
                          height={1956}
                          sizes="(max-width: 767px) 100vw, 800px"
                          loading="lazy"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {section.id === "summary" ? (
                  <>
                  <div className="flex flex-col gap-4">
                    <h3
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
                      Measuring trust in numbers
                    </h3>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      After rolling out the community features, early signals were strong across both user segments:
                    </p>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {[
                        <><span style={{ fontWeight: 600, color: "var(--color-ink)" }}>10%</span> surge in conversion rate</>,
                        <>New users spent <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>100% more time</span> on the platform during their first login - exploring, learning, and building confidence before investing</>,
                        <><span style={{ fontWeight: 600, color: "var(--color-ink)" }}>40%</span> increase in transaction volumes in the secondary market</>,
                        <>Existing investors began re-engaging with the platform rather than withdrawing</>,
                      ].map((node, i) => (
                        <li
                          key={i}
                          style={{
                            ...BODY_TEXT_STYLE,
                            paddingLeft: "1rem",
                            borderLeft: "2px solid var(--color-ink-14)",
                          }}
                        >
                          {node}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 flex flex-col gap-4">
                    <h3
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
                      What I took away
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "15px",
                        lineHeight: "150%",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        margin: 0,
                      }}
                    >
                      <mark className="case-text-highlight">Navigating the space between user needs and business caution</mark>
                    </p>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      The client was nervous about opening the platform to unfiltered investor commentary - they'd seen community features go wrong before. My instinct was to push back. But sitting with their concern longer, I realized the better question wasn't "how open?" but "what conditions make openness feel safe enough to ship?" That reframe changed the conversation. Time-limited discussions and moderated formats weren't watered-down compromises - they were the constraints that made the design real.
                    </p>
                  </div>
                  </>
                ) : null}

                {section.id === "research" ? (
                  <div className="mt-4 flex flex-col md:mt-5">
                    <div className="my-4 grid grid-cols-1 gap-6 md:my-6 md:grid-cols-2 md:gap-8 lg:gap-10">
                      <div className="w-full overflow-hidden">
                        <Image
                          src="/images/ARK7/ARK7-market%20analysis.webp"
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
                          src="/images/ARK7/Arrived-market%20analysis.webp"
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
                      <h3
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
                      </h3>
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
                      <h3
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
                      </h3>
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
                      <div className="my-3 w-full overflow-hidden md:my-5">
                        <Image
                          src="/images/ARK7/ark7_competitors.webp"
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
                      src="/images/ARK7/ARK7_official_site.webp"
                      alt="ARK7 official website homepage"
                      width={1500}
                      height={988}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : null}

                {section.continuationTitle && section.continuationBody ? (
                  <div className="mt-3 flex flex-col gap-5">
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
                  </div>
                ) : null}

                {index < SECTIONS.length - 1 ? (
                  <div className="mt-10 h-px w-full bg-[var(--color-ink-14)] md:mt-12" />
                ) : null}
                </CaseScrollReveal>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 md:mt-16">
            <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", marginBottom: "2rem" }} />
            <a href="#" className="group flex flex-col gap-1.5 no-underline">
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                Next — Datalign · 2025
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
                Making wealth management approachable for everyone{" "}
                <span
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
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
