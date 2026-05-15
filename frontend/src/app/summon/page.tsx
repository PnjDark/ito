"use client";

import { useState } from "react";
import Link from "next/link";
import { Panel } from "@/components/ui/Panel";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { TraitBadge } from "@/components/hero/TraitBadge";
import { StatBar } from "@/components/ui/StatBar";
import { useGameStore } from "@/stores/gameStore";
import { formatRarity, rarityColor } from "@/lib/formatters";
import type { Hero } from "@/types/hero";

export default function SummonPage() {
  const fateThreads = useGameStore((state) => state.resources.fateThreads);
  const pity = useGameStore((state) => state.pity);
  const summon = useGameStore((state) => state.summonHeroes);
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState<Hero[]>([]);
  const [focused, setFocused] = useState<Hero | null>(null);

  const handleSummon = async (count: number) => {
    setBusy(true);
    const heroes = await summon(count);
    setRevealed(heroes);
    setFocused(heroes[heroes.length - 1] ?? null);
    setBusy(false);
  };

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-8">
        <Panel className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; thread resonance engaged...</p>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Summoning Circle</h1>
          </div>
          <div className="grid gap-4 rounded-[20px] border border-[var(--border-dim)] bg-[var(--bg-elevated)] p-5 sm:grid-cols-[1fr_auto]">
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>Fate Threads: <span className="text-[var(--text-primary)]">{fateThreads}</span></p>
              <p>Thread Resonance: <span className="text-[var(--text-primary)]">{pity}/90</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={busy || fateThreads < 10}
                onClick={() => handleSummon(1)}
                className="terminal-btn disabled:opacity-40"
              >
                {busy ? "Casting..." : "[ Summon ×1 ]"}
              </button>
              <button
                type="button"
                disabled={busy || fateThreads < 100}
                onClick={() => handleSummon(10)}
                className="terminal-btn disabled:opacity-40"
              >
                [ Summon ×10 ]
              </button>
            </div>
          </div>
        </Panel>

        {revealed.length > 1 && (
          <Panel className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Multi-Summon Results</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {revealed.map((hero) => (
                <button
                  key={hero.id}
                  type="button"
                  onClick={() => setFocused(hero)}
                  className={`rounded-xl border p-3 text-left transition ${focused?.id === hero.id ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}
                  style={{ borderColor: focused?.id === hero.id ? rarityColor(hero.rarity) : undefined }}
                >
                  <p className="text-xs uppercase tracking-[0.18em]" style={{ color: rarityColor(hero.rarity) }}>{formatRarity(hero.rarity)}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text-primary)] truncate">{hero.name}</p>
                  <p className="text-xs text-[var(--text-dim)] capitalize">{hero.archetype}</p>
                </button>
              ))}
            </div>
          </Panel>
        )}

        {focused ? (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <Panel className="space-y-5">
              <div className="flex items-start gap-4">
                <div
                  className="h-24 w-24 shrink-0 rounded-xl border border-[var(--border-dim)]"
                  style={{ background: rarityColor(focused.rarity) + "22", boxShadow: `0 0 24px ${rarityColor(focused.rarity)}33` }}
                />
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.28em]" style={{ color: rarityColor(focused.rarity) }}>{formatRarity(focused.rarity)}</p>
                  <h2 className="text-3xl font-semibold text-[var(--text-primary)]">{focused.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">{focused.title}</p>
                  <p className="text-xs text-[var(--text-dim)] capitalize">{focused.archetype} · {focused.specialization}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {focused.traits.map((trait) => <TraitBadge key={trait.id} trait={trait} />)}
              </div>

              <div className="rounded-[18px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Backstory</p>
                <TypeWriter text={focused.backstory} speed={25} />
              </div>
            </Panel>

            <Panel className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Stats</p>
              <StatBar label="HP" value={focused.stats.hp} max={focused.maxHp} accent="bg-[var(--accent-fire)]" />
              <StatBar label="ATK" value={focused.stats.atk} max={40} accent="bg-[var(--accent-ice)]" />
              <StatBar label="DEF" value={focused.stats.def} max={40} accent="bg-[var(--accent-nature)]" />
              <StatBar label="MAG" value={focused.stats.mag} max={40} accent="bg-[var(--accent-shadow)]" />
              <StatBar label="SPD" value={focused.stats.spd} max={40} accent="bg-[var(--accent-holy)]" />
              <div className="pt-2 space-y-2">
                <Link href="/roster" className="terminal-btn block w-full text-center">[ View Roster ]</Link>
                <button
                  type="button"
                  disabled={busy || fateThreads < 10}
                  onClick={() => handleSummon(1)}
                  className="terminal-btn w-full disabled:opacity-40"
                >
                  [ Summon Again ]
                </button>
              </div>
            </Panel>
          </div>
        ) : (
          <Panel>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              No hero summoned yet. Cast your fate threads into the void to draw forth a champion.
            </p>
          </Panel>
        )}
      </div>
    </main>
  );
}
