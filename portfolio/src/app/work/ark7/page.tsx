"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import LottiePreview from "@/components/LottiePreview";
import Highlight from "@/components/Highlight";

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

function SubHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={className}
      style={{
        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
        fontSize: "18px",
        lineHeight: "1.4",
        fontWeight: 500,
        color: "var(--color-ink)",
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

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
        <Highlight variant="green" duration={800}>{RESEARCH_CHANNELS_HIGHLIGHT}</Highlight>
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
    tags: ["Existing Investor", "Social Investor", "Tech-Savvy"],
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
    tags: ["New User", "Busy", "Influence-Seeker", "Novice Investor"],
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
  fontSize: "14px",
  lineHeight: "1.45rem",
  letterSpacing: "-0.005em",
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
            <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "var(--color-ink-70)", margin: 0 }}>User needs</p>
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
            <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "var(--color-ink-70)", margin: 0 }}>User goals</p>
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
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Feature intent is immediately legible - users self-select without needing to explore.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Simplest to develop; no new navigation patterns or state management required.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Con:</span> Users who aren&apos;t interested in a visible card may disengage before scrolling further.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Con:</span> Four cards in a row creates decision overhead on first view.</>,
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
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Feed creates a continuous scroll pattern - consistent with how users read content on other platforms.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Mixed content exposes users to features they didn&apos;t seek out.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Con:</span> Home tab serves a different job - portfolio overview. Mixing in community content creates mode confusion.</>,
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
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Feed pattern keeps interaction consistent.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> Content discovery is higher than with static cards.</>,
      <><span className="font-semibold text-[var(--color-ink)]">Pro:</span> A dedicated tab makes the intent clear - community is its own space, separate from the investment dashboard.</>,
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
            <p style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-muted)", margin: 0 }}>
              Design consideration
            </p>
            <ul className="m-0 flex list-none flex-col gap-4 p-0 md:gap-5">
              {active.points.map((node, idx) => (
                <li key={`${active.id}-pt-${idx}`} className="flex gap-3 items-baseline">
                  <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                  <p style={BODY_TEXT_STYLE}>{node}</p>
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

        <div className="flex w-full min-w-0 max-w-[800px] flex-col gap-0">
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
                ARK7 / FinTech
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
                }}
              >
                Cultivating a Trusted Investment Community
              </h1>
              <p style={{ ...BODY_TEXT_STYLE, marginTop: "4px" }}>
                ARK7 had a retention problem on both ends - new users weren&apos;t converting, and existing investors were pulling out after the lock-up period. <Highlight variant="green" duration={1200}>I led research, design system work, and end-to-end design of four community features</Highlight> that gave users enough transparency and social proof to stay.
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="w-full aspect-[16/9] border border-[var(--color-ink-14)] bg-[var(--color-subtle)] overflow-hidden relative rounded-lg mb-0">
              <LottiePreview
                src="/images/ARK7/ARK7_Case%20study_Preview.json"
                loop={false}
                fallbackSrc="/images/preview/ARK7.webp"
                alt="ARK7 mobile product preview"
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

          <Ark7MobileNav activeId={activeId} sectionRefs={sectionRefs} />

          <div className="flex flex-col">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="scroll-mt-24 pt-16"
              >
                <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                <div className="flex flex-col gap-0">
                  <SectionDivider label={section.label} />
                  {section.id !== "iteration" && section.id !== "final-solution" && section.id !== "summary" ? (
                    <h2
                      style={{
                        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
                        fontSize: "24px",
                        lineHeight: "1.4",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                        marginTop: 0,
                      }}
                    >
                      {section.title}
                    </h2>
                  ) : null}
                </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-3.5">
                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id}-${paragraphIndex}`}
                    style={{ ...BODY_TEXT_STYLE }}
                  >
                    {ark7SectionParagraph(section.id, paragraphIndex, paragraph)}
                  </p>
                ))}

                {section.id === "iteration" ? (
                  <div className="flex flex-col gap-4">
                    <SubHeading>Fixing the foundation first</SubHeading>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      Before shipping the community features, we had to address something more
                      fundamental. The existing design system was undermining user trust at a visual
                      level.
                    </p>
                    <Ark7IterationStoreQuotes />
                    <p style={{ ...BODY_TEXT_STYLE }}>Our design audit revealed:</p>
                    <Ark7DesignAuditGrid />
                    <SubHeading className="mt-4">The Card Component Revamp</SubHeading>
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
                      <div key={col.title} className="flex flex-col gap-3">
                        <SubHeading>{col.title}</SubHeading>
                        <p style={{ ...BODY_TEXT_STYLE }}>{col.body}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ ...BODY_TEXT_STYLE, marginTop: "1.5rem" }}>
                    <Highlight variant="green" duration={600}>News</Highlight>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "Scrolling through the feed actually helped me understand what ARK7 offers - I didn't feel like I was going in blind anymore.",
                        author: "Ian",
                      },
                      {
                        quote: "I wanted to know what was happening with my properties. The daily updates make it feel less like a black box.",
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
                  <p style={{ ...BODY_TEXT_STYLE, marginTop: "2rem" }}>
                    <Highlight variant="green" duration={600}>Voting</Highlight>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "I can't vote yet, but seeing how other investors think through decisions actually helped me feel less lost.",
                        author: "Ian",
                      },
                      {
                        quote: "It's the first time I've felt like I have any say in what happens with my properties.",
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
                  <p style={{ ...BODY_TEXT_STYLE, marginTop: "2rem" }}>
                    <Highlight variant="green" duration={600}>Webinar</Highlight>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "I don't have a finance background, so the beginner sessions were genuinely useful. I actually understood what I was putting money into.",
                        author: "Ian",
                      },
                      {
                        quote: "The quarterly reviews are worth it. You can ask questions directly instead of just reading a report.",
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
                  <p style={{ ...BODY_TEXT_STYLE, marginTop: "2rem" }}>
                    <Highlight variant="green" duration={600}>Discussion</Highlight>
                  </p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {[
                      {
                        quote: "It's nice to see what more experienced investors are doing before I put my money down.",
                        author: "Ian",
                      },
                      {
                        quote: "Finally a place to compare notes with people in the same property. We figured out something together that none of us would have caught alone.",
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
                    <div className="mt-8 flex flex-col gap-5 md:mt-10">
                      <div className="flex flex-col gap-4">
                        <SubHeading>Entry point: one tab, four touchpoints</SubHeading>
                        <p style={{ ...BODY_TEXT_STYLE }}>
                          We evaluated three layout options for integrating the community features. The
                          winning approach:{" "}
                          <Highlight variant="green" duration={800}>a dedicated tab with a feed flow</Highlight>
                          , using information cards at the top to surface each feature.
                        </p>
                      </div>
                      <Ark7LayoutOptionsTabs />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
                      <SubHeading>Core flow</SubHeading>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        We mapped flows for each of the four features, tracing the path from community tab entry to the key action in each feature - surfacing where friction was highest and where confidence-building moments needed to land.
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
                    <SubHeading>Measuring trust in numbers</SubHeading>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      Initial telemetry after the community features shipped showed movement across both segments:
                    </p>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {[
                        <><span style={{ fontWeight: 600, color: "var(--color-ink)" }}>10%</span> lift in new user conversion rate</>,
                        <>New users spent <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>2× longer</span> on the platform in their first session - reading, exploring, and getting comfortable before investing</>,
                        <><span style={{ fontWeight: 600, color: "var(--color-ink)" }}>40%</span> increase in secondary market transaction volume</>,
                      ].map((node, i) => (
                        <li key={i} className="flex gap-3 items-baseline">
                          <span style={{ color: "var(--color-muted)", flexShrink: 0, fontSize: "16px", lineHeight: "160%" }}>-</span>
                          <p style={BODY_TEXT_STYLE}>{node}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 flex flex-col gap-4">
                    <SubHeading>What I took away</SubHeading>
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
                      <Highlight variant="green" duration={1100}>Navigating the space between user needs and business caution</Highlight>
                    </p>
                    <p style={{ ...BODY_TEXT_STYLE }}>
                      The client was nervous about opening the platform to unfiltered investor commentary - they&apos;d seen community features go wrong before. My instinct was to push back. But sitting with their concern longer, I realized the better question wasn&apos;t &ldquo;how open?&rdquo; but &ldquo;what conditions make openness feel safe enough to ship?&rdquo; That reframe changed the conversation. Time-limited discussions and moderated formats weren&apos;t watered-down compromises - they were the constraints that made the design real.
                    </p>
                  </div>
                  </>
                ) : null}

                {section.id === "research" ? (
                  <div className="mt-4 flex flex-col md:mt-5">
                    <div className="relative rounded-lg overflow-hidden bg-[var(--color-subtle)] my-4 md:my-6 flex flex-col gap-6 p-10">
                      <Image
                        src="/images/ARK7/ARK7-market%20analysis.webp"
                        alt="ARK7 marketing analysis across mobile app, website, and social channels"
                        width={3494}
                        height={1462}
                        sizes="70vw"
                        loading="lazy"
                        className="block w-[70%] h-auto mx-auto"
                      />
                      <Image
                        src="/images/ARK7/Arrived-market%20analysis.webp"
                        alt="Arrived marketing analysis across mobile app, website, and social channels"
                        width={3498}
                        height={1468}
                        sizes="70vw"
                        loading="lazy"
                        className="block w-[70%] h-auto mx-auto"
                      />
                      <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.08)" }} />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
                      <SubHeading>Two users, one shared problem</SubHeading>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        The research revealed two distinct user profiles whose frustrations pointed to
                        the same root cause. The following archetypes were synthesized from public sentiment across TrustPilot, App Store reviews, Reddit, and YouTube - not direct user interviews.
                      </p>
                      <Ark7PersonaCards />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
                      <SubHeading>Refining the problem</SubHeading>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        <Highlight variant="green" duration={700}>Initial question</Highlight>
                        {": How might we help different users build trust at ARK7?"}
                      </p>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        To sharpen this, I mapped each persona&apos;s goals against business goals:
                      </p>
                      <Ark7PersonaBusinessMappingTable />
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        <Highlight variant="green" duration={700}>Refined question</Highlight>
                        {": How might we build an engaging experience for users to learn and invest with trust?"}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:mt-10">
                      <SubHeading>Competitor analysis: how rival platforms build trust and drive engagement</SubHeading>
                      <p style={{ ...BODY_TEXT_STYLE }}>
                        With only two direct competitors in fractional real estate, I expanded the audit to include broader fintech platforms - specifically ones with community or social investing features.
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
                        {[
                          {
                            step: "01",
                            label: "Interactive content drives longer engagement.",
                            body: "Platforms with interactive elements saw more frequent return visits and deeper exploration.",
                          },
                          {
                            step: "02",
                            label: "Community connection makes users feel safer.",
                            body: "When users could see and interact with other investors, their confidence in the platform increased.",
                          },
                          {
                            step: "03",
                            label: "Webinars are the strongest trust signal.",
                            body: "Real-time, expert-led sessions resonated most with users seeking guidance - more than static content or forums.",
                          },
                        ].map((item) => (
                          <div
                            key={item.step}
                            className="rounded-lg p-4"
                            style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}
                          >
                            <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "16px", fontWeight: 500, letterSpacing: "-0.01em", color: "rgba(26,26,26,0.85)", marginBottom: "4px" }}>
                              {item.step}
                            </div>
                            <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "16px", fontWeight: 500, letterSpacing: "-0.01em", color: "rgba(26,26,26,0.85)", marginBottom: "6px", lineHeight: "1.3" }}>
                              {item.label}
                            </div>
                            <div style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.45", color: "rgba(26,26,26,0.5)" }}>
                              {item.body}
                            </div>
                          </div>
                        ))}
                      </div>
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
                  <div className="mt-8 flex flex-col gap-3.5 md:mt-10">
                    <SubHeading>{section.continuationTitle}</SubHeading>
                    {section.continuationBody.map((paragraph) => (
                      <p key={paragraph} style={{ ...BODY_TEXT_STYLE }}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                </CaseScrollReveal>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 md:mt-16">
            <Link
              href="/work/datalign"
              className="group flex flex-col gap-3 no-underline"
              aria-label="Next project: Datalign, 2025 — Redesigning the front door of a wealth management marketplace"
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
                Redesigning the front door of a wealth management marketplace{" "}
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                  &rarr;
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="hidden md:block" />
      </main>
    </div>
  );
}
