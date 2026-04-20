"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Clawd from "./Clawd";
import CatEars from "./CatEars";
import {
  ASSETS, type AssetKey,
  ROW_A, ROW_B, ROW_C, ROW_D, INTERACTIVE_BOTTOM_AREA, REF_WIDTH,
  GARDEN_LEFT_PCT, GARDEN_RIGHT_PCT, gardenX, rowC_x,
  FLOWERS, PROPS,
  CATB_POS_X, BUNNY_POS_X, EXTRA_PLANT,
  CAT_B_KEYS, CATB_CSS_X, CHICK_CSS_X, FOOD_CSS_X, CHICKEN_CSS_X, BUNNY_CSS_X,
  FLOWER_CSS_XS, IDLE_PHRASES, GARDEN_KEYFRAMES,
} from "./gardenConfig";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Garden({ sparse = false }: { sparse?: boolean } = {}) {
  const sectionRef    = useRef<HTMLElement>(null);
  const gardenRef     = useRef<HTMLDivElement>(null);
  const wandCursorRef = useRef<HTMLImageElement>(null);
  const rafRef        = useRef<number>(0);
  const wandPos       = useRef({ x: -999, y: -999 });
  const posRef        = useRef({ x: gardenX(30), y: ROW_C + INTERACTIVE_BOTTOM_AREA });
  const bunnyTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wobbleTimers      = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const catBDisturbedRef  = useRef(false);
  const catBTimer         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasFufuNearCatB   = useRef(false);
  const wasWandNearCatB   = useRef(false);
  const chickWobbleRef    = useRef(false);
  const chickTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasWandNearChick  = useRef(false);

  const [isOverGarden,setIsOverGarden] = useState(false);
  const [wobbling,    setWobbling]     = useState<Record<number, boolean>>({});
  const [catAPos,     setCatAPos]      = useState({ x: gardenX(30), y: ROW_C + INTERACTIVE_BOTTOM_AREA });
  const [catAState,   setCatAState]    = useState<"walk" | "arrive">("arrive");
  const [catAFlip,    setCatAFlip]     = useState(false);
  const [catADir,     setCatADir]      = useState({ dx: 1, dy: 0 });
  const [catBIdx,       setCatBIdx]       = useState(0);
  const [catBDisturbed, setCatBDisturbed] = useState(false);
  const [bunnyState,    setBunnyState]    = useState<"idle" | "react">("idle");
  const [chickWobble,   setChickWobble]   = useState(false);
  const [fufuIdle,      setFufuIdle]      = useState(false);
  const [fufuIdlePhrase, setFufuIdlePhrase] = useState("meow?");
  const idlePhraseIdxRef = useRef(Math.floor(Math.random() * IDLE_PHRASES.length));
  const idleTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [crabCaught,    setCrabCaught]    = useState(false);
  const [crabActive,    setCrabActive]    = useState(false);
  const [crabX,         setCrabX]         = useState(50);
  const [crabY,         setCrabY]         = useState(ROW_C + INTERACTIVE_BOTTOM_AREA);
  const crabTargetXRef  = useRef(50);   // where crab is heading (instant jump)
  const crabTargetYRef  = useRef(ROW_C + INTERACTIVE_BOTTOM_AREA);
  const crabVisualXRef  = useRef(50);   // where crab visually is (lerped, Fufu chases this)
  const crabVisualYRef  = useRef(ROW_C + INTERACTIVE_BOTTOM_AREA);
  const crabActiveRef   = useRef(false);
  const crabSpawnTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crabWanderTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastCrabEvade   = useRef(0);
  const crabMoveTime    = useRef(0);       // timestamp of last crab position change
  const crabCloseRef    = useRef(false);   // hysteresis lock for close-range crab chase
  const crabPinnedRef   = useRef<{ x: number; y: number } | null>(null);
  const chaseRestRef    = useRef(false);   // true = both resting
  const chaseRestTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chaseRunTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const crabCaughtRef   = useRef(false);
  const crabCaughtTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [vw,          setVw]           = useState(1200);
  const gardenWidthRef = useRef(800);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  useEffect(() => {
    setVw(window.innerWidth);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => setVw(window.innerWidth), 150); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(resizeTimer); };
  }, []);

  useEffect(() => {
    if (!gardenRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      gardenWidthRef.current = entry.contentRect.width;
    });
    ro.observe(gardenRef.current);
    return () => ro.disconnect();
  }, [isMobile]);

  // ── Inject garden keyframes once (persists across remounts) ────────
  useEffect(() => {
    const STYLE_ID = "garden-keyframes";
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = GARDEN_KEYFRAMES;
    document.head.appendChild(el);
  }, []);

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
      if (chaseRestTimer.current) clearTimeout(chaseRestTimer.current);
      if (chaseRunTimer.current)  clearTimeout(chaseRunTimer.current);
      if (crabCaughtTimer.current) clearTimeout(crabCaughtTimer.current);
      timers.forEach(id => clearTimeout(id));
    };
  }, []);

  // Responsive sizes
  const gardenH  = isTablet ? 260  : 310;
  const catSize  = isTablet ? 48   : 52;
  const bnySize  = isTablet ? 36   : 44;
  const flowerSz = isTablet ? 27   : 32;
  const arnicaSz = isTablet ? 35   : 42;
  const rA       = isTablet ? 128  : ROW_A;
  const rB       = isTablet ? 72   : ROW_B;
  const rC       = isTablet ? 10   : ROW_C;
  const rD       = isTablet ? 184  : ROW_D;
  const gardenInteractiveArea = isMobile ? 0 : INTERACTIVE_BOTTOM_AREA;
  const rAVisual = rA + gardenInteractiveArea;
  const rBVisual = rB + gardenInteractiveArea;
  const rDVisual = rD + gardenInteractiveArea;
  const rCVisual = rC + gardenInteractiveArea;
  const rCVisualRef = useRef(rCVisual);
  rCVisualRef.current = rCVisual;
  const catSizeRef = useRef(catSize);
  catSizeRef.current = catSize;
  /** Horizontal inset comes from About page wrapper; keep vertical only here */
  const padding = isMobile ? "12px 0" : isTablet ? "16px 0 0px" : "16px 0";

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
      if (isMobileRef.current || !gardenRef.current) return;
      const r = gardenRef.current.getBoundingClientRect();
      if (r.width === 0) return;
      const { x: wx, y: wy } = wandPos.current;
      const scale = r.width / REF_WIDTH;
      const yMin = 0;
      const yMax = r.height;

      // ── Proximity triggers (run every frame, independent of wand bounds) ───
      const catBPixelX  = CATB_CSS_X  / 100 * r.width;
      const chickPixelX = CHICK_CSS_X / 100 * r.width;
      const fufuPixelX  = posRef.current.x / 100 * r.width;
      const rowCY = rCVisualRef.current;

      // Fufu or wand near Cat B → scratch animation (only on zone entry)
      const wandNearCatB  =
        wx >= 0 &&
        wx <= r.width &&
        Math.abs(wx - catBPixelX) < 60 * scale &&
        Math.abs(wy - rowCY) < 80 * scale;
      const fufuNearCatB  = Math.abs(fufuPixelX - catBPixelX) < 60 * scale;
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
      const wandNearChick =
        wx >= 0 &&
        wx <= r.width &&
        Math.abs(wx - chickPixelX) < 60 * scale &&
        Math.abs(wy - rowCY) < 80 * scale;
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

      // Lerp crab visual position toward target (~matches 3.5s CSS transition)
      if (crabActiveRef.current) {
        const lerpSpeed = 0.010;
        crabVisualXRef.current += (crabTargetXRef.current - crabVisualXRef.current) * lerpSpeed;
        crabVisualYRef.current += (crabTargetYRef.current - crabVisualYRef.current) * lerpSpeed;
      }

      // Determine chase target: wand (priority) or crab (idle mode)
      const wandInBounds = wx >= 0 && wx <= r.width;
      let tx: number, ty: number;
      if (wandInBounds) {
        // Offset the target so Fufu stops at the bottom-left of the wand 
        // Fufu's sprite is ~52px. To place her to the left and below the wand tip (wx, wy),
        // we shift the target position (which represents Fufu's bottom-left corner).
        const targetWx = wx - 30 * scale;
        const targetWy = wy - 70 * scale;
        tx = (targetWx / r.width) * 100;
        ty = Math.max(yMin, Math.min(yMax, targetWy));
        if (crabActiveRef.current) {
          crabActiveRef.current = false;
          setCrabActive(false);
          setFufuIdle(false);
          crabCloseRef.current = false;
          crabPinnedRef.current = null;
          if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
        }
      } else if (crabActiveRef.current) {
        // Both resting - Fufu stays put
        if (chaseRestRef.current) {
          setCatAState(prev => prev === "arrive" ? prev : "arrive");
          return;
        }
        // Crab just moved - give it a head start (700ms)
        if (Date.now() - crabMoveTime.current < 700) {
          setCatAState(prev => prev === "arrive" ? prev : "arrive");
          return;
        }
        const { x: cx, y: cy } = posRef.current;
        const dxToCrabPx = ((crabVisualXRef.current - cx) / 100) * r.width;
        const dyToCrabPx = crabVisualYRef.current - cy;
        const distToCrabPx = Math.sqrt(dxToCrabPx * dxToCrabPx + dyToCrabPx * dyToCrabPx);

        // Hysteresis: lock when very close, unlock when clearly apart (scaled).
        if (crabCloseRef.current) {
          if (distToCrabPx > 60 * scale) {
            crabCloseRef.current = false;
            crabPinnedRef.current = null;
          }
        } else if (distToCrabPx < 50 * scale) {
          crabCloseRef.current = true;
          crabPinnedRef.current = {
            x: crabVisualXRef.current,
            y: crabVisualYRef.current,
          };
        }

        // When locked in close range, pin the chase target briefly to reduce oscillation.
        const chaseTarget = crabCloseRef.current && crabPinnedRef.current
          ? crabPinnedRef.current
          : { x: crabVisualXRef.current, y: crabVisualYRef.current };
        tx = chaseTarget.x;
        ty = chaseTarget.y;
      } else {
        // Nothing to chase - transition to arrive so idle timer can restart
        crabCloseRef.current = false;
        crabPinnedRef.current = null;
        setCatAState(prev => prev === "arrive" ? prev : "arrive");
        return;
      }

      const { x, y } = posRef.current;
      const dx = tx - x;
      const dy = ty - y;

      // All distance/direction math in pixel space to avoid mixed-unit bias.
      // dx is in %-of-width → convert to px. dy is already in px (garden bottom-offset).
      const dxPx = (dx / 100) * r.width;
      const dyPx = dy;
      const distPx = Math.sqrt(dxPx * dxPx + dyPx * dyPx);

      // If chasing crab and inside the close-range lock → crab evades, Fufu may say "gotcha!"
      if (!wandInBounds && crabActiveRef.current && crabCloseRef.current) {
        if (Date.now() - lastCrabEvade.current > 2500) {
          lastCrabEvade.current = Date.now();
          // 30% chance to show catch bubble
          if (!crabCaughtRef.current && Math.random() < 0.3) {
            crabCaughtRef.current = true;
            setCrabCaught(true);
            if (crabCaughtTimer.current) clearTimeout(crabCaughtTimer.current);
            crabCaughtTimer.current = setTimeout(() => {
              crabCaughtRef.current = false;
              setCrabCaught(false);
            }, 1200);
          }
          const oldCx = crabTargetXRef.current;
          const oldCy = crabTargetYRef.current;
          const np = randomCrabPosRef.current(oldCx, oldCy);
          crabTargetXRef.current = np.x;
          crabTargetYRef.current = np.y;
          crabMoveTime.current = Date.now();
          setCrabX(np.x);
          setCrabY(np.y);
        }
        setCatAState("arrive");
        return;
      }

      const stopDistPx = wandInBounds ? 10 * scale : 30 * scale;
      if (distPx < stopDistPx) { setCatAState("arrive"); return; }

      // Distance‑adaptive speed: farther targets → faster, close‑in → slower
      const chasingCrab = !wandInBounds && crabActiveRef.current;
      // Speed defined as % of garden width per frame - scales with screen size
      const basePct = chasingCrab ? 0.08 : 0.10;
      const distPct = distPx / r.width * 100;
      const extraPct = Math.min(distPct * 0.015, chasingCrab ? 0.14 : 0.16);
      const speedPx  = (basePct + extraPct) / 100 * r.width;
      // Normalize direction in pixel space, then convert X step back to %
      const next = {
        x: Math.max(GARDEN_LEFT_PCT, Math.min(GARDEN_RIGHT_PCT, x + (dxPx / distPx) * speedPx * (100 / r.width))),
        y: Math.max(yMin, Math.min(yMax, y + (dy / distPx) * speedPx)),
      };
      posRef.current = next;
      setCatAPos({ ...next });
      setCatAState("walk");
      setCatAFlip(dx < 0);
      setCatADir({ dx, dy });
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gardenInteractiveArea, gardenH]);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const hoverSlack = 4; // keep wand active slightly past visual edge to avoid flicker

    const onMove = (e: MouseEvent) => {
      const sectionEl = sectionRef.current;
      const sectionRect = sectionEl?.getBoundingClientRect();
      const insideHover = !!sectionRect && !isMobileRef.current &&
        e.clientX >= sectionRect.left - hoverSlack &&
        e.clientX <= sectionRect.right + hoverSlack &&
        e.clientY >= sectionRect.top - hoverSlack &&
        e.clientY <= sectionRect.bottom + hoverSlack;

      setIsOverGarden((prev) => (prev === insideHover ? prev : insideHover));

      if (insideHover && wandCursorRef.current) {
        wandCursorRef.current.style.left = `${e.clientX}px`;
        wandCursorRef.current.style.top = `${e.clientY}px`;
      }

      if (!gardenRef.current) return;
      const r = gardenRef.current.getBoundingClientRect();
      const controlTop = sectionRect?.top ?? r.top;

      // Use garden bottom as Y origin so Fufu's target aligns with rendered positions.
      // Keep control active up to section top (tip text area), matching visible wand behavior.
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= controlTop && e.clientY <= r.bottom) {
        wandPos.current = { x: e.clientX - r.left, y: r.bottom - e.clientY };
      } else {
        wandPos.current = { x: -999, y: -999 };
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const cycleCatB = useCallback(() => {
    setCatBIdx(prev => (prev + 1) % 4);
  }, []);

  const handleCatBClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    cycleCatB();
  }, [cycleCatB]);

  const handleCatBKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      cycleCatB();
    }
  }, [cycleCatB]);

  const triggerBunnyReact = useCallback(() => {
    if (bunnyTimer.current) clearTimeout(bunnyTimer.current);
    setBunnyState("react");
    bunnyTimer.current = setTimeout(() => setBunnyState("idle"), 2500);
  }, []);

  const handleBunnyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerBunnyReact();
  }, [triggerBunnyReact]);

  const handleBunnyKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      triggerBunnyReact();
    }
  }, [triggerBunnyReact]);

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
  const catBedPos = { x: gardenX(rowC_x[1]), y: rCVisual };

  // "on bed" proximity thresholds (tune 4 and 10 by feel)
  const isNearBed =
    Math.abs(catAPos.x - catBedPos.x) < 4 &&
    Math.abs(catAPos.y - catBedPos.y) < 10 &&
    !crabActive;

  // ── Fufu idle detection: "meow?" after 2s of not chasing ────────────────
  useEffect(() => {
    if (catAState === "arrive" && !isNearBed) {
      idleTimerRef.current = setTimeout(() => {
        const phrase = IDLE_PHRASES[idlePhraseIdxRef.current % IDLE_PHRASES.length];
        idlePhraseIdxRef.current += 1;
        setFufuIdlePhrase(phrase);
        setFufuIdle(true);
      }, 2000);
    } else if (!crabActiveRef.current) {
      // Only clear idle when crab isn't active - otherwise chasing the crab would kill it
      setFufuIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    }
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [catAState, isNearBed]);

  // ── Claude crab: appears when idle, Fufu chases it ────────────────────
  // Normalized distance: both axes mapped to 0–100 so distance is screen-size-independent.
  // Garden diagonal ≈ √(88² + 100²) ≈ 133;  40% of that ≈ 53.
  const MIN_SPAWN_DIST_PCT = 53;

  const randomCrabPos = useCallback((awayFromX?: number, awayFromY?: number) => {
    const pctDist = (ax: number, ay: number, bx: number, by: number) => {
      const dx = ax - bx;
      const dy = (ay - by) / gardenH * 100;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const fufuX = posRef.current.x;
    const fufuY = posRef.current.y;
    let x: number, y: number, tries = 0;
    do {
      x = GARDEN_LEFT_PCT + Math.random() * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT);
      y = gardenInteractiveArea + 20 + Math.random() * (gardenH - 40);
      tries++;
    } while (
      tries < 80 &&
      (pctDist(x, y, fufuX, fufuY) < MIN_SPAWN_DIST_PCT ||
       (awayFromX !== undefined && pctDist(x, y, awayFromX, awayFromY!) < MIN_SPAWN_DIST_PCT))
    );
    return { x, y };
  }, [gardenInteractiveArea, gardenH]);
  const randomCrabPosRef = useRef(randomCrabPos);
  randomCrabPosRef.current = randomCrabPos;

  // Start / stop the rest-run cycle together with the crab
  const startRestCycle = useCallback(() => {
    const schedule = () => {
      // Chase for 5–7s, then rest for 1–1.5s
      const runTime  = 5000 + Math.random() * 2000;
      const restTime = 1000 + Math.random() * 500;
      chaseRunTimer.current = setTimeout(() => {
        chaseRestRef.current = true;
        chaseRestTimer.current = setTimeout(() => {
          // Move crab first, then release Fufu (head-start via crabMoveTime)
          const np = randomCrabPos();
          crabTargetXRef.current = np.x;
          crabTargetYRef.current = np.y;
          crabMoveTime.current = Date.now();
          setCrabX(np.x);
          setCrabY(np.y);
          chaseRestRef.current = false;
          schedule();                 // next cycle
        }, restTime);
      }, runTime);
    };
    chaseRestRef.current = false;
    schedule();
  }, [randomCrabPos]);

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
      }, 3500);
    } else {
      if (crabSpawnTimer.current)  clearTimeout(crabSpawnTimer.current);
      if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
      stopRestCycle();
      crabActiveRef.current = false;
      crabCloseRef.current = false;
      crabPinnedRef.current = null;
      setCrabActive(false);
    }
    return () => {
      if (crabSpawnTimer.current)  clearTimeout(crabSpawnTimer.current);
      if (crabWanderTimer.current) clearInterval(crabWanderTimer.current);
      stopRestCycle();
    };
  }, [fufuIdle, randomCrabPos, startRestCycle, stopRestCycle]);

  // ── Fufu speech bubble (context-sensitive) ─────────────────────────────
  // Use pixel distances so bubbles trigger at consistent visual proximity across screen sizes.
  // gardenWidthRef.current is always fresh (written by ResizeObserver); avoids the one-frame
  // stale value that gardenWidth state would have immediately after a resize.
  const pxFrom = (pct: number) => Math.abs(catAPos.x - pct) / 100 * gardenWidthRef.current;
  const bubbleScale = gardenWidthRef.current / REF_WIDTH;
  const isNearFood    = pxFrom(FOOD_CSS_X)    < 25 * bubbleScale && Math.abs(catAPos.y - rCVisual) < 30 * bubbleScale;
  const isNearCatBB   = pxFrom(CATB_CSS_X)    < 40 * bubbleScale;
  const isNearChick   = pxFrom(CHICK_CSS_X)   < 40 * bubbleScale;
  const isNearChicken = pxFrom(CHICKEN_CSS_X) < 40 * bubbleScale;
  const isNearBunny   = pxFrom(BUNNY_CSS_X)   < 40 * bubbleScale;
  const isNearFlower  = catAPos.y > rBVisual - 30 * bubbleScale && FLOWER_CSS_XS.some(fx => pxFrom(fx) < 30 * bubbleScale);
  // Both axes are in screen-pixels: pxFrom converts % X → px; catAPos.y / crabY are "bottom px"
  // (fixed-height garden), which is also pixels - so Euclidean distance is valid here.
  const crabDist      = crabActive ? Math.sqrt(pxFrom(crabX) ** 2 + (catAPos.y - crabY) ** 2) : Infinity;
  const isNearCrab    = crabDist < 50 * bubbleScale;

  const fufuBubble = (() => {
    if (isNearBed)         return "zzz";
    if (crabCaught)        return "gotcha!";
    if (crabActive && chaseRestRef.current) return "ふぅ";
    if (fufuIdle && !crabActive) return fufuIdlePhrase;
    if (isNearCrab)        return "!!";
    if (crabActive && catAState === "walk") return crabDist < 120 * bubbleScale ? "!" : "...";
    if (isNearFood)        return "~yum";
    if (isNearChick)       return "!";
    if (isNearChicken)     return "hmm";
    if (isNearCatBB)       return "?";
    if (isNearBunny)       return "!!";
    if (isNearFlower)      return "~♪";
    if (catAState === "arrive") return "♥";
    return null;
  })();

  const catAImgSrc =
    isNearBed
      ? ASSETS.catA_sleep1
      : catAState === "walk"
        ? getWalkSrc(catADir.dx, catADir.dy, gardenWidthRef.current)
        : ASSETS.catA_arrive;

  const catBImgSrc = catBDisturbed ? ASSETS.catB_2 : ASSETS[CAT_B_KEYS[catBIdx]];

  // Thinned-out flower set for narrow/embedded layouts
  const flowers = useMemo(() => {
    if (!sparse) return FLOWERS;
    return FLOWERS.filter((_, idx) => {
      if (idx <= 6) return idx % 2 === 0;         // ROW_D: keep 0,2,4,6
      if (idx <= 13) return (idx - 7) % 2 === 1;  // ROW_A: keep 8,10,12 (staggered)
      return (idx - 14) % 2 === 0;                // ROW_B: keep 14,16,18,20
    });
  }, [sparse]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Wand cursor - only visible while hovering over footer */}
      {isOverGarden && (
        <Image
          ref={wandCursorRef}
          src={ASSETS.wand}
          alt=""
          width={32}
          height={32}
          unoptimized
          draggable={false}
          aria-hidden
          style={{
            position: "fixed",
            left: -999,
            top: -999,
            imageRendering: "pixelated",
            pointerEvents: "none",
            transform: "translate(-4px, -4px)",
            zIndex: 9999,
          }}
        />
      )}

      <section
        ref={sectionRef}
        data-garden-section
        role="img"
        aria-label="Interactive pixel garden with animated cat Fufu chasing a crab, flowers, and other critters"
        style={{
          borderTop: "none",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          paddingBottom: 0,
        }}
      >
        {/* Garden - hidden on mobile */}
        {!isMobile && (
          <>
            {/* Tip text (above garden frame) */}
            <div style={{ padding, pointerEvents: "none", cursor: "none", background: "transparent" }}>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "var(--color-ink)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                <span>
                  Tip: Move your mouse (cat teaser) here, or stay still and wait for Clawd to wander out.{" "}
                  <CatEars size={32} color="var(--color-ink)" />
                </span>
              </p>
            </div>

            <div
              ref={gardenRef}
              style={{
                position: "relative",
                width: "100%",
                height: gardenH + gardenInteractiveArea,
                backgroundColor: "#C2CFAD",
                backgroundImage: "url('/footer/grass_tile.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "64px 64px",
                overflow: "visible",
              }}
            >
              {/* Flowers */}
              {flowers.map((item, idx) => (
                <div
                  key={"f" + idx}
                  onMouseEnter={() => wobblePlant(idx)}
                  style={{
                    position: "absolute",
                    left: `${gardenX(item.x)}%`,
                    bottom: `${item.y === ROW_D ? rDVisual : item.y === ROW_A ? rAVisual : rBVisual}px`,
                    transformOrigin: "bottom center",
                    transform: wobbling[idx] ? "rotate(8deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease",
                    zIndex: item.y === ROW_D ? 2 : item.y === ROW_A ? 3 : 4,
                    cursor: "none",
                  }}
                >
                  <Image
                    src={ASSETS[item.key]}
                    draggable={false}
                    alt=""
                    width={item.key === "plant_arnica" ? arnicaSz : flowerSz}
                    height={item.key === "plant_arnica" ? arnicaSz : flowerSz}
                    unoptimized
                    style={{
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
                bottom: `${rCVisual}px`,
                zIndex: 4,
              }}>
                <Image
                  src={ASSETS[EXTRA_PLANT.key]}
                  draggable={false}
                  alt=""
                  width={flowerSz}
                  height={flowerSz}
                  unoptimized
                  style={{ imageRendering: "pixelated", display: "block" }}
                />
              </div>

              {/* Props & static animals */}
              {PROPS.map((item, idx) => (
                <div
                  key={"p" + idx}
                  style={{
                    position: "absolute",
                    left: `${gardenX(item.x)}%`,
                    bottom: `${rCVisual}px`,
                    zIndex: 6,
                    ...(item.key === "chick" && {
                      transformOrigin: "bottom center",
                      animation: chickWobble ? "chickShake 0.5s ease" : "none",
                    }),
                  }}
                >
                  <Image
                    src={ASSETS[item.key]}
                    draggable={false}
                    alt=""
                    width={item.key === "catbed" ? (isTablet ? 44 : 52) : item.size}
                    height={item.key === "catbed" ? (isTablet ? 44 : 52) : item.size}
                    unoptimized
                    style={{
                      imageRendering: "pixelated",
                      display: "block",
                    }}
                  />
                </div>
              ))}

              {/* Claude sparkle crab - appears when idle */}
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

              {/* Cat A - Fufu, chases wand */}
              <div style={{
                position: "absolute",
                left: `${catAPos.x}%`,
                bottom: `${catAPos.y}px`,
                zIndex: 8,
              }}>
                {fufuBubble && (
                  <div
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
                      background: "var(--color-surface)",
                      border: "2px solid var(--color-muted)",
                      padding: "1px 5px",
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "var(--color-ink)",
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
                      borderTop: "4px solid var(--color-muted)",
                    }} />
                  </div>
                )}
                <Image
                  src={catAImgSrc}
                  draggable={false}
                  alt="Fufu"
                  width={catSize}
                  height={catSize}
                  unoptimized
                  style={{
                    imageRendering: "pixelated",
                    display: "block",
                    transform: (catAState === "arrive" && catAFlip) ? "scaleX(-1)" : "none",
                  }}
                />
              </div>

              {/* Cat B - click to cycle states */}
              <div
                onClick={handleCatBClick}
                onKeyDown={handleCatBKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Cycle cat animation"
                style={{
                  position: "absolute",
                  left: `${CATB_POS_X}%`,
                  bottom: `${rCVisual}px`,
                  zIndex: 7,
                  cursor: "none",
                }}
              >
                <Image
                  src={catBImgSrc}
                  draggable={false}
                  alt=""
                  width={catSize}
                  height={catSize}
                  unoptimized
                  style={{ imageRendering: "pixelated", display: "block" }}
                />
              </div>

              {/* Bunny */}
              <div
                onClick={handleBunnyClick}
                onKeyDown={handleBunnyKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Make bunny jump"
                style={{
                  position: "absolute",
                  left: `${BUNNY_POS_X}%`,
                  bottom: `${rCVisual}px`,
                  zIndex: 7,
                  cursor: "none",
                }}
              >
                <Image
                  src={ASSETS[`bunny_${bunnyState}` as AssetKey]}
                  draggable={false}
                  alt=""
                  width={bnySize}
                  height={bnySize}
                  unoptimized
                  style={{ imageRendering: "pixelated", display: "block" }}
                />
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <div style={{ padding }}>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Come to play with my cat - Fufu on desktop
            </p>
          </div>
        )}
      </section>
    </>
  );
}
