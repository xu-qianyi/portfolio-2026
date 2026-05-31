"use client";

import { useRef, useEffect, useCallback } from "react";

const IDLE_POSES = [
  "/garden/home_fufu/meow_lie.gif",
  "/garden/home_fufu/yawn_sit2.gif",
  "/garden/home_fufu/yawn_lie.gif",
  "/garden/home_fufu/sleep2.gif",
  "/garden/home_fufu/sleep4.gif",
];

const HISS = "/garden/home_fufu/hiss.gif";

const rand    = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

export default function FufuCat() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const imgRef        = useRef<HTMLImageElement>(null);
  const posRef        = useRef(0);
  const rafRef        = useRef<number | null>(null);
  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterIdleRef  = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const img       = imgRef.current;
    if (!container || !img) return;

    function stopRaf()   { if (rafRef.current)   { cancelAnimationFrame(rafRef.current);  rafRef.current   = null; } }
    function stopTimer() { if (timerRef.current) { clearTimeout(timerRef.current);         timerRef.current = null; } }

    function enterIdle() {
      stopRaf();
      let pose: string;
      do { pose = IDLE_POSES[randInt(0, IDLE_POSES.length - 1)]; }
      while (pose === img.src.replace(location.origin, ""));
      img.src = pose;
      timerRef.current = setTimeout(enterWalk, rand(15000, 20000));
    }

    function enterWalk() {
      stopTimer();
      const direction = Math.random() < 0.5 ? 1 : -1;
      const speed     = rand(0.4, 0.7);
      const walkMs    = rand(1500, 3500);
      const startTime = performance.now();

      img.src = direction > 0 ? "/garden/walk_right.gif" : "/garden/walk_left.gif";

      function step() {
        if (performance.now() - startTime >= walkMs) { enterIdle(); return; }

        const maxX = Math.max(0, container.offsetWidth - img.offsetWidth);
        let x = posRef.current + direction * speed;
        if (x <= 0)         x = 0;
        else if (x >= maxX) x = maxX;
        posRef.current = x;
        img.style.left = `${x}px`;

        if ((x <= 0 && direction < 0) || (x >= maxX && direction > 0)) { enterIdle(); return; }
        rafRef.current = requestAnimationFrame(step);
      }
      rafRef.current = requestAnimationFrame(step);
    }

    enterIdleRef.current = enterIdle;
    enterIdle();

    return () => { stopRaf(); stopTimer(); };
  }, []);

  const handleClick = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    if (rafRef.current)   { cancelAnimationFrame(rafRef.current);  rafRef.current   = null; }
    if (timerRef.current) { clearTimeout(timerRef.current);         timerRef.current = null; }
    img.src = HISS;
    timerRef.current = setTimeout(() => enterIdleRef.current(), 2000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="shrink-0 self-end relative overflow-hidden"
      style={{ width: 160, height: 36 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={IDLE_POSES[0]}
        alt="Fufu the cat"
        onClick={handleClick}
        style={{ height: 36, width: "auto", display: "block", position: "absolute", top: 0, left: 0, cursor: "pointer" }}
      />
    </div>
  );
}
