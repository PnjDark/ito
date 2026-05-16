import type { Hero } from "@/types/hero";
import { formatRarity, rarityColor } from "@/lib/formatters";

export function HeroCard({ hero }: { hero: Hero }) {
  return (
    <article
      className={`panel group overflow-hidden border p-4 transition hover:border-[var(--text-primary)] ${
        hero.rarity === "mythic" ? "rarity-glow-mythic" : hero.rarity === "ascendant" ? "rarity-glow-ascendant" : "border-[var(--border-dim)] bg-[var(--bg-elevated)]/95"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">{formatRarity(hero.rarity)}</p>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{hero.name}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{hero.title}</p>
        </div>
        <div
          className="h-14 w-14 rounded-md border border-[var(--border-dim)]"
          style={{ background: rarityColor(hero.rarity) + "20" }}
        />
      </div>
      <div className="grid gap-2 text-sm text-[var(--text-secondary)]">
        <div className="flex justify-between">
          <span>Lvl</span>
          <span>{hero.level}</span>
        </div>
        <div className="flex justify-between">
          <span>Archetype</span>
          <span className="capitalize">{hero.archetype}</span>
        </div>
        <div className="flex justify-between">
          <span>Spec</span>
          <span className="capitalize">{hero.specialization}</span>
        </div>
      </div>
    </article>
  );
}
