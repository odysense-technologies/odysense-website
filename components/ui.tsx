"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { site, serviceLinks, products } from "@/lib/site";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <b>Odysense</b>
            <p>Digital agency and software company — web design, e-commerce, apps and growth for brands in Qatar and the GCC.</p>
            <address>
              {site.address}
              <br />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </address>
          </div>
          <nav className="footer-col" aria-label="Services">
            <span className="mono">Services</span>
            {serviceLinks.map((s) => (
              <Link href={s.href} key={s.href}>
                {s.label}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label="Products">
            <span className="mono">Products</span>
            {products.map((p) => (
              <Link href={p.slug} key={p.slug}>
                {p.name}
              </Link>
            ))}
          </nav>
          <nav className="footer-col" aria-label="Company">
            <span className="mono">Company</span>
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/services">All services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Odysense — Made in Qatar ❤︎</span>
          <span>Innovation Centre, Qatar Science &amp; Technology Park, Doha</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Section head ---------- */
export function SectionHead({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

/* ---------- CTA box ---------- */
export function CtaBox({
  kicker = "New business",
  title,
  body,
}: {
  kicker?: string;
  title: ReactNode;
  body: string;
}) {
  return (
    <div className="cta-box">
      <div className="orb orb--cta" aria-hidden="true" />
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link className="btn btn-invert" href="/contact">
        Start your project →
      </Link>
    </div>
  );
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  crumbs,
  title,
  lede,
  children,
  breadcrumbSchema = true,
}: {
  crumbs: { label: string; href?: string }[];
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
  /** Emit BreadcrumbList JSON-LD from the crumbs (blog posts pass false and emit their own) */
  breadcrumbSchema?: boolean;
}) {
  const schema = breadcrumbSchema && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && { item: `${site.url}${c.href === "/" ? "/" : `${c.href.replace(/\/$/, "")}/`}` }),
    })),
  };
  return (
    <header className="page-hero">
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <div className="orb" aria-hidden="true" />
      <div className="wrap">
        <nav className="crumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
