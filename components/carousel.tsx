"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { carouselTiles } from "@/lib/site";

/**
 * Auto-scrolling service carousel.
 * - Scrolls continuously via rAF
 * - Mouse: click-and-drag to scroll (with click suppression after a real drag)
 * - Touch: native swipe (it's a real scroll container)
 * - Pauses while the user interacts; seamless loop via content duplication
 */
export function ServiceCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const dragging = useRef(false);
  const moved = useRef(0);
  const startX = useRef(0);
  const startScroll = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const half = () => el.scrollWidth / 2;
    let raf: number;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!paused.current && !dragging.current && !reduce) {
        el.scrollLeft += 0.6;
      }
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
      if (el.scrollLeft <= 0 && dragging.current) el.scrollLeft += half();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch scrolls natively
      dragging.current = true;
      moved.current = 0;
      startX.current = e.clientX;
      startScroll.current = el.scrollLeft;
      el.classList.add("grabbing");
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX.current;
      moved.current = Math.max(moved.current, Math.abs(dx));
      el.scrollLeft = startScroll.current - dx;
    };
    const up = () => {
      dragging.current = false;
      el.classList.remove("grabbing");
    };
    const suppressClick = (e: MouseEvent) => {
      if (moved.current > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", suppressClick, true);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", suppressClick, true);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <div className="carousel" aria-label="What we do">
      <div className="carousel-scroll" ref={ref}>
        {[0, 1].map((pass) => (
          <div key={pass} className="carousel-set" aria-hidden={pass === 1}>
            {carouselTiles.map((t) => (
              <Link className="svc-tile" href={t.href} key={`${pass}-${t.title}`} draggable={false} tabIndex={pass === 1 ? -1 : 0}>
                <Image src={t.img} alt={t.title} width={600} height={800} sizes="300px" draggable={false} />
                <h3>{t.title}</h3>
                <div className="tile-tags">
                  {t.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
