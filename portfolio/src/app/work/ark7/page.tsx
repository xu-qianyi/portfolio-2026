"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "@/components/Img";
import CaseScrollReveal from "@/components/CaseScrollReveal";
import LottiePreview from "@/components/LottiePreview";
import Highlight from "@/components/Highlight";
import BackToTop from "@/components/BackToTop";
import ProjectCard from "@/components/ProjectCard";
import {
  CASE_BODY,
  CASE_H1,
  CASE_H2,
  CASE_H3,
  CASE_EYEBROW,
  CASE_LABEL,
  CASE_CAPTION,
  CASE_STAT,
  SectionDivider,
  SubHeading,
  CaseMetaGrid,
  CaseSubSection,
  CaseMethodGrid,
  CaseStatGrid,
  type MethodItem,
  type StatItem,
} from "@/components/CaseStudy";

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
    title: "Defining the trust gap without direct access",
    body: [
      "The client managed all user communication directly, so I couldn't run interviews. Instead, I triangulated from three sources:",
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
    title: "Four features, two users",
    body: [
      "The research had already told us what was missing. With the design foundation in place, we built the four community features that filled those gaps.",
    ],
  },
  {
    id: "summary",
    label: "Summary",
    title: "Outcome and impact",
    body: [],
  },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

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
    role: "Isolated Investor",
    tags: ["Regular Investor"],
    needs: [
      "Has been investing with ARK7 for a year but has no visibility into how her properties are managed",
      "Doesn't know who the other co-owners are or how decisions get made",
      "Feels like a passive passenger rather than an actual owner",
      "Considering withdrawal after the lock-up period ends",
    ],
    goalLabel: "Her goal",
    goal: "More influence on decisions. A sense of belonging and trust.",
  },
  {
    name: "Ian",
    role: "Skeptical Newcomer",
    tags: ["New Investor"],
    needs: [
      "Discovered ARK7 through a YouTube ad and received a $50 bonus - but still hasn't invested",
      "Cautious about who to trust - available information feels limited",
      "Wants to know who else is investing and what they think",
      "Platform feels like a black box - not enough signal to trust it with real money",
    ],
    goalLabel: "His goal",
    goal: "Transparency, guidance, and confidence before committing money.",
  },
] as const;

const ARK7_PERSONA_FRAMES = [
  {
    id: "lisa",
    tabLabel: "Lisa",
    personaType: "Regular investor",
    statusQuo: [
      "Has been investing with ARK7 for a year but has no visibility into how her properties are managed.",
      "Doesn't know who the other co-owners are or how decisions get made.",
      "Feels like a passive passenger rather than an actual owner.",
    ],
    userNeed: "More influence on decisions",
    businessNeed: "Retain and increase investment",
    strategySteps: ["Update", "Inform", "Engage", "Invest"],
  },
  {
    id: "ian",
    tabLabel: "Ian",
    personaType: "New investor",
    statusQuo: [
      "Discovered ARK7 through a YouTube ad and received a $50 bonus - but still hasn't invested.",
      "Cautious about who to trust - available information feels limited.",
      "Wants to know who else is investing and what they think.",
    ],
    userNeed: "Clear understanding & confidence before investing",
    businessNeed: "Convert to regular investor",
    strategySteps: ["Introduce / Educate", "Engage", "Invest"],
  },
] as const;

const ARK7_METHOD_ITEMS: MethodItem[] = [
  { step: "01", label: "Public sentiment",           body: "Scraped TrustPilot, App Store reviews, Reddit, and YouTube comments to capture unfiltered user reactions." },
  { step: "02", label: "CS team interviews",         body: "Talked with ARK7's customer service team to map what complaints actually reached them - and what they couldn't explain." },
  { step: "03", label: "Benchmarking against Arrived", body: "Deep-dived into Arrived - ARK7's closest direct competitor - to understand what they were doing differently to keep investors engaged." },
];

const ARK7_STAT_ITEMS: StatItem[] = [
  { value: "10%",  label: "lift in new user conversion rate" },
  { value: "2×",   label: "longer on the platform in their first session - reading, exploring, and getting comfortable before investing" },
  { value: "40%",  label: "increase in secondary market transaction volume" },
];

const ARK7_DESIGN_AUDIT_FINDINGS = [
  {
    image: "/images/ark7/different_shades_of_greens.webp",
    title: "Different shades of green",
    body: "In our design audit, we discovered that 12 different shades of green are used throughout our platform, adding unnecessary cognitive load for users.",
  },
  {
    image: "/images/ark7/font_a11y.webp",
    title: "Font usage and accessibility",
    body: "The style guide lists 14 fonts but gives no guidance on when to use them - resulting in poor visual hierarchy and up to 5 different fonts on a single card. Some are too small to meet WCAG standards.",
  },
  {
    image: "/images/ark7/inconsistent_card_layout.webp",
    title: "Inconsistent card layout",
    body: "The platform lacks clear design guidelines for card usage, resulting in varied CTA placements - some on the left, some on the right - and mixed placement of images and text. This slows down users' interactions and reduces overall task efficiency.",
  },
  {
    image: "/images/ark7/cramped_spacing.webp",
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
      {ARK7_DESIGN_AUDIT_FINDINGS.map((item, i) => (
        <div key={item.title} className="flex flex-col gap-3">
          <div className="relative p-3" style={{ border: "1px solid var(--color-ink-14)" }}>
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain object-top"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: "var(--color-ink-40)",
                marginBottom: "2px",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "1.3",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--color-ink-80)",
                margin: 0,
              }}
            >
              {item.title}
            </p>
            <p style={{ ...CASE_BODY, color: "var(--color-ink-50)" }}>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const _BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STORE_LOGOS: Record<string, ReactNode> = {
  "Google Play": (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${_BASE}/images/ark7/Google_Play.svg.png`} alt="Google Play" style={{ height: "18px", width: "auto" }} />
  ),
  "Trustpilot": (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${_BASE}/images/ark7/Trustpilot_Logo.svg.png`} alt="Trustpilot" style={{ height: "18px", width: "auto" }} />
  ),
};

function Ark7IterationStoreQuotes() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8">
      {ARK7_STORE_REVIEW_QUOTES.map((item) => (
        <blockquote
          key={item.source}
          className="flex flex-col gap-3 p-5"
          style={{ background: "transparent" }}
        >
          <div>{STORE_LOGOS[item.source]}</div>
          <p
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.6",
              fontStyle: "normal",
              color: "var(--color-ink-70)",
              margin: 0,
              flexGrow: 1,
            }}
          >
            &ldquo;{ark7StoreQuoteInner(item.quote)}&rdquo;
          </p>
          <cite
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 450,
              fontStyle: "normal",
              color: "var(--color-muted)",
              display: "block",
            }}
          >
            {item.author}
          </cite>
        </blockquote>
      ))}
    </div>
  );
}

function Ark7PersonaCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {ARK7_PERSONAS.map((p) => (
        <article
          key={p.name}
          className="flex flex-col gap-3.5 border border-[var(--color-ink-14)] bg-[var(--color-surface)] px-4 py-3.5 md:px-5 md:py-4"
        >
          <header>
            <p
              className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              style={{ ...CASE_BODY, color: "var(--color-ink-80)" }}
            >
              <span style={CASE_H3}>{p.name}</span>
              <span
                className="min-w-0 max-w-full text-right sm:max-w-[min(100%,28rem)]"
                style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "15px", lineHeight: "1.5" }}
              >
                <span style={{ color: "var(--color-ink-70)" }}>{p.role}</span>
                <span style={{ color: "var(--color-muted)" }}> · </span>
                <span style={{ color: "var(--color-ink-65)", letterSpacing: "0.02em" }}>
                  {p.tags.join(" · ")}
                </span>
              </span>
            </p>
          </header>

          <div className="flex flex-col gap-2 border-t border-[var(--color-ink-14)] pt-3.5">
            <ul
              className="m-0 list-disc space-y-1.5 pl-4 marker:text-[var(--color-ink-65)]"
              style={{ fontFamily: CASE_BODY.fontFamily, fontSize: "15px", lineHeight: "1.6", color: "var(--color-ink-80)" }}
            >
              {p.needs.map((line) => (
                <li key={line} className="pl-0.5">
                  {line}
                </li>
              ))}
            </ul>
          </div>

        </article>
      ))}
    </div>
  );
}

const TABLE_SERIF = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  lineHeight: "1.5",
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
              <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>Transparency</span>
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
              <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>Agency</span>
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
              <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>Belonging</span>
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
              <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>Education</span>
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
  pros: string[];
  cons: string[];
};

const ARK7_LAYOUT_OPTIONS: Ark7LayoutOption[] = [
  {
    id: "information-home",
    tabLabel: "Option 1",
    imageSrc: "/images/ark7/option1.webp",
    imageWidth: 1002,
    imageHeight: 2214,
    imageAlt: "Mobile wireframe: information cards and feature tiles on the home tab",
    title: "Information cards on the home tab",
    pros: [
      "Self-serve discovery",
      "Easiest to build",
    ],
    cons: [
      "Invisible cards = early drop-off",
      "4 cards at once = decision fatigue",
    ],
  },
  {
    id: "feed-home",
    tabLabel: "Option 2",
    imageSrc: "/images/ark7/option2.webp",
    imageWidth: 1040,
    imageHeight: 2214,
    imageAlt: "Mobile wireframe: home and feed tabs with a vertical content feed",
    title: "Feed in the home tab",
    pros: [
      "Familiar scroll pattern",
      "Passive feature discovery",
    ],
    cons: [
      "Portfolio + community in one tab = mode confusion",
    ],
  },
  {
    id: "feed-new-tab",
    tabLabel: "Option 3",
    imageSrc: "/images/ark7/option3.webp",
    imageWidth: 1040,
    imageHeight: 2215,
    imageAlt: "Mobile wireframe: dedicated news feed tab with bottom navigation",
    title: "Dedicated tab with a feed",
    pros: [
      "Consistent feed interaction",
      "Higher content discovery",
      "Community gets its own clear space",
    ],
    cons: [],
  },
];

const ARK7_CARD_REVAMP_TABS = [
  { id: "overall",  label: "Overall",    src: "/images/ark7/design_revamp_overall.webp", alt: "Card revamp overall before and after" },
  { id: "anatomy",  label: "Anatomy",    src: "/images/ark7/anatomy.webp",               alt: "Card anatomy breakdown" },
  { id: "cta",      label: "CTA button", src: "/images/ark7/cta.webp",                   alt: "CTA button changes before and after" },
  { id: "content",  label: "Content",    src: "/images/ark7/content.webp",               alt: "Content changes before and after" },
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
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Card component revamp tabs"
          id={tablistId}
          onKeyDown={handleKeyDown}
          className="inline-flex items-center gap-1"
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
                className="px-3 py-1.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                  cursor: "pointer",
                  border: "none",
                  background: isActive ? "var(--color-ink-06)" : "transparent",
                }}
                onClick={() => select(i)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${active.id}`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className="border border-[var(--color-ink-14)] bg-[var(--color-surface)] p-5 md:p-8"
      >
        <Image
          key={`${active.id}-${epoch}`}
          src={active.src}
          alt={active.alt}
          width={1600}
          height={1200}
          className="w-full h-auto ark7-layout-tab-panel-enter"
          loading="lazy"
        />
      </div>
    </div>
  );
}

const ARK7_PROTOTYPE_FEATURES = [
  {
    id: "voting",
    name: "Voting",
    trust: "Agency",
    videoSrc: "/images/ark7/voting.webm",
    description:
      "When the property manager proposes a renovation or makes a budget call, you can weigh in. It's a small thing that changes how ownership actually feels - less like a passenger, more like someone with a real stake.",
  },
  {
    id: "webinar",
    name: "Webinar",
    trust: "Education",
    videoSrc: "/images/ark7/webinar.webm",
    description:
      "Instead of piecing things together from Reddit threads and YouTube comments, you can hear directly from ARK7's team and real estate experts. Q&As are live, and recordings stick around so nothing gets missed.",
  },
  {
    id: "news",
    name: "News",
    trust: "Transparency",
    videoSrc: "/images/ark7/news.webm",
    description:
      "Market updates, property highlights, investment tips - all in one place. You don't have to refresh five tabs to know what's happening with your money.",
  },
  {
    id: "discussion",
    name: "Discussion",
    trust: "Belonging",
    videoSrc: "/images/ark7/discussion.webm",
    description:
      "For a limited window after a major property event, co-investors can talk in the same space. It's temporary by design - low-stakes enough to actually say something, specific enough to matter.",
  },
] as const;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Ark7PrototypeFeatures() {
  return (
    <div className="flex flex-col gap-16 mt-6 md:gap-20 md:mt-8">
      {ARK7_PROTOTYPE_FEATURES.map((feature) => (
        <div
          key={feature.id}
          className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center md:gap-14"
        >
          <div className="flex justify-center md:justify-start">
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: "200px",
                borderRadius: "2.25rem",
                boxShadow: "0 4px 28px rgba(0,0,0,0.13)",
                outline: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <video
                src={`${BASE}${feature.videoSrc}`}
                autoPlay
                loop
                muted
                playsInline
                className="block w-full h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span
              style={{
                ...CASE_LABEL,
                display: "inline-flex",
                alignSelf: "flex-start",
                color: "var(--color-ink-80)",
                background: "var(--color-ink-06)",
                borderRadius: "999px",
                padding: "3px 10px",
              }}
            >
              {feature.trust}
            </span>
            <h3 style={CASE_H3}>{feature.name}</h3>
            <p style={{ ...CASE_BODY, color: "var(--color-ink-50)" }}>{feature.description}</p>
          </div>
        </div>
      ))}
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
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Three layout options compared"
          id={tablistId}
          onKeyDown={handleKeyDown}
          className="inline-flex items-center gap-1"
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
                className="px-3 py-1.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                  cursor: "pointer",
                  border: "none",
                  background: isActive ? "var(--color-ink-06)" : "transparent",
                }}
                onClick={() => selectLayoutTab(i)}
              >
                {opt.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${active.id}`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className="border border-[var(--color-ink-14)] bg-[var(--color-subtle)] p-8 md:p-12 flex flex-col gap-8"
      >
        <p style={{ ...CASE_H3, textAlign: "center" }}>{active.title}</p>
        <div
          key={`${active.id}-${layoutPanelMotionEpoch}`}
          className={`flex justify-center${layoutPanelMotionEpoch > 0 ? " ark7-layout-tab-panel-enter" : ""}`}
        >
          <Image
            src={active.imageSrc}
            alt={active.imageAlt}
            width={active.imageWidth}
            height={active.imageHeight}
            sizes="100px"
            loading="lazy"
            style={{ width: 200, height: "auto" }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {active.pros.map((text) => (
            <div key={text} className="flex gap-2 items-center">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} />
              <p style={{ ...CASE_CAPTION, margin: 0 }}>{text}</p>
            </div>
          ))}
          {active.cons.map((text) => (
            <div key={text} className="flex gap-2 items-center">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#DC2626", flexShrink: 0 }} />
              <p style={{ ...CASE_CAPTION, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ARK7_FEATURE_GROUPS = [
  {
    label: "Selected",
    chipStyle: {
      color: "var(--color-ink-70)",
      borderColor: "rgba(26,26,26,0.15)",
      background: "transparent",
    },
    chipHoverStyle: {
      background: "var(--color-ink-06)",
    },
    features: [
      {
        id: "news",
        label: "News",
        pros: [
          "Curates external sources - no original content required",
          "Provides market context without triggering investment-advice rules",
          "Addresses the opacity complaint directly with zero regulatory exposure",
        ],
        cons: [
          "Needs ongoing editorial judgement to avoid noise or sensationalism",
          "Perceived as marketing if not clearly third-party",
        ],
      },
      {
        id: "discussion",
        label: "Discussion",
        pros: [
          "Social proof for new investors seeing others engaged",
          "Gives existing investors a voice - reduces passive-passenger feeling",
        ],
        cons: [
          "UGC in financial context creates moderation liability",
          "Any investment discussion may require compliance review per post",
          "High ongoing moderation cost for a small team",
        ],
      },
      {
        id: "voting",
        label: "Voting",
        pros: [
          "Directly makes existing investors feel like owners, not passengers",
          "Scope is narrow and controllable (property decisions only)",
          "High emotional ROI relative to engineering effort",
        ],
        cons: [
          "Legally complex - must define exactly what decisions are voteable",
          "Risk of creating perceived fiduciary obligations if not scoped carefully",
        ],
      },
      {
        id: "webinar",
        label: "Webinar",
        pros: [
          "One-to-many format - one event serves hundreds of users",
          "Builds expert credibility; recordings reusable as evergreen content",
          "Converts skeptical new investors through direct Q&A",
        ],
        cons: [
          "Every session needs legal disclaimer review before publishing",
          "Scheduling and prep cost is real for a lean team",
        ],
      },
    ],
  },
  {
    label: "Considered",
    chipStyle: {
      color: "var(--color-ink-70)",
      borderColor: "rgba(26,26,26,0.15)",
      background: "transparent",
    },
    chipHoverStyle: {
      background: "var(--color-ink-06)",
    },
    features: [
      {
        id: "event-hub",
        label: "Event hub",
        pros: [
          "IRL events create high-quality trust moments",
          "Differentiates from purely digital competitors",
        ],
        cons: [
          "Logistically expensive - requires staff time and budget per event",
          "Doesn't scale; impact is local and one-off",
          "Startup team can't sustain a recurring events calendar",
        ],
      },
      {
        id: "copy-trading",
        label: "Copy trading",
        pros: [
          "Strongest possible conversion tool for new investors",
          "Mirrors engagement models proven on platforms like eToro",
        ],
        cons: [
          "Mirroring someone's portfolio constitutes investment advice in most jurisdictions",
          "Would require additional licensing (broker-dealer or RIA) - existential regulatory risk",
          "Compliance overhead alone could stall the entire product",
        ],
      },
      {
        id: "learn",
        label: "Learn",
        pros: [
          "Self-service trust-building for skeptical new users",
          "Reduces CS load by answering common questions proactively",
        ],
        cons: [
          "Financial education content requires legal review for every piece",
          "Large upfront production effort; goes stale quickly",
          "Competes with free external resources users already trust more",
        ],
      },
    ],
  },
  {
    label: "Deprioritized",
    chipStyle: {
      color: "var(--color-ink-70)",
      borderColor: "rgba(26,26,26,0.15)",
      background: "transparent",
    },
    chipHoverStyle: {
      background: "var(--color-ink-06)",
    },
    features: [
      {
        id: "qa",
        label: "Q&A",
        pros: [
          "Low technical complexity",
          "Directly resolves specific user questions",
        ],
        cons: [
          "Duplicates what the CS team already does",
          "Users expect authoritative answers - off-brand for a regulated product",
          "Moderation cost is high; financial Q&A creates liability",
        ],
      },
      {
        id: "badge",
        label: "Badge",
        pros: [
          "Drives engagement loops familiar from other apps",
        ],
        cons: [
          "Gamification is tone-deaf in a financial context",
          "Erodes the seriousness and trust ARK7 needs to project",
          "Users investing real money don't want achievement stickers",
        ],
      },
      {
        id: "marketing",
        label: "More marketing contents",
        pros: [
          "Lowest production cost of any option",
        ],
        cons: [
          "Addresses the symptom, not the cause - opacity remains",
          "Users can distinguish marketing from genuine proof",
          "More of the same erodes trust rather than building it",
        ],
      },
    ],
  },
];

type MatrixFeature = { id: string; label: string; pros: string[]; cons: string[] };

function Ark7FeatureMatrix() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId ?? selectedId;

  const allFeatures: MatrixFeature[] = ARK7_FEATURE_GROUPS.flatMap((g) => g.features as MatrixFeature[]);
  const activeFeature = allFeatures.find((f) => f.id === activeId) ?? null;

  const CHIP_BASE: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontSize: "13px",
    fontWeight: 450,
    letterSpacing: "0.01em",
    lineHeight: "1",
    padding: "5px 11px",
    border: "1px solid",
    cursor: "default",
    transition: "background 120ms, color 120ms",
    userSelect: "none",
  };

  return (
    <div className="my-8 flex flex-col gap-5 md:my-10">
      {/* Chip groups */}
      {ARK7_FEATURE_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-wrap items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: "var(--color-muted)",
              minWidth: "96px",
            }}
          >
            {group.label}
          </span>
          {group.features.map((f) => {
            const isSelected = selectedId === f.id;
            const isActive = activeId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onMouseEnter={() => setHoveredId(f.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(isSelected ? null : f.id)}
                style={{
                  ...CHIP_BASE,
                  ...group.chipStyle,
                  background: isActive ? "var(--color-ink-06)" : "transparent",
                  cursor: "pointer",
                  outline: isSelected ? "1.5px solid var(--color-ink-30)" : "none",
                  outlineOffset: "-1px",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      ))}

      {/* Detail panel */}
      <div
        style={{
          minHeight: "80px",
          borderTop: "1px solid var(--color-ink-10)",
          paddingTop: "16px",
          transition: "opacity 120ms",
          opacity: activeFeature ? 1 : 0,
        }}
      >
        {activeFeature && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              {activeFeature.pros.map((pro) => (
                <div key={pro} className="flex items-start gap-2">
                  <span style={{ color: "#3d8c5a", fontSize: "13px", lineHeight: "1.5", flexShrink: 0, marginTop: "1px" }}>+</span>
                  <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-70)" }}>
                    {pro}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {activeFeature.cons.map((con) => (
                <div key={con} className="flex items-start gap-2">
                  <span style={{ color: "#c0392b", fontSize: "13px", lineHeight: "1.5", flexShrink: 0, marginTop: "1px" }}>−</span>
                  <span style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "13px", lineHeight: "1.5", color: "var(--color-ink-70)" }}>
                    {con}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Ark7PersonaTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const tablistId = "ark7-persona-tabs";
  const active = ARK7_PERSONA_FRAMES[activeIndex];

  const select = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);
    setEpoch((e) => e + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(Math.min(activeIndex + 1, ARK7_PERSONA_FRAMES.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(ARK7_PERSONA_FRAMES.length - 1);
    }
  };

  const LABEL_STYLE: React.CSSProperties = { ...CASE_LABEL, color: "var(--color-muted)" };

  const NEED_TEXT_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontSize: "15px",
    lineHeight: "1.4",
    fontWeight: 400,
    color: "var(--color-ink)",
    margin: 0,
  };

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* Tab list */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Persona tabs"
          id={tablistId}
          onKeyDown={handleKeyDown}
          className="inline-flex items-center gap-1"
        >
          {ARK7_PERSONA_FRAMES.map((frame, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={frame.id}
                type="button"
                role="tab"
                id={`${tablistId}-${frame.id}`}
                aria-selected={isActive}
                aria-controls={`${tablistId}-panel-${frame.id}`}
                tabIndex={isActive ? 0 : -1}
                className="px-3 py-1.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: isActive ? "var(--color-ink)" : "var(--color-muted)",
                  cursor: "pointer",
                  border: "none",
                  background: isActive ? "var(--color-ink-06)" : "transparent",
                }}
                onClick={() => select(i)}
              >
                {frame.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab panel */}
      <div
        key={`${active.id}-${epoch}`}
        role="tabpanel"
        id={`${tablistId}-panel-${active.id}`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className={`border border-[var(--color-ink-14)] bg-[var(--color-surface)] p-6 md:p-8${epoch > 0 ? " ark7-layout-tab-panel-enter" : ""}`}
      >
        {/* Persona header */}
        <div className="mb-5 md:mb-6">
          <p style={{ ...LABEL_STYLE, marginBottom: "4px" }}>{active.personaType}</p>
          <p style={CASE_H3}>{active.tabLabel}</p>
        </div>

        {/* Status quo */}
        <div className="flex flex-col gap-3 mb-5">
          <p style={LABEL_STYLE}>Status quo</p>
          <ul className="m-0 list-none p-0 flex flex-col gap-2.5">
            {active.statusQuo.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 items-baseline ark7-persona-bullet-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span style={{ color: "var(--color-ink-14)", flexShrink: 0, fontSize: "16px", lineHeight: "160%", fontWeight: 600 }}>·</span>
                <p style={{ ...CASE_CAPTION, color: "var(--color-ink-70)" }}>{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* User need + Business need */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            className="ark7-persona-need-in flex flex-col gap-3 border border-[var(--color-ink-06)] bg-[var(--color-subtle)] p-4"
            style={{ animationDelay: "220ms" }}
          >
            <p style={LABEL_STYLE}>User need</p>
            <p style={NEED_TEXT_STYLE}>{active.userNeed}</p>
          </div>
          <div
            className="ark7-persona-need-in flex flex-col gap-3 border border-[var(--color-ink-06)] bg-[var(--color-subtle)] p-4"
            style={{ animationDelay: "300ms" }}
          >
            <p style={LABEL_STYLE}>Business need</p>
            <p style={NEED_TEXT_STYLE}>{active.businessNeed}</p>
          </div>
        </div>

        {/* Strategy flow */}
        <div
          className="mt-4 pt-5 border-t border-[var(--color-ink-06)] flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          {active.strategySteps.map((step, i) => (
            <span key={step} className="flex items-center gap-x-2">
              <span
                className="ark7-persona-step-in"
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  animationDelay: `${440 + i * 70}ms`,
                }}
              >
                {step}
              </span>
              {i < active.strategySteps.length - 1 && (
                <span
                  className="ark7-persona-step-in"
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    color: "var(--color-muted)",
                    fontSize: "15px",
                    animationDelay: `${475 + i * 70}ms`,
                  }}
                >
                  →
                </span>
              )}
            </span>
          ))}
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
                fontSize: "15px",
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

  useEffect(() => {
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          ratioMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextId = SECTION_IDS[0];
        let maxRatio = -1;

        SECTION_IDS.forEach((id) => {
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

    SECTION_IDS.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen px-6 py-14 md:py-16 lg:px-[72px] lg:py-16 lg:mx-[32px]">
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
              <p style={CASE_EYEBROW}>
                ARK7 / FinTech
              </p>
              <h1 style={CASE_H1}>
                Cultivating a Trusted Investment Community
              </h1>
              <p style={{ ...CASE_BODY, marginTop: "4px" }}>
                ARK7 had a retention problem on both ends - new users weren&apos;t converting, and existing investors were pulling out after the lock-up period. <Highlight variant="green" duration={1200}>I led research, design system work, and end-to-end design of four community features</Highlight> that gave users enough transparency and social proof to stay.
              </p>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="w-full aspect-[16/9] border border-[var(--color-ink-14)] bg-[var(--color-subtle)] overflow-hidden relative mb-0">
              <LottiePreview
                src="/images/ark7/case_study_preview.json"
                loop={false}
                fallbackSrc="/images/preview/ark7.webp"
                alt="ARK7 mobile product preview"
              />
            </CaseScrollReveal>

            <CaseScrollReveal delay={120}>
              <CaseMetaGrid items={META_ITEMS} />
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
                className="scroll-mt-24 pt-20"
              >
                <div className="flex min-w-0 w-full flex-col gap-0">
                <CaseScrollReveal>
                <div className="flex flex-col gap-0">
                  <SectionDivider label={section.label} />
                  {section.id !== "iteration" && section.id !== "summary" ? (
                    <h2 style={CASE_H2}>{section.title}</h2>
                  ) : null}
                </div>
                </CaseScrollReveal>

                <CaseScrollReveal delay={80} className="flex flex-col gap-5">
                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id}-${paragraphIndex}`}
                    style={{ ...CASE_BODY }}
                  >
                    {ark7SectionParagraph(section.id, paragraphIndex, paragraph)}
                  </p>
                ))}

                {section.id === "iteration" ? (
                  <>
                  <CaseSubSection heading="Fixing the foundation first" headingAs="h2">
                    <Ark7IterationStoreQuotes />
                    <p style={CASE_BODY}>
                      Before shipping the community features, we stepped back. At a visual level, the platform was already working against itself - signaling cheap and inconsistent before a user ever reached the content.
                    </p>
                    <p style={CASE_BODY}>
                      Trust-building features can&apos;t land on a foundation like that. Rebuilding the card component wasn&apos;t a detour from the brief - it was the prerequisite.
                    </p>
                    <p style={CASE_BODY}>Our design audit revealed:</p>
                    <Ark7DesignAuditGrid />
                  </CaseSubSection>
                  <CaseSubSection heading="The Card Component Revamp" headingAs="h2" className="mt-10">
                    <p style={CASE_BODY}>
                      Given time constraints, we focused our design system work on the card component - the most heavily used element across the platform, and the building block for all four community features.
                    </p>
                    <Ark7CardRevampTabs />
                  </CaseSubSection>
                  </>
                ) : null}

                {section.id === "final-solution" ? (
                  <Ark7PrototypeFeatures />
                ) : null}

                {section.id === "design" ? (
                  <>
                    <Ark7FeatureMatrix />
                    <div className="mt-10 flex flex-col gap-8">
                      <CaseSubSection heading="Entry point: one tab, four touchpoints">
                        <p style={CASE_BODY}>
                          We evaluated three layout options for integrating the community features. The
                          winning approach:{" "}
                          <Highlight variant="green" duration={800}>a dedicated tab with a feed flow</Highlight>
                          , using information cards at the top to surface each feature.
                        </p>
                        <Ark7LayoutOptionsTabs />
                      </CaseSubSection>
                      <CaseSubSection heading="Core flow">
                        <p style={CASE_BODY}>
                          We mapped flows for each of the four features, tracing the path from community tab entry to the key action in each feature - surfacing where friction was highest and where confidence-building moments needed to land.
                        </p>
                        <div className="w-full overflow-hidden">
                          <Image
                            src="/images/ark7/user_flow.webp"
                            alt="User flow diagram mapping entry through feed interactions in the ARK7 app"
                            width={4432}
                            height={1956}
                            sizes="(max-width: 767px) 100vw, 800px"
                            loading="lazy"
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      </CaseSubSection>
                    </div>
                  </>
                ) : null}

                {section.id === "summary" ? (
                  <>
                  <CaseSubSection heading="Measuring trust in numbers">
                    <p style={CASE_BODY}>
                      Initial telemetry after the community features shipped showed movement across both segments:
                    </p>
                    <CaseStatGrid items={ARK7_STAT_ITEMS} />
                  </CaseSubSection>
                  <CaseSubSection heading="What I took away" className="mt-12">
                    <div className="flex flex-col gap-1.5">
                      <div style={{ ...CASE_LABEL, color: "var(--color-ink-40)" }}>01</div>
                      <SubHeading>Navigating the space between user needs and business caution</SubHeading>
                    </div>
                    <p style={{ ...CASE_BODY, color: "var(--color-ink-50)" }}>
                      User needs and business goals don&apos;t always point the same way - and sometimes that tension is real, not just a communication problem. When they conflict, defaulting to one side doesn&apos;t work. Designs that ignore business constraints don&apos;t ship. Decisions that ignore users don&apos;t hold. The job is trusting your product instinct enough to find where both can actually be served.
                    </p>
                    <div className="flex flex-col gap-1.5 mt-8">
                      <div style={{ ...CASE_LABEL, color: "var(--color-ink-40)" }}>02</div>
                      <SubHeading>Not everything we designed survived</SubHeading>
                    </div>
                    <p style={{ ...CASE_BODY, color: "var(--color-ink-50)" }}>
                      After handoff, the product was reshaped multiple times - today only the News feature is still live. The honest part isn&apos;t what was outside my control. Some research moved faster than it should have, and decisions ended up built on thinner ground than I&apos;d want. Speed is a real constraint, but the right response isn&apos;t to do everything faster. It&apos;s to know what needs protecting. I didn&apos;t always get that right here.
                    </p>
                  </CaseSubSection>
                  </>
                ) : null}

                {section.id === "research" ? (
                  <div className="flex flex-col gap-8">
                    <CaseMethodGrid items={ARK7_METHOD_ITEMS} cols={3} variant="flat" />
                    <div className="relative overflow-hidden bg-[var(--color-subtle)] p-6 md:p-10">
                      <Image
                        src="/images/ark7/competitor_analysis.webp"
                        alt="Competitor analysis comparing ARK7 and Arrived across mobile app, website, and social channels"
                        width={1600}
                        height={900}
                        sizes="(max-width: 767px) 100vw, 800px"
                        loading="lazy"
                        unoptimized
                        className="block w-full h-auto mx-auto"
                      />
                      <span className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.08)" }} />
                    </div>
                    <div className="flex flex-col gap-5">
                      <p style={CASE_BODY}>
                        Arrived ran webinars, published expert walkthroughs, and kept community spaces active. Users could see how others invested, ask questions directly, and build conviction before committing. ARK7 offered the same product - same price range, same asset class - with none of that context.
                      </p>
                      <p style={CASE_BODY}>
                        Public sentiment across TrustPilot, App Store, Reddit, and YouTube confirmed it from the user side. <Highlight variant="green" duration={800}>Complaints weren&apos;t about bugs or pricing - they were about opacity.</Highlight> Returns showed up in the dashboard; the reasoning behind them didn&apos;t. No visibility into property management, no sense of who co-owned their assets, no signal that anyone else trusted the platform with real money.
                      </p>
                    </div>
                    <CaseSubSection heading="The problem, reframed">
                      <p style={CASE_BODY}>
                        Mapping user needs against business goals revealed a single bottleneck: both user types were stuck on opacity, just approaching it from opposite ends. That narrowed &ldquo;build trust&rdquo; into a specific, designable question.
                      </p>
                      <p style={CASE_BODY}>
                        The existing user had been on the platform for a year with no visibility into how their property was managed and was considering withdrawing. The new user had found ARK7 through a YouTube ad but still hadn&apos;t invested; without social proof or context, the platform felt like a black box. Both were blocked by opacity, just from opposite ends. That shaped two distinct paths forward: Update → Inform → Engage → Invest for the existing user, and Introduce / Educate → Engage → Invest for the new user.
                      </p>
                    </CaseSubSection>

                  </div>
                ) : null}

                {section.id === "overview" ? (
                  <div className="w-full overflow-hidden">
                    <Image
                      src="/images/ark7/official_site.webp"
                      alt="ARK7 official website homepage"
                      width={1500}
                      height={988}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : null}

                {section.continuationTitle && section.continuationBody ? (
                  <CaseSubSection heading={section.continuationTitle} className="mt-10">
                    {section.continuationBody.map((paragraph) => (
                      <p key={paragraph} style={CASE_BODY}>{paragraph}</p>
                    ))}
                  </CaseSubSection>
                ) : null}

                </CaseScrollReveal>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 md:mt-16">
            <SectionDivider label="More case studies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectCard
                variant="framed"
                className="!mb-0"
                project={{
                  id: "datalign",
                  title: "Datalign",
                  headline: "Redesigning the front door of a wealth management marketplace",
                  image: "/images/preview/datalign.webp",
                  href: "/work/datalign",
                  width: 1280,
                  height: 720,
                  bg: "#fbfbf7",
                }}
              />
              <ProjectCard
                variant="framed"
                className="!mb-0"
                project={{
                  id: "looklook-nars",
                  title: "NARS Foundation",
                  headline: "US & China concept testing for a longwear foundation launch",
                  image: "/images/preview/nars_playful.json",
                  href: "/work/nars",
                  width: 1280,
                  height: 720,
                }}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block" />
      </main>
      <BackToTop />
    </div>
  );
}
