import type { Combatant, CombatResult, CombatAction } from "@/types/combat";
import type { Hero } from "@/types/hero";

export function heroToCombatant(hero: Hero): Combatant {
  return {
    id: hero.id,
    name: hero.name,
    hp: hero.maxHp,
    maxHp: hero.maxHp,
    atk: hero.stats.atk,
    def: hero.stats.def,
    spd: hero.stats.spd,
    isEnemy: false,
  };
}

export function createDefender(name: string, level = 1): Combatant {
  const multiplier = 1 + level * 0.1;
  return {
    id: `defender_${name.toLowerCase().replace(/\s+/g, "_")}_${level}`,
    name,
    hp: Math.round(80 * multiplier),
    maxHp: Math.round(80 * multiplier),
    atk: Math.round(14 * multiplier),
    def: Math.round(10 * multiplier),
    spd: Math.round(10 * multiplier),
    isEnemy: true,
  };
}

export function resolveAttack(attacker: Combatant, defender: Combatant) {
  const damage = Math.max(4, attacker.atk - Math.round(defender.def * 0.6));
  const actual = Math.min(defender.hp, damage + Math.floor(Math.random() * 6));
  return actual;
}

export function createCombatOrder(combatants: Combatant[]) {
  return [...combatants].sort((a, b) => b.spd - a.spd || (a.isEnemy === b.isEnemy ? 0 : a.isEnemy ? -1 : 1));
}

export function runCombatRound(combatants: Combatant[]) {
  const log: string[] = [];
  const order = createCombatOrder(combatants);
  const participants = combatants.map((c) => ({ ...c }));

  for (const actor of order) {
    const source = participants.find((item) => item.id === actor.id);
    if (!source || source.hp <= 0) continue;

    const targets = participants.filter((target) => target.isEnemy !== source.isEnemy && target.hp > 0);
    if (targets.length === 0) break;

    const target = targets[Math.floor(Math.random() * targets.length)];
    const damage = resolveAttack(source, target);
    target.hp -= damage;
    if (target.hp < 0) target.hp = 0;

    const actionLabel = source.isEnemy ? "attacks" : "strikes";
    log.push(`> ${source.name} ${actionLabel} ${target.name} for ${damage} damage.`);
  }

  const partyAlive = participants.some((entry) => !entry.isEnemy && entry.hp > 0);
  const enemyAlive = participants.some((entry) => entry.isEnemy && entry.hp > 0);

  return {
    log,
    combatants: participants,
    winner: !partyAlive ? "defenders" : !enemyAlive ? "party" : null,
  } as unknown as CombatResult;
}
