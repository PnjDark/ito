import type { Hero } from "@/types/hero";

export type StatusEffectId = "burn" | "shield" | "stun";

export type StatusEffect = {
  id: StatusEffectId;
  duration: number;
  value?: number;
};

export type Combatant = {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  spd: number;
  isEnemy: boolean;
  statusEffects: StatusEffect[];
};

export type CombatAction = {
  actorId: string;
  targetId: string;
  type: "attack" | "skill" | "defend" | "flee";
  skillId?: string;
};

export type CombatRewards = {
  xp: number;
  gold: number;
  moodChange: { morale: number; fear: number };
};

export type CombatResult = {
  log: string[];
  combatants: Combatant[];
  winner: "party" | "defenders" | "fled" | null;
  rewards?: CombatRewards;
};

export type CombatRoom = {
  id: string;
  name: string;
  description: string;
  defenders: Combatant[];
};

export type CombatEncounter = {
  room: CombatRoom;
  heroParty: Hero[];
};
