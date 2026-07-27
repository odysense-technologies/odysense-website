"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * GA4 via gtag. Activates only when NEXT_PUBLIC_GA_ID is set
 * (Vercel → Project → Settings → Environment Variables).
 * Use the Measurement ID (G-XXXXXXXXXX) from GA4 Admin → Data Streams,
 * NOT the numeric property ID.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXE190R73Z";
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}


/** Fire a GA4 event (no-op if gtag isn't loaded). */
export function track(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params ?? {});
}

/** Tracks clicks on any WhatsApp link (wa.link / wa.me / api.whatsapp.com) site-wide. */
export function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (/wa\.link|wa\.me|api\.whatsapp\.com/.test(href)) {
        track("whatsapp_click", { link_url: href, page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
