"use client";

import { useEffect, useRef } from "react";

/**
 * Lazy Lottie player: loads lottie-web (light build) and the animation JSON
 * only when the element approaches the viewport, so page load stays fast.
 */
export function LottiePlayer({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let anim: { destroy: () => void } | null = null;
    let cancelled = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        import("lottie-web/build/player/lottie_light").then((mod) => {
          if (cancelled || !ref.current) return;
          anim = mod.default.loadAnimation({
            container: ref.current,
            renderer: "svg",
            loop: true,
            autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            path: src,
          });
        });
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src]);

  return <div ref={ref} className={`lottie-box ${className}`} aria-hidden="true" />;
}
