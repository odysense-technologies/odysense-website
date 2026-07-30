"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Top-of-page progress bar + click feedback.
 * Next's App Router client navigation is fast but not instant on first load of
 * a route; this shows an immediate indicator the moment a link is clicked, so
 * users don't re-click. The bar completes when the pathname actually changes.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Start on any internal link click (capture phase = fires before navigation)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const target = a.getAttribute("target");
      // internal, same-tab links only
      if (href.startsWith("/") && !href.startsWith("//") && target !== "_blank") {
        const dest = href.split("#")[0].replace(/\/$/, "");
        const here = pathname.replace(/\/$/, "");
        if (dest !== here) setLoading(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // Animate the bar while loading
  useEffect(() => {
    if (!loading) return;
    setProgress(12);
    let p = 12;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 14, 88); // creep toward, never reach, 100
      setProgress(p);
    }, 220);
    return () => clearInterval(iv);
  }, [loading]);

  // Pathname changed → navigation finished → complete and hide
  useEffect(() => {
    setProgress(100);
    const t = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 260);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className={`route-loader ${loading ? "on" : ""}`} aria-hidden="true">
      <div className="route-loader-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
