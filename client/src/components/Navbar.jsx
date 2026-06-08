import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#architecture", label: "Platform" },
  { href: "#domains", label: "Therapy" },
  { href: "#ai", label: "AI" },
  { href: "#join", label: "Who" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? "glass-strong ring-glow mx-3 lg:mx-auto" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-violet)] via-[var(--color-cyan)] to-[var(--color-coral)] text-lg shadow-lg">
            🗣️
          </span>
          <span className="font-[var(--font-heading)] text-sm font-bold leading-tight">
            GLOBAL CHILD
            <span className="block text-[0.62rem] font-medium tracking-[0.22em] text-[var(--color-haze)]">
              HACKATHON 2026
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-haze)] transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/admin")}
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-haze)] transition hover:text-white sm:block"
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn-primary !px-5 !py-2.5 text-sm"
          >
            Register →
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mx-3 mt-2 rounded-2xl p-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-haze)] hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/admin");
            }}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[var(--color-haze)]"
          >
            Admin
          </button>
        </div>
      )}
    </header>
  );
}
