export function Input({ label, required, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-haze)]">
        {label} {required && <span className="text-[var(--color-coral)]">*</span>}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-cyan)]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[var(--color-cyan)]/20"
      />
    </label>
  );
}

export function Select({ label, required, options, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-haze)]">
        {label} {required && <span className="text-[var(--color-coral)]">*</span>}
      </span>
      <select
        {...props}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-cyan)]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[var(--color-cyan)]/20"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--color-night-2)]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Textarea({ label, required, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-haze)]">
        {label} {required && <span className="text-[var(--color-coral)]">*</span>}
      </span>
      <textarea
        {...props}
        className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-cyan)]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[var(--color-cyan)]/20"
      />
    </label>
  );
}
