"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";

type LottiePreviewProps = {
  src: string;
  loop?: boolean;
  /** Shown when `src` is missing, 404, or not valid Lottie JSON (avoids HTML-as-JSON parse errors). */
  fallbackSrc?: string;
  alt?: string;
};

export default function LottiePreview({
  src,
  loop = true,
  fallbackSrc,
  alt = "",
}: LottiePreviewProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setAnimationData(null);
    setUseFallback(false);

    fetch(src)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Lottie fetch ${res.status}`);
        const text = await res.text();
        const head = text.trimStart();
        if (!head.startsWith("{") && !head.startsWith("[")) {
          throw new Error("Not Lottie JSON");
        }
        const data = JSON.parse(text) as object;
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setUseFallback(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (animationData) {
    return (
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      />
    );
  }

  if (useFallback && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 800px) 100vw, 800px"
      />
    );
  }

  return null;
}
