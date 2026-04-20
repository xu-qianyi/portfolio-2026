import Image from "next/image";
import Garden from "@/components/Garden";
import CaseScrollReveal from "@/components/CaseScrollReveal";

const BODY_TEXT_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  lineHeight: "160%",
  color: "var(--color-ink-80)",
  margin: 0,
} as const;

const EYEBROW_STYLE = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--color-muted)",
  margin: 0,
} as const;

const H1_STYLE = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "28px",
  lineHeight: "110%",
  fontWeight: 500,
  color: "var(--color-ink)",
  margin: 0,
} as const;

export default function About2() {
  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-x-clip">
      <main className="w-full px-6 py-14 md:py-16 lg:px-[72px] lg:py-16">
        <div className="mx-auto flex w-full min-w-0 max-w-[800px] flex-col gap-14 md:gap-16">
          <CaseScrollReveal className="flex flex-col gap-2">
            <p style={EYEBROW_STYLE}>About</p>
            <h1 style={H1_STYLE}>Hi, I&apos;m Martta</h1>
          </CaseScrollReveal>

          <div className="flex flex-col gap-12 md:gap-14">
            <CaseScrollReveal delay={60} className="flex flex-col gap-6">
              <p style={BODY_TEXT_STYLE}>
                I studied design and engineering at{" "}
                <a
                  href="https://www.northeastern.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-inline-link"
                >
                  Northeastern
                </a>
                , finance at{" "}
                <a
                  href="https://www.bc.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-inline-link"
                >
                  Boston College
                </a>
                . My education gives me more than one lens to see a product through.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/images/about/graduation.webp", alt: "Graduation" },
                  { src: "/images/about/commencement.webp", alt: "Commencement" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 400px, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="flex flex-col gap-6">
              <p style={BODY_TEXT_STYLE}>
                I practice{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Swing_(dance)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-inline-link"
                >
                  Swing
                </a>{" "}
                - a dance with no routine, just feeling and responding to what
                you&apos;re given. Jam with the flow, improvise with the rhythm.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/images/about/swing.webp", alt: "Swing dancing" },
                  { src: "/images/about/swing-2.webp", alt: "Swing dancing" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 400px, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CaseScrollReveal>

            <CaseScrollReveal delay={60} className="flex flex-col gap-6">
              <p style={BODY_TEXT_STYLE}>
                Fufu is my five-year-old brave boy who loves chasing toys around the
                house and bird watching. I digitized him so you can enjoy your time
                with him too.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: "/images/about/fufu.webp", alt: "Fufu" },
                  { src: "/images/about/martta-fufu.webp", alt: "Martta and Fufu" },
                  { src: "/images/about/cat-sleep.webp", alt: "Fufu sleeping" },
                ].map((img) => (
                  <div key={img.src} className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 260px, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CaseScrollReveal>
          </div>
        </div>
      </main>
      <div
        className="min-w-0 w-full shrink-0 grow-0 overflow-x-clip"
        style={{ paddingInline: "max(24px, calc((100% - 800px) / 2))" }}
      >
        <Garden sparse />
      </div>
    </div>
  );
}
