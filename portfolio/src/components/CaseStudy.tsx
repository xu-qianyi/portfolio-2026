import React from "react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────
export type MetaItem = { label: string; value: string };

// ── Shared style tokens ──────────────────────────────────────────────

// Switzer — H1 / H2 / H3
export const CASE_H1 = {
  fontFamily: "var(--font-sans)",
  fontSize: "28px",
  lineHeight: "1.15",
  fontWeight: 500,
  letterSpacing: "-0.015em",
  color: "var(--color-ink)",
  margin: 0,
  textWrap: "balance" as const,
} satisfies React.CSSProperties;

export const CASE_H2 = {
  fontFamily: "var(--font-sans)",
  fontSize: "24px",
  lineHeight: "1.2",
  fontWeight: 500,
  letterSpacing: "-0.015em",
  color: "var(--color-ink)",
  marginBottom: "1rem",
  marginTop: 0,
  textWrap: "balance" as const,
} satisfies React.CSSProperties;

// H3 — component-level heading (feature names, persona names, design decision titles)
export const CASE_H3 = {
  fontFamily: "var(--font-sans)",
  fontSize: "20px",
  lineHeight: "1.25",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  margin: 0,
  textWrap: "balance" as const,
} satisfies React.CSSProperties;

// Switzer — H4 and below
export const CASE_BODY = {
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  lineHeight: "1.6",
  letterSpacing: "-0.01em",
  color: "var(--color-ink-80)",
  margin: 0,
} as const satisfies React.CSSProperties;

export const CASE_EYEBROW = {
  fontFamily: "var(--font-sans)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: ".08em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-70)",
  margin: 0,
} satisfies React.CSSProperties;

// Small uppercase label (used inside components: step labels, section tags, etc.)
export const CASE_LABEL = {
  fontFamily: "var(--font-sans)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-50)",
  margin: 0,
} satisfies React.CSSProperties;

// Image captions and card body text
export const CASE_CAPTION = {
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  lineHeight: "1.5",
  color: "var(--color-ink-50)",
  margin: 0,
} satisfies React.CSSProperties;

// Large stat / impact numbers
export const CASE_STAT = {
  fontFamily: "var(--font-sans)",
  fontSize: "24px",
  lineHeight: "1",
  fontWeight: 500,
  letterSpacing: "-0.04em",
  color: "var(--color-ink)",
  margin: 0,
} satisfies React.CSSProperties;

const META_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--color-ink-70)",
};

const META_VALUE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  lineHeight: "1.45",
  color: "var(--color-ink-65)",
};

const DIVIDER_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "var(--color-ink-80)",
  whiteSpace: "nowrap",
};

// ── Components ───────────────────────────────────────────────────────
export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={DIVIDER_LABEL}>{label}</span>
      <div className="flex-1 h-px bg-[var(--color-ink-14)]" />
    </div>
  );
}

// H4 — sub-section heading, Geist sans
export function SubHeading({
  children,
  as: Tag = "h3",
  className,
  style,
}: {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "18px",
        lineHeight: "1.3",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: "var(--color-ink)",
        margin: 0,
        textWrap: "balance",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function CaseMetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <div
      className="grid grid-cols-3 gap-x-8 gap-y-4 mt-6 pt-5"
      style={{ borderTop: "1px solid var(--color-ink-06)" }}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <div style={META_LABEL}>{item.label}</div>
          <div style={META_VALUE}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

// ── Content types ────────────────────────────────────────────────────
export type MethodItem = {
  step?: string;   // optional — "01", "02"…
  label: string;
  body: string;
};

export type StatItem = {
  value: string;
  label: string;
};

// ── Layout components ────────────────────────────────────────────────

// SubHeading + content, gap-4 baked in. Pass className for outer mt-*.
export function CaseSubSection({
  heading,
  children,
  className,
  headingAs = "h3",
}: {
  heading: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headingAs?: "h2" | "h3";
}) {
  return (
    <div className={`flex flex-col gap-5${className ? ` ${className}` : ""}`}>
      <SubHeading as={headingAs}>{heading}</SubHeading>
      {children}
    </div>
  );
}

// Numbered method / research / finding cards. cols defaults to 3.
export function CaseMethodGrid({
  items,
  cols = 3,
  variant = "elevated",
}: {
  items: MethodItem[];
  cols?: 1 | 2 | 3;
  variant?: "elevated" | "flat";
}) {
  const colClass = cols === 2 ? " sm:grid-cols-2" : cols === 3 ? " sm:grid-cols-3" : "";
  const cardStyle =
    variant === "elevated"
      ? { background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }
      : { background: "var(--color-surface)" };
  return (
    <div className={`grid grid-cols-1${colClass} gap-4`}>
      {items.map((item, i) => (
        <div key={i} className="p-4" style={cardStyle}>
          {item.step !== undefined && (
            <div style={{ ...CASE_LABEL, color: "var(--color-ink-40)", marginBottom: "10px" }}>
              {item.step}
            </div>
          )}
          <div style={{
            fontFamily: "var(--font-sans)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--color-ink-80)",
            marginBottom: "6px",
            lineHeight: "1.3",
          }}>
            {item.label}
          </div>
          <div style={CASE_CAPTION}>{item.body}</div>
        </div>
      ))}
    </div>
  );
}

// Large stat numbers + labels, 3-column grid.
export function CaseStatGrid({
  items,
  variant = "plain",
}: {
  items: StatItem[];
  variant?: "plain" | "card";
}) {
  const isCard = variant === "card";
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 ${isCard ? "gap-4" : "gap-x-8 gap-y-5"}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col gap-3 ${isCard ? "p-5 md:p-6" : "pt-4"}`}
          style={isCard ? { background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" } : undefined}
        >
          <p style={CASE_STAT}>{item.value}</p>
          <p style={{ ...CASE_BODY, fontSize: "15px", fontWeight: 400, lineHeight: "1.3", color: "var(--color-ink-50)" }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseNextProject({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 no-underline"
      aria-label={`Next project: ${label}`}
    >
      <SectionDivider label="Next project" />
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "18px",
          lineHeight: "1.3",
          fontWeight: 400,
          margin: 0,
        }}
        className="text-[var(--color-muted)] transition-colors duration-200 ease-out group-hover:text-[#1A1A1A]"
      >
        {label}{" "}
        <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
          &rarr;
        </span>
      </p>
    </Link>
  );
}
