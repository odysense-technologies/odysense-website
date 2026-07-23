"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Shot = { src: string; w: number; h: number; caption: string };

/**
 * Auto-scrolling, draggable screenshot carousel.
 * Click (without drag) opens the full-resolution image in a lightbox.
 */
export function ShotCarousel({ shots }: { shots: Shot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const dragging = useRef(false);
  const moved = useRef(0);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [open, setOpen] = useState<Shot | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const half = () => el.scrollWidth / 2;
    let raf: number;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!paused.current && !dragging.current && !reduce && !open) el.scrollLeft += 0.5;
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
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
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onShotClick = (s: Shot) => {
    if (moved.current > 6) return; // it was a drag, not a click
    setOpen(s);
  };

  return (
    <>
      <div className="shot-car" ref={ref}>
        {[0, 1].map((pass) => (
          <div key={pass} className="shot-car-set" aria-hidden={pass === 1}>
            {shots.map((s) => (
              <button
                className="shot-card"
                key={`${pass}-${s.src}`}
                onClick={() => onShotClick(s)}
                tabIndex={pass === 1 ? -1 : 0}
                aria-label={`View: ${s.caption}`}
              >
                <Image src={s.src} alt={s.caption} width={s.w} height={s.h} sizes="480px" draggable={false} />
                <span>{s.caption}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <Image src={open.src} alt={open.caption} width={open.w} height={open.h} sizes="92vw" />
            <figcaption>{open.caption}</figcaption>
          </figure>
          <button className="popup-close" onClick={() => setOpen(null)} aria-label="Close">
            ✕
          </button>
        </div>
      )}
    </>
  );
}
