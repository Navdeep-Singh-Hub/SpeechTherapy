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

export function StackPicker({ label, required, options, value = [], onChange }) {
  function toggle(option) {
    const next = value.includes(option)
      ? value.filter((o) => o !== option)
      : [...value, option];
    onChange(next);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-[var(--color-haze)]">
        {label} {required && <span className="text-[var(--color-coral)]">*</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                active
                  ? "border-[var(--color-cyan)]/60 bg-[var(--color-cyan)]/15 text-white"
                  : "border-white/10 bg-white/5 text-[var(--color-haze)] hover:border-white/20 hover:text-white"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <p className="mt-2 text-xs text-[var(--color-haze)]">
          Selected: {value.join(", ")}
        </p>
      )}
    </div>
  );
}
