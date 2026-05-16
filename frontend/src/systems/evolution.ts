import type { Hero, HeroStats } from "@/types/hero";

export type EvolutionOption = {
  id: string;
  name: string;
  description: string;
  bonus: Partial<HeroStats>;
  requirements?: { level: number };
};

export function getEvolutionOptions(hero: Hero): EvolutionOption[] {
  return [
    {
      id: "ascendant_path",
      name: "Ascendant Path",
      description: "Embrace the tower's radiant fury and become a living sigil.",
      bonus: { atk: 6, mag: 6, spd: 2, hp: 10 },
      requirements: { level: 3 },
    },
    {
      id: "warden_path",
      name: "Wardensmith Path",
      description: "Harden your resolve and command the front line with iron will.",
      bonus: { hp: 30, def: 8 },
      requirements: { level: 3 },
    },
    {
      id: "shadow_path",
      name: "Shadow Path",
      description: "Slip through the veil and strike from places your foes cannot read.",
      bonus: { spd: 8, atk: 5 },
      requirements: { level: 3 },
    },
  ];
}

export function applyEvolution(hero: Hero, optionId: string): Hero {
  const options = getEvolutionOptions(hero);
  const option = options.find((entry) => entry.id === optionId) ?? options[0];
  
  const history = hero.evolutionHistory || [];
  
  return {
    ...hero,
    level: hero.level + 1,
    title: `${hero.title} • ${option.name}`,
    evolutionHistory: [...history, option.name],
    stats: {
      hp: hero.stats.hp + (option.bonus.hp ?? 0),
      atk: hero.stats.atk + (option.bonus.atk ?? 0),
      def: hero.stats.def + (option.bonus.def ?? 0),
      mag: hero.stats.mag + (option.bonus.mag ?? 0),
      spd: hero.stats.spd + (option.bonus.spd ?? 0),
    },
    maxHp: hero.maxHp + (option.bonus.hp ?? 0),
  };
}

export function getStatDiff(hero: Hero, option: EvolutionOption) {
  return {
    hp: option.bonus.hp ?? 0,
    atk: option.bonus.atk ?? 0,
    def: option.bonus.def ?? 0,
    mag: option.bonus.mag ?? 0,
    spd: option.bonus.spd ?? 0,
  };
}
