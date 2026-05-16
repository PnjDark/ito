import { randomFromArray } from "@/lib/random";
import { ARCHETYPES, SPECIALIZATIONS } from "@/data/archetypes";
import { SKILLS } from "@/data/skills";
import type { ArchetypeDefinition } from "@/data/archetypes";
import type { HeroSkill, HeroStats, Rarity } from "@/types/hero";

const rarityMultipliers: Record<Rarity, number> = {
  common: 0.92,
  rare: 1,
  elite: 1.08,
  mythic: 1.18,
  ascendant: 1.32,
};

export function chooseArchetype() {
  return randomFromArray(ARCHETYPES);
}

export function chooseSpecialization(archetype: ArchetypeDefinition) {
  return randomFromArray(archetype.specializations);
}

export function calculateStats(base: HeroStats, rarity: Rarity, level = 1): HeroStats {
  const multiplier = (rarityMultipliers[rarity] ?? 1) * (1 + (level - 1) * 0.1);
  return {
    hp: Math.round(base.hp * multiplier + 4),
    atk: Math.round(base.atk * multiplier + 1),
    def: Math.round(base.def * multiplier + 1),
    mag: Math.round(base.mag * multiplier + 1),
    spd: Math.round(base.spd * multiplier + 1),
  };
}

export function applyXP(hero: any, xp: number) {
  hero.xp += xp;
  const threshold = hero.level * 100;
  if (hero.xp >= threshold) {
    hero.level += 1;
    hero.xp -= threshold;
    const archetype = ARCHETYPES.find((a) => a.key === hero.archetype);
    if (archetype) {
      hero.stats = calculateStats(archetype.baseStats, hero.rarity, hero.level);
      hero.maxHp = hero.stats.hp;
    }
    return true; // Leveled up
  }
  return false;
}

export function chooseSkills(archetypeKey: string): HeroSkill[] {
  const archetypeSkills = SKILLS.filter((s) => s.archetype === archetypeKey);
  const generalSkills = SKILLS.filter((s) => !s.archetype);

  const primary = randomFromArray(archetypeSkills.filter((s) => s.type === "attack")) || 
                  randomFromArray(generalSkills.filter((s) => s.type === "attack"));
  
  const secondary = randomFromArray(archetypeSkills.filter((s) => s.type !== "attack" && s.id !== primary?.id)) ||
                    randomFromArray(generalSkills.filter((s) => s.type !== "attack" && s.id !== primary?.id));

  return [primary, secondary].filter(Boolean) as HeroSkill[];
}
