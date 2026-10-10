"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, serviceLinks as serviceItems } from "@/lib/site";


type Panel = "products" | "services" | null;

export function Nav() {
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPanel = (p: Panel) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(null), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="nav" onMouseLeave={scheduleClose}>
      <div className="nav-pill">
        <Link className="nav-logo" href="/" onMouseEnter={scheduleClose}>
          <Image className="nav-icon" src="/logos/odysense-icon.png" alt="" width={44} height={44} priority />
          Odysense
        </Link>
        <div className="nav-links">
          <button
            className={`nav-drop ${panel === "services" ? "on" : ""}`}
            onMouseEnter={() => openPanel("services")}
            onClick={() => setPanel(panel === "services" ? null : "services")}
            aria-expanded={panel === "services"}
          >
            Services <span aria-hidden="true">▾</span>
          </button>
          <button
            className={`nav-drop ${panel === "products" ? "on" : ""}`}
            onMouseEnter={() => openPanel("products")}
            onClick={() => setPanel(panel === "products" ? null : "products")}
            aria-expanded={panel === "products"}
          >
            Products <span aria-hidden="true">▾</span>
          </button>
          <Link href="/work" onMouseEnter={scheduleClose}>
            Work
          </Link>
          <Link href="/blog" onMouseEnter={scheduleClose}>
            Blog
          </Link>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link className="nav-cta" href="/contact" onMouseEnter={scheduleClose}>
            Start a project
          </Link>
          <button
            className="burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-head">
            <span className="nav-logo">
              <Image className="nav-icon" src="/logos/odysense-icon.png" alt="" width={44} height={44} />
              Odysense
            </span>
            <button className="popup-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <div className="mobile-menu-body">
            <span className="mono">Services</span>
            {serviceItems.map((sv) => (
              <Link href={sv.href} key={sv.href} onClick={() => setMobileOpen(false)}>{sv.label}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>Products</span>
            {products.map((p) => (
              <Link href={p.slug} key={p.slug} onClick={() => setMobileOpen(false)}>{p.name}</Link>
            ))}
            <span className="mono" style={{ marginTop: 22 }}>Company</span>
            <Link href="/work" onClick={() => setMobileOpen(false)}>Work</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link className="btn btn-primary" style={{ marginTop: 26, justifyContent: "center" }} href="/contact" onClick={() => setMobileOpen(false)}>
              Start a project →
            </Link>
          </div>
        </div>
      )}

      {/* Mega menus stay in the server HTML (hidden until opened) so crawlers that don't run JS still see the links. */}
      <div className="mega" hidden={panel !== "products"} onMouseEnter={() => openPanel("products")}>
        <div className="mega-grid">
          <div className="mega-items">
            {products.map((p) => (
              <Link className="mega-item" href={p.slug} key={p.slug} onClick={() => setPanel(null)}>
                <span className="mega-ico">
                  <Image src={p.logo!} alt="" width={56} height={56} />
                </span>
                <span>
                  <b>{p.name}</b>
                  <small>{p.chip}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link className="mega-feature" href="/products/wasl" onClick={() => setPanel(null)}>
            <Image src="/images/shot-wasl-chat.webp" alt="WASL live on WhatsApp" width={612} height={576} />
            <b>
              WASL <span className="serif">— WhatsApp at scale.</span>
            </b>
            <small>Official API, AI inbox, broadcasts & notifications</small>
          </Link>
        </div>
      </div>

      <div className="mega" hidden={panel !== "services"} onMouseEnter={() => openPanel("services")}>
        <div className="mega-grid">
          <div className="mega-items">
            {serviceItems.map((s) => (
              <Link className="mega-item" href={s.href} key={s.href} onClick={() => setPanel(null)}>
                <span>
                  <b>{s.label}</b>
                  <small>{s.desc}</small>
                </span>
              </Link>
            ))}
          </div>
          <Link className="mega-feature" href="/ecommerce-development-company-qatar" onClick={() => setPanel(null)}>
            <Image src="/images/ecom-packages.webp" alt="E-commerce by Odysense" width={1200} height={673} />
            <b>
              E-commerce <span className="serif">— our specialty.</span>
            </b>
            <small>Stores that carry your brand's standard and convert</small>
          </Link>
        </div>
      </div>
    </nav>
  );
}
