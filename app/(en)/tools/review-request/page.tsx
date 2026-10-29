import type { Metadata } from "next";
import { ReviewRequestTool } from "@/components/review-tool";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Review Request Generator",
  description: "Internal tool.",
  robots: { index: false, follow: false }, // internal — never indexed
};

export default function Page() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Tools" }, { label: "Review Requests" }]}
        title={<>Ask for a <span className="serif">Google review.</span></>}
        lede="Pick a client, personalize, and copy a ready-to-send WhatsApp message with your Google review link. Reviews are the single biggest lever for local search visibility."
      />
      <section className="section">
        <div className="wrap">
          <ReviewRequestTool />
        </div>
      </section>
    </main>
  );
}
