"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export const GCC_CODES = [
  { flag: "🇶🇦", code: "+974", label: "Qatar" },
  { flag: "🇸🇦", code: "+966", label: "Saudi Arabia" },
  { flag: "🇦🇪", code: "+971", label: "UAE" },
  { flag: "🇰🇼", code: "+965", label: "Kuwait" },
  { flag: "🇧🇭", code: "+973", label: "Bahrain" },
  { flag: "🇴🇲", code: "+968", label: "Oman" },
  { flag: "🌍", code: "+", label: "Other" },
];

const SERVICES = [
  "Website design & development",
  "E-commerce store",
  "Software or mobile app",
  "Branding",
  "SEO & digital marketing",
  "WhatsApp Business API (WASL)",
  "Other",
];

async function submitLead(payload: Record<string, string>) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, page: window.location.pathname }),
  });
  const data = await res.json().catch(() => ({ ok: false }));
  if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
}

function PhoneField({ required = false }: { required?: boolean }) {
  return (
    <div className="form-row form-phone">
      <select name="countryCode" defaultValue="+974" aria-label="Country code">
        {GCC_CODES.map((c) => (
          <option key={c.label} value={c.code}>
            {c.flag} {c.code} {c.label}
          </option>
        ))}
      </select>
      <input type="tel" name="phone" placeholder="Mobile number" required={required} inputMode="tel" />
    </div>
  );
}

/* ================= Contact form (contact page) ================= */
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    setState("sending");
    try {
      await submitLead({ ...payload, type: "contact" });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="form-success">
        <span className="serif" style={{ fontSize: 30 }}>
          Thank you.
        </span>
        <p>Your enquiry is with us — expect a reply within one business day.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <input name="name" placeholder="Your name *" required autoComplete="name" />
        <input type="email" name="email" placeholder="Email *" required autoComplete="email" />
        <PhoneField />
        <input name="company" placeholder="Company (optional)" autoComplete="organization" />
        <select name="service" defaultValue="" required aria-label="What do you need?">
          <option value="" disabled>
            What do you need? *
          </option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea name="message" placeholder="Tell us about the project *" rows={5} required />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {state === "error" && <p className="form-error">{error}</p>}
      <button className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry →"}
      </button>
      <p className="form-note">We reply within one business day. Your details stay with us — no spam, ever.</p>
    </form>
  );
}

/* ================= Exit-intent consultation popup ================= */
export function ConsultPopup() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const armed = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("consultShown")) return;
    const armTimer = setTimeout(() => (armed.current = true), 6000); // don't fire instantly
    const onLeave = (e: MouseEvent) => {
      if (!armed.current || e.clientY > 0 || sessionStorage.getItem("consultShown")) return;
      sessionStorage.setItem("consultShown", "1");
      setOpen(true);
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    setState("sending");
    try {
      await submitLead({ ...payload, type: "callback" });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Free technical consultation">
      <div className="popup">
        <button className="popup-close" onClick={() => setOpen(false)} aria-label="Close">
          ✕
        </button>
        {state === "done" ? (
          <div className="form-success" style={{ padding: 0, border: "none" }}>
            <span className="serif" style={{ fontSize: 28 }}>
              We'll call you.
            </span>
            <p>Expect a call from our Doha team within one business day.</p>
          </div>
        ) : (
          <>
            <span className="kicker">Before you go</span>
            <h3>
              Get a free <span className="serif">technical consultation.</span>
            </h3>
            <p>
              15 minutes with our team — honest advice on your website, store or idea. No pitch, no obligation. Leave
              your number and we'll call you back.
            </p>
            <form className="lead-form" onSubmit={onSubmit}>
              <input name="name" placeholder="Your name *" required autoComplete="name" />
              <PhoneField required />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              {state === "error" && <p className="form-error">{error}</p>}
              <button className="btn btn-primary" disabled={state === "sending"} style={{ width: "100%" }}>
                {state === "sending" ? "Sending…" : "Request my free callback →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
