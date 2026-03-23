import type { CSSProperties } from "react";
import Garden from "@/components/Garden";

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
    <>
      <section
        className="grid lg:grid-cols-2 py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]"
        style={{ alignSelf: "stretch" }}
        aria-label="About"
      >
        <p style={HERO_TEXT}>
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
      </section>
      <Garden />
    </>
  );
}
