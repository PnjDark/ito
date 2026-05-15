import type { HeroTrait } from "@/types/hero";

export function TraitBadge({ trait }: { trait: HeroTrait }) {
  return (
    <span
      title={trait.description}
      className="inline-flex items-center rounded-sm border border-[var(--border-dim)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:border-[var(--border-glow)] hover:text-[var(--text-primary)]"
    >
      {trait.name}
    </span>
  );
}
