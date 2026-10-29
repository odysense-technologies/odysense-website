import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import { MedicalWasteChallenge } from "@/components/events/medical-waste/challenge";

// Client event kiosk (Ministry of Public Health, medical waste management conference, 12 November).
// Not indexed and not in the sitemap; the site nav, footer and popup are hidden on /events/ (SiteChrome).
export const metadata: Metadata = {
  ...seoMeta({
    title: "Medical Waste Segregation Challenge",
    description: "Interactive games on medical waste segregation and safe disposal, based on Ministry of Public Health guidance.",
    path: "/events/moph-medical-waste-challenge/",
    absoluteTitle: true,
    alternate: false,
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MedicalWasteChallenge />;
}
