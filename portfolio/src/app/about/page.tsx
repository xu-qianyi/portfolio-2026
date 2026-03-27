import type { CSSProperties } from "react";
import Garden from "@/components/Garden";
import DraggablePolaroids from "@/components/DraggablePolaroids";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "var(--color-ink)",
  lineHeight: "150%",
  letterSpacing: "0px",
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
        <div className="min-w-0 max-w-full lg:max-w-[50%]">
          <p style={{ ...HERO_TEXT, maxWidth: 600 }}>
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
          <p style={{ ...HERO_TEXT, maxWidth: 600, marginTop: 16 }}>
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
          <p style={{ ...HERO_TEXT, maxWidth: 600, marginTop: 16 }}>
            Fufu is my five-year-old brave boy who loves chasing toys around the
            house and bird watching. I digitized him so you can enjoy your time
            with him too.
          </p>
        </div>
        <DraggablePolaroids />
      </section>
      <div className="min-w-0 w-full shrink-0 grow-0 overflow-x-clip px-[24px] lg:px-[72px]">
        <Garden />
      </div>
    </div>
  );
}
