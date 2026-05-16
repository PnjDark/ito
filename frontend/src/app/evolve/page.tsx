"use client";

import { useMemo, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { getEvolutionOptions, getStatDiff } from "@/systems/evolution";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { EvolutionHistory } from "@/components/hero/EvolutionHistory";

export default function EvolvePage() {
  const heroes = useGameStore((state) => state.heroes);
  const evolveHero = useGameStore((state) => state.evolveHero);
  const [selectedId, setSelectedId] = useState<string | null>(heroes[0]?.id ?? null);
  const [selectedPath, setSelectedPath] = useState("ascendant_path");

  const selectedHero = useMemo(
    () => heroes.find((hero) => hero.id === selectedId) ?? heroes[0],
    [heroes, selectedId]
  );

  const options = useMemo(() => (selectedHero ? getEvolutionOptions(selectedHero) : []), [selectedHero]);

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; class evolution</p>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Evolution Path</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            Guide a hero through a branching ascension path and reshape their role in the tower assault.
          </p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel className="space-y-4">
            <div className="grid gap-3">
              {heroes.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">Summon heroes first before evolving them.</p>
              ) : (
                heroes.map((hero) => (
                  <button
                    key={hero.id}
                    type="button"
                    onClick={() => setSelectedId(hero.id)}
                    className={`w-full rounded-xl border px-4 py-4 text-left transition ${selectedId === hero.id ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}
                  >
                    <p className="font-semibold text-[var(--text-primary)]">{hero.name}</p>
                    <p className="text-[var(--text-secondary)] text-sm">Level {hero.level} • {hero.archetype}</p>
                  </button>
                ))
              )}
            </div>
          </Panel>

          <Panel className="space-y-6">
            {selectedHero ? (
              <div className="space-y-5">
                <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Current hero</p>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{selectedHero.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{selectedHero.title}</p>
                  <EvolutionHistory history={selectedHero.evolutionHistory} />
                </div>

                <div className="space-y-4">
                   {options.map((option) => {
                    const diff = getStatDiff(selectedHero, option);
                    const locked = (option.requirements?.level ?? 1) > selectedHero.level;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={locked}
                        onClick={() => setSelectedPath(option.id)}
                        className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                          locked 
                            ? "opacity-50 cursor-not-allowed border-[var(--border-dim)]" 
                            : selectedPath === option.id 
                            ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" 
                            : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">{option.name}</p>
                            <p className="mt-2 text-[var(--text-secondary)] text-sm">{option.description}</p>
                            {locked && (
                              <p className="mt-1 text-[10px] text-[var(--rarity-ascendant)] uppercase tracking-widest">
                                Requires Level {option.requirements?.level}
                              </p>
                            )}
                          </div>
                          <div className="text-right text-[10px] space-y-1">
                            {Object.entries(diff).map(([key, val]) => val > 0 && (
                              <p key={key} className="text-[var(--accent-nature)]">+{val} {key.toUpperCase()}</p>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <Button
                  disabled={!selectedHero || (options.find(o => o.id === selectedPath)?.requirements?.level ?? 1) > selectedHero.level}
                  onClick={() => selectedId && evolveHero(selectedId, selectedPath)}
                  className="w-full"
                >
                  Confirm Ascension
                </Button>
              </div>
            ) : (
              <p className="text-sm text-[var(--text-secondary)]">Select a hero to preview evolution options.</p>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}
