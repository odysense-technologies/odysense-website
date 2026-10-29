import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { LivePlayer } from "@/components/events/medical-waste/live/player";

// Attendees land here from the QR code (?room=1234) and play on their phones.
export const metadata: Metadata = {
  ...seoMeta({ title: "Join the Medical Waste Live Challenge", description: "Join the live medical waste segregation game on your phone.", path: "/events/moph-medical-waste-challenge/join/", absoluteTitle: true, alternate: false }),
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  return <LivePlayer initialRoom={/^\d{4}$/.test(room ?? "") ? room! : ""} />;
}
