import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, highlight, sub }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <Reveal dir="down">
          <span className="pill mx-auto mb-4">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-[var(--font-display)] text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-haze)]">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
