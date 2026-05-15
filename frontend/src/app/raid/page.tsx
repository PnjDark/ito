"use client";

import { useMemo, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { CombatLog } from "@/components/combat/CombatLog";
import { heroToCombatant, createDefender, runCombatRound } from "@/systems/combat";

export default function RaidPage() {
  const heroes = useGameStore((state) => state.heroes);
  const enemyTowers = useGameStore((state) => state.enemyTowers);
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);
  const [selectedTowerId, setSelectedTowerId] = useState(enemyTowers[0]?.id ?? "");
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const party = useMemo(
    () => heroes.filter((hero) => selectedHeroes.includes(hero.id)).slice(0, 4),
    [heroes, selectedHeroes]
  );

  const selectedTower = enemyTowers.find((tower) => tower.id === selectedTowerId) ?? enemyTowers[0];

  const toggleHero = (heroId: string) => {
    setSelectedHeroes((current) =>
      current.includes(heroId)
        ? current.filter((id) => id !== heroId)
        : [...current].slice(0, 3).concat(heroId)
    );
  };

  const startRaid = () => {
    if (!selectedTower || party.length === 0) return;
    const defenders = selectedTower.defenders.map((name) => createDefender(name, 1));
    const combatants = [...party.map(heroToCombatant), ...defenders];
    const round = runCombatRound(combatants);
    setLog(round.log);
    setResult(round.winner === "party" ? "Victory" : "Defeat");
  };

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-55" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <Panel className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; raid command</p>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Tower Raid</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            Choose your strike team, select an enemy tower, and see the first round of combat narrated through your terminal log.
          </p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_0.25fr]">
          <Panel className="space-y-5">
            <div className="grid gap-4 rounded-[20px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Party selection</p>
                <p className="mt-2 text-[var(--text-primary)] text-sm">Select up to 4 heroes for the raid.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {heroes.map((hero) => (
                  <button
                    key={hero.id}
                    type="button"
                    onClick={() => toggleHero(hero.id)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${selectedHeroes.includes(hero.id) ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}
                  >
                    <p className="font-semibold text-[var(--text-primary)]">{hero.name}</p>
                    <p className="text-[var(--text-secondary)] text-sm">{hero.archetype} • {hero.specialization}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Target Tower</p>
              <div className="mt-4 space-y-3">
                {enemyTowers.map((tower) => (
                  <button
                    key={tower.id}
                    type="button"
                    onClick={() => setSelectedTowerId(tower.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${selectedTowerId === tower.id ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}
                  >
                    <p className="font-semibold text-[var(--text-primary)]">{tower.name}</p>
                    <p className="text-[var(--text-secondary)] text-sm">Defenders: {tower.defenders.length}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button disabled={party.length === 0} onClick={startRaid} className="w-full">
              Execute Raid
            </Button>
            {result && (
              <div className="rounded-[20px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-4 text-sm text-[var(--text-primary)]">
                Result: <strong>{result}</strong>
              </div>
            )}
          </Panel>

          <CombatLog entries={log} />
        </div>
      </div>
    </main>
  );
}
