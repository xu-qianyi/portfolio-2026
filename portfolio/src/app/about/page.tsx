import Image from "next/image";

const HERO_TEXT = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "140%",
  letterSpacing: "0px",
  marginTop: 0,
  marginBottom: 0,
} as const;

const photoStyle = {
  position: "relative" as const,
  width: "100%",
  aspectRatio: "1 / 1",
  overflow: "hidden",
  backgroundColor: "#F5F5F5",
};

const GRID = "grid grid-cols-3 sm:grid-cols-6 gap-3";
const SECTION = "pb-3 px-[24px] lg:px-[72px]";
const PX = "px-[24px] lg:px-[72px]";

const textPlaceholderStyle = {
  ...{ position: "relative" as const, width: "100%", aspectRatio: "1 / 1", overflow: "hidden", backgroundColor: "#F5F5F5" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
};

const textPlaceholderTextStyle = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  color: "#8C8C8C",
  textAlign: "center" as const,
  lineHeight: "150%",
};

function PhotoRow({ photos, pb = "pb-3" }: { photos: { src: string; alt: string }[], pb?: string }) {
  return (
    <section className={`${pb} ${PX}`}>
      <div className={GRID}>
        {photos.map((photo, i) => (
          <div key={photo.src} className={i === 0 ? "col-start-4" : ""} style={photoStyle}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 16vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


export default function About() {
  return (
    <>
      {/* Education — text */}
      <section className="pt-[64px] pb-3 px-[24px] sm:pt-[28px] lg:pt-[52px] lg:px-[72px]">
        <div className={GRID}>
          <p style={HERO_TEXT} className="col-span-3">
            I studied Engineering + Design at{" "}
            <a href="https://www.northeastern.edu" target="_blank" rel="noopener noreferrer" className="hero-company-link" data-num="1">Northeastern</a>
            {" "}and Finance at{" "}
            <a href="https://www.bc.edu" target="_blank" rel="noopener noreferrer" className="hero-company-link" data-num="2">Boston College</a>
            {" "}- so business, design, and engineering are always running in parallel. With AI, they finally get along.
          </p>
        </div>
      </section>

      {/* Education — photos */}
      <section className={SECTION}>
        <div className={GRID}>
          <div className="col-start-4" style={photoStyle}>
            <Image
              src="/images/about/graduation.webp"
              alt="Graduation"
              fill
              sizes="(min-width: 640px) 16vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={photoStyle}>
            <Image
              src="/images/about/commencement.webp"
              alt="Commencement"
              fill
              sizes="(min-width: 640px) 16vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={textPlaceholderStyle}>
            <span style={textPlaceholderTextStyle}>
              NU graduation expected April 2026
            </span>
          </div>
        </div>
      </section>

      {/* Swing — text */}
      <section className={SECTION}>
        <div className={GRID}>
          <p style={HERO_TEXT} className="col-span-3">
            I practice{" "}
            <a
              href="https://en.wikipedia.org/wiki/Swing_(dance)"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-company-link"
              data-num="3"
            >
              Swing
            </a>{" "}
            - a dance with no routine, just feeling and responding to what you&apos;re given. It&apos;s the most effective way I know to clear my head.
          </p>
        </div>
      </section>

      {/* Swing — photos */}
      <PhotoRow photos={[
        { src: "/images/about/swing.webp",   alt: "Swing dancing" },
        { src: "/images/about/swing-2.webp", alt: "Swing dancing at Mala Swing" },
        { src: "/images/about/balboa.webp",  alt: "Balboa night" },
      ]} />

      {/* Cat — text */}
      <section className={SECTION}>
        <div className={GRID}>
          <p style={HERO_TEXT} className="col-span-3">
            Oh, and I have a supremely brave 5-year-old cat. He&apos;s been competing with AI for my attention ever since - and winning more often than I&apos;d like to admit.
          </p>
        </div>
      </section>

      {/* Cat — photos */}
      <PhotoRow
        pb="pb-[64px]"
        photos={[
          { src: "/images/about/cat-sleep.webp",   alt: "My cat sleeping" },
          { src: "/images/about/martta-fufu.webp", alt: "With my cat Fufu in the snow" },
          { src: "/images/about/fufu.webp",        alt: "Fufu illustration" },
        ]}
      />
    </>
  );
}
