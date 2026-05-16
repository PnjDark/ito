import { BACKSTORY_TEMPLATES } from "@/data/backstories";
import { FACTIONS } from "@/data/factions";
import { EPITHETS, NAME_MIDDLES, NAME_PREFIXES, NAME_SUFFIXES } from "@/data/names";
import { randomFromArray, randomInt } from "@/lib/random";

export function createHeroName() {
  const prefix = randomFromArray(NAME_PREFIXES);
  const middle = randomFromArray(NAME_MIDDLES);
  const suffix = randomFromArray(NAME_SUFFIXES);
  return `${prefix}${middle}${suffix}`;
}

export function createHeroTitle() {
  return randomFromArray(EPITHETS);
}

export function createBackstory(hero: { name: string; title: string; archetype: string }) {
  const template = randomFromArray(BACKSTORY_TEMPLATES);
  const faction = randomFromArray(FACTIONS);
  return template
    .replace(/{name}/g, hero.name)
    .replace(/{epithet}/g, hero.title)
    .replace(/{archetype}/g, hero.archetype)
    .replace(/{faction}/g, faction);
}

export function createPortraitUrl(rarity: string) {
  const theme = rarity === "ascendant" ? "ember" : rarity === "mythic" ? "arcane" : "stone";
  return `/assets/portraits/${theme}.png`;
}

export function createHeroId() {
  return `hero_${Date.now()}_${randomInt(1000, 9999)}`;
}
