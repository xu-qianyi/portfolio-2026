"use client";

import { useState, useRef, useEffect } from "react";

const EMAIL = "martta.xu@outlook.com";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <span className="inline-flex items-center gap-[1px]" style={{ verticalAlign: "middle" }}>
      <a href={`mailto:${EMAIL}`} onClick={copy} className="hero-company-link">
        connect
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        title={copied ? "Copied!" : "Copy email"}
        className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-[3px] text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] transition-colors"
        style={{ transform: "translateY(2px)" }}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <rect
              x="5"
              y="5"
              width="8.5"
              height="8.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M10.5 5V3.5C10.5 2.94772 10.0523 2.5 9.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V9.5C2.5 10.0523 2.94772 10.5 3.5 10.5H5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </span>
  );
}
