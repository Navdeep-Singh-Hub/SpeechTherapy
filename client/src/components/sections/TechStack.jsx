import Reveal from "../Reveal.jsx";
import { projectStack } from "../../lib/content.js";

export default function TechStack() {
  return (
    <section id="stack" className="relative px-6 pb-4 pt-2">
      <div className="mx-auto max-w-4xl">
        <Reveal dir="scale">
          <div className="glass ring-glow rounded-3xl p-7 text-center sm:p-9">
            <span className="pill mx-auto mb-4">Preferable Stack</span>
            <h2 className="font-[var(--font-display)] text-2xl font-bold sm:text-3xl">
              Built on{" "}
              <span className="text-gradient">Expo + MERN</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-haze)] sm:text-base">
              Our speech therapy app uses a modern, scalable stack — mobile with
              Expo & React Native, API with Express & Node.js, and data with
              MongoDB.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {projectStack.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-[var(--color-violet)]/40"
                >
                  <p className="font-[var(--font-heading)] text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-haze)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
