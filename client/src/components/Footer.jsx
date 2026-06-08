import { Link } from "react-router-dom";
import { HACKATHON } from "../lib/content.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)] via-[var(--color-cyan)] to-[var(--color-coral)] text-xl">
            🗣️
          </span>
          <div className="text-left">
            <p className="font-[var(--font-heading)] font-bold">
              Global Child Online Hackathon
            </p>
            <p className="text-sm text-[var(--color-haze)]">{HACKATHON.motto}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-haze)]">
          <a href="#mission" className="hover:text-white">Mission</a>
          <a href="#architecture" className="hover:text-white">Platform</a>
          <a href="#domains" className="hover:text-white">Therapy Domains</a>
          <Link to="/register" className="hover:text-white">Register</Link>
          <Link to="/admin" className="hover:text-white">Admin</Link>
        </div>

        <p className="max-w-xl text-xs leading-relaxed text-[var(--color-haze)]/70">
          A student-powered movement to make speech therapy accessible,
          affordable, and engaging for every child — through evidence-based,
          AI-driven game design.
        </p>

        <p className="text-xs text-[var(--color-haze)]/60">
          © {new Date().getFullYear()} Global Child Online Hackathon · Built with
          purpose 💜
        </p>
      </div>
    </footer>
  );
}
