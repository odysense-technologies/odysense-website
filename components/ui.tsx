"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

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

/* ---------- Nav ---------- */
export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-pill">
        <Link className="nav-logo" href="/">
          <span className="dot" />
          Odysense
        </Link>
        <div className="nav-links">
          <Link href="/services">Services</Link>
          <Link href="/products">Products</Link>
          <Link href="/work">Work</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <Link className="nav-cta" href="/contact">
          Start a project
        </Link>
      </div>
    </nav>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div
        className="wrap"
        style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 12 }}
      >
        <span>© {new Date().getFullYear()} Odysense — Made in Qatar ❤︎</span>
        <span>{site.address}</span>
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
      <a className="btn btn-invert" href={`mailto:${site.email}`}>
        {site.email}
      </a>
    </div>
  );
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  crumbs,
  title,
  lede,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-hero">
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
