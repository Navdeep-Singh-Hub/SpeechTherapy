import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";

export default function CTA() {
  return (
    <section className="section-pad relative px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal dir="scale">
          <div className="ring-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[var(--color-violet-deep)]/40 via-[var(--color-night-2)] to-[var(--color-cyan)]/25 p-10 text-center sm:p-16">
            <div className="anim-aurora absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--color-coral)] opacity-25 blur-[100px]" />
            <div
              className="anim-aurora absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[var(--color-cyan)] opacity-25 blur-[100px]"
              style={{ animationDelay: "-12s" }}
            />

            <div className="relative">
              <span className="pill mx-auto mb-5">This is bigger than a game</span>
              <h2 className="font-[var(--font-display)] text-3xl font-extrabold leading-tight sm:text-5xl">
                Ready to give every child
                <span className="text-gradient block">a voice?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[var(--color-haze)]">
                Join builders, designers, clinicians, and dreamers from colleges
                everywhere. Your code could become the foundation of accessible
                speech therapy for the world.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/register" className="btn-primary">
                  Register your team →
                </Link>
                <a href="#mission" className="btn-ghost">
                  Revisit the mission
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
