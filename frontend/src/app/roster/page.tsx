"use client";

import { useMemo, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Panel } from "@/components/ui/Panel";
import { HeroCard } from "@/components/hero/HeroCard";
import { Button } from "@/components/ui/Button";
import { StatBar } from "@/components/ui/StatBar";

export default function RosterPage() {
  const heroes = useGameStore((state) => state.heroes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedHero = useMemo(
    () => heroes.find((hero) => hero.id === selectedId) ?? heroes[0],
    [heroes, selectedId]
  );

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Panel className="space-y-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; roster archive</p>
              <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Hero Roster</h1>
              <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                Browse the champions you've summoned, inspect their traits, and choose who will take the next raid.
              </p>
            </div>
          </Panel>

          <Panel className="rounded-[24px] border border-[var(--border-dim)] bg-[var(--bg-elevated)] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-system)]">Roster summary</p>
            <p className="mt-4 text-[var(--text-primary)]">{heroes.length} heroes in your collection.</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Select a hero for details or assign them to the tower from the roster screen.</p>
          </Panel>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel className="grid gap-4">
            {heroes.length === 0 ? (
              <p className="text-sm leading-7 text-[var(--text-secondary)]">Your roster is empty. Begin summoning heroes in the Summon screen.</p>
            ) : (
              heroes.map((hero) => (
                <button
                  key={hero.id}
                  type="button"
                  onClick={() => setSelectedId(hero.id)}
                  className="text-left"
                >
                  <HeroCard hero={hero} />
                </button>
              ))
            )}
          </Panel>

          <Panel className="space-y-6">
            {selectedHero ? (
              <div className="space-y-4">
                <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-system)]">Selected Hero</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{selectedHero.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">{selectedHero.title}</p>
                </div>

                <div className="space-y-4 rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-system)]">Stats</p>
                  <div className="grid gap-3">
                    <StatBar label="HP" value={selectedHero.stats.hp} max={selectedHero.maxHp} accent="bg-[var(--accent-fire)]" />
                    <StatBar label="ATK" value={selectedHero.stats.atk} max={40} accent="bg-[var(--accent-ice)]" />
                    <StatBar label="DEF" value={selectedHero.stats.def} max={40} accent="bg-[var(--accent-nature)]" />
                    <StatBar label="MAG" value={selectedHero.stats.mag} max={40} accent="bg-[var(--accent-shadow)]" />
                    <StatBar label="SPD" value={selectedHero.stats.spd} max={40} accent="bg-[var(--accent-holy)]" />
                  </div>
                </div>

                <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5 text-sm text-[var(--text-secondary)]">
                  <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Personality Traits</p>
                  <div className="mt-3 grid gap-3">
                    {selectedHero.traits.map((trait) => (
                      <div key={trait.id} className="rounded-lg bg-black/20 p-3">
                        <p className="font-semibold text-[var(--text-primary)]">{trait.name}</p>
                        <p>{trait.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5 text-sm text-[var(--text-secondary)]">
                  <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Backstory</p>
                  <p className="mt-3 leading-7">{selectedHero.backstory}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-[var(--text-secondary)]">Choose a hero card to inspect their full sheet.</p>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}
