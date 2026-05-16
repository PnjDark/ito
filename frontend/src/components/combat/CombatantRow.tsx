import type { Combatant } from "@/types/combat";

export function CombatantRow({ combatant }: { combatant: Combatant }) {
  const hpRatio = Math.max(0, combatant.hp / combatant.maxHp);
  const hpColor =
    hpRatio > 0.5 ? "var(--accent-nature)" : hpRatio > 0.25 ? "var(--accent-holy)" : "var(--rarity-ascendant)";
  const dead = combatant.hp <= 0;

  return (
    <div className={`rounded-xl border px-4 py-3 transition ${dead ? "border-[var(--border-dim)] opacity-40" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className={`font-semibold ${dead ? "line-through text-[var(--text-dim)]" : "text-[var(--text-primary)]"}`}>
          {combatant.name}
        </span>
        <span className="text-[var(--text-secondary)]">{combatant.hp}/{combatant.maxHp}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${hpRatio * 100}%`, background: hpColor }}
        />
      </div>
      {combatant.statusEffects?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {combatant.statusEffects.map((eff, i) => (
            <span
              key={`${eff.id}-${i}`}
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                eff.id === "burn"
                  ? "bg-[var(--accent-fire)]/20 text-[var(--accent-fire)]"
                  : eff.id === "shield"
                  ? "bg-[var(--accent-ice)]/20 text-[var(--accent-ice)]"
                  : "bg-[var(--accent-holy)]/20 text-[var(--accent-holy)]"
              }`}
            >
              {eff.id} {eff.duration}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
