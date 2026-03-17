import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";

const HERO_TEXT: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#1A1A1A",
  lineHeight: "140%",
  letterSpacing: "0px",
  marginTop: 0,
  marginBottom: 0,
};

const PHOTOS = [
  { src: "/images/about/martta-fufu.webp", alt: "With my cat Fufu in the snow"  },
  { src: "/images/about/cat-sleep.webp",   alt: "My cat sleeping"               },
  { src: "/images/about/exhibition.webp",  alt: "In front of a colorful mural"  },
  { src: "/images/about/balboa.webp",      alt: "Cocktail at a Balboa night"    },
  { src: "/images/about/swing.webp",       alt: "Swing dancing"                 },
  { src: "/images/about/swing-2.webp",     alt: "Swing dancing at Mala Swing"   },
];

export default function About() {
  return (
    <>
      {/* Text section */}
      <section className="grid lg:grid-cols-2 gap-y-[40px] gap-x-[16px] py-[64px] px-[24px] sm:pt-[28px] sm:pb-[40px] lg:pt-[52px] lg:pb-[64px] lg:px-[72px]">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={HERO_TEXT}>
            I&apos;m a designer who reads the room - and the signal. I practice Swing - a dance
            with no routine, just feeling and responding to what you&apos;re given.
          </p>
          <p style={HERO_TEXT}>
            The path to here went through business and strategy. Both felt too far from the thing
            itself. Design is where I get to actually build something for someone to use.
          </p>
          <p style={HERO_TEXT}>
            I believe good experiences and beautiful things make people feel better. That&apos;s
            enough reason.
          </p>
          <p style={HERO_TEXT}>
            If you&apos;re building something, <CopyEmail />! Open to full-time roles and relocation.
          </p>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:gap-x-[16px] lg:flex-col lg:items-end lg:gap-x-0 lg:gap-y-[4px]" style={HERO_TEXT}>
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-nav-link"
            data-num="1"
          >
            Resume
          </a>
          <Link href="/" className="hero-nav-link" data-num="2">
            Work
          </Link>
          <Link href="/extras" className="hero-nav-link" data-num="3">
            Extras
          </Link>
        </div>
      </section>

      {/* Photo grid */}
      <section className="px-[24px] pb-12 sm:px-10 sm:pb-16 lg:px-[72px] lg:pb-20">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                backgroundColor: "#F5F5F5",
              }}
            >
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
    </>
  );
}
