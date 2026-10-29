import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { LiveHost } from "@/components/events/medical-waste/live/host";

// Host console for live multiplayer rounds (password-protected; not indexed, not in the sitemap).
export const metadata: Metadata = {
  ...seoMeta({ title: "Live Challenge · Host", description: "Host console for the live medical waste segregation game.", path: "/events/moph-medical-waste-challenge/live/", absoluteTitle: true, alternate: false }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LiveHost />;
}
