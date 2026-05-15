import type { HeroSkill } from "@/types/hero";

export const SKILLS: HeroSkill[] = [
  {
    id: "blade-wave",
    name: "Blade Wave",
    description: "A sweeping strike that damages all foes.",
    power: 16,
    cost: 10,
    type: "attack",
  },
  {
    id: "aegis-ward",
    name: "Aegis Ward",
    description: "Fortifies allies, reducing damage for one turn.",
    power: 0,
    cost: 8,
    type: "support",
  },
  {
    id: "emberlash",
    name: "Emberlash",
    description: "Ignites the target with ruinous flame.",
    power: 20,
    cost: 12,
    type: "attack",
  },
  {
    id: "shadow-step",
    name: "Shadow Step",
    description: "Slip behind the enemy and strike with precision.",
    power: 18,
    cost: 9,
    type: "utility",
  },
  {
    id: "runic-burst",
    name: "Runic Burst",
    description: "Unleashes stored sigils in a shockwave.",
    power: 22,
    cost: 14,
    type: "attack",
  },
];
