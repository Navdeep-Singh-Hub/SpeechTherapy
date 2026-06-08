export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[var(--color-night)]" />

      {/* aurora blobs */}
      <div className="anim-aurora absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[var(--color-violet-deep)] opacity-30 blur-[120px]" />
      <div
        className="anim-aurora absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--color-cyan)] opacity-20 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="anim-aurora absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral)] opacity-20 blur-[130px]"
        style={{ animationDelay: "-16s" }}
      />

      {/* floating orbs */}
      <span className="anim-float-slow absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-[var(--color-cyan)] shadow-[0_0_24px_6px_rgba(34,211,238,0.7)]" />
      <span
        className="anim-float-x absolute right-[18%] top-[30%] h-2.5 w-2.5 rounded-full bg-[var(--color-coral)] shadow-[0_0_22px_6px_rgba(251,113,133,0.7)]"
      />
      <span
        className="anim-float-slow absolute left-[40%] top-[12%] h-2 w-2 rounded-full bg-[var(--color-gold)] shadow-[0_0_18px_5px_rgba(251,191,36,0.7)]"
        style={{ animationDelay: "-3s" }}
      />
      <span
        className="anim-float-x absolute right-[35%] bottom-[20%] h-3 w-3 rounded-full bg-[var(--color-violet)] shadow-[0_0_24px_6px_rgba(168,85,247,0.7)]"
        style={{ animationDelay: "-5s" }}
      />

      {/* drifting rings */}
      <div className="anim-drift absolute left-[8%] bottom-[12%] h-24 w-24 rounded-full border border-white/10" />
      <div
        className="anim-drift absolute right-[10%] top-[16%] h-16 w-16 rounded-2xl border border-white/10"
        style={{ animationDelay: "-10s" }}
      />

      {/* grid */}
      <div className="bg-grid absolute inset-0 opacity-60" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,15,0.9)_100%)]" />
    </div>
  );
}
