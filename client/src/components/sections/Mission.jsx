import Reveal from "../Reveal.jsx";
import SectionHeading from "../SectionHeading.jsx";
import { problems, barriers } from "../../lib/content.js";

export default function Mission() {
  return (
    <section id="mission" className="section-pad relative px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Problem"
          title="100 million children"
          highlight="are waiting to be heard"
          sub="Speech, language, and communication challenges affect children everywhere — yet quality therapy stays out of reach for most families."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* Challenges */}
          <Reveal dir="right">
            <div className="glass rounded-3xl p-7">
              <h3 className="mb-5 font-[var(--font-heading)] text-lg font-bold">
                The challenges children face
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {problems.map((p) => (
                  <span
                    key={p}
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-[var(--color-haze)] transition hover:border-[var(--color-violet)]/50 hover:text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-[var(--color-mint)]/20 bg-[var(--color-mint)]/5 p-4 text-sm leading-relaxed text-[var(--color-haze)]">
                <strong className="text-[var(--color-mint)]">
                  Early intervention
                </strong>{" "}
                can dramatically improve outcomes — the earlier we reach a child,
                the brighter their future.
              </p>
            </div>
          </Reveal>

          {/* Barriers */}
          <Reveal dir="left">
            <div className="glass rounded-3xl p-7">
              <h3 className="mb-5 font-[var(--font-heading)] text-lg font-bold">
                Why access stays limited
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {barriers.map((b) => (
                  <div
                    key={b.title}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition hover:-translate-y-1 hover:border-[var(--color-cyan)]/40"
                  >
                    <div className="mb-2 text-2xl transition group-hover:scale-110">
                      {b.icon}
                    </div>
                    <p className="text-xs font-medium leading-snug text-[var(--color-haze)]">
                      {b.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="ring-glow relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-violet-deep)]/30 via-transparent to-[var(--color-cyan)]/20 p-8 text-center sm:p-12">
            <p className="relative font-[var(--font-display)] text-xl font-semibold leading-snug sm:text-2xl">
              We believe{" "}
              <span className="text-gradient">artificial intelligence</span> can
              make speech therapy{" "}
              <span className="text-gradient-gold">
                accessible, affordable, and engaging
              </span>{" "}
              for every child.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
