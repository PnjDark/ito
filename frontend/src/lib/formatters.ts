import type { Rarity } from "@/types/hero";

export function formatRarity(rarity: Rarity) {
  switch (rarity) {
    case "common":
      return "COMMON";
    case "rare":
      return "RARE";
    case "elite":
      return "ELITE";
    case "mythic":
      return "MYTHIC";
    case "ascendant":
      return "ASCENDANT";
  }
}

export function formatStat(value: number) {
  return value.toString();
}

export function rarityColor(rarity: Rarity) {
  switch (rarity) {
    case "common":
      return "#7a7a8a";
    case "rare":
      return "#4a8ab5";
    case "elite":
      return "#9b5de5";
    case "mythic":
      return "#d4a855";
    case "ascendant":
      return "#ff6b6b";
  }
}
