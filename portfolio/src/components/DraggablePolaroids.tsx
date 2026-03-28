"use client";

import { useRef, useCallback, useEffect, useState, forwardRef } from "react";
import Image from "next/image";

interface PhotoAsset {
  src: string;
  alt: string;
}

const PHOTOS: PhotoAsset[] = [
  { src: "/images/about/graduation.webp", alt: "Graduation" },
  { src: "/images/about/martta-fufu.webp", alt: "Martta & Fufu" },
  { src: "/images/about/swing.webp", alt: "Swing dancing" },
  { src: "/images/about/cat-sleep.webp", alt: "Cat sleeping" },
  { src: "/images/about/fufu.webp", alt: "Fufu" },
  { src: "/images/about/swing-2.webp", alt: "Swing 2" },
  { src: "/images/about/commencement.webp", alt: "Commencement" },
];

/** md–lg - looser scatter across full area */
const POSES_TABLET = [
  { rotate: -8,  x: 6,  y: 28 },
  { rotate: 9,   x: 76, y: 26 },
  { rotate: -12, x: 38, y: 44 },
  { rotate: 11,  x: 74, y: 68 },
  { rotate: -6,  x: 4,  y: 78 },
  { rotate: 14,  x: 28, y: 92 },
  { rotate: -9,  x: 68, y: 94 },
] as const;

/** lg+ - looser scatter, breaks up the two-column clustering */
const POSES_DESKTOP = [
  { rotate: -11, x: 4,  y: 3  },
  { rotate: 9,   x: 80, y: 0  },
  { rotate: -14, x: 44, y: 20 },
  { rotate: 13,  x: 88, y: 52 },
  { rotate: -8,  x: 2,  y: 58 },
  { rotate: 16,  x: 30, y: 80 },
  { rotate: -9,  x: 74, y: 78 },
] as const;

/** lg+ - full size */
const LAYOUT_LG = { w: 180, pad: 12, bot: 36 } as const;
/** md–lg (tablet) - slightly smaller */
const LAYOUT_MD = { w: 148, pad: 10, bot: 30 } as const;

type PolaroidLayout = typeof LAYOUT_LG | typeof LAYOUT_MD;

const Polaroid = forwardRef<HTMLDivElement, {
  photo: PhotoAsset;
  dims: PolaroidLayout;
  onPointerDown: (e: React.PointerEvent) => void;
  style: React.CSSProperties;
  zIndex: number;
}>(function Polaroid({ photo, dims, onPointerDown, style, zIndex }, ref) {
  const { w, pad, bot } = dims;
  return (
    <div
      ref={ref}
      role="img"
      aria-label={photo.alt}
      tabIndex={0}
      onPointerDown={onPointerDown}
      style={{
        position: "absolute",
        padding: pad,
        paddingBottom: bot,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
        borderRadius: 2,
        touchAction: "none",
        userSelect: "none",
        zIndex,
        outline: "none",
        ...style,
      }}
    >
      <Image
        src={photo.src}
        alt=""
        width={w}
        height={w}
        style={{
          width: w,
          height: w,
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
});

export default function DraggablePolaroids() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dims, setDims] = useState<PolaroidLayout>(LAYOUT_LG);
  const [positions, setPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);
  const [zIndices, setZIndices] = useState<number[]>(() => {
    const indices = PHOTOS.map((_, i) => i);
    // shuffle for random initial stacking order
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const topZ = useRef(PHOTOS.length);
  const dragging = useRef<{
    index: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    currentX: number;
    currentY: number;
  } | null>(null);
  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const applyLayout = () => {
      const d = mq.matches ? LAYOUT_LG : LAYOUT_MD;
      const poses = mq.matches ? POSES_DESKTOP : POSES_TABLET;
      const rect = container.getBoundingClientRect();
      const totalW = d.w + d.pad * 2;
      const totalH = d.w + d.pad + d.bot;
      const innerW = Math.max(rect.width - totalW, 0);
      const innerH = Math.max(rect.height - totalH, 0);

      setDims(d);
      setPositions(
        poses.map((p) => ({
          x: (p.x / 100) * innerW,
          y: (p.y / 100) * innerH,
          rotate: p.rotate,
        }))
      );
    };

    const run = () => {
      applyLayout();
      requestAnimationFrame(applyLayout);
    };
    run();

    mq.addEventListener("change", applyLayout);
    const ro = new ResizeObserver(() => applyLayout());
    ro.observe(container);
    return () => {
      mq.removeEventListener("change", applyLayout);
      ro.disconnect();
    };
  }, []);

  const handlePointerDown = useCallback(
    (index: number) => (e: React.PointerEvent) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      const origX = positionsRef.current[index].x;
      const origY = positionsRef.current[index].y;
      dragging.current = {
        index,
        startX: e.clientX,
        startY: e.clientY,
        origX,
        origY,
        currentX: origX,
        currentY: origY,
      };

      topZ.current += 1;
      setZIndices((prev) => {
        const next = [...prev];
        next[index] = topZ.current;
        return next;
      });
    },
    []
  );

  // Direct DOM update - zero React re-renders during drag
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { index, startX, startY, origX, origY } = dragging.current;
    const x = origX + (e.clientX - startX);
    const y = origY + (e.clientY - startY);
    dragging.current.currentX = x;
    dragging.current.currentY = y;
    const el = cardRefs.current[index];
    if (el) {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }
  }, []);

  // Sync final position to state once on release
  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    const { index, currentX, currentY } = dragging.current;
    dragging.current = null;
    setPositions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], x: currentX, y: currentY };
      return next;
    });
  }, []);

  const mobilePad = 8;
  const mobileW = 140;
  const mobileBot = 28;

  return (
    <>
      {/* Mobile-only: horizontal scroll strip */}
      <div
        className="md:hidden w-full mt-6 -mx-6 px-6"
        style={{ overflowX: "auto", overflowY: "visible", paddingBottom: 16 }}
      >
        <div style={{ display: "flex", gap: 16, width: "max-content", paddingBottom: 8 }}>
          {PHOTOS.map((photo, i) => {
            const rotate = POSES_DESKTOP[i % POSES_DESKTOP.length].rotate;
            return (
              <div
                key={photo.src}
                style={{
                  padding: mobilePad,
                  paddingBottom: mobileBot,
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)",
                  borderRadius: 2,
                  transform: `rotate(${rotate}deg)`,
                  flexShrink: 0,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={mobileW}
                  height={mobileW}
                  style={{ width: mobileW, height: mobileW, objectFit: "cover", display: "block" }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* md+ draggable area */}
      {positions.length === 0 ? (
        <div
          ref={containerRef}
          className="relative hidden min-h-[min(480px,55vh)] w-full min-w-0 max-w-full grow-0 md:block md:min-h-[min(400px,48vh)] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2 lg:max-w-[50%]"
        />
      ) : (
        <div
          ref={containerRef}
          className="relative hidden min-h-[min(480px,55vh)] w-full min-w-0 max-w-full grow-0 md:block md:min-h-[min(400px,48vh)] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-1/2 lg:max-w-[50%]"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {PHOTOS.map((photo, i) => (
            <Polaroid
              key={photo.src}
              ref={(el) => { cardRefs.current[i] = el; }}
              photo={photo}
              dims={dims}
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
      )}
    </>
  );
}
