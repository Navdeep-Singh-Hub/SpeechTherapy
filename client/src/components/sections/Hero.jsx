import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../lib/api.js";
import { HACKATHON } from "../../lib/content.js";

const floatGames = ["🔤", "🎙️", "🧠", "🤝", "🌊", "💬", "🎮", "⭐"];

export default function Hero() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    api
      .getCount()
      .then((d) => setCount(d.total))
      .catch(() => setCount(null));
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28 pb-16">
      {/* floating game tokens */}
      {floatGames.map((g, i) => (
        <span
          key={i}
          className="anim-float-slow pointer-events-none absolute hidden select-none text-3xl opacity-70 md:block"
          style={{
            left: `${8 + ((i * 12) % 84)}%`,
            top: `${15 + ((i * 9) % 65)}%`,
            animationDelay: `${i * -1.4}s`,
            filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))",
          }}
        >
          {g}
        </span>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pill anim-pulse-ring mx-auto mb-7"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-mint)]" />
          Online · Open to every college · {HACKATHON.year}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="font-[var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Build the future of
          <span className="text-gradient block">Speech Therapy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-haze)] sm:text-lg"
        >
          The <strong className="text-white">Global Child Online Hackathon</strong> unites
          student innovators to create the world's first AI-powered speech
          therapy gaming platform —{" "}
          <span className="text-gradient-gold font-semibold">
            10 levels, 100 sessions, 500 games
          </span>{" "}
          that give every child a voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/register" className="btn-primary">
            Join the Hackathon →
          </Link>
          <a href="#mission" className="btn-ghost">
            Explore the Mission
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-md flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--color-haze)]"
        >
          <span className="flex items-center gap-2">
            <strong className="text-gradient text-lg font-bold">
              {count != null ? count.toLocaleString() : "—"}
            </strong>{" "}
            volunteers registered
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="flex items-center gap-2">
            <strong className="text-lg font-bold text-white">100M+</strong>{" "}
            children we build for
          </span>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="anim-float-slow h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
