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
const CHASE_PHRASES = ["stop!", "wait!", "hey!", "come back!"];

// Pre-computed CSS % positions for proximity checks
const CATB_CSS_X    = gardenX(CATB_POS.x);    // ≈ 63%
const CHICK_CSS_X   = gardenX(rowC_x[0]);     // ≈ 9%
const FOOD_CSS_X    = gardenX(rowC_x[3]);      // ≈ 49.5%
const CHICKEN_CSS_X = gardenX(rowC_x[2]);      // ≈ 36%
const BUNNY_CSS_X   = gardenX(BUNNY_POS.x);   // ≈ 77%

// Pre-computed flower CSS X positions for "near any flower" checks
const FLOWER_CSS_XS = FLOWERS.map(f => gardenX(f.x));

// Keyframes for garden animations (module-level to avoid DOM churn)
const GARDEN_KEYFRAMES = `
  @keyframes chickShake {
    0%   { transform: rotate(0deg); }
    20%  { transform: rotate(-12deg); }
    40%  { transform: rotate(12deg); }
    60%  { transform: rotate(-8deg); }
    80%  { transform: rotate(6deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes bubbleFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes crabBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-3px) scale(1.05); }
  }
  @keyframes crabAppear {
    from { opacity: 0; transform: scale(0.2); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

// ─── Claw'd SVG (pixel-art Claude crab) ──────────────────────────────────────
const Clawd = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size * 1.4}
    height={size}
    viewBox="0 0 21 14"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated", display: "block" }}
  >
    {/* Body — wide rectangle, no ears */}
    <rect x="2" y="0" width="17" height="11" fill="#DA7756" />
    {/* Claws — mid-body height */}
    <rect x="0" y="6" width="2" height="2" fill="#DA7756" />
    <rect x="19" y="6" width="2" height="2" fill="#DA7756" />
    {/* Eyes — small squares */}
    <rect x="6" y="5" width="2" height="2" fill="#2a2a2a" />
    <rect x="13" y="5" width="2" height="2" fill="#2a2a2a" />
    {/* Four legs — all same size */}
    <rect x="3" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="7" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="12" y="11" width="2" height="3" fill="#DA7756" />
    <rect x="16" y="11" width="2" height="3" fill="#DA7756" />
  </svg>
);

// ─── Cat Ears SVG ─────────────────────────────────────────────────────────────
const CatEars = ({ size = 24, color = "rgba(0, 0, 0, 0.4)" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible", display: "inline-block", verticalAlign: "middle" }}
  >
    <style>{`
      .cat-ear-left, .cat-ear-right { transform-origin: bottom center; transform-box: fill-box; }
      @keyframes catLeftEarTwitch {
        0%, 9% { transform: rotate(0deg); }
        12% { transform: rotate(-10deg); }
        16%, 34% { transform: rotate(0deg); }
        38% { transform: rotate(-15deg); }
        42% { transform: rotate(-5deg); }
        48%, 58% { transform: rotate(0deg); }
        62% { transform: rotate(-25deg); }
        70% { transform: rotate(-20deg); }
        78%, 100% { transform: rotate(0deg); }
      }
      @keyframes catRightEarTwitch {
        0%, 9% { transform: rotate(0deg); }
        12% { transform: rotate(6deg); }
        16%, 34% { transform: rotate(0deg); }
        38% { transform: rotate(10deg); }
        42% { transform: rotate(4deg); }
        48%, 58% { transform: rotate(0deg); }
        62% { transform: rotate(-15deg); }
        70% { transform: rotate(-10deg); }
        78%, 100% { transform: rotate(0deg); }
      }
      .cat-ear-left { animation: catLeftEarTwitch 12s ease-in-out infinite; }
      .cat-ear-right { animation: catRightEarTwitch 12s ease-in-out infinite; }
    `}</style>
    <g transform="translate(6, 8)">
      <path className="cat-ear-left" d="M 1 14 L 3 6 L 8 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path className="cat-ear-right" d="M 25 14 L 23 6 L 18 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function AnimalGardenFooter() {
  const gardenRef     = useRef<HTMLDivElement>(null);
  const wandCursorRef = useRef<HTMLImageElement>(null);
  const rafRef        = useRef<number>(0);
  const wandPos       = useRef({ x: -999, y: -999 });
  const posRef        = useRef({ x: gardenX(30), y: 30 });
  const catBRef           = useRef(0);
  const bunnyTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wobbleTimers      = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const catBDisturbedRef  = useRef(false);
  const catBTimer         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasFufuNearCatB   = useRef(false);
  const wasWandNearCatB   = useRef(false);
  const chickWobbleRef    = useRef(false);
  const chickTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasWandNearChick  = useRef(false);

  const [isOverFooter,setIsOverFooter] = useState(false);
  const [wobbling,    setWobbling]     = useState<Record<number, boolean>>({});
  const [catAPos,     setCatAPos]      = useState({ x: gardenX(30), y: 30 });
  const [catAState,   setCatAState]    = useState<"walk" | "arrive">("arrive");
  const [catAFlip,    setCatAFlip]     = useState(false);
  const [catADir,     setCatADir]      = useState({ dx: 1, dy: 0 });
  const [catBIdx,       setCatBIdx]       = useState(0);
  const [catBDisturbed, setCatBDisturbed] = useState(false);
  const [bunnyState,    setBunnyState]    = useState<"idle" | "react">("idle");
  const [chickWobble,   setChickWobble]   = useState(false);
  const [fufuIdle,      setFufuIdle]      = useState(false);
  const idleTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [crabActive,    setCrabActive]    = useState(false);
  const [crabX,         setCrabX]         = useState(50);
  const [crabY,         setCrabY]         = useState(30);
  const crabTargetXRef  = useRef(50);   // where crab is heading (instant jump)
  const crabTargetYRef  = useRef(30);
  const crabVisualXRef  = useRef(50);   // where crab visually is (lerped, Fufu chases this)
  const crabVisualYRef  = useRef(30);
  const crabActiveRef   = useRef(false);
  const crabSpawnTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crabWanderTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastCrabEvade   = useRef(0);
  const crabMoveTime    = useRef(0);       // timestamp of last crab position change
  const chaseRestRef    = useRef(false);   // true = both resting
  const chaseRestTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chaseRunTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chaseBubbleIdx, setChaseBubbleIdx] = useState(0);
  const chaseBubbleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [vw,          setVw]           = useState(1200);
  const [gardenWidth, setGardenWidth]  = useState(800);
  const [timeStr,     setTimeStr]      = useState("");

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    });
    const tick = () => setTimeStr(fmt.format(new Date()).toLowerCase());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Track garden width for direction calculations
  useEffect(() => {
    if (!gardenRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setGardenWidth(entry.contentRect.width);
    });
    ro.observe(gardenRef.current);
    return () => ro.disconnect();
  }, [isMobile]);

  // ── Cleanup all timers on unmount ───────────────────────────────────────────
  useEffect(() => {
    const timers = wobbleTimers.current;
    return () => {
      if (bunnyTimer.current)  clearTimeout(bunnyTimer.current);
      if (catBTimer.current)   clearTimeout(catBTimer.current);
      if (chickTimer.current)  clearTimeout(chickTimer.current);
      if (idleTimerRef.current)  clearTimeout(idleTimerRef.current);
      if (crabSpawnTimer.current)  clearTimeout(crabSpawnTimer.current);
      if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
      if (chaseBubbleTimer.current) clearInterval(chaseBubbleTimer.current);
      if (chaseRestTimer.current) clearTimeout(chaseRestTimer.current);
      if (chaseRunTimer.current)  clearTimeout(chaseRunTimer.current);
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
  const fontSize = 14;

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

      // ── Proximity triggers (run every frame, independent of wand bounds) ───
      const catBPixelX  = CATB_CSS_X  / 100 * r.width;
      const chickPixelX = CHICK_CSS_X / 100 * r.width;
      const fufuPixelX  = posRef.current.x / 100 * r.width;

      // Fufu or wand near Cat B → scratch animation (only on zone entry)
      const wandNearCatB  = wx >= 0 && wx <= r.width && Math.abs(wx - catBPixelX) < 60;
      const fufuNearCatB  = Math.abs(fufuPixelX - catBPixelX) < 60;
      const fufuJustEntered = fufuNearCatB && !wasFufuNearCatB.current;
      const wandJustEntered = wandNearCatB && !wasWandNearCatB.current;
      wasFufuNearCatB.current = fufuNearCatB;
      wasWandNearCatB.current = wandNearCatB;
      if ((fufuJustEntered || wandJustEntered) && !catBDisturbedRef.current) {
        catBDisturbedRef.current = true;
        setCatBDisturbed(true);
        if (catBTimer.current) clearTimeout(catBTimer.current);
        catBTimer.current = setTimeout(() => {
          catBDisturbedRef.current = false;
          setCatBDisturbed(false);
        }, 2000);
      }

      // Wand near chick → wobble (only on zone entry)
      const wandNearChick = wx >= 0 && wx <= r.width && Math.abs(wx - chickPixelX) < 60;
      const chickJustEntered = wandNearChick && !wasWandNearChick.current;
      wasWandNearChick.current = wandNearChick;
      if (chickJustEntered && !chickWobbleRef.current) {
        chickWobbleRef.current = true;
        setChickWobble(true);
        if (chickTimer.current) clearTimeout(chickTimer.current);
        chickTimer.current = setTimeout(() => {
          chickWobbleRef.current = false;
          setChickWobble(false);
        }, 700);
      }

      // Lerp crab visual position toward target (~matches 2s CSS transition)
      if (crabActiveRef.current) {
        const lerpSpeed = 0.015;
        crabVisualXRef.current += (crabTargetXRef.current - crabVisualXRef.current) * lerpSpeed;
        crabVisualYRef.current += (crabTargetYRef.current - crabVisualYRef.current) * lerpSpeed;
      }

      // Determine chase target: wand (priority) or crab (idle mode)
      const wandInBounds = wx >= 0 && wx <= r.width;
      let tx: number, ty: number;
      if (wandInBounds) {
        // Wand active → chase wand, kill crab
        tx = (wx / r.width) * 100;
        ty = wy;
        if (crabActiveRef.current) {
          crabActiveRef.current = false;
          setCrabActive(false);
          setFufuIdle(false);
          if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
        }
      } else if (crabActiveRef.current) {
        // Both resting — Fufu stays put
        if (chaseRestRef.current) {
          setCatAState(prev => prev === "arrive" ? prev : "arrive");
          return;
        }
        // Crab just moved — give it a head start before Fufu chases
        if (Date.now() - crabMoveTime.current < 1500) {
          setCatAState(prev => prev === "arrive" ? prev : "arrive");
          return;
        }
        // Chase crab's visual position
        tx = crabVisualXRef.current;
        ty = crabVisualYRef.current;
      } else {
        // Nothing to chase — transition to arrive so idle timer can restart
        setCatAState(prev => prev === "arrive" ? prev : "arrive");
        return;
      }

      const { x, y } = posRef.current;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Pixel-space stopping/arrival threshold
      const dxPx = (dx / 100) * r.width;
      const distPx = Math.sqrt(dxPx * dxPx + dy * dy);

      // If chasing crab and close → crab evades
      if (!wandInBounds && crabActiveRef.current && distPx < 40) {
        if (Date.now() - lastCrabEvade.current > 2500) {
          lastCrabEvade.current = Date.now();
          let nx: number;
          do {
            nx = GARDEN_LEFT_PCT + Math.random() * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT);
          } while (Math.abs(nx - x) < 20);
          const ny = 20 + Math.random() * 120;
          crabTargetXRef.current = nx;
          crabTargetYRef.current = ny;
          crabMoveTime.current = Date.now();
          setCrabX(nx);
          setCrabY(ny);
        }
        setCatAState("arrive");
        return;
      }

      if (distPx < 30) { setCatAState("arrive"); return; }

      // Distance‑adaptive speed: farther targets → faster, close‑in → slower
      const chasingCrab = !wandInBounds && crabActiveRef.current;
      const baseSpeed = chasingCrab ? 0.12 : 0.35;
      const extra     = Math.min(dist * 0.012, chasingCrab ? 0.14 : 0.45);
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

  const wobblePlant = useCallback((idx: number) => {
    const existing = wobbleTimers.current.get(idx);
    if (existing) clearTimeout(existing);
    setWobbling(w => ({ ...w, [idx]: true }));
    const id = setTimeout(() => {
      setWobbling(w => ({ ...w, [idx]: false }));
      wobbleTimers.current.delete(idx);
    }, 700);
    wobbleTimers.current.set(idx, id);
  }, []);

  // Cat bed position (Row C, second slot)
  const catBedPos = { x: gardenX(rowC_x[1]), y: rC };

  // 视为“在床上”的范围（可以按感觉微调 4 和 10）
  const isXNearBed = Math.abs(catAPos.x - catBedPos.x) < 4;
  const isYNearBed = Math.abs(catAPos.y - catBedPos.y) < 10;
  const isNearBed  = isXNearBed && isYNearBed && !crabActive;

  // ── Fufu idle detection: "meow?" after 4s of not chasing ────────────────
  useEffect(() => {
    if (catAState === "arrive" && !isNearBed) {
      idleTimerRef.current = setTimeout(() => setFufuIdle(true), 2000);
    } else if (!crabActiveRef.current) {
      // Only clear idle when crab isn't active — otherwise chasing the crab would kill it
      setFufuIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    }
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [catAState, isNearBed]);

  // ── Claude crab: appears when idle, Fufu chases it ────────────────────
  const randomCrabPos = useCallback(() => {
    const fufuX = posRef.current.x;
    let x: number;
    do {
      x = GARDEN_LEFT_PCT + Math.random() * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT);
    } while (Math.abs(x - fufuX) < 20);
    // Random Y between front row and mid-flower row
    const y = 20 + Math.random() * 120;
    return { x, y };
  }, []);

  // Start / stop the rest-run cycle together with the crab
  const startRestCycle = useCallback(() => {
    const schedule = () => {
      // Chase for 5–7s, then rest for 2.5–3.5s
      const runTime  = 5000 + Math.random() * 2000;
      const restTime = 2500 + Math.random() * 1000;
      chaseRunTimer.current = setTimeout(() => {
        chaseRestRef.current = true;
        chaseRestTimer.current = setTimeout(() => {
          chaseRestRef.current = false;
          schedule();                 // next cycle
        }, restTime);
      }, runTime);
    };
    chaseRestRef.current = false;
    schedule();
  }, []);

  const stopRestCycle = useCallback(() => {
    chaseRestRef.current = false;
    if (chaseRestTimer.current) clearTimeout(chaseRestTimer.current);
    if (chaseRunTimer.current)  clearTimeout(chaseRunTimer.current);
  }, []);

  useEffect(() => {
    if (fufuIdle) {
      crabSpawnTimer.current = setTimeout(() => {
        const pos = randomCrabPos();
        crabTargetXRef.current = pos.x;
        crabTargetYRef.current = pos.y;
        crabVisualXRef.current = pos.x;  // spawn: visual = target immediately
        crabVisualYRef.current = pos.y;
        setCrabX(pos.x);
        setCrabY(pos.y);
        crabActiveRef.current = true;
        setCrabActive(true);
        startRestCycle();
        // Crab wanders to a new spot every 8s (only when not resting)
        crabWanderTimer.current = setInterval(() => {
          if (chaseRestRef.current) return;  // skip wander during rest
          const np = randomCrabPos();
          crabTargetXRef.current = np.x;
          crabTargetYRef.current = np.y;
          crabMoveTime.current = Date.now();
          setCrabX(np.x);
          setCrabY(np.y);
        }, 8000);
      }, 500);
    } else {
      if (crabSpawnTimer.current)  clearTimeout(crabSpawnTimer.current);
      if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
      stopRestCycle();
      crabActiveRef.current = false;
      setCrabActive(false);
    }
    return () => {
      if (crabSpawnTimer.current)  clearTimeout(crabSpawnTimer.current);
      if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
      stopRestCycle();
    };
  }, [fufuIdle, randomCrabPos]);

  // ── Chase bubble cycling: rotate phrases while chasing crab ────────────
  const chasingCrab = crabActive && catAState === "walk";
  useEffect(() => {
    if (chasingCrab) {
      setChaseBubbleIdx(0);
      chaseBubbleTimer.current = setInterval(() => {
        setChaseBubbleIdx(i => (i + 1) % CHASE_PHRASES.length);
      }, 2000);
    } else {
      if (chaseBubbleTimer.current) clearInterval(chaseBubbleTimer.current);
    }
    return () => { if (chaseBubbleTimer.current) clearInterval(chaseBubbleTimer.current); };
  }, [chasingCrab]);

  // ── Fufu speech bubble (context-sensitive) ─────────────────────────────
  // Use pixel distances so bubbles trigger at consistent visual proximity across screen sizes
  const pxFrom = (pct: number) => Math.abs(catAPos.x - pct) / 100 * gardenWidth;
  const isNearFood    = pxFrom(FOOD_CSS_X)    < 25 && Math.abs(catAPos.y - rC) < 30;
  const isNearCatBB   = pxFrom(CATB_CSS_X)    < 40;
  const isNearChick   = pxFrom(CHICK_CSS_X)   < 40;
  const isNearChicken = pxFrom(CHICKEN_CSS_X) < 40;
  const isNearBunny   = pxFrom(BUNNY_CSS_X)   < 40;
  const isNearFlower  = catAPos.y > 70 && FLOWER_CSS_XS.some(fx => pxFrom(fx) < 30);
  const crabDist      = crabActive ? Math.sqrt(pxFrom(crabX) ** 2 + (catAPos.y - crabY) ** 2) : Infinity;
  const isNearCrab    = crabDist < 50;

  const fufuBubble = (() => {
    if (isNearBed)         return "zzz";
    if (crabActive && chaseRestRef.current) return "ふぅ";
    if (isNearCrab)        return "!!";
    if (crabActive && catAState === "walk") return crabDist < 120 ? "!" : "...";
    if (isNearFood)        return "~yum";
    if (isNearChick)       return "!";
    if (isNearChicken)     return "hmm";
    if (isNearCatBB)       return "?";
    if (isNearBunny)       return "!!";
    if (isNearFlower)      return "~♪";
    if (fufuIdle && !crabActive) return "meow?";
    if (catAState === "arrive") return "♥";
    return null;
  })();

  const catAImgSrc =
    isNearBed
      ? ASSETS.catA_sleep1
      : catAState === "walk"
        ? getWalkSrc(catADir.dx, catADir.dy, gardenWidth)
        : ASSETS.catA_arrive;

  const catBImgSrc = catBDisturbed ? ASSETS.catB_2 : ASSETS[CAT_B_KEYS[catBIdx]];

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
          background: "#f8f8f8",
          borderTop: "none",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          cursor: isOverFooter ? "none" : "auto",
        }}
      >
        {/* Text row */}
        <div style={{ padding, display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {timeStr} in Boston, MA
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: 0,
                paddingTop: 0,
              }}
            >
              {isMobile
                ? "Come to play with my cat - Fufu on desktop"
                : (
                  <span>
                    Fufu would like to play with you{" "}
                    <CatEars size={32} color="#1a1a1a" />
                  </span>
                )}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize, fontWeight: 500 }}>
            <a
              href="https://github.com/xu-qianyi/portfolio/blob/main/Claude/PRD/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-nav-link"
              data-num="1"
            >
              CHANGELOG
            </a>
            <a
              href="https://www.linkedin.com/in/marttaxu"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-nav-link"
              data-num="2"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/littlemartta"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-nav-link"
              data-num="3"
            >
              X
            </a>
          </div>
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
              <style>{GARDEN_KEYFRAMES}</style>
              {PROPS.map((item, idx) => (
                <div
                  key={"p" + idx}
                  style={{
                    position: "absolute",
                    left: `${gardenX(item.x)}%`,
                    bottom: `${rC}px`,
                    zIndex: 6,
                    ...(item.key === "chick" && {
                      transformOrigin: "bottom center",
                      animation: chickWobble ? "chickShake 0.5s ease" : "none",
                    }),
                  }}
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

              {/* Claude sparkle crab — appears when idle */}
              {crabActive && (
                <div style={{
                  position: "absolute",
                  left: `${crabX}%`,
                  bottom: `${crabY}px`,
                  zIndex: 7,
                  transition: "left 3.5s ease-in-out, bottom 3.5s ease-in-out",
                  animation: "crabAppear 0.3s ease",
                  pointerEvents: "none",
                }}>
                  <div style={{ animation: "crabBounce 1.4s ease-in-out infinite" }}>
                    <Clawd size={isTablet ? 18 : 22} />
                  </div>
                </div>
              )}

              {/* Cat A — Fufu, chases wand */}
              <div style={{
                position: "absolute",
                left: `${catAPos.x}%`,
                bottom: `${catAPos.y}px`,
                zIndex: 8,
              }}>
                {fufuBubble && (
                  <div
                    key={fufuBubble}
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "100%",
                      transform: "translateX(-50%)",
                      pointerEvents: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      animation: "bubbleFadeIn 0.3s ease",
                      marginBottom: 2,
                    }}
                  >
                    <div style={{
                      background: "#fff",
                      border: "2px solid #555",
                      padding: "1px 5px",
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "#333",
                      whiteSpace: "nowrap",
                      lineHeight: 1.4,
                      imageRendering: "pixelated",
                    }}>
                      {fufuBubble}
                    </div>
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: "4px solid #555",
                    }} />
                  </div>
                )}
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
