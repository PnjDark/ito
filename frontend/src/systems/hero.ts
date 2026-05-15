import { randomFromArray } from "@/lib/random";
import { ARCHETYPES, SPECIALIZATIONS } from "@/data/archetypes";
import { SKILLS } from "@/data/skills";
import type { ArchetypeDefinition, HeroSkill, HeroStats, Rarity } from "@/types/hero";

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

export function calculateStats(base: HeroStats, rarity: Rarity): HeroStats {
  const multiplier = rarityMultipliers[rarity] ?? 1;
  return {
    hp: Math.round(base.hp * multiplier + 4),
    atk: Math.round(base.atk * multiplier + 1),
    def: Math.round(base.def * multiplier + 1),
    mag: Math.round(base.mag * multiplier + 1),
    spd: Math.round(base.spd * multiplier + 1),
  };
}

export function chooseSkills(archetypeKey: string) {
  const filtered = SKILLS.filter((skill) => skill.id.includes("blade") || skill.id.includes("ember") || skill.id.includes("runic") || skill.id.includes("ward"));
  return [randomFromArray(filtered), randomFromArray(filtered)].filter(Boolean) as HeroSkill[];
}
