"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/components/analytics";
import { ui, type Locale } from "@/lib/i18n";

export const GCC_CODES = [
  { flag: "🇶🇦", code: "+974", label: "Qatar" },
  { flag: "🇸🇦", code: "+966", label: "Saudi Arabia" },
  { flag: "🇦🇪", code: "+971", label: "UAE" },
  { flag: "🇰🇼", code: "+965", label: "Kuwait" },
  { flag: "🇧🇭", code: "+973", label: "Bahrain" },
  { flag: "🇴🇲", code: "+968", label: "Oman" },
  { flag: "🌍", code: "+", label: "Other" },
];

async function submitLead(payload: Record<string, string>, fallbackError: string) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, page: window.location.pathname }),
  });
  const data = await res.json().catch(() => ({ ok: false }));
  if (!res.ok || !data.ok) throw new Error(data.error || fallbackError);
}

function PhoneField({ required = false, locale }: { required?: boolean; locale: Locale }) {
  const t = ui(locale).form;
  return (
    <div className="form-row form-phone">
      <select name="countryCode" defaultValue="+974" aria-label={t.code}>
        {GCC_CODES.map((c, i) => (
          <option key={c.label} value={c.code}>
            {c.flag} {c.code} {t.countries[i]}
          </option>
        ))}
      </select>
      <input type="tel" name="phone" placeholder={t.phone} required={required} inputMode="tel" dir="ltr" />
    </div>
  );
}

/* ================= Contact form (contact page) ================= */
export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = ui(locale).form;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    setState("sending");
    try {
      await submitLead({ ...payload, type: "contact", lang: locale }, t.error);
      track("generate_lead", { form: "contact", service: payload.service ?? "", lang: locale });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="form-success">
        <span className="serif" style={{ fontSize: 30 }}>
          {t.thanks}
        </span>
        <p>{t.thanksBody}</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <input name="name" placeholder={t.name} required autoComplete="name" />
        <input type="email" name="email" placeholder={t.email} required autoComplete="email" dir="ltr" />
        <PhoneField locale={locale} />
        <input name="company" placeholder={t.company} autoComplete="organization" />
        <select name="service" defaultValue="" required aria-label={t.need.replace(" *", "")}>
          <option value="" disabled>
            {t.need}
          </option>
          {t.services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea name="message" placeholder={t.message} rows={5} required />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {state === "error" && <p className="form-error">{error}</p>}
      <button className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.send}
      </button>
      <p className="form-note">{t.note}</p>
    </form>
  );
}

/* ================= Exit-intent consultation popup ================= */
export function ConsultPopup({ locale = "en" }: { locale?: Locale }) {
  const t = ui(locale).popup;
  const f = ui(locale).form;
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
      await submitLead({ ...payload, type: "callback", lang: locale }, f.error);
      track("callback_request", { form: "exit_popup", lang: locale });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : f.error);
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label={t.aria}>
      <div className="popup">
        <button className="popup-close" onClick={() => setOpen(false)} aria-label={t.close}>
          ✕
        </button>
        {state === "done" ? (
          <div className="form-success" style={{ padding: 0, border: "none" }}>
            <span className="serif" style={{ fontSize: 28 }}>
              {t.done}
            </span>
            <p>{t.doneBody}</p>
          </div>
        ) : (
          <>
            <span className="kicker">{t.kicker}</span>
            <h3>
              {t.title} <span className="serif">{t.accent}</span>
            </h3>
            <p>{t.body}</p>
            <form className="lead-form" onSubmit={onSubmit}>
              <input name="name" placeholder={f.name} required autoComplete="name" />
              <PhoneField required locale={locale} />
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              {state === "error" && <p className="form-error">{error}</p>}
              <button className="btn btn-primary" disabled={state === "sending"} style={{ width: "100%" }}>
                {state === "sending" ? f.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
