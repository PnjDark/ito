import type { ReactNode } from "react";

export function StatBar({
  label,
  value,
  max,
  accent = "bg-[var(--accent-fire)]",
  className = "",
}: Readonly<{
  label: string;
  value: number;
  max: number;
  accent?: string;
  className?: string;
}>) {
  const ratio = Math.min(Math.max(value / max, 0), 1);
  return (
    <div className={`space-y-2 text-sm ${className}`}>
      <div className="flex items-center justify-between text-[var(--text-secondary)]">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full ${accent}`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
