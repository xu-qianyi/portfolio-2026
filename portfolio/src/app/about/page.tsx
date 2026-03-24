import type { CSSProperties } from "react";
import Garden from "@/components/Garden";
import DraggablePolaroids from "@/components/DraggablePolaroids";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "150%",
  letterSpacing: "0px",
  margin: 0,
};

export default function About() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <section
        className="flex flex-col lg:relative py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]"
        style={{ alignSelf: "stretch", flex: 1 }}
        aria-label="About"
      >
        <div className="lg:max-w-[50%]">
          <p style={{ ...HERO_TEXT, maxWidth: 600 }}>
            I studied design and engineering at{" "}
            <a
              href="https://www.northeastern.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="1"
            >
              Northeastern
            </a>
            , finance at{" "}
            <a
              href="https://www.bc.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="2"
            >
              Boston College
            </a>
            . I practice{" "}
            <a
              href="https://en.wikipedia.org/wiki/Swing_(dance)"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="3"
            >
              Swing
            </a>{" "}
            - a dance with no routine, just feeling and responding to what you&apos;re
            given.
          </p>
          <p style={{ ...HERO_TEXT, maxWidth: 600, marginTop: 16 }}>
            Fufu is my five-year-old brave boy who loves chasing toys around the
            house and bird watching. I digitized him so you can enjoy your time
            with him too.
          </p>
        </div>
        <DraggablePolaroids />
      </section>
      <div style={{ flexShrink: 0 }}>
        <Garden />
      </div>
    </div>
  );
}
