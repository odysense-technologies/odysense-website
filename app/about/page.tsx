import type { Metadata } from "next";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — A Digital Studio in Doha, Since 2013",
  description:
    "Odysense is a digital agency and software company at Qatar Science & Technology Park — 12+ years of strategy, design, development and growth for GCC brands.",
  alternates: { canonical: "/about/" },
};

const values = [
  { h: "Forward-thinking", p: "We craft solutions with tomorrow in mind — seamless, scalable experiences that stay ahead of digital trends." },
  { h: "User-centric", p: "We design for people. Every layout, interaction and line of code is driven by user needs and behaviors." },
  { h: "Bold & adaptive", p: "We don't shy away from new technologies or unconventional ideas. Staying flexible lets us deliver cutting-edge solutions." },
  { h: "Reliable execution", p: "From planning to launch, we're transparent, efficient and committed to helping you thrive." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            A studio built on <span className="serif">twelve years of shipping.</span>
          </>
        }
        lede="Odysense started in Doha in 2013 and grew into two things at once: a digital agency trusted by 20+ organizations a year — from F&B to banking to the European Union's delegation in Qatar — and a software company whose own products run businesses across the region every day."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="stat-row">
            <div className="stat">
              <b>2013</b>
              <span>founded in Doha — headquartered at Qatar Science &amp; Technology Park</span>
            </div>
            <div className="stat">
              <b>
                20<span className="serif">+</span>
              </b>
              <span>diverse clients per year across F&amp;B, technology, banking and more</span>
            </div>
            <div className="stat">
              <b>
                Both<span className="serif"> sides</span>
              </b>
              <span>agency craft and product ownership — we build for clients like we build for ourselves</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top quote-sec">
        <div className="wrap">
          <SectionHead
            kicker="How we work"
            title={
              <>
                What we <span className="serif">believe.</span>
              </>
            }
          />
          <Reveal className="grid-2">
            {values.map((v, i) => (
              <div className="card" key={v.h}>
                <span className="num">{["i.", "ii.", "iii.", "iv."][i]}</span>
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <CtaBox
              title={
                <>
                  The next twelve years start <span className="serif">with one brief.</span>
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
