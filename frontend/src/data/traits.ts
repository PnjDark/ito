import type { HeroTrait } from "@/types/hero";

export const TRAITS: HeroTrait[] = [
  {
    id: "steadfast",
    name: "Steadfast",
    description: "Remains calm under pressure, gaining an edge when allies falter.",
    moodBonus: { morale: 3, loyalty: 2 },
  },
  {
    id: "untamed",
    name: "Untamed",
    description: "Fights with reckless intensity when enraged.",
    moodBonus: { fear: 2 },
  },
  {
    id: "silent",
    name: "Silent",
    description: "Speaks little, but reacts sharply to danger.",
    moodBonus: { loyalty: 1 },
  },
  {
    id: "mercurial",
    name: "Mercurial",
    description: "Mood swings shift their combat style from cautious to explosive.",
    moodBonus: { morale: 1, fear: 1 },
  },
  {
    id: "scholarly",
    name: "Scholarly",
    description: "A scholar of the towers; learns from every encounter.",
    moodBonus: { loyalty: 2 },
  },
  {
    id: "reverent",
    name: "Reverent",
    description: "Feels awe in the presence of ancient sigils, steadying the party.",
    moodBonus: { morale: 2 },
  },
  {
    id: "wraithlike",
    name: "Wraithlike",
    description: "Seemingly insubstantial, able to slip between attacks.",
    moodBonus: { fear: 1 },
  },
  {
    id: "domineering",
    name: "Domineering",
    description: "Pushes allies hard, sometimes earning dread as much as devotion.",
    moodBonus: { loyalty: 1, fear: 1 },
  },
];
