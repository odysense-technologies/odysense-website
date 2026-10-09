import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Link from "next/link";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";
import { Arcade } from "@/components/arcade/arcade";
import { site } from "@/lib/site";
import { RelatedPosts } from "@/components/related-posts";

const PATH = "/gamification-brand-activation-qatar/";

export const metadata: Metadata = seoMeta({
  title: "Gamification & Brand Activation Agency in Qatar",
  description: "Event games, live quizzes, polls and interactive booth activations for exhibitions, launches and malls in Qatar & the GCC — branded, bilingual and built to capture consented leads.",
  path: PATH,
});

const NUMERALS = ["i.", "ii.", "iii.", "iv.", "v.", "vi.", "vii.", "viii."];

const builds = [
  { h: "QR-launched mobile games", p: "Guests scan a code and play in their phone browser — no app download, no friction at the booth." },
  { h: "Touchscreen & kiosk games", p: "Branded games for booth screens and tablets that pull people in and keep the queue moving." },
  { h: "Big-screen leaderboards", p: "Live rankings on the venue screen that update as people play, so the whole room watches the race." },
  { h: "Spin-the-wheel & instant win", p: "Prize wheels and instant-win games with prizes and odds you control for each campaign." },
  { h: "Live quizzes & trivia", p: "Timed quiz rounds played on phones at the same moment, scored for speed and accuracy." },
  { h: "Live polls, surveys & forms", p: "Ask the room and show results as they arrive — or collect structured feedback in a few taps." },
  { h: "Audience Q&A & presentations", p: "Questions from the floor, upvoted and moderated, plus interactive slides that let people respond." },
  { h: "Registration & lead capture", p: "Branded sign-up flows with clear consent, so every player becomes a contact you can follow up." },
];

const useCases = [
  { h: "Exhibitions & booths", p: "Give people a reason to stop at your stand. A short game earns attention, and the sign-up before it captures who they are." },
  { h: "Product launches", p: "Turn a launch into something guests take part in — a quiz about the product or a challenge built around its features." },
  { h: "Conferences & corporate events", p: "Live polls, Q&A and quiz breaks keep a long agenda lively and give speakers real-time input from the room." },
  { h: "Mall & retail activations", p: "Spin-to-win and instant-win games drive footfall to a pop-up or store, with prizes redeemed on the spot." },
  { h: "Sports events & fan zones", p: "Prediction games, trivia and big-screen leaderboards that keep fans engaged between the moments that matter." },
  { h: "Seasonal campaigns", p: "Ramadan, Qatar National Day and Eid campaigns with games themed for the occasion, in Arabic and English." },
  { h: "Internal team events", p: "Team quizzes, polls and friendly competitions for town halls, offsites and staff celebrations." },
];

const liveOps = [
  { h: "On-site or remote operators", p: "Our team runs the experience on the day — at the venue, or remotely from Doha, depending on what the event needs." },
  { h: "Moderation", p: "Questions, names and submissions are moderated before they reach a public screen." },
  { h: "Real-time screens", p: "Leaderboards, poll results and Q&A walls on your venue displays, updating as people play." },
  { h: "Event-day support", p: "Technical support on standby throughout the event, so a hiccup never becomes the story." },
];

const dataPoints = [
  { h: "Consented lead capture", p: "Only the fields you choose, with clear opt-in wording at the point of entry." },
  { h: "CSV & CRM export", p: "Leads delivered as a clean export, ready for your CRM or sales team after the event." },
  { h: "WhatsApp follow-ups", p: "Send prize notifications and thank-you messages on WhatsApp through WASL, to people who opted in." },
  { h: "Engagement report", p: "A post-event report covering participation, completion, poll results and leads captured." },
];

const steps = [
  { h: "Brief", p: "Your event, audience, goals and the data you want to leave with." },
  { h: "Concept & game design", p: "Game mechanics, flow, prizes and the lead-capture step, agreed before anything is built." },
  { h: "Branded build", p: "Designed in your identity and built mobile-first, in Arabic and English." },
  { h: "Testing", p: "Tested on real phones, venue screens and the network conditions you'll actually have." },
  { h: "Event-day live ops", p: "Operators, moderation and support while the activation is running." },
  { h: "Leads & insights report", p: "Your consented leads and an engagement report, delivered after the event." },
];

const why = [
  { h: "In-house design & development", p: "The people who design your game are the people who build it — no outsourcing, no handoffs." },
  { h: "Branded to your identity", p: "Every game uses your colours, typography, products and tone. Nothing looks like a template." },
  { h: "Bilingual Arabic/English", p: "Proper right-to-left layouts and Arabic typography, not a translated afterthought." },
  { h: "Mobile-first, no app", p: "Built for the phones your guests already carry, opened from a QR code in seconds." },
  { h: "The team behind WASL & QFlow", p: "We build and run our own products, so we design activations to be reliable under real-world load." },
  { h: "Leads, not just fun", p: "Every activation is planned around what you keep afterwards: consented contacts and clear insight." },
];

const faqs = [
  {
    q: "How much does a gamified activation cost?",
    a: "It depends on scope: the number of games, how much custom design is involved, the screens and devices at the venue, and whether you need our team on site. After a free consultation we give you a fixed quote — request a callback and we'll walk you through the options.",
  },
  {
    q: "How long does it take to build?",
    a: "It depends on scope. We confirm the timeline in your proposal, so you know exactly when you'll see the first version and when testing happens before the event.",
  },
  {
    q: "Do guests need to download an app?",
    a: "No. Our mobile games run in the phone's browser and open from a QR code, so guests can start playing in seconds without installing anything.",
  },
  {
    q: "Can the games be fully branded and in Arabic?",
    a: "Yes. Every game is designed in your brand identity, and we build in Arabic and English with proper right-to-left layouts.",
  },
  {
    q: "What player data can we collect?",
    a: "Only the fields you choose — typically name, mobile number or email — captured with clear opt-in consent before anyone plays. You receive the leads as an export after the event, and we can send WhatsApp follow-ups through WASL to people who opted in. We recommend your legal or compliance team signs off the consent wording.",
  },
  {
    q: "Can you run the activation on the day?",
    a: "Yes. We provide operators on site or remotely, moderate anything shown on public screens, and keep technical support on standby throughout the event.",
  },
  {
    q: "Can we show the leaderboard or poll results on a big screen?",
    a: "Yes. Leaderboards, live poll results and Q&A walls can run on your venue screens and update in real time as people play and vote.",
  },
  {
    q: "Can we reuse the game for future events?",
    a: "Usually, yes. We can build games so that questions, prizes and branding can be updated for your next campaign — tell us in the brief and we'll plan for it.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gamification & Brand Activations",
  serviceType: "Event gamification and brand activation",
  url: `${site.url}${PATH}`,
  description:
    "Interactive games, live quizzes, polls, Q&A and digital brand activations for events, exhibitions, product launches, malls and corporate gatherings, with consented lead capture and post-event reporting.",
  provider: { "@type": "ProfessionalService", "@id": `${site.url}/#organization`, name: site.name },
  areaServed: ["Qatar", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Bahrain", "Oman"].map((name) => ({
    "@type": "Country",
    name,
  })),
};

function Cards({ items, cols = "grid-3" }: { items: { h: string; p: string }[]; cols?: string }) {
  return (
    <Reveal className={cols}>
      {items.map((it, i) => (
        <div className="card" key={it.h}>
          <span className="num">{NUMERALS[i]}</span>
          <h3>{it.h}</h3>
          <p>{it.p}</p>
        </div>
      ))}
    </Reveal>
  );
}

export default function GamificationPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Gamification" }]}
        title={
          <>
            Gamification &amp; brand activations <span className="serif">in Qatar.</span>
          </>
        }
        lede="Interactive games, live quizzes, polls and Q&A for events, exhibitions, launches and malls across Qatar and the GCC. We design, build and run them in your brand — and every activation leaves you with consented leads and a report on how people engaged."
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contact">
            Get a free consultation →
          </Link>
          <a className="btn btn-secondary" href="#demos">
            Play a demo
          </a>
        </div>
      </PageHero>

      {/* What we build */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="What we build"
            title={
              <>
                Games and live engagement, <span className="serif">built for the room.</span>
              </>
            }
          >
            From a single spin-to-win at a booth to a full conference engagement layer — designed, built and run by one
            team.
          </SectionHead>
          <Cards items={builds} cols="grid-4" />
        </div>
      </section>

      {/* Use cases */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker="Where it works"
            title={
              <>
                Made for every kind <span className="serif">of gathering.</span>
              </>
            }
          />
          <Reveal className="grid-4">
            {useCases.map((u, i) => (
              <div className="card" key={u.h}>
                <span className="num">{NUMERALS[i]}</span>
                <h3>{u.h}</h3>
                <p>{u.p}</p>
              </div>
            ))}
            <Link className="card card--cta" href="/contact">
              <span className="num serif">→</span>
              <h3>Something else in mind?</h3>
              <p>Tell us about your event and audience — we&apos;ll suggest the format that fits.</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Demos */}
      <section className="section quote-sec" id="demos">
        <div className="wrap">
          <SectionHead
            kicker="Play a demo"
            title={
              <>
                Try it yourself, <span className="serif">right here.</span>
              </>
            }
          >
            Five small demos of formats we build. At your event they&apos;d carry your brand, your prizes and your
            questions — and run across phones and screens at once.
          </SectionHead>
          <Reveal>
            <Arcade />
          </Reveal>
          <Reveal>
            <p className="arc-after">
              Imagine this in your brand colours at your next event — <Link href="/contact">book a free consultation</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Live ops */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="Live event management"
            title={
              <>
                We don&apos;t just hand it over. <span className="serif">We run it.</span>
              </>
            }
          >
            On event day, our team keeps the experience running so yours can focus on the guests.
          </SectionHead>
          <Cards items={liveOps} cols="grid-4" />
        </div>
      </section>

      {/* Data */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker="The data you keep"
            title={
              <>
                Every player, <span className="serif">a lead you can follow up.</span>
              </>
            }
          >
            Activations are planned around what you leave with — and follow-up runs on WhatsApp through{" "}
            <Link href="/products/wasl" style={{ textDecoration: "underline" }}>
              WASL
            </Link>
            , our official WhatsApp Business platform.
          </SectionHead>
          <Cards items={dataPoints} cols="grid-4" />
          <Reveal>
            <p className="gam-note">
              <b>On consent and privacy:</b> we only collect what you ask for, players opt in before they play, and the
              data is used for the follow-up they agreed to. Demo games on this page collect nothing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section quote-sec">
        <div className="wrap">
          <SectionHead
            kicker="Process"
            title={
              <>
                From brief <span className="serif">to leads report.</span>
              </>
            }
          />
          <Cards items={steps} />
        </div>
      </section>

      {/* Why */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="Why Odysense"
            title={
              <>
                A software company <span className="serif">behind every game.</span>
              </>
            }
          />
          <Cards items={why} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--flush-top">
        <div className="wrap">
          <SectionHead
            kicker="Questions"
            title={
              <>
                Before you plan <span className="serif">your activation.</span>
              </>
            }
          />
          <Reveal>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 48 }}>
              <Link className="btn btn-secondary" href="/products/wasl">
                WASL — WhatsApp platform →
              </Link>
              <Link className="btn btn-secondary" href="/digital-marketing-agency-qatar">
                Digital marketing →
              </Link>
              <Link className="btn btn-secondary" href="/blog/event-gamification-ideas-qatar">
                Event gamification ideas →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPosts href="/gamification-brand-activation-qatar" />

      {/* CTA */}
      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  Make your next event <span className="serif">the one they play.</span>
                </>
              }
              body="Tell us about the event, the audience and what you want to leave with. We'll come back with a concept and a fixed quote after a free consultation."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
