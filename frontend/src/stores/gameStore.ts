"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildEmptyTower, generateEnemyTowers } from "@/systems/tower";
import { summonHeroes as performSummon } from "@/systems/gacha";
import { applyEvolution } from "@/systems/evolution";
import { applyXP } from "@/systems/hero";
import type { GameState } from "@/types/game";
import type { Tower } from "@/types/tower";

const initialResources = {
  fateThreads: 120,
  gold: 420,
  arcana: 10,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      heroes: [],
      selectedParty: [],
      tower: buildEmptyTower(),
      enemyTowers: generateEnemyTowers(),
      resources: initialResources,
      pity: 0,
      combatLog: [],
      activeRoomIndex: 0,
      summonHeroes: async (count: number) => {
        const current = get();
        const cost = count * 10;
        if (current.resources.fateThreads < cost) {
          return [];
        }
        const { heroes, nextPity } = performSummon(count, current.pity);
        set({
          heroes: [...current.heroes, ...heroes],
          pity: nextPity,
          resources: {
            ...current.resources,
            fateThreads: current.resources.fateThreads - cost,
          },
          lastSummon: heroes[heroes.length - 1],
        });
        return heroes;
      },
      addHero: (hero) => {
        set((state) => ({ heroes: [...state.heroes, hero] }));
      },
      setParty: (heroIds: string[]) => set({ selectedParty: heroIds }),
      spendFate: (amount: number) =>
        set((state) => ({ resources: { ...state.resources, fateThreads: Math.max(0, state.resources.fateThreads - amount) } })),
      appendCombatLog: (entry: string) =>
        set((state) => ({ combatLog: [...state.combatLog, entry] })),
      resetCombatLog: () => set({ combatLog: [] }),
      progressRoom: () => set((state) => ({ activeRoomIndex: state.activeRoomIndex + 1 })),
      updateTower: (tower: Tower) => set({ tower }),
      evolveHero: (heroId: string, pathId: string) => {
        set((state) => ({
          heroes: state.heroes.map((hero) =>
            hero.id === heroId ? applyEvolution(hero, pathId) : hero
          ),
        }));
      },
      addRewards: (heroIds: string[], rewards: { xp: number; gold: number; moodChange: { morale: number; fear: number } }) => {
        set((state) => {
          const nextHeroes = state.heroes.map((h) => {
            if (heroIds.includes(h.id)) {
              const updated = {
                ...h,
                mood: {
                  ...h.mood,
                  morale: Math.min(100, h.mood.morale + rewards.moodChange.morale),
                  fear: Math.max(0, h.mood.fear + rewards.moodChange.fear),
                },
              };
              applyXP(updated, rewards.xp);
              return updated;
            }
            return h;
          });
          return {
            heroes: nextHeroes,
            resources: { ...state.resources, gold: state.resources.gold + rewards.gold },
          };
        });
      },
    }),
    {
      name: "ito-game-store",
      partialize: (state) => ({
        heroes: state.heroes,
        selectedParty: state.selectedParty,
        tower: state.tower,
        enemyTowers: state.enemyTowers,
        resources: state.resources,
        pity: state.pity,
      }),
    }
  )
);
