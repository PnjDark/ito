import { randomFromArray, weightedRandom } from "@/lib/random";
import { ARCHETYPES } from "@/data/archetypes";
import type { Hero, Rarity } from "@/types/hero";
import { createBackstory, createHeroId, createHeroName, createHeroTitle, createPortraitUrl } from "@/systems/lore";
import { chooseSkills, calculateStats } from "@/systems/hero";
import { generateMood, generateTraits } from "@/systems/personality";

const rarityPool: Rarity[] = ["common", "rare", "elite", "mythic", "ascendant"];
const rarityWeightsDefault = [0.62, 0.23, 0.10, 0.04, 0.01];

export function rollRarity(pity: number): Rarity {
  const boosted = [...rarityWeightsDefault];
  if (pity >= 50) {
    boosted[3] += 0.1;
    boosted[4] += 0.04;
    boosted[0] -= 0.08;
  }
  return weightedRandom(rarityPool, boosted);
}

export function createHero(rarity: Rarity): Hero {
  const archetype = randomFromArray(ARCHETYPES);
  const name = createHeroName();
  const title = createHeroTitle();
  const specialization = archetype.specializations[Math.floor(Math.random() * archetype.specializations.length)];
  const traits = generateTraits(2);
  const mood = generateMood(traits);
  const stats = calculateStats(archetype.baseStats, rarity);
  const maxHp = stats.hp;

  return {
    id: createHeroId(),
    name,
    title,
    rarity,
    archetype: archetype.key as Hero["archetype"],
    specialization: specialization as Hero["specialization"],
    level: 1,
    xp: 0,
    stats,
    maxHp,
    skills: chooseSkills(archetype.key),
    traits,
    mood,
    evolutionHistory: [],
    backstory: createBackstory({ name, title, archetype: archetype.name }),
    portrait: createPortraitUrl(rarity),
  };
}

export function summonHeroes(count: number, pity: number) {
  const heroes: Hero[] = [];
  let newPity = pity;

  for (let i = 0; i < count; i += 1) {
    const rarity = rollRarity(newPity);
    if (rarity === "mythic" || rarity === "ascendant") {
      newPity = 0;
    } else {
      newPity += 1;
    }
    heroes.push(createHero(rarity));
  }

  return { heroes, nextPity: newPity };
}
