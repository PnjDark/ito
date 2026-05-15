import { BACKSTORY_TEMPLATES } from "@/data/backstories";
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

export function createBackstory(name: string) {
  const template = randomFromArray(BACKSTORY_TEMPLATES);
  return template.replace("{name}", name);
}

export function createPortraitUrl(rarity: string) {
  const theme = rarity === "ascendant" ? "ember" : rarity === "mythic" ? "arcane" : "stone";
  return `/assets/portraits/${theme}.png`;
}

export function createHeroId() {
  return `hero_${Date.now()}_${randomInt(1000, 9999)}`;
}
