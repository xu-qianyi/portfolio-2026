import type { CSSProperties } from "react";
import Image from "next/image";
import DraggablePolaroids from "@/components/DraggablePolaroids";
import CopyEmail from "@/components/CopyEmail";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 450,
  color: "rgba(0,0,0,0.8)",
  lineHeight: "1.45rem",
  letterSpacing: "-0.005em",
  margin: 0,
};

export default function About() {
  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-x-clip">
      <section
        className="flex min-h-0 min-w-0 w-full flex-1 flex-col items-start justify-start overflow-x-clip lg:relative py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]"
        style={{ alignSelf: "stretch" }}
        aria-label="About"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
          {/* Col 1 — Education */}
          <div className="flex flex-col gap-3">
            <Image src="/images/about/graduation.webp" alt="" width={240} height={160} className="object-cover rounded-sm w-full" style={{ height: 140 }} />
            <p style={{ ...HERO_TEXT }}>
              I studied design and engineering at{" "}
              <a
                href="https://www.northeastern.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
              >
                Northeastern
                <span className="hero-company-link-badge" aria-hidden>
                  1
                </span>
              </a>
              , finance at{" "}
              <a
                href="https://www.bc.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
              >
                Boston College
                <span className="hero-company-link-badge" aria-hidden>
                  2
                </span>
              </a>
              . My education gives me more than one lens to see a product through.
            </p>
          </div>
          {/* Col 2 — Swing */}
          <div className="flex flex-col gap-3">
            <Image src="/images/about/swing.webp" alt="" width={240} height={160} className="object-cover rounded-sm w-full" style={{ height: 140 }} />
            <p style={{ ...HERO_TEXT }}>
              I practice{" "}
              <a
                href="https://en.wikipedia.org/wiki/Swing_(dance)"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
              >
                Swing
                <span className="hero-company-link-badge" aria-hidden>
                  3
                </span>
              </a>{" "}
              - a dance with no routine, just feeling and responding to what you&apos;re
              given. Jam with the flow, improvise with the rhythm.
            </p>
          </div>
          {/* Col 3 — Cat / Contact */}
          <div className="flex flex-col gap-3">
            <Image src="/images/about/fufu.webp" alt="" width={240} height={160} className="object-cover rounded-sm w-full" style={{ height: 140 }} />
            <p style={{ ...HERO_TEXT }}>
              If you&apos;re building something, I&apos;m happy to{" "}
              <CopyEmail />
              {" "}- currently in Boston, open to relocate.
            </p>
          </div>
        </div>
        <div className="hidden"><DraggablePolaroids /></div>
      </section>
    </div>
  );
}
