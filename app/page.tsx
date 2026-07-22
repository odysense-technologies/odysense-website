import Link from "next/link";
import { Reveal, SectionHead, CtaBox } from "@/components/ui";
import { services, products, clients, marqueeWords, testimonial } from "@/lib/site";

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <header className="hero">
        <div className="orb" aria-hidden="true" />
        <div className="wrap">
          <span className="hero-badge">
            ✦ &nbsp;Digital agency &amp; software company — <b>Doha, since 2013</b>
          </span>
          <h1>
            Design, development <span className="serif">&amp; digital growth.</span>
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
              <Link className="btn btn-secondary" href="/products">
                Explore products
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="hero-logos">
              <span className="mono">Trusted by 20+ organizations every year</span>
              <div className="logo-row">
                {clients.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---------- Capability marquee ---------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((pass) => (
            <span key={pass}>
              {marqueeWords.map((w) => (
                <span key={`${pass}-${w.text}`} className={w.serif ? "serif" : undefined}>
                  {w.text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

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

      {/* ---------- Products ---------- */}
      <section className="section section--flush-top" id="products">
        <div className="wrap">
          <SectionHead
            kicker="Products"
            title={
              <>
                Software we built, <span className="serif">own and run.</span>
              </>
            }
          >
            Proven platforms already serving restaurants, clinics and enterprises across the region
            — ready to run yours.
          </SectionHead>
          <Reveal className="grid-2">
            {products.map((p) => (
              <Link className="prod" href={p.slug} key={p.name}>
                <div>
                  <div className="prod-top">
                    <h3>{p.name}</h3>
                    <span className={`chip chip--${p.chipColor}`}>{p.chip}</span>
                  </div>
                  <p>{p.description}</p>
                </div>
                <span className="prod-link">{p.urlLabel} →</span>
              </Link>
            ))}
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
