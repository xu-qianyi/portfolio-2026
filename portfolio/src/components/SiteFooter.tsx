"use client";

import { useEffect, useState, type CSSProperties } from "react";

const TEXT_STYLE: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--color-muted)",
  lineHeight: "1.25",
};

const COPY_EMAIL = "martta.xu@outlook.com";

function IconCopy({ visible }: { visible: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        position: "absolute",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.85)",
        transition: "opacity 70ms, transform 70ms",
      }}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ visible }: { visible: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{
        position: "absolute",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.85)",
        transition: "opacity 70ms, transform 70ms",
      }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SiteFooter() {
  const [timeStr, setTimeStr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
    const tick = () => setTimeStr(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(COPY_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer className="border-t border-[var(--color-ink-14)] px-6 py-[12px] lg:px-[72px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span style={TEXT_STYLE}>
          {timeStr ? `${timeStr.replace(/\s*(am|pm)/i, "")} Boston, MA` : "Boston, MA"}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <span style={TEXT_STYLE} className="min-w-0 break-all">
            {COPY_EMAIL}
          </span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="relative inline-flex shrink-0 items-center justify-center min-h-[44px] min-w-[44px] p-2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            aria-label={copied ? "Copied to clipboard" : "Copy email address"}
          >
            <IconCopy visible={!copied} />
            <IconCheck visible={copied} />
            {/* invisible spacer to maintain button size */}
            <svg width="18" height="18" aria-hidden style={{ visibility: "hidden" }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
