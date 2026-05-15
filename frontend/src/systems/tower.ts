import { randomInt } from "@/lib/random";
import type { Tower, TowerGridCell, RoomPaletteItem } from "@/types/tower";

const roomPalette: RoomPaletteItem[] = [
  { type: "guard", label: "Guard Post", cost: 40, description: "Weak defenders and slow traps." },
  { type: "vault", label: "Vault", cost: 65, description: "Contains treasure and hidden threats." },
  { type: "ritual", label: "Ritual Chamber", cost: 80, description: "Strengthens defenders within range." },
  { type: "trap", label: "Trap Module", cost: 25, description: "Deals damage to intruders before combat." },
  { type: "boss", label: "Boss Lair", cost: 140, description: "Home to the strongest guardian." },
];

export function buildEmptyTower(width = 8, height = 5): Tower {
  const cells: TowerGridCell[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      cells.push({ x, y });
    }
  }

  return {
    id: `tower_player_1`,
    name: "Abyssal Spire",
    theme: "Runic Bastion",
    width,
    height,
    dpBudget: 1600,
    usedDp: 0,
    cells,
    defenders: [],
    builtAt: new Date().toISOString(),
  };
}

export function generateEnemyTowers() {
  return [
    {
      id: "tower_shadow_1",
      name: "Obsidian Bastion",
      theme: "Shadow",
      width: 8,
      height: 5,
      dpBudget: 1200,
      usedDp: 0,
      cells: [],
      defenders: ["Rift Guard", "Rune Watcher", "Void Harrier"],
      builtAt: new Date().toISOString(),
    },
    {
      id: "tower_abyss_2",
      name: "Dorune Archive",
      theme: "Arcane",
      width: 8,
      height: 5,
      dpBudget: 1400,
      usedDp: 0,
      cells: [],
      defenders: ["Bonewarden", "Sigil Breaker", "Ash Overlord"],
      builtAt: new Date().toISOString(),
    },
  ] as Tower[];
}

export function getRoomPalette() {
  return roomPalette;
}

export function buildRoom(type: string) {
  return {
    id: `room_${type}_${randomInt(1000, 9999)}`,
    type,
    level: 1,
    dpCost: roomPalette.find((room) => room.type === type)?.cost ?? 40,
    label: roomPalette.find((room) => room.type === type)?.label ?? "Chamber",
  };
}
