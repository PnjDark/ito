import { randomInt, randomFromArray } from "@/lib/random";
import { TOWER_THEMES } from "@/data/tower-themes";
import type { Tower, TowerGridCell, TowerRoom, RoomPaletteItem, RoomType } from "@/types/tower";

const roomPalette: RoomPaletteItem[] = [
  { type: "guard", label: "Guard Post", cost: 40, description: "Solid defenders and basic traps." },
  { type: "vault", label: "Vault", cost: 65, description: "Treasury of the deep, lures the greedy." },
  { type: "ritual", label: "Ritual Chamber", cost: 80, description: "Ancient sigils that empower defenders." },
  { type: "trap", label: "Trap Module", cost: 25, description: "Lethal mechanisms to weaken intruders." },
  { type: "boss", label: "Boss Lair", cost: 140, description: "Final sanctum of the tower's strongest." },
];

const enemyTowerNames = ["Obsidian Bastion", "Dorune Archive", "Shattered Spire", "Silent Crypt", "Aether Citadel"];
const enemyDefenderNames = ["Rift Guard", "Rune Watcher", "Void Harrier", "Ash Overlord", "Sigil Breaker", "Grave Stalker"];

export function buildEmptyTower(width = 8, height = 5): Tower {
  const cells: TowerGridCell[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      cells.push({ x, y });
    }
  }

  const theme = TOWER_THEMES[0];

  return {
    id: `tower_player_1`,
    name: "Abyssal Spire",
    theme: theme.name,
    width,
    height,
    dpBudget: 1600,
    usedDp: 0,
    cells,
    defenders: [],
    builtAt: new Date().toISOString(),
  };
}

export function generateEnemyTowers(count = 3): Tower[] {
  return Array.from({ length: count }).map((_, i) => {
    const theme = randomFromArray(TOWER_THEMES);
    return {
      id: `tower_enemy_${i}_${Date.now()}`,
      name: randomFromArray(enemyTowerNames),
      theme: theme.name,
      width: 8,
      height: 5,
      dpBudget: 1000 + i * 400,
      usedDp: 0,
      cells: [],
      defenders: Array.from({ length: 3 + i }).map(() => randomFromArray(enemyDefenderNames)),
      builtAt: new Date().toISOString(),
    };
  });
}

export function getRoomPalette() {
  return roomPalette;
}

export function buildRoom(type: RoomType): TowerRoom {
  return {
    id: `room_${type}_${randomInt(1000, 9999)}`,
    type,
    level: 1,
    dpCost: roomPalette.find((room) => room.type === type)?.cost ?? 40,
    label: roomPalette.find((room) => room.type === type)?.label ?? "Chamber",
  };
}
