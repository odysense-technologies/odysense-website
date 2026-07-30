"use client";

import { useState } from "react";

/**
 * Internal review-request generator.
 * 1. Set your Google review short link once (Business Profile → Ask for reviews → copy link).
 * 2. Enter a client name + optional project, pick a tone, copy the message, send on WhatsApp.
 */
const TEMPLATES = {
  warm: (name: string, project: string, link: string) =>
    `Hi ${name}! 😊 It's been a pleasure working with you${project ? ` on ${project}` : ""}. If you're happy with what we delivered, would you mind leaving us a quick Google review? It genuinely helps a small Qatar business like ours grow. Takes 30 seconds: ${link}\n\nThank you so much — the Odysense team 🙏`,
  brief: (name: string, project: string, link: string) =>
    `Hi ${name}, thank you for trusting Odysense${project ? ` with ${project}` : ""}! A quick Google review would mean a lot and help others find us: ${link}`,
  formal: (name: string, project: string, link: string) =>
    `Dear ${name},\n\nThank you for choosing Odysense${project ? ` for ${project}` : ""}. We'd be grateful if you could share your experience in a short Google review — it helps other businesses in Qatar find and trust us: ${link}\n\nWith appreciation,\nThe Odysense Team`,
};

export function ReviewRequestTool() {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [tone, setTone] = useState<keyof typeof TEMPLATES>("warm");
  const [copied, setCopied] = useState(false);

  const linkOut = link || "https://g.page/r/YOUR-REVIEW-LINK";
  const message = TEMPLATES[tone](name || "there", project, linkOut);

  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const waHref = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <div className="review-tool">
      <div className="review-form">
        <label>
          Your Google review link
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://g.page/r/…  (paste once)" />
          <small>Business Profile → &quot;Ask for reviews&quot; → copy the short link. It&apos;s saved only in this browser session.</small>
        </label>
        <label>
          Client name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fatima" />
        </label>
        <label>
          Project (optional)
          <input value={project} onChange={(e) => setProject(e.target.value)} placeholder="e.g. your new online store" />
        </label>
        <label>
          Tone
          <select value={tone} onChange={(e) => setTone(e.target.value as keyof typeof TEMPLATES)}>
            <option value="warm">Warm &amp; friendly</option>
            <option value="brief">Short &amp; direct</option>
            <option value="formal">Formal</option>
          </select>
        </label>
      </div>
      <div className="review-preview">
        <span className="mono">Message preview</span>
        <pre>{message}</pre>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={copy}>
            {copied ? "Copied ✓" : "Copy message"}
          </button>
          <a className="btn btn-secondary" href={waHref} target="_blank" rel="noopener noreferrer">
            Open in WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
