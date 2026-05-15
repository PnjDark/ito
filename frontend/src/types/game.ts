import type { Hero } from "@/types/hero";
import type { Tower } from "@/types/tower";

export type PlayerResources = {
  fateThreads: number;
  gold: number;
  arcana: number;
};

export type GameState = {
  heroes: Hero[];
  rosterVisibleHeroId?: string;
  selectedParty: string[];
  tower: Tower;
  enemyTowers: Tower[];
  resources: PlayerResources;
  pity: number;
  lastSummon?: Hero;
  combatLog: string[];
  activeRoomIndex: number;
  currentEncounter?: {
    roomId: string;
    defenders: string[];
  };
  summonHeroes: (count: number) => Promise<Hero[]>;
  addHero: (hero: Hero) => void;
  setParty: (heroIds: string[]) => void;
  spendFate: (amount: number) => void;
  appendCombatLog: (entry: string) => void;
  resetCombatLog: () => void;
  progressRoom: () => void;
  evolveHero: (heroId: string, pathId: string) => void;
};
