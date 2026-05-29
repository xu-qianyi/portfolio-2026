import React from "react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────
export type MetaItem = { label: string; value: string };

// ── Shared style tokens ──────────────────────────────────────────────
export const CASE_BODY = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  lineHeight: "1.6",
  letterSpacing: "-0.005em",
  color: "var(--color-ink-80)",
  margin: 0,
} as const satisfies React.CSSProperties;

export const CASE_H1 = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "28px",
  lineHeight: "1.15",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  margin: 0,
  textWrap: "balance" as const,
} satisfies React.CSSProperties;

export const CASE_H2 = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "24px",
  lineHeight: "1.2",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  marginBottom: "1rem",
  marginTop: 0,
  textWrap: "balance" as const,
} satisfies React.CSSProperties;

export const CASE_EYEBROW = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: ".04em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-70)",
  margin: 0,
} satisfies React.CSSProperties;

const META_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: ".04em",
  textTransform: "uppercase",
  color: "var(--color-ink-70)",
};

const META_VALUE: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  lineHeight: "1.45",
  color: "var(--color-ink-65)",
};

const DIVIDER_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 550,
  letterSpacing: "-0.005em",
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
        fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
        fontSize: "18px",
        lineHeight: "1.3",
        fontWeight: 500,
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
          fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
          fontSize: "18px",
          lineHeight: "140%",
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
