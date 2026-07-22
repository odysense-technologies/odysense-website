import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import { products, productDetails } from "@/lib/site";

const NUMERALS = ["i.", "ii.", "iii.", "iv."];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug.replace("/products/", "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === `/products/${slug}`);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.chip}`,
    description: p.description,
    alternates: { canonical: `/products/${slug}/` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === `/products/${slug}`);
  const d = productDetails[slug];
  if (!p || !d) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: p.url,
    description: p.description,
    publisher: { "@type": "Organization", name: "Odysense" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: p.name }]}
        title={
          <>
            {p.logo && (
              <Image className="prod-hero-mark" src={p.logo} alt={`${p.name} logo`} width={220} height={64} style={{ display: "block" }} />
            )}
            {p.name}
            <span className="serif">.</span>
          </>
        }
        lede={`${d.tagline} ${p.description}`}
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Request a demo →
          </Link>
          <a className="btn btn-secondary" href={p.url} target="_blank" rel="noopener noreferrer">
            Visit {p.urlLabel}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker={p.chip}
            title={
              <>
                What it <span className="serif">does.</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {d.features.map((f, i) => (
              <div className="card" key={f.h}>
                <span className="num">{NUMERALS[i]}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {d.image && (
        <section className="section section--flush-top">
          <div className="wrap">
            <Reveal>
              <div className="img-inline">
                <Image src={d.image.src} alt={d.image.alt} width={900} height={1200} sizes="(max-width: 920px) 100vw, 900px" style={{ maxHeight: 560, objectFit: "cover", width: "100%" }} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker="Get started"
              title={
                <>
                  {p.name}, <span className="serif">for your business.</span>
                </>
              }
              body={d.cta}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
