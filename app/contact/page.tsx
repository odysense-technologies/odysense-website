import type { Metadata } from "next";
import { Reveal, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/lead-forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Start a project with Odysense. Email, WhatsApp or visit us at Qatar Science & Technology Park, Doha. We reply within one business day.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let's start <span className="serif">the conversation.</span>
          </>
        }
        lede="Tell us what you're building — a website, a store, software or a brand. You'll hear back within one business day, from Doha."
      />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="contact-layout">
              <ContactForm />
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <a className="card" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <span className="num">i.</span>
              <h3>WhatsApp</h3>
              <p>The fastest way — message us and we'll pick it up during Doha business hours, often sooner.</p>
              <ul>
                <li>Chat now →</li>
              </ul>
            </a>
            <a className="card" href={`mailto:${site.email}`}>
              <span className="num">ii.</span>
              <h3>Email</h3>
              <p>{site.email} — briefs, RFPs and documents welcome. Fixed quotes usually within two business days.</p>
              <ul>
                <li>Write to us →</li>
              </ul>
            </a>
            <div className="card">
              <span className="num">iii.</span>
              <h3>Visit</h3>
              <p>{site.address}</p>
              <ul>
                <li>{site.phone}</li>
              </ul>
            </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
