"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide chrome (nav, consultation popup, footer) for normal pages. Client event pages under
 * /events/ run as full-screen kiosks at conferences, so they render without it.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path?.startsWith("/events/")) return null;
  return <>{children}</>;
}
