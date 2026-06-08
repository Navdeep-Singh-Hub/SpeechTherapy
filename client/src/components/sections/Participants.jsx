import Reveal from "../Reveal.jsx";
import SectionHeading from "../SectionHeading.jsx";
import { participants, timeline } from "../../lib/content.js";

export default function Participants() {
  return (
    <section id="join" className="section-pad relative px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Who Should Participate"
          title="Every skill set"
          highlight="has a seat at the table"
          sub="Great therapy software is built by interdisciplinary teams. Bring your craft — we'll bring the mission."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {participants.map((p, i) => (
            <Reveal key={p.label} dir="scale" delay={(i % 4) * 0.06}>
              <div className="group glass flex h-full flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center transition hover:-translate-y-1.5 hover:bg-white/[0.07]">
                <span className="text-3xl transition group-hover:scale-125">
                  {p.icon}
                </span>
                <p className="text-sm font-semibold leading-snug">{p.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <Reveal>
            <h3 className="mb-9 text-center font-[var(--font-display)] text-2xl font-bold">
              How the hackathon <span className="text-gradient">unfolds</span>
            </h3>
          </Reveal>
          <div className="relative grid gap-6 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-[var(--color-violet)] via-[var(--color-cyan)] to-[var(--color-coral)] opacity-40 md:block" />
            {timeline.map((t, i) => (
              <Reveal key={t.phase} dir="up" delay={i * 0.1}>
                <div className="relative">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-violet-deep)] to-[var(--color-cyan)] font-[var(--font-display)] text-lg font-bold shadow-lg">
                    {t.phase}
                  </div>
                  <div className="glass rounded-2xl p-5 text-center">
                    <p className="font-[var(--font-heading)] font-bold">{t.title}</p>
                    <p className="mt-1.5 text-sm text-[var(--color-haze)]">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
