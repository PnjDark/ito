"use client";

import { useMemo, useRef, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Panel } from "@/components/ui/Panel";
import { CombatLog } from "@/components/combat/CombatLog";
import { CombatantRow } from "@/components/combat/CombatantRow";
import { TurnOrder } from "@/components/combat/TurnOrder";
import { ActionPanel } from "@/components/combat/ActionPanel";
import { heroToCombatant, createDefender, resolveAttack, processStatusEffects, applySkillEffect, calculateRewards } from "@/systems/combat";
import { applyXP } from "@/systems/hero";
import { LootReveal } from "@/components/combat/LootReveal";
import type { Combatant, CombatRewards } from "@/types/combat";
import type { HeroSkill } from "@/types/hero";

type Phase = "setup" | "combat" | "done";

export default function RaidPage() {
  const heroes = useGameStore((state) => state.heroes);
  const enemyTowers = useGameStore((state) => state.enemyTowers);

  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);
  const [selectedTowerId, setSelectedTowerId] = useState(enemyTowers[0]?.id ?? "");
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<"party" | "defenders" | "fled" | null>(null);
  const [roomLevel, setRoomLevel] = useState(1);
  const [rewards, setRewards] = useState<CombatRewards | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const party = useMemo(
    () => heroes.filter((h) => selectedHeroes.includes(h.id)).slice(0, 4),
    [heroes, selectedHeroes]
  );
  const selectedTower = enemyTowers.find((t) => t.id === selectedTowerId) ?? enemyTowers[0];

  const partySkills = useMemo(
    () => party.flatMap((h) => h.skills ?? []).filter(Boolean),
    [party]
  );

  const toggleHero = (id: string) => {
    setSelectedHeroes((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < 4 ? [...cur, id] : cur
    );
  };

  const appendLog = (entries: string[]) => {
    setLog((prev) => {
      const next = [...prev, ...entries];
      setTimeout(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }), 50);
      return next;
    });
  };

  const startRaid = () => {
    if (!selectedTower || party.length === 0) return;
    setRoomLevel(1);
    const defenders = (selectedTower.defenders as string[]).map((name) => createDefender(name, 1));
    const initial = [...party.map(heroToCombatant), ...defenders];
    setCombatants(initial);
    setLog([`> Raid on ${selectedTower.name} begins...`, `> ${party.length} heroes vs ${defenders.length} defenders.`]);
    setPhase("combat");
    setResult(null);
    setRewards(null);
  };

  const nextRoom = () => {
    const nextLevel = roomLevel + 1;
    setRoomLevel(nextLevel);
    const defenders = (selectedTower.defenders as string[]).map((name) => createDefender(name, nextLevel));
    // Carry over party health and status from current combatants
    const survivors = combatants.filter(c => !c.isEnemy);
    setCombatants([...survivors, ...defenders]);
    setLog(prev => [...prev, `--- ROOM ${nextLevel} ---`, `> New defenders emerge from the shadows...`]);
    setPhase("combat");
    setResult(null);
    setRewards(null);
  };

  const addRewards = useGameStore((state) => (state as any).addRewards);

  const finalizeVictory = () => {
    const finalRewards = calculateRewards(roomLevel);
    setRewards(finalRewards);
    
    // Apply rewards to store
    if (addRewards) {
      addRewards(party.map(h => h.id), finalRewards);
    }
    
    setPhase("done");
  };

  const checkWinner = (current: Combatant[]) => {
    const partyAlive = current.some((c) => !c.isEnemy && c.hp > 0);
    const enemyAlive = current.some((c) => c.isEnemy && c.hp > 0);
    if (!partyAlive) return "defenders" as const;
    if (!enemyAlive) return "party" as const;
    return null;
  };

  const resolveEnemyTurns = (state: Combatant[]): { next: Combatant[]; entries: string[] } => {
    const entries: string[] = [];
    let next = state.map((c) => ({ ...c }));
    const enemies = next.filter((c) => c.isEnemy && c.hp > 0);

    for (const enemy of enemies) {
      // Process Status Effects
      const { log: effLog, updated: effEnemy } = processStatusEffects(enemy);
      entries.push(...effLog);
      next = next.map(c => c.id === enemy.id ? effEnemy : c);

      if (effEnemy.hp <= 0) {
        entries.push(`> ${effEnemy.name} succumbed to status effects.`);
        continue;
      }

      if (effEnemy.statusEffects.some(e => e.id === "stun")) {
        entries.push(`> ${effEnemy.name} is stunned and skips their turn.`);
        continue;
      }

      const targets = next.filter((c) => !c.isEnemy && c.hp > 0);
      if (targets.length === 0) break;
      const target = targets[Math.floor(Math.random() * targets.length)];
      const dmg = resolveAttack(effEnemy, target);
      const t = next.find((c) => c.id === target.id)!;
      t.hp = Math.max(0, t.hp - dmg);
      entries.push(`> ${enemy.name} strikes ${target.name} for ${dmg} damage.${t.hp === 0 ? " [FALLEN]" : ""}`);
    }
    return { next, entries };
  };

  const doPlayerAction = (action: "attack" | "defend" | "skill", skill?: HeroSkill) => {
    if (result) return;
    const next = combatants.map((c) => ({ ...c }));
    const entries: string[] = [];

    const playerHeroes = next.filter((c) => !c.isEnemy && c.hp > 0);
    const enemies = next.filter((c) => c.isEnemy && c.hp > 0);
    if (enemies.length === 0 || playerHeroes.length === 0) return;

    if (action === "defend") {
      entries.push(`> Your party braces for impact. DEF and Shield increased.`);
      playerHeroes.forEach((h) => {
        const c = next.find((x) => x.id === h.id)!;
        c.statusEffects.push({ id: "shield", duration: 1, value: 5 });
      });
    } else {
      for (const hero of playerHeroes) {
        // Process Status Effects for Hero
        const { log: effLog, updated: effHero } = processStatusEffects(hero);
        entries.push(...effLog);
        const hIndex = next.findIndex(c => c.id === hero.id);
        next[hIndex] = effHero;

        if (effHero.hp <= 0) {
          entries.push(`> ${effHero.name} succumbed to status effects.`);
          continue;
        }

        if (effHero.statusEffects.some(e => e.id === "stun")) {
          entries.push(`> ${effHero.name} is stunned and skips their turn.`);
          continue;
        }

        const target = enemies.filter((e) => e.hp > 0)[0];
        if (!target) break;
        const t = next.find((c) => c.id === target.id)!;
        
        if (action === "skill" && skill) {
          const dmg = resolveAttack(effHero, t) + Math.round(skill.power * 0.5);
          t.hp = Math.max(0, t.hp - dmg);
          const { log: skillLog, updated: skilledTarget } = applySkillEffect(skill, t);
          const tIndex = next.findIndex(c => c.id === t.id);
          next[tIndex] = skilledTarget;
          entries.push(`> ${effHero.name} uses ${skill.name} on ${t.name} — ${dmg} damage!`);
          entries.push(...skillLog);
          if (skilledTarget.hp === 0) entries.push(`> ${t.name} [SLAIN]`);
        } else {
          const dmg = resolveAttack(effHero, t);
          t.hp = Math.max(0, t.hp - dmg);
          entries.push(`> ${effHero.name} attacks ${t.name} — ${dmg} damage!${t.hp === 0 ? " [SLAIN]" : ""}`);
        }
      }
    }

    const afterPlayer = checkWinner(next);
    if (afterPlayer === "party") {
      appendLog([...entries, "> Room cleared!"]);
      setCombatants(next);
      setResult("party");
      finalizeVictory();
      return;
    }
    if (afterPlayer === "defenders") {
      appendLog([...entries, "> Defeat. Your party is broken."]);
      setCombatants(next);
      setResult("defenders");
      setPhase("done");
      return;
    }

    const { next: afterEnemy, entries: enemyEntries } = resolveEnemyTurns(next);
    const finalWinner = checkWinner(afterEnemy);
    appendLog([...entries, ...enemyEntries]);
    setCombatants(afterEnemy);
    if (finalWinner) {
      setResult(finalWinner);
      setPhase("done");
      appendLog([finalWinner === "party" ? "> Victory! The tower falls." : "> Defeat. Your party is broken."]);
    }
  };

  const doFlee = () => {
    appendLog(["> Your party retreats into the dark..."]);
    setResult("fled");
    setPhase("done");
  };

  const reset = () => {
    setPhase("setup");
    setSelectedHeroes([]);
    setCombatants([]);
    setLog([]);
    setResult(null);
  };

  const partyInCombat = combatants.filter((c) => !c.isEnemy);
  const enemiesInCombat = combatants.filter((c) => c.isEnemy);
  const isOver = phase === "done";

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-55" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <Panel className="space-y-3">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; raid command</p>
          <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Tower Raid</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            Assemble your strike team, choose a target, and fight room by room through the tower's defenders.
          </p>
        </Panel>

        {phase === "setup" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel className="space-y-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Select Party (up to 4)</p>
              {heroes.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">No heroes in roster. Summon some first.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {heroes.map((hero) => (
                    <button
                      key={hero.id}
                      type="button"
                      onClick={() => toggleHero(hero.id)}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        selectedHeroes.includes(hero.id)
                          ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]"
                          : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"
                      }`}
                    >
                      <p className="font-semibold text-[var(--text-primary)]">{hero.name}</p>
                      <p className="text-[var(--text-secondary)] text-sm capitalize">{hero.archetype} · Lv{hero.level}</p>
                    </button>
                  ))}
                </div>
              )}
            </Panel>

            <Panel className="space-y-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Select Target Tower</p>
              <div className="space-y-3">
                {enemyTowers.map((tower) => (
                  <button
                    key={tower.id}
                    type="button"
                    onClick={() => setSelectedTowerId(tower.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      selectedTowerId === tower.id
                        ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]"
                        : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"
                    }`}
                  >
                    <p className="font-semibold text-[var(--text-primary)]">{tower.name}</p>
                    <p className="text-[var(--text-secondary)] text-sm">{tower.theme} · {(tower.defenders as string[]).length} defenders</p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={party.length === 0}
                onClick={startRaid}
                className="terminal-btn w-full disabled:opacity-40"
              >
                [ Execute Raid ]
              </button>
            </Panel>
          </div>
        )}

        {(phase === "combat" || phase === "done") && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.8fr]">
            <Panel className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Your Party</p>
              <div className="space-y-2">
                {partyInCombat.map((c) => <CombatantRow key={c.id} combatant={c} />)}
              </div>
            </Panel>

            <Panel className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Defenders</p>
              <div className="space-y-2">
                {enemiesInCombat.map((c) => <CombatantRow key={c.id} combatant={c} />)}
              </div>
            </Panel>

            <div className="flex flex-col gap-4">
              <Panel className="space-y-3">
                <TurnOrder combatants={combatants} />
              </Panel>

              <div ref={logRef} className="panel flex-1 overflow-y-auto rounded-[24px] border border-[var(--border-dim)] bg-[var(--bg-panel)]/95 p-4 text-sm text-[var(--text-secondary)]" style={{ maxHeight: "240px" }}>
                <p className="mb-3 uppercase tracking-[0.2em] text-[var(--text-system)]">Combat Log</p>
                <div className="space-y-2">
                  {log.map((entry, i) => (
                    <p key={i} className="leading-6">{entry}</p>
                  ))}
                </div>
              </div>

              {!isOver ? (
                <Panel>
                  <ActionPanel
                    skills={partySkills}
                    onAttack={() => doPlayerAction("attack")}
                    onDefend={() => doPlayerAction("defend")}
                    onSkill={(skill) => doPlayerAction("skill", skill)}
                    onFlee={doFlee}
                  />
                </Panel>
              ) : (
                <div className="space-y-4">
                  {result === "party" && rewards ? (
                    <LootReveal rewards={rewards} onContinue={nextRoom} />
                  ) : (
                    <Panel className="space-y-3 text-center">
                      <p className={`text-lg font-semibold ${result === "fled" ? "text-[var(--text-secondary)]" : "text-[var(--rarity-ascendant)]"}`}>
                        {result === "fled" ? "Retreated" : "Defeat"}
                      </p>
                      <button type="button" onClick={reset} className="terminal-btn w-full">
                        [ Return to Hub ]
                      </button>
                    </Panel>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
