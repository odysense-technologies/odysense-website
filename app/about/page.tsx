import type { Metadata } from "next";
import { seoMeta } from "@/lib/seo";
import Image from "next/image";
import { Reveal, SectionHead, CtaBox, PageHero } from "@/components/ui";

export const metadata: Metadata = seoMeta({
  title: "About — A Digital Studio at Qatar Science & Technology Park",
  description: "Odysense is a digital agency and software company at Qatar Science & Technology Park — a studio that thinks like an owner, bringing strategy, design, development and growth to GCC brands.",
  path: "/about/",
});

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
            A studio that thinks <span className="serif">like an owner.</span>
          </>
        }
        lede="Odysense works from the Innovation Centre at Qatar Science & Technology Park, and it is two things at once: a digital agency trusted by 20+ organizations a year — from F&B to banking to the European Union's delegation in Qatar — and a software company whose own products run businesses across the region every day."
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="stat-row">
            <div className="stat">
              <b>
                7<span className="serif"> products</span>
              </b>
              <span>built and run in-house — headquartered at Qatar Science &amp; Technology Park</span>
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


      <section className="section section--flush-top">
        <div className="wrap">
          <Reveal>
            <div className="img-inline">
              <Image src="/images/about-workspace.webp" alt="The Odysense workspace" width={1200} height={670} sizes="(max-width: 920px) 100vw, 1200px" />
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
                  Your next launch starts <span className="serif">with one brief.</span>
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
