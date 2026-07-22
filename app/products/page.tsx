import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, CtaBox, PageHero } from "@/components/ui";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — Software Built & Run by Odysense",
  description:
    "WASL, QFlow, Social Bakery and Rehabitt — proven software products built and operated by Odysense, serving businesses across Qatar & the GCC.",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        title={
          <>
            Software we built, <span className="serif">own and run.</span>
          </>
        }
        lede="Not concepts — operating products with real customers. Built in Doha, serving restaurants, retailers, clinics and enterprises across the region."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="grid-2">
            {products.map((p) => (
              <Link className="prod" href={p.slug} key={p.name}>
                <div>
                  <div className="prod-top">
                    {p.logo ? (
                      <Image className="prod-mark" src={p.logo} alt={`${p.name} logo`} width={130} height={40} />
                    ) : (
                      <h3>{p.name}</h3>
                    )}
                    <span className={`chip chip--${p.chipColor}`}>{p.chip}</span>
                  </div>
                  {p.logo && <h3 style={{ marginTop: 14 }}>{p.name}</h3>}
                  <p>{p.description}</p>
                </div>
                <span className="prod-link">Learn more →</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              kicker="Product demos"
              title={
                <>
                  See them <span className="serif">running.</span>
                </>
              }
              body="Tell us which product fits your business — we'll set up a live demo with your own data."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
