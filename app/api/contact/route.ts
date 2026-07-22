import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Lead capture endpoint. Receives contact-form and callback-popup submissions.
 * - Emails the lead via Resend (RESEND_API_KEY env var — server-side only)
 * - Stores the lead in Vercel Postgres when a database is connected
 *   (Vercel → Storage → Create Database → Postgres; env vars auto-injected)
 *
 * SECURITY: never expose RESEND_API_KEY to the client. It must only exist
 * as a Vercel environment variable — never committed to the repository.
 */

const TO = process.env.CONTACT_TO ?? "contact@odysense.com";
// After verifying odysense.com in Resend, set CONTACT_FROM="Odysense Website <leads@odysense.com>"
const FROM = process.env.CONTACT_FROM ?? "Odysense Website <onboarding@resend.dev>";

type Lead = {
  type?: "contact" | "callback";
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  website?: string; // honeypot
  page?: string;
};

function esc(s: string) {
  return s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));
}

async function storeLead(lead: Lead) {
  if (!process.env.POSTGRES_URL) return; // storage not configured yet — email still goes out
  try {
    const { sql } = await import("@vercel/postgres");
    await sql`CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      type TEXT, name TEXT, email TEXT, phone TEXT,
      company TEXT, service TEXT, message TEXT, page TEXT
    )`;
    await sql`INSERT INTO leads (type, name, email, phone, company, service, message, page)
      VALUES (${lead.type ?? "contact"}, ${lead.name ?? ""}, ${lead.email ?? ""},
              ${`${lead.countryCode ?? ""} ${lead.phone ?? ""}`.trim()},
              ${lead.company ?? ""}, ${lead.service ?? ""}, ${lead.message ?? ""}, ${lead.page ?? ""})`;
  } catch (e) {
    console.error("Lead storage failed (email still sent):", e);
  }
}

export async function POST(req: Request) {
  let lead: Lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this
  if (lead.website) return NextResponse.json({ ok: true });

  const isCallback = lead.type === "callback";
  if (!lead.name || (isCallback ? !lead.phone : !lead.email || !lead.message)) {
    return NextResponse.json({ ok: false, error: "Please fill in the required fields." }, { status: 422 });
  }

  const phone = `${lead.countryCode ?? ""} ${lead.phone ?? ""}`.trim();
  const subject = isCallback
    ? `📞 Callback request: ${lead.name} (${phone})`
    : `New website lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`;

  const html = `
    <h2>${isCallback ? "Free consultation callback request" : "New enquiry from odysense.com"}</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${esc(lead.name ?? "")}</td></tr>
      ${lead.email ? `<tr><td><b>Email</b></td><td>${esc(lead.email)}</td></tr>` : ""}
      ${phone ? `<tr><td><b>Phone</b></td><td>${esc(phone)}</td></tr>` : ""}
      ${lead.company ? `<tr><td><b>Company</b></td><td>${esc(lead.company)}</td></tr>` : ""}
      ${lead.service ? `<tr><td><b>Interested in</b></td><td>${esc(lead.service)}</td></tr>` : ""}
      ${lead.message ? `<tr><td><b>Message</b></td><td>${esc(lead.message)}</td></tr>` : ""}
      ${lead.page ? `<tr><td><b>From page</b></td><td>${esc(lead.page)}</td></tr>` : ""}
    </table>`;

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: lead.email || undefined,
      subject,
      html,
    });
    if (error) throw error;
  } catch (e) {
    console.error("Resend send failed:", e);
    await storeLead(lead); // still try to keep the lead
    return NextResponse.json(
      { ok: false, error: "Could not send right now — please WhatsApp or email us directly." },
      { status: 500 }
    );
  }

  await storeLead(lead);
  return NextResponse.json({ ok: true });
}
