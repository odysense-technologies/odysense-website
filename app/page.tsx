import type { Metadata } from "next";
import Link from "next/link";
import { seoMeta } from "@/lib/seo";
import Image from "next/image";
import { Reveal, SectionHead, CtaBox } from "@/components/ui";
import { site, services, products, clientLogos, testimonial } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { ServiceCarousel } from "@/components/carousel";

export const metadata: Metadata = seoMeta({
  title: "Odysense — Web Design, E-commerce & Digital Growth in Qatar",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

/** Design & development is the core business, so the homepage leads with it. Prices are the published starting figures. */
const webOffers = [
  { label: "Website design", price: "from QAR 2,000", desc: "Custom, conversion-focused sites for businesses in Qatar and the GCC", href: "/website-design-company-in-qatar" },
  { label: "Website development", price: "fixed quote", desc: "Fast, secure builds on modern technology, from marketing sites to web platforms", href: "/website-development-company-qatar" },
  { label: "E-commerce stores", price: "from QAR 8,000", desc: "WooCommerce, Shopify and custom stores with local payment gateways", href: "/ecommerce-development-company-qatar" },
  { label: "Web apps & software", price: "from QAR 10,000", desc: "Portals, dashboards and SaaS, starting with a focused first release", href: "/software-development-company-qatar" },
];

// Real case-study figures (lib/case-studies.ts), never invented ones.
const proof = [
  { slug: "eleganza", index: 0 },
  { slug: "rafea-line", index: 0 },
  { slug: "eleganza", index: 1 },
].map(({ slug, index }) => {
  const cs = caseStudies.find((c) => c.slug === slug)!;
  return { value: cs.results[index].value, label: cs.results[index].label, name: cs.name, href: `/work/${cs.slug}` };
});

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <header className="hero">
        <div className="orb" aria-hidden="true" />
        <div className="wrap">
          <span className="hero-badge">
            ✦ &nbsp;Digital agency &amp; software company — <b>Qatar Science &amp; Technology Park</b>
          </span>
          <h1>
            Web design, development <span className="serif">&amp; digital growth in Qatar.</span>
          </h1>
          <Reveal>
            <p className="hero-sub">
              We build the brands, websites and products behind ambitious companies across Qatar,
              Saudi Arabia and the Gulf — and the software we sell runs their operations every day.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">
                Start a project →
              </Link>
              <Link className="btn btn-secondary" href="/work">
                See our work
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-logos">
              <span className="mono">Trusted by 20+ organizations every year</span>
              <div className="client-logos">
                {clientLogos.map((c) => (
                  <Image src={c.file} alt={c.name} title={c.name} key={c.file} width={140} height={34} style={{ width: "auto" }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- Service card carousel ---------- */}
      <ServiceCarousel />

      {/* ---------- Web design & development ---------- */}
      <section className="section" id="web">
        <div className="wrap">
          <div className="home-feature">
            <Reveal className="img-frame home-feature-img">
              <Image src="/images/home-webdev.webp" alt="A designer walking past a wall of page layouts and sketches" width={1146} height={1200} sizes="(max-width: 920px) 100vw, 45vw" />
              <span className="img-tag">Web design &amp; development</span>
            </Reveal>
            <Reveal>
              <span className="kicker">Our core work</span>
              <h2>
                Websites and stores <span className="serif">built to sell.</span>
              </h2>
              <p className="home-feature-lede">
                Design and development is what we do most: websites, online stores and web apps for
                businesses in Qatar, Saudi Arabia and the Gulf. The same team plans, designs and builds
                every project, so what you approve is what goes live.
              </p>
              <div className="home-svc-list">
                {webOffers.map((o) => (
                  <Link className="home-svc" href={o.href} key={o.href}>
                    <b>{o.label}</b>
                    <span className="home-svc-price">{o.price}</span>
                    <small>{o.desc}</small>
                  </Link>
                ))}
              </div>
              <div className="hero-actions home-feature-actions">
                <Link className="btn btn-primary" href="/contact">
                  Get a fixed quote →
                </Link>
                <Link className="btn btn-secondary" href="/work">
                  See our work
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="stat-row home-proof">
            {proof.map((p) => (
              <Link className="stat" href={p.href} key={`${p.name}-${p.label}`}>
                <b>{p.value}</b>
                <span>
                  {p.label} · {p.name}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section" id="services">
        <div className="wrap">
          <SectionHead
            kicker="Services"
            title={
              <>
                Strategy to launch to growth, <span className="serif">one team.</span>
              </>
            }
          >
            No handoffs between agencies. The people who define the strategy are the ones who
            design, build and grow it.
          </SectionHead>
          <Reveal className="grid-3">
            {services.map((s) => (
              <Link className="card" href={s.slug} key={s.title}>
                <span className="num">{s.numeral}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>


      {/* ---------- Studio imagery ---------- */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal className="img-band img-band--fixed">
            <div className="img-frame">
              <Image src="/images/home-design.webp" alt="Brand identity covers in yellow, orange and red laid out on a white wall" width={1200} height={801} sizes="(max-width: 920px) 100vw, 40vw" />
              <span className="img-tag">Design</span>
            </div>
            <div className="img-frame">
              <Image src="/images/home-engineering.webp" alt="A developer typing on a laptop at a wooden desk" width={800} height={1200} sizes="(max-width: 920px) 100vw, 30vw" />
              <span className="img-tag">Engineering</span>
            </div>
            <div className="img-frame">
              <Image src="/images/home-growth.webp" alt="Two colleagues reviewing plans together at a sunlit table" width={1200} height={800} sizes="(max-width: 920px) 100vw, 30vw" />
              <span className="img-tag">Growth</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Products (kept brief: the homepage leads with services) ---------- */}
      <section className="section section--flush-top" id="products">
        <div className="wrap">
          <SectionHead
            kicker="Products"
            title={
              <>
                Software we built, <span className="serif">own and run.</span>
              </>
            }
          />
          <Reveal className="prod-mini-grid">
            {products.map((p) => (
              <Link className="prod-mini" href={p.slug} key={p.name}>
                {p.logo && <Image src={p.logo} alt="" width={56} height={56} />}
                <span>
                  <b>{p.name}</b>
                  <small>{p.chip}</small>
                </span>
              </Link>
            ))}
            <Link className="prod-mini prod-mini--all" href="/products">
              <span>
                <b>All products →</b>
                <small>Features, screenshots and pricing</small>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section className="section quote-sec">
        <div className="wrap">
          <Reveal>
            <blockquote className="quote">
              <span className="mark">“</span>
              <p>{testimonial.quote}</p>
              <cite>
                <b>{testimonial.author}</b>
                {testimonial.role}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section" id="contact">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  Your digital journey <span className="serif">starts right here.</span>
                </>
              }
              body="Tell us what you're building. We reply within one business day, from Doha."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
