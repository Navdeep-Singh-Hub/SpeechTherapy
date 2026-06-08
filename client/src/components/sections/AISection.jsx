import Reveal from "../Reveal.jsx";
import SectionHeading from "../SectionHeading.jsx";
import { aiFeatures } from "../../lib/content.js";

export default function AISection() {
  return (
    <section id="ai" className="section-pad relative px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI Requirements"
          title="Intelligence that"
          highlight="adapts to every child"
          sub="Teams are encouraged to weave AI through the experience — listening, analyzing, personalizing, and reporting in real time."
        />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Feature chips */}
          <Reveal dir="right">
            <div className="glass h-full rounded-3xl p-7">
              <div className="flex flex-wrap gap-2.5">
                {aiFeatures.map((f, i) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-gradient-to-r from-white/5 to-transparent px-4 py-2 text-sm font-medium text-[var(--color-haze)] transition hover:border-[var(--color-cyan)]/50 hover:text-white"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Outcome cards */}
          <Reveal dir="left">
            <div className="grid h-full gap-4">
              {[
                {
                  icon: "👶",
                  title: "Children gain confidence",
                  desc: "Personalized feedback and adaptive difficulty keep every child in their growth zone.",
                  c: "var(--color-coral)",
                },
                {
                  icon: "👨‍👩‍👧",
                  title: "Parents gain insight",
                  desc: "Real-time dashboards turn practice into visible, meaningful progress.",
                  c: "var(--color-cyan)",
                },
                {
                  icon: "🩺",
                  title: "Therapists gain data",
                  desc: "Skill-gap analytics and monitoring tools inform every intervention.",
                  c: "var(--color-violet)",
                },
              ].map((o) => (
                <div
                  key={o.title}
                  className="glass flex items-start gap-4 rounded-3xl p-5 transition hover:translate-x-1"
                >
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl"
                    style={{ background: `${o.c}22`, border: `1px solid ${o.c}44` }}
                  >
                    {o.icon}
                  </span>
                  <div>
                    <p className="font-[var(--font-heading)] font-bold">{o.title}</p>
                    <p className="mt-1 text-sm text-[var(--color-haze)]">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
