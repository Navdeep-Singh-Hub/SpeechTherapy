import Reveal from "../Reveal.jsx";
import SectionHeading from "../SectionHeading.jsx";
import CountUp from "../CountUp.jsx";
import { architecture } from "../../lib/content.js";

export default function Architecture() {
  return (
    <section id="architecture" className="section-pad relative px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Product Architecture"
          title="One platform,"
          highlight="a complete therapy journey"
          sub="A scalable digital ecosystem that turns evidence-based interventions into a progressive, game-based learning path."
        />

        {/* Stat grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {architecture.map((a, i) => (
            <Reveal key={a.label} dir="scale" delay={i * 0.08}>
              <div className="group glass relative overflow-hidden rounded-3xl p-7 text-center transition hover:-translate-y-1.5">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-60" />
                <div className="font-[var(--font-display)] text-4xl font-extrabold text-gradient sm:text-5xl">
                  <CountUp to={a.value} suffix={a.value >= 2500 ? "+" : ""} />
                </div>
                <p className="mt-2 font-[var(--font-heading)] font-semibold">
                  {a.label}
                </p>
                <p className="mt-1 text-sm text-[var(--color-haze)]">{a.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Nested structure visualization */}
        <Reveal delay={0.1}>
          <div className="glass mt-8 rounded-3xl p-7 sm:p-10">
            <h3 className="mb-7 text-center font-[var(--font-heading)] text-lg font-bold">
              How the journey nests together
            </h3>
            <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-center">
              {[
                { n: "10", l: "Levels", d: "Developmental milestones", c: "var(--color-violet)" },
                { n: "10", l: "Sessions / level", d: "Structured interventions", c: "var(--color-cyan)" },
                { n: "5", l: "Games / session", d: "Specific objectives", c: "var(--color-coral)" },
                { n: "3–5", l: "Challenges / game", d: "Skill assessment", c: "var(--color-gold)" },
              ].map((s, i, arr) => (
                <div key={s.l} className="flex items-center gap-3 lg:flex-col">
                  <div
                    className="flex flex-1 items-center gap-4 rounded-2xl border border-white/10 p-4 lg:flex-col lg:text-center"
                    style={{ background: `${s.c}14` }}
                  >
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-[var(--font-display)] text-lg font-bold"
                      style={{ background: `${s.c}26`, color: s.c }}
                    >
                      {s.n}
                    </span>
                    <div className="lg:mt-1">
                      <p className="font-semibold">{s.l}</p>
                      <p className="text-xs text-[var(--color-haze)]">{s.d}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-[var(--color-haze)] lg:rotate-90">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
