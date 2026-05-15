import type { Hero } from "@/types/hero";

export type EvolutionOption = {
  id: string;
  name: string;
  description: string;
  bonus: Partial<Hero["stats"]>;
};

export function getEvolutionOptions(hero: Hero): EvolutionOption[] {
  return [
    {
      id: "ascendant_path",
      name: "Ascendant Path",
      description: "Embrace the tower's radiant fury and become a living sigil.",
      bonus: { atk: 4, mag: 4, spd: 2 },
    },
    {
      id: "warden_path",
      name: "Wardensmith Path",
      description: "Harden your resolve and command the front line with iron will.",
      bonus: { hp: 18, def: 4 },
    },
    {
      id: "shadow_path",
      name: "Shadow Path",
      description: "Slip through the veil and strike from places your foes cannot read.",
      bonus: { spd: 5, atk: 3 },
    },
  ];
}

export function applyEvolution(hero: Hero, optionId: string): Hero {
  const options = getEvolutionOptions(hero);
  const option = options.find((entry) => entry.id === optionId) ?? options[0];
  return {
    ...hero,
    level: hero.level + 1,
    title: `${hero.title} • ${option.name}`,
    stats: {
      hp: hero.stats.hp + (option.bonus.hp ?? 0),
      atk: hero.stats.atk + (option.bonus.atk ?? 0),
      def: hero.stats.def + (option.bonus.def ?? 0),
      mag: hero.stats.mag + (option.bonus.mag ?? 0),
      spd: hero.stats.spd + (option.bonus.spd ?? 0),
    },
  };
}
