export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-night)]" />

      {/* Soft aurora wash — subtle, no floating clutter */}
      <div className="anim-aurora absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[var(--color-violet-deep)] opacity-25 blur-[120px]" />
      <div
        className="anim-aurora absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--color-cyan)] opacity-15 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="anim-aurora absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral)] opacity-15 blur-[130px]"
        style={{ animationDelay: "-16s" }}
      />

      <div className="bg-grid absolute inset-0 opacity-40" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,15,0.92)_100%)]" />
    </div>
  );
}
