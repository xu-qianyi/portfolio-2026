import type { CSSProperties } from "react";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import Education from "@/components/Education";

const RESUME_HREF = "https://drive.google.com/file/d/16KysaUm1SO-1tESx4_cw_5OXSoTEk0k8/view?usp=sharing";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  fontWeight: 500,
  color: "var(--color-ink-65)",
  lineHeight: "1.55",
  letterSpacing: "-0.01em",
  margin: 0,
};

export default function About() {
  return (
    <>
      {/* Intro */}
      <section
        className="pt-[44px] pb-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[44px] lg:pb-[64px] lg:px-[120px] lg:mx-[32px]"
        style={{ alignSelf: "stretch" }}
      >
        <div className="min-w-0 max-w-full lg:max-w-[460px] flex flex-col gap-2">
          <p style={HERO_TEXT}>
            Hello, I&apos;m Martta (Qianyi) Xu, a product designer and thinker
            working in fintech.
          </p>
          <p style={HERO_TEXT}>
            Right now I&apos;m at{" "}
            <span className="hero-company-link">
              Datalign
              <span className="hero-company-link-badge" aria-hidden>
                1
              </span>
            </span>
            , building in wealth management. Previously: design at{" "}
            <Link href="/work/ark7" className="hero-company-link">
              ARK7
              <span className="hero-company-link-badge" aria-hidden>
                2
              </span>
            </Link>
            , engineering at{" "}
            <a
              href="https://www.thoughtworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              Thoughtworks
              <span className="hero-company-link-badge" aria-hidden>
                3
              </span>
            </a>
            , user research at{" "}
            <a
              href="https://looklook.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              Looklook
              <span className="hero-company-link-badge" aria-hidden>
                4
              </span>
            </a>
            , strategy at{" "}
            <a
              href="https://www.pwc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              PwC
              <span className="hero-company-link-badge" aria-hidden>
                5
              </span>
            </a>{" "}
            and{" "}
            <a
              href="https://www.jll.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
            >
              JLL
              <span className="hero-company-link-badge" aria-hidden>
                6
              </span>
            </a>
            .
          </p>
          <p style={HERO_TEXT}>
            Beyond work, I&apos;m a swing dancer who loves showing up in
            ballrooms worldwide. I love food, and nothing beats hosting friends
            for dinner at home. Lately, I&apos;m picking up tennis.
          </p>
          {false && (
          <p
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--color-ink-65)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className="ri-map-pin-2-line" style={{ fontSize: "17px", lineHeight: 1 }} aria-hidden />
            Based in Boston, MA · Open to relocation
          </p>
          )}
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-start mt-3 h-8 px-3 rounded-md outline-none transition-colors bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-ink)_13%,transparent)]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 450,
              color: "var(--color-muted)",
              textDecoration: "none",
            }}
          >
            Download Resume
          </a>
          <div className="mt-10">
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                margin: "0 0 4px",
              }}
            >
              Education
            </h2>
            <Education />
          </div>
        </div>
      </section>
      <BackToTop />
    </>
  );
}
