import { randomFromArray, weightedRandom } from "@/lib/random";
import { TRAITS } from "@/data/traits";
import type { HeroTrait, MoodState } from "@/types/hero";

const moodStates: MoodState[] = ["steadfast", "inspired", "tense", "broken"];

export function generateTraits(count = 2): HeroTrait[] {
  const pool = [...TRAITS];
  const chosen: HeroTrait[] = [];

  while (chosen.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(index, 1)[0]);
  }

  return chosen;
}

export function generateMood(traits: HeroTrait[]) {
  const morale = Math.max(15, traits.reduce((sum, trait) => sum + (trait.moodBonus.morale ?? 0), 0) + 20);
  const loyalty = Math.max(12, traits.reduce((sum, trait) => sum + (trait.moodBonus.loyalty ?? 0), 0) + 18);
  const fear = Math.max(8, traits.reduce((sum, trait) => sum + (trait.moodBonus.fear ?? 0), 0) + 12);

  const choice = weightedRandom(moodStates, [45, 25, 20, 10]);

  return {
    morale,
    loyalty,
    fear,
    state: choice,
  };
}
