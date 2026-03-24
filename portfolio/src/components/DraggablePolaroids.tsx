"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface PolaroidData {
  src: string;
  alt: string;
  rotate: number;
  x: number;
  y: number;
}

const PHOTOS: PolaroidData[] = [
  { src: "/images/about/graduation.webp", alt: "Graduation", rotate: -4, x: 2, y: 18 },
  { src: "/images/about/martta-fufu.webp", alt: "Martta & Fufu", rotate: 3, x: 58, y: 10 },
  { src: "/images/about/swing.webp", alt: "Swing dancing", rotate: -2, x: 22, y: 42 },
  { src: "/images/about/cat-sleep.webp", alt: "Cat sleeping", rotate: 4, x: 68, y: 36 },
  { src: "/images/about/fufu.webp", alt: "Fufu", rotate: 5, x: 0, y: 68 },
  { src: "/images/about/swing-2.webp", alt: "Swing 2", rotate: -6, x: 42, y: 62 },
  { src: "/images/about/commencement.webp", alt: "Commencement", rotate: 2, x: 72, y: 72 },
];

const POLAROID_W = 180;
const POLAROID_PAD = 12;
const POLAROID_BOT = 36;

function Polaroid({
  photo,
  onPointerDown,
  style,
  zIndex,
}: {
  photo: PolaroidData;
  onPointerDown: (e: React.PointerEvent) => void;
  style: React.CSSProperties;
  zIndex: number;
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        cursor: "grab",
        padding: POLAROID_PAD,
        paddingBottom: POLAROID_BOT,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
        borderRadius: 2,
        touchAction: "none",
        userSelect: "none",
        zIndex,
        ...style,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={POLAROID_W}
        height={POLAROID_W}
        style={{
          width: POLAROID_W,
          height: POLAROID_W,
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
}

export default function DraggablePolaroids() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);
  const [zIndices, setZIndices] = useState<number[]>(() => PHOTOS.map((_, i) => i));
  const topZ = useRef(PHOTOS.length);
  const dragging = useRef<{
    index: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const totalW = POLAROID_W + POLAROID_PAD * 2;
    const totalH = POLAROID_W + POLAROID_PAD + POLAROID_BOT;

    setPositions(
      PHOTOS.map((p) => ({
        x: (p.x / 100) * Math.max(rect.width - totalW, 0),
        y: (p.y / 100) * Math.max(rect.height - totalH, 0),
        rotate: p.rotate,
      }))
    );
  }, []);

  const handlePointerDown = useCallback(
    (index: number) => (e: React.PointerEvent) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";

      dragging.current = {
        index,
        startX: e.clientX,
        startY: e.clientY,
        origX: positions[index].x,
        origY: positions[index].y,
      };

      topZ.current += 1;
      setZIndices((prev) => {
        const next = [...prev];
        next[index] = topZ.current;
        return next;
      });
    },
    [positions]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { index, startX, startY, origX, origY } = dragging.current;
    setPositions((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        x: origX + (e.clientX - startX),
        y: origY + (e.clientY - startY),
      };
      return next;
    });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const el = e.currentTarget as HTMLElement;
    el.style.cursor = "";
    dragging.current = null;
  }, []);

  if (positions.length === 0) {
    return <div ref={containerRef} className="hidden md:block relative flex-1 mt-8 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:mt-0" />;
  }

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative flex-1 mt-8 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:mt-0"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {PHOTOS.map((photo, i) => (
        <Polaroid
          key={photo.src}
          photo={photo}
          zIndex={zIndices[i]}
          onPointerDown={handlePointerDown(i)}
          style={{
            left: positions[i].x,
            top: positions[i].y,
            transform: `rotate(${positions[i].rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
