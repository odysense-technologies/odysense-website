import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { LiveScreen } from "@/components/events/medical-waste/live/screen";

// Big-screen live leaderboard for a projector or TV (?room=1234).
export const metadata: Metadata = {
  ...seoMeta({ title: "Live Leaderboard · Medical Waste Challenge", description: "Live leaderboard for the medical waste segregation game.", path: "/events/moph-medical-waste-challenge/screen/", absoluteTitle: true }),
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  return <LiveScreen initialRoom={/^\d{4}$/.test(room ?? "") ? room! : ""} />;
}
