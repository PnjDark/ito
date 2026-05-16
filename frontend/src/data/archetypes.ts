export type ArchetypeDefinition = {
  key: string;
  name: string;
  role: string;
  flavor: string;
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    mag: number;
    spd: number;
  };
  specializations: string[];
};

export const ARCHETYPES: ArchetypeDefinition[] = [
  {
    key: "warden",
    name: "Warden",
    role: "Vanguard",
    flavor: "A bastion that anchors the line and absorbs the abyssal strike.",
    baseStats: { hp: 120, atk: 14, def: 18, mag: 8, spd: 8 },
    specializations: ["bulwark", "sentinel", "vanguard"],
  },
  {
    key: "reclaimer",
    name: "Reclaimer",
    role: "Support",
    flavor: "A gathered spirit that heals wounds and rewrites fate.",
    baseStats: { hp: 100, atk: 10, def: 10, mag: 16, spd: 10 },
    specializations: ["seer", "aegis", "curator"],
  },
  {
    key: "umbral",
    name: "Umbral",
    role: "Assassin",
    flavor: "A shadow-born predator that strikes from beyond sight.",
    baseStats: { hp: 90, atk: 18, def: 8, mag: 14, spd: 16 },
    specializations: ["shade", "ravager", "wraith"],
  },
  {
    key: "pyromancer",
    name: "Pyromancer",
    role: "Spellblade",
    flavor: "A volatile flame-wielder whose every spell burns in memory.",
    baseStats: { hp: 92, atk: 16, def: 10, mag: 18, spd: 10 },
    specializations: ["ember", "storm", "shade"],
  },
  {
    key: "voyager",
    name: "Voyager",
    role: "Skirmisher",
    flavor: "A wanderer in the void with uncanny reflexes and cunning.",
    baseStats: { hp: 96, atk: 16, def: 11, mag: 10, spd: 16 },
    specializations: ["storm", "seer", "wraith"],
  },
  {
    key: "oracle",
    name: "Oracle",
    role: "Mage",
    flavor: "A voice of the hidden currents, reading fate in sparks.",
    baseStats: { hp: 84, atk: 10, def: 9, mag: 20, spd: 11 },
    specializations: ["seer", "aegis", "curator"],
  },
  {
    key: "arbiter",
    name: "Arbiter",
    role: "Judicator",
    flavor: "A merciless arbiter that weighs intent and punishment.",
    baseStats: { hp: 108, atk: 16, def: 14, mag: 12, spd: 10 },
    specializations: ["bulwark", "ravager", "vanguard"],
  },
  {
    key: "runeblade",
    name: "Runeblade",
    role: "Blade",
    flavor: "A living glyph that channels rune-crafted strikes.",
    baseStats: { hp: 100, atk: 18, def: 12, mag: 14, spd: 12 },
    specializations: ["shade", "ember", "sentinel"],
  },
];

export const SPECIALIZATIONS: Record<string, string> = {
  bulwark: "Bulwark",
  sentinel: "Sentinel",
  ravager: "Ravager",
  shade: "Shade",
  ember: "Ember",
  seer: "Seer",
  storm: "Storm",
  aegis: "Aegis",
  vanguard: "Vanguard",
  curator: "Curator",
  wraith: "Wraith",
};
