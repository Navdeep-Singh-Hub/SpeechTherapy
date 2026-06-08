import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { Input, Select, Textarea } from "../components/Field.jsx";
import { api } from "../lib/api.js";
import { roleOptions, yearOptions } from "../lib/content.js";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  college: "",
  city: "",
  course: "",
  year: "1st",
  role: "Software Developer",
  skills: "",
  teamName: "",
  portfolio: "",
  motivation: "",
};

const perks = [
  { icon: "🏆", text: "Mentorship from therapists & engineers" },
  { icon: "📜", text: "Certificate & letter of recommendation" },
  { icon: "🌍", text: "Ship real impact for millions of kids" },
  { icon: "🤝", text: "Network across colleges worldwide" },
];

export default function RegisterPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });
    try {
      await api.registerVolunteer(form);
      setStatus({ state: "success", msg: "You're in! Check your inbox soon." });
      setForm(initial);
    } catch (err) {
      setStatus({ state: "error", msg: err.message });
    }
  }

  return (
    <div className="relative min-h-screen px-5 py-10">
      <AnimatedBackground />

      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-haze)] transition hover:text-white"
        >
          ← Back to home
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left rail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-10"
          >
            <span className="pill mb-5">Volunteer Registration</span>
            <h1 className="font-[var(--font-display)] text-4xl font-extrabold leading-tight sm:text-5xl">
              Join the
              <span className="text-gradient block">movement</span>
            </h1>
            <p className="mt-4 max-w-md text-[var(--color-haze)]">
              Tell us about yourself. We'll match you with a team and the part of
              the platform where your skills shine brightest.
            </p>

            <div className="mt-8 space-y-3">
              {perks.map((p) => (
                <div
                  key={p.text}
                  className="glass flex items-center gap-3 rounded-2xl p-4"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-sm font-medium text-[var(--color-haze)]">
                    {p.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong ring-glow rounded-3xl p-6 sm:p-9"
          >
            <AnimatePresence mode="wait">
              {status.state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <div className="anim-pulse-ring mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[var(--color-mint)] to-[var(--color-cyan)] text-4xl">
                    ✓
                  </div>
                  <h2 className="font-[var(--font-display)] text-2xl font-bold">
                    Registration complete!
                  </h2>
                  <p className="mt-3 max-w-sm text-[var(--color-haze)]">
                    {status.msg} We can't wait to build the future of speech
                    therapy with you.
                  </p>
                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => setStatus({ state: "idle", msg: "" })}
                      className="btn-ghost"
                    >
                      Register another
                    </button>
                    <Link to="/" className="btn-primary">
                      Back to home
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Full name"
                      required
                      value={form.fullName}
                      onChange={update("fullName")}
                      placeholder="Ada Lovelace"
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@college.edu"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Phone"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 98765 43210"
                    />
                    <Input
                      label="City"
                      value={form.city}
                      onChange={update("city")}
                      placeholder="Bengaluru"
                    />
                  </div>

                  <Input
                    label="College / University"
                    required
                    value={form.college}
                    onChange={update("college")}
                    placeholder="Your institution"
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Input
                      label="Course / Branch"
                      value={form.course}
                      onChange={update("course")}
                      placeholder="CSE, Speech Path…"
                    />
                    <Select
                      label="Year"
                      value={form.year}
                      onChange={update("year")}
                      options={yearOptions}
                    />
                    <Input
                      label="Team name"
                      value={form.teamName}
                      onChange={update("teamName")}
                      placeholder="Optional"
                    />
                  </div>

                  <Select
                    label="Primary role"
                    required
                    value={form.role}
                    onChange={update("role")}
                    options={roleOptions}
                  />

                  <Input
                    label="Skills (comma separated)"
                    value={form.skills}
                    onChange={update("skills")}
                    placeholder="React, Python, Figma, ML…"
                  />

                  <Input
                    label="Portfolio / GitHub / LinkedIn"
                    value={form.portfolio}
                    onChange={update("portfolio")}
                    placeholder="https://…"
                  />

                  <Textarea
                    label="Why do you want to join?"
                    rows={4}
                    value={form.motivation}
                    onChange={update("motivation")}
                    placeholder="Share what excites you about accessible speech therapy…"
                  />

                  {status.state === "error" && (
                    <p className="rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-4 py-3 text-sm text-[var(--color-coral)]">
                      {status.msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status.state === "loading"
                      ? "Submitting…"
                      : "Complete Registration →"}
                  </button>

                  <p className="text-center text-xs text-[var(--color-haze)]/70">
                    By registering you agree to participate in the spirit of
                    building accessible technology for children.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
