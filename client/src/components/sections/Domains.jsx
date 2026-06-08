import Reveal from "../Reveal.jsx";
import SectionHeading from "../SectionHeading.jsx";
import { domains } from "../../lib/content.js";

export default function Domains() {
  return (
    <section id="domains" className="section-pad relative px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Therapy Domains"
          title="Eight domains,"
          highlight="every skill a child needs"
          sub="From first letter sounds to real-life conversations — your games can target any milestone across the full spectrum of communication."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => (
            <Reveal key={d.title} dir="up" delay={(i % 4) * 0.07}>
              <div
                className="group glass relative h-full overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-2"
                style={{ "--accent": d.color }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                  style={{ background: d.color }}
                />
                <div
                  className="mb-4 grid h-14 w-14 place-items-center rounded-2xl text-2xl transition group-hover:scale-110"
                  style={{ background: `${d.color}22`, border: `1px solid ${d.color}44` }}
                >
                  {d.icon}
                </div>
                <h3 className="mb-3 font-[var(--font-heading)] text-base font-bold leading-snug">
                  {d.title}
                </h3>
                <ul className="space-y-1.5">
                  {d.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-sm text-[var(--color-haze)]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: d.color }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
