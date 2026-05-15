import type { Combatant } from "@/types/combat";

export function TurnOrder({ combatants }: { combatants: Combatant[] }) {
  const ordered = [...combatants].sort((a, b) => b.spd - a.spd);
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[var(--text-system)]">Turn</span>
      {ordered.map((c, i) => (
        <div
          key={c.id}
          className={`shrink-0 rounded border px-2.5 py-1 text-xs transition ${
            c.hp <= 0
              ? "border-[var(--border-dim)] opacity-30 line-through text-[var(--text-dim)]"
              : c.isEnemy
              ? "border-[var(--rarity-ascendant)]/40 bg-[rgba(255,107,107,0.06)] text-[var(--rarity-ascendant)]"
              : "border-[var(--border-glow)] bg-[rgba(212,197,160,0.06)] text-[var(--text-primary)]"
          }`}
        >
          {i + 1}. {c.name}
        </div>
      ))}
    </div>
  );
}
