import type { Combatant, CombatResult, CombatRewards, StatusEffectId } from "@/types/combat";
import type { Hero, HeroSkill } from "@/types/hero";

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
    statusEffects: [],
  };
}

export function createDefender(name: string, level = 1): Combatant {
  const multiplier = 1 + level * 0.1;
  return {
    id: `defender_${name.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}_${Math.random()}`,
    name,
    hp: Math.round(80 * multiplier),
    maxHp: Math.round(80 * multiplier),
    atk: Math.round(14 * multiplier),
    def: Math.round(10 * multiplier),
    spd: Math.round(10 * multiplier),
    isEnemy: true,
    statusEffects: [],
  };
}

export function calculateRewards(roomLevel: number): CombatRewards {
  return {
    xp: 20 + roomLevel * 10,
    gold: 50 + roomLevel * 25,
    moodChange: {
      morale: 5,
      fear: -2,
    },
  };
}

export function resolveAttack(attacker: Combatant, defender: Combatant) {
  const shield = defender.statusEffects.find(e => e.id === "shield")?.value ?? 0;
  const baseDamage = attacker.atk - Math.round(defender.def * 0.5);
  const damage = Math.max(4, baseDamage - shield);
  const variance = Math.floor(Math.random() * (attacker.atk * 0.2 + 2));
  return Math.min(defender.hp, damage + variance);
}

export function processStatusEffects(combatant: Combatant): { log: string[]; updated: Combatant } {
  const log: string[] = [];
  const updated = { ...combatant, statusEffects: [...combatant.statusEffects] };
  
  updated.statusEffects = updated.statusEffects.map(eff => {
    if (eff.id === "burn") {
      const dmg = Math.round(updated.maxHp * 0.08);
      updated.hp = Math.max(0, updated.hp - dmg);
      log.push(`> ${updated.name} suffers ${dmg} burn damage.`);
    }
    return { ...eff, duration: eff.duration - 1 };
  }).filter(eff => eff.duration > 0);
  
  return { log, updated };
}

export function applySkillEffect(skill: HeroSkill, target: Combatant): { log: string[]; updated: Combatant } {
  const updated = { ...target, statusEffects: [...target.statusEffects] };
  const log: string[] = [];

  // Logic for specific skills
  if (skill.id === "emberlash" || skill.id === "venom-bite") {
    updated.statusEffects.push({ id: "burn", duration: 3 });
    log.push(`> ${target.name} is ignited!`);
  } else if (skill.id === "aegis-ward" || skill.id === "fate-weave") {
    updated.statusEffects.push({ id: "shield", duration: 2, value: 10 });
    log.push(`> ${target.name} is shielded.`);
  } else if (skill.id === "mind-pierce" || skill.id === "void-collapse") {
    if (Math.random() > 0.6) {
      updated.statusEffects.push({ id: "stun", duration: 1 });
      log.push(`> ${target.name} is stunned!`);
    }
  }

  return { log, updated };
}

export function createCombatOrder(combatants: Combatant[]) {
  return [...combatants].sort((a, b) => b.spd - a.spd);
}
