"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useGameStore } from "@/stores/gameStore";
import { Panel } from "@/components/ui/Panel";
import { HeroCard } from "@/components/hero/HeroCard";
import { StatBar } from "@/components/ui/StatBar";
import { MoodGauge } from "@/components/hero/MoodGauge";
import { TraitBadge } from "@/components/hero/TraitBadge";
import { rarityColor } from "@/lib/formatters";

export default function RosterPage() {
  const heroes = useGameStore((state) => state.heroes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedHero = useMemo(
    () => heroes.find((h) => h.id === selectedId) ?? heroes[0] ?? null,
    [heroes, selectedId]
  );

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <Panel className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; roster archive</p>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Hero Roster</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {heroes.length === 0
              ? "Your roster is empty. Begin summoning heroes."
              : `${heroes.length} hero${heroes.length !== 1 ? "es" : ""} in your collection.`}
          </p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Panel className="space-y-3 overflow-y-auto" style={{ maxHeight: "80vh" }}>
            {heroes.length === 0 ? (
              <div className="space-y-4 py-4">
                <p className="text-sm text-[var(--text-secondary)]">No heroes yet.</p>
                <Link href="/summon" className="terminal-btn block text-center">[ Go Summon ]</Link>
              </div>
            ) : (
              heroes.map((hero) => (
                <button
                  key={hero.id}
                  type="button"
                  onClick={() => setSelectedId(hero.id)}
                  className={`w-full text-left transition rounded-[18px] ${selectedId === hero.id || (!selectedId && hero === heroes[0]) ? "ring-1 ring-[var(--text-primary)]" : ""}`}
                >
                  <HeroCard hero={hero} />
                </button>
              ))
            )}
          </Panel>

          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
            {selectedHero ? (
              <>
                <Panel className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="h-20 w-20 shrink-0 rounded-xl border border-[var(--border-dim)]"
                      style={{ background: rarityColor(selectedHero.rarity) + "22" }}
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-system)] capitalize">{selectedHero.rarity}</p>
                      <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{selectedHero.name}</h2>
                      <p className="text-sm text-[var(--text-secondary)]">{selectedHero.title}</p>
                      <p className="mt-1 text-xs text-[var(--text-dim)] capitalize">{selectedHero.archetype} · {selectedHero.specialization} · Lv{selectedHero.level}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedHero.traits.map((trait) => (
                      <TraitBadge key={trait.id} trait={trait} />
                    ))}
                  </div>
                </Panel>

                <Panel className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Stats</p>
                  <StatBar label="HP" value={selectedHero.stats.hp} max={selectedHero.maxHp} accent="bg-[var(--accent-fire)]" />
                  <StatBar label="ATK" value={selectedHero.stats.atk} max={40} accent="bg-[var(--accent-ice)]" />
                  <StatBar label="DEF" value={selectedHero.stats.def} max={40} accent="bg-[var(--accent-nature)]" />
                  <StatBar label="MAG" value={selectedHero.stats.mag} max={40} accent="bg-[var(--accent-shadow)]" />
                  <StatBar label="SPD" value={selectedHero.stats.spd} max={40} accent="bg-[var(--accent-holy)]" />
                </Panel>

                <Panel>
                  <MoodGauge mood={selectedHero.mood} />
                </Panel>

                {selectedHero.skills.length > 0 && (
                  <Panel className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Skills</p>
                    <div className="space-y-2">
                      {selectedHero.skills.map((skill) => (
                        <div key={skill.id} className="rounded-lg border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-[var(--text-primary)]">{skill.name}</p>
                            <span className="text-xs text-[var(--text-dim)] uppercase">{skill.type} · {skill.cost} MP</span>
                          </div>
                          <p className="mt-1 text-sm text-[var(--text-secondary)]">{skill.description}</p>
                        </div>
                      ))}
                    </div>
                  </Panel>
                )}

                <Panel className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Backstory</p>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{selectedHero.backstory}</p>
                </Panel>

                <div className="flex gap-3">
                  <Link href="/evolve" className="terminal-btn flex-1 text-center">[ Evolve ]</Link>
                  <Link href="/raid" className="terminal-btn flex-1 text-center">[ Raid ]</Link>
                </div>
              </>
            ) : (
              <Panel>
                <p className="text-sm text-[var(--text-secondary)]">Select a hero to inspect their full sheet.</p>
              </Panel>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
