"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Asset paths ─────────────────────────────────────────────────────────────
const ASSETS = {
  wand:        "/footer/CatToy.gif",
  // Cat A (Fufu) — walk directions
  catA_arrive: "/footer/yawn_stand.gif",
  catA_walkR:  "/footer/walk_right.gif",
  catA_walkL:  "/footer/walk_left.gif",
  catA_walkU:  "/footer/walk_up.gif",
  catA_walkD:  "/footer/walk_down.gif",
  catA_walkRD: "/footer/walk_right_d.gif",
  catA_walkLD: "/footer/walk_left_d.gif",
  catA_walkRU: "/footer/walk_right_up.gif",
  catA_walkLU: "/footer/walk_left_up.gif",
  catA_sleep1: "/footer/catA_sleep1(r).gif",
  // Cat B — click to cycle
  catB_0: "/footer/sleep3(r).gif",
  catB_1: "/footer/sleep4(l).gif",
  catB_2: "/footer/scratch(l).gif",
  catB_3: "/footer/sleep2(l).gif",
  // Bunny
  bunny_idle:  "/footer/BunnySitting.gif",
  bunny_react: "/footer/BunnyJump.gif",
  // Static animals & props
  chick:       "/footer/chick idle.gif",
  chicken_sit: "/footer/chicken_sitting.gif",
  catbed:      "/footer/CatBedBlue.png",
  catfood:     "/footer/catfood.png",
  // Plants
  plant_arnica:   "/footer/arnica arnika 3.png",
  plant_cosmo:    "/footer/Cosmo.png",
  plant_daisy:    "/footer/Daisy.png",
  plant_lavender: "/footer/Lavender.png",
  plant_lily:     "/footer/Lily.png",
  plant_pansy:    "/footer/Pansy.png",
  plant_tulip:    "/footer/Tulip.png",
  plant_valerian: "/footer/valerian kozek lekarski.png",
} as const;

type AssetKey = keyof typeof ASSETS;

// ─── Layout constants ─────────────────────────────────────────────────────────
const ROW_A = 160; // px from bottom — back row (tall flowers)
const ROW_B = 90;  // px from bottom — mid row (shorter flowers)
const ROW_C = 30;  // px from bottom — front row (animals & props)

// Leave left/right space so garden aligns with footer text (no padding wrapper)
const GARDEN_LEFT_PCT = 6;
const GARDEN_RIGHT_PCT = 94;
const GARDEN_X_MIN = 2;
const GARDEN_X_MAX = 93;
function gardenX(x: number): number {
  return GARDEN_LEFT_PCT + (x - GARDEN_X_MIN) * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT) / (GARDEN_X_MAX - GARDEN_X_MIN);
}

// X positions per row (%), step ~14%, each row offset by ~7%
const rowA_x = [2,  16, 30, 44, 58, 72, 86];
const rowB_x = [9,  23, 37, 51, 65, 79, 93];
const rowC_x = [5,  19, 33, 47, 61, 75, 89];

const FLOWERS: { x: number; y: number; key: AssetKey }[] = [
  // Row A
  { x: rowA_x[0], y: ROW_A, key: "plant_arnica" },
  { x: rowA_x[1], y: ROW_A, key: "plant_tulip" },
  { x: rowA_x[2], y: ROW_A, key: "plant_lavender" },
  { x: rowA_x[3], y: ROW_A, key: "plant_cosmo" },
  { x: rowA_x[4], y: ROW_A, key: "plant_lily" },
  { x: rowA_x[5], y: ROW_A, key: "plant_pansy" },
  { x: rowA_x[6], y: ROW_A, key: "plant_valerian" },
  // Row B
  { x: rowB_x[0], y: ROW_B, key: "plant_daisy" },
  { x: rowB_x[1], y: ROW_B, key: "plant_pansy" },
  { x: rowB_x[2], y: ROW_B, key: "plant_arnica" },
  { x: rowB_x[3], y: ROW_B, key: "plant_valerian" },
  { x: rowB_x[4], y: ROW_B, key: "plant_tulip" },
  { x: rowB_x[5], y: ROW_B, key: "plant_lily" },
  { x: rowB_x[6], y: ROW_B, key: "plant_daisy" },
];

const PROPS: { x: number; y: number; key: AssetKey; size: number }[] = [
  { x: rowC_x[0], y: ROW_C, key: "chick",       size: 24 },
  { x: rowC_x[1], y: ROW_C, key: "catbed",      size: 52 },
  { x: rowC_x[2], y: ROW_C, key: "chicken_sit", size: 32 },
  { x: rowC_x[3], y: ROW_C, key: "catfood",     size: 32 },
];

const CATB_POS    = { x: rowC_x[4], y: ROW_C };
const BUNNY_POS   = { x: rowC_x[5], y: ROW_C };
const EXTRA_PLANT = { x: rowC_x[6], y: ROW_C, key: "plant_cosmo" as AssetKey };

const CAT_B_KEYS: AssetKey[] = ["catB_0", "catB_1", "catB_2", "catB_3"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AnimalGardenFooter() {
  const gardenRef     = useRef<HTMLDivElement>(null);
  const wandCursorRef = useRef<HTMLImageElement>(null);
  const rafRef        = useRef<number>(0);
  const wandPos       = useRef({ x: -999, y: -999 });
  const posRef        = useRef({ x: gardenX(30), y: 30 });
  const catBRef       = useRef(0);
  const bunnyTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wobbleTimers  = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const [isOverFooter,setIsOverFooter] = useState(false);
  const [wobbling,    setWobbling]     = useState<Record<number, boolean>>({});
  const [catAPos,     setCatAPos]      = useState({ x: gardenX(30), y: 30 });
  const [catAState,   setCatAState]    = useState<"walk" | "arrive">("arrive");
  const [catAFlip,    setCatAFlip]     = useState(false);
  const [catADir,     setCatADir]      = useState({ dx: 1, dy: 0 });
  const [catBIdx,     setCatBIdx]      = useState(0);
  const [bunnyState,  setBunnyState]   = useState<"idle" | "react">("idle");
  const [vw,          setVw]           = useState(1200);
  const [gardenWidth, setGardenWidth]  = useState(800);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track garden width for direction calculations
  useEffect(() => {
    if (!gardenRef.current) return;
    setGardenWidth(gardenRef.current.offsetWidth);
  }, [vw]);

  // ── Cleanup all timers on unmount ───────────────────────────────────────────
  useEffect(() => {
    const timers = wobbleTimers.current;
    return () => {
      if (bunnyTimer.current) clearTimeout(bunnyTimer.current);
      timers.forEach(id => clearTimeout(id));
    };
  }, []);

  // Responsive sizes
  const gardenH  = isTablet ? 190  : 220;
  const catSize  = isTablet ? 48   : 52;
  const bnySize  = isTablet ? 36   : 44;
  const flowerSz = isTablet ? 27   : 32;
  const arnicaSz = isTablet ? 35   : 42;
  const rA       = isTablet ? 128  : ROW_A;
  const rB       = isTablet ? 72   : ROW_B;
  const rC       = isTablet ? 24   : ROW_C;
  const padding  = isMobile ? "12px 16px" : "16px 72px";
  const fontSize = 16;

  // ── Walk GIF resolver ───────────────────────────────────────────────────────
  const getWalkSrc = useCallback((dx: number, dy: number, gardenW: number): string => {
    const dxPx = (dx / 100) * gardenW;
    const angle = Math.atan2(-dy, dxPx) * 180 / Math.PI;
    if (angle > -10   && angle <= 10)   return ASSETS.catA_walkR;
    if (angle > 170   || angle <= -170) return ASSETS.catA_walkL;
    if (angle > -100  && angle <= -80)  return ASSETS.catA_walkU;
    if (angle > 80    && angle <= 100)  return ASSETS.catA_walkD;
    if (angle > 10    && angle <= 80)   return ASSETS.catA_walkRD;
    if (angle > 100   && angle <= 170)  return ASSETS.catA_walkLD;
    if (angle > -170  && angle <= -100) return ASSETS.catA_walkLU;
    return ASSETS.catA_walkRU;
  }, []);

  // ── Chase loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      if (!gardenRef.current) return;
      const r = gardenRef.current.getBoundingClientRect();
      if (r.width === 0) return;
      const { x: wx, y: wy } = wandPos.current;
      if (wx < 0 || wx > r.width) return;

      const tx = GARDEN_LEFT_PCT + (wx / r.width) * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT);
      const ty = wy;
      const { x, y } = posRef.current;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Too close — settle into arrive/idle state
      if (dist < 3) { setCatAState("arrive"); return; }

      // Distance‑adaptive speed: farther targets → faster, close‑in → slower
      const baseSpeed = 0.35;
      const extra     = Math.min(dist * 0.015, 0.45); // softer ramp + lower max
      const speed     = baseSpeed + extra;
      const next = {
        x: Math.max(GARDEN_LEFT_PCT, Math.min(GARDEN_RIGHT_PCT, x + (dx / dist) * speed)),
        y: Math.max(5,  Math.min(210, y + (dy / dist) * speed)),
      };
      posRef.current = next;
      setCatAPos({ ...next });
      setCatAState("walk");
      setCatAFlip(dx < 0);
      setCatADir({ dx, dy });
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isOverFooter && wandCursorRef.current) {
        wandCursorRef.current.style.left = `${e.clientX}px`;
        wandCursorRef.current.style.top = `${e.clientY}px`;
      }
      if (!gardenRef.current) return;
      const r = gardenRef.current.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        wandPos.current = { x: e.clientX - r.left, y: r.bottom - e.clientY };
      } else {
        wandPos.current = { x: -999, y: -999 };
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isOverFooter]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleCatBClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (catBRef.current + 1) % 4;
    catBRef.current = next;
    setCatBIdx(next);
  }, []);

  const handleBunnyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (bunnyTimer.current) clearTimeout(bunnyTimer.current);
    setBunnyState("react");
    bunnyTimer.current = setTimeout(() => setBunnyState("idle"), 2500);
  }, []);

  const wobblePlant = (idx: number) => {
    const existing = wobbleTimers.current.get(idx);
    if (existing) clearTimeout(existing);
    setWobbling(w => ({ ...w, [idx]: true }));
    const id = setTimeout(() => {
      setWobbling(w => ({ ...w, [idx]: false }));
      wobbleTimers.current.delete(idx);
    }, 700);
    wobbleTimers.current.set(idx, id);
  };

  // Cat bed position (Row C, second slot)
  const catBedPos = { x: gardenX(rowC_x[1]), y: rC };

  // 视为“在床上”的范围（可以按感觉微调 4 和 10）
  const isXNearBed = Math.abs(catAPos.x - catBedPos.x) < 4;
  const isYNearBed = Math.abs(catAPos.y - catBedPos.y) < 10;
  const isNearBed  = isXNearBed && isYNearBed;

  const catAImgSrc =
    isNearBed
      ? ASSETS.catA_sleep1
      : catAState === "walk"
        ? getWalkSrc(catADir.dx, catADir.dy, gardenWidth)
        : ASSETS.catA_arrive;

  const catBImgSrc = ASSETS[CAT_B_KEYS[catBIdx]];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Wand cursor — only visible while hovering over footer */}
      {isOverFooter && (
        <img
          ref={wandCursorRef}
          src={ASSETS.wand}
          alt=""
          draggable={false}
          aria-hidden
          style={{
            position: "fixed",
            left: -999,
            top: -999,
            width: 32,
            height: 32,
            imageRendering: "pixelated",
            pointerEvents: "none",
            transform: "translate(-4px, -4px)",
            zIndex: 9999,
          }}
        />
      )}

      <footer
        onMouseEnter={() => setIsOverFooter(true)}
        onMouseLeave={() => setIsOverFooter(false)}
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(26,26,26,0.08)",
          fontFamily: "var(--font-playfair-display), 'Playfair Display', Georgia, serif",
          cursor: isOverFooter ? "none" : "auto",
        }}
      >
        {/* Text row */}
        <div style={{ padding }}>
          <p
            style={{
              fontFamily: "var(--font-playfair-display), 'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            © 2026 brewed by Martta + Cursor + Claude Code
          </p>
          <p
            style={{
              fontFamily: "var(--font-playfair-display), 'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize,
              color: "#E04020",
              margin: 0,
              paddingTop: 0,
            }}
          >
            {isMobile
              ? "Come to play with my cat - Fufu on desktop"
              : (
                <span>
                  Fufu wants to play with you{" "}
                  <span style={{ fontStyle: "normal" }}>🥺</span>
                </span>
              )}
          </p>
        </div>

        {/* Garden — hidden on mobile */}
        {!isMobile && (
          <>
            <div
              ref={gardenRef}
              style={{ position: "relative", width: "100%", height: gardenH, overflow: "visible" }}
            >
              {/* Flowers */}
              {FLOWERS.map((item, idx) => (
                <div
                  key={"f" + idx}
                  onMouseEnter={() => wobblePlant(idx)}
                  style={{
                    position: "absolute",
                    left: `${gardenX(item.x)}%`,
                    bottom: `${item.y === ROW_A ? rA : rB}px`,
                    transformOrigin: "bottom center",
                    transform: wobbling[idx] ? "rotate(8deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease",
                    zIndex: item.y === ROW_A ? 3 : 4,
                    cursor: "none",
                  }}
                >
                  <img
                    src={ASSETS[item.key]}
                    draggable={false}
                    alt=""
                    style={{
                      width: item.key === "plant_arnica" ? arnicaSz : flowerSz,
                      height: item.key === "plant_arnica" ? arnicaSz : flowerSz,
                      imageRendering: "pixelated",
                      display: "block",
                    }}
                  />
                </div>
              ))}

              {/* Extra plant (after bunny) */}
              <div style={{
                position: "absolute",
                left: `${gardenX(EXTRA_PLANT.x)}%`,
                bottom: `${rC}px`,
                zIndex: 4,
              }}>
                <img
                  src={ASSETS[EXTRA_PLANT.key]}
                  draggable={false}
                  alt=""
                  style={{ width: flowerSz, height: flowerSz, imageRendering: "pixelated", display: "block" }}
                />
              </div>

              {/* Props & static animals */}
              {PROPS.map((item, idx) => (
                <div
                  key={"p" + idx}
                  style={{ position: "absolute", left: `${gardenX(item.x)}%`, bottom: `${rC}px`, zIndex: 6 }}
                >
                  <img
                    src={ASSETS[item.key]}
                    draggable={false}
                    alt=""
                    style={{
                      width: item.key === "catbed" ? (isTablet ? 44 : 52) : item.size,
                      height: item.key === "catbed" ? (isTablet ? 44 : 52) : item.size,
                      imageRendering: "pixelated",
                      display: "block",
                    }}
                  />
                </div>
              ))}

              {/* Cat A — Fufu, chases wand */}
              <div style={{
                position: "absolute",
                left: `${catAPos.x}%`,
                bottom: `${catAPos.y}px`,
                zIndex: 8,
              }}>
                <img
                  src={catAImgSrc}
                  draggable={false}
                  alt="Fufu"
                  style={{
                    width: catSize,
                    height: catSize,
                    imageRendering: "pixelated",
                    display: "block",
                    transform: (catAState === "arrive" && catAFlip) ? "scaleX(-1)" : "none",
                  }}
                />
              </div>

              {/* Cat B — click to cycle states */}
              <div
                onClick={handleCatBClick}
                style={{
                  position: "absolute",
                  left: `${gardenX(CATB_POS.x)}%`,
                  bottom: `${rC}px`,
                  zIndex: 7,
                  cursor: "none",
                }}
              >
                <img
                  src={catBImgSrc}
                  draggable={false}
                  alt=""
                  style={{ width: catSize, height: catSize, imageRendering: "pixelated", display: "block" }}
                />
              </div>

              {/* Bunny */}
              <div
                onClick={handleBunnyClick}
                style={{
                  position: "absolute",
                  left: `${gardenX(BUNNY_POS.x)}%`,
                  bottom: `${rC}px`,
                  zIndex: 7,
                  cursor: "none",
                }}
              >
                <img
                  src={ASSETS[`bunny_${bunnyState}` as AssetKey]}
                  draggable={false}
                  alt=""
                  style={{ width: bnySize, height: bnySize, imageRendering: "pixelated", display: "block" }}
                />
              </div>
            </div>
            {/* Breathing room below the garden frame */}
            <div style={{ height: 16 }} />
          </>
        )}
      </footer>
    </>
  );
}
