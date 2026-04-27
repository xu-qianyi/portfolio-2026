import type { CSSProperties } from "react";
import Image from "next/image";
import DraggablePolaroids from "@/components/DraggablePolaroids";
import CopyEmail from "@/components/CopyEmail";

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
          <p style={{ ...HERO_TEXT, maxWidth: 600, fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif", fontWeight: 400, fontSize: "24px", marginBottom: 20 }}>
            <span style={{ color: "var(--color-accent)" }}>Hi I am Martta Xu, a product designer.</span>
          </p>
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
            If you&apos;re building something, I&apos;m happy to{" "}
            <CopyEmail />
            {" "}- currently in Boston, open to relocate.
          </p>
        </div>
        {/* Photo gallery */}
        <div className="hidden mt-12 flex gap-2" style={{ alignSelf: "flex-start" }}>
          {/* Col 1 */}
          <div className="flex flex-col gap-2">
            <Image src="/images/about/swing.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
            <Image src="/images/about/swing-2.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-2">
            <Image src="/images/about/graduation.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
            <Image src="/images/about/commencement.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-2">
            <Image src="/images/about/martta-fufu.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
            <Image src="/images/about/fufu.webp" alt="" width={120} height={90} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
          </div>
          {/* Col 4 */}
          <div className="flex flex-col gap-2">
            <Image src="/images/about/cat-sleep.webp" alt="" width={120} height={180} className="object-cover rounded-sm" style={{ width: 120, height: "auto" }} />
          </div>
        </div>
        <div className="hidden"><DraggablePolaroids /></div>
      </section>
    </div>
  );
}
