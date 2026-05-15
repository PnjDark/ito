import type { Hero } from "@/types/hero";

export type Combatant = {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  spd: number;
  isEnemy: boolean;
  status?: string;
};

export type CombatAction = {
  actorId: string;
  targetId: string;
  type: "attack" | "skill" | "defend" | "flee";
  skillId?: string;
};

export type CombatResult = {
  log: string[];
  combatants: Combatant[];
  winner: "party" | "defenders" | "fled";
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
