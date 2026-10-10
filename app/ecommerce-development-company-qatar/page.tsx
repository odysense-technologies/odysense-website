import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import { caseStudies } from "@/lib/case-studies";
import { RelatedPosts } from "@/components/related-posts";
import { gatewayList } from "@/lib/site";

export const metadata: Metadata = seoMeta({
  title: "E-commerce Development Company in Qatar",
  description: "Odysense builds high-performing online stores for brands in Qatar & the GCC — WooCommerce, Shopify and custom builds with local payment gateways, from Doha.",
  path: "/ecommerce-development-company-qatar/",
});

const faqs = [
  {
    q: "How much does an e-commerce website cost in Qatar?",
    a: "A launch-ready store with custom design — including one year of domain registration and one year of hosting — typically costs QAR 8,000–10,000. More advanced stores cost more depending on features and design, and every project starts with a fixed, itemized quote. Every Odysense e-commerce build also includes Store Portal, our store management platform, free for the first year.",
  },
  {
    q: "Which payment gateways do you integrate for Qatar and KSA?",
    a: `In Qatar we integrate ${gatewayList("Qatar")}. For Saudi Arabia we integrate ${gatewayList("Saudi Arabia")}. If you need a gateway that isn't listed, we can integrate that too. We advise on the right mix for your market and handle the full technical setup and testing.`,
  },
  {
    q: "WooCommerce, Shopify or a custom build — which should I choose?",
    a: "WooCommerce suits brands that want full ownership and flexibility at low running cost. Shopify suits teams that want managed simplicity and fast scaling. Custom/headless builds suit high-traffic or unusual requirements. We've shipped all three — we'll recommend based on your catalogue, team and growth plans, not on what's easiest for us.",
  },
  {
    q: "How long does it take to launch an online store?",
    a: "A well-scoped store typically launches in 4–8 weeks: discovery and design first, then build, payment testing and content. Complex catalogues, custom features or bilingual content extend that. You'll get a concrete timeline with milestones before we start.",
  },
  {
    q: "Do you support Arabic and right-to-left layouts?",
    a: "Yes — we build stores bilingual-ready from day one, with proper RTL layouts, Arabic typography and localized checkout, so adding Arabic later is a content task rather than a rebuild.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. Odysense offers ongoing care: performance monitoring, updates, conversion optimization and growth work (SEO, ads, analytics). Many of our client relationships run for years past the first launch.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EcommercePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "E-commerce" }]}
        title={
          <>
            E-commerce development <span className="serif">in Qatar.</span>
          </>
        }
        lede="Online stores that carry your brand's standard and convert its visitors — WooCommerce, Shopify and custom builds with the payment gateways GCC customers trust. Built in Doha, at Qatar Science & Technology Park."
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Get a fixed quote →
          </Link>
          <Link className="btn btn-secondary" href="/work">
            See our stores
          </Link>
        </div>
      </PageHero>

      {/* Proof strip */}
      <section className="section">
        <div className="wrap">
          <Reveal className="stat-row">
            <div className="stat">
              <b>
                20<span className="serif">+</span>
              </b>
              <span>clients every year across Qatar &amp; the GCC</span>
            </div>
            <div className="stat">
              <b>3</b>
              <span>platforms mastered — WooCommerce, Shopify &amp; custom</span>
            </div>
            <div className="stat">
              <b>
                E-commerce<span className="serif"> first</span>
              </b>
              <span>our deepest specialty — stores like Eleganza, Rafea Line &amp; Sharqiyat Line</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker="What's included"
            title={
              <>
                Everything a store needs <span className="serif">to sell.</span>
              </>
            }
          >
            One team handles the whole build — no juggling separate designers, developers and payment consultants.
          </SectionHead>
          <Reveal className="grid-3">
            <div className="card">
              <span className="num">i.</span>
              <h3>Store design</h3>
              <p>Custom storefront design around your catalogue and brand — not a template with your logo on it.</p>
            </div>
            <div className="card">
              <span className="num">ii.</span>
              <h3>Development</h3>
              <p>Fast, secure builds on WooCommerce, Shopify or custom stacks — engineered for mobile-first GCC shoppers.</p>
            </div>
            <div className="card">
              <span className="num">iii.</span>
              <h3>Local payments</h3>
              <p>MyFatoorah, Tap, PayTabs, SADAD, QNB and more across the GCC — integrated, tested and reconciled.</p>
            </div>
            <div className="card">
              <span className="num">iv.</span>
              <h3>WhatsApp commerce</h3>
              <p>Order notifications, support and re-engagement on WhatsApp via our own WASL platform.</p>
            </div>
            <div className="card">
              <span className="num">v.</span>
              <h3>Bilingual-ready</h3>
              <p>Arabic/English architecture with proper RTL from day one — adding a language is a content task, not a rebuild.</p>
            </div>
            <div className="card">
              <span className="num">vi.</span>
              <h3>SEO &amp; analytics</h3>
              <p>Technical SEO, structured data and conversion tracking built in — so the store gets found and you see what works.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Imagery */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <div className="img-inline">
              <Image src="/images/ecom-packages.webp" alt="E-commerce order packaging ready for delivery" width={1200} height={673} sizes="(max-width: 920px) 100vw, 1200px" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case studies */}
      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker="Recent stores"
            title={
              <>
                Built by Odysense, <span className="serif">selling today.</span>
              </>
            }
          />
          <Reveal className="cs-grid">
            {caseStudies.filter((c) => c.services.includes("E-commerce")).map((c) => (
              <Link className="cs-card" href={`/work/${c.slug}`} key={c.slug}>
                <div>
                  <span className="mono">
                    {c.industry} · {c.year}
                  </span>
                  <h3>{c.name}</h3>
                  <p>{c.teaser}</p>
                </div>
                <span className="prod-link">Read the case study →</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <RelatedPosts href="/ecommerce-development-company-qatar" limit={6} />

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="Questions"
            title={
              <>
                Before you ask <span className="serif">for a quote.</span>
              </>
            }
          />
          <Reveal>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  Ready to open <span className="serif">your store?</span>
                </>
              }
              body="Tell us about your products and market. You'll get a fixed, itemized quote — usually within two business days."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
