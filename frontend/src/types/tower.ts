import type { Hero } from "@/types/hero";

export type RoomType = "guard" | "vault" | "ritual" | "trap" | "boss";

export type TowerRoom = {
  id: string;
  type: RoomType;
  level: number;
  assignedHeroId?: string;
  dpCost: number;
  label: string;
};

export type TowerGridCell = {
  x: number;
  y: number;
  room?: TowerRoom;
};

export type Tower = {
  id: string;
  name: string;
  theme: string;
  width: number;
  height: number;
  dpBudget: number;
  usedDp: number;
  cells: TowerGridCell[];
  defenders: string[];
  builtAt: string;
  guardedBy?: string;
};

export type RoomPaletteItem = {
  type: RoomType;
  cost: number;
  label: string;
  description: string;
};

export type TowerSummary = {
  id: string;
  name: string;
  difficulty: "novice" | "shadow" | "abyss";
  reward: string;
};
