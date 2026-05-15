export type Rarity = "common" | "rare" | "elite" | "mythic" | "ascendant";

export type ArchetypeKey =
  | "warden"
  | "reclaimer"
  | "umbral"
  | "pyromancer"
  | "voyager"
  | "oracle"
  | "arbiter"
  | "runeblade";

export type SpecializationKey =
  | "bulwark"
  | "sentinel"
  | "ravager"
  | "shade"
  | "ember"
  | "seer"
  | "storm"
  | "aegis";

export type MoodState = "steady" | "inspired" | "tense" | "broken";

export type HeroTrait = {
  id: string;
  name: string;
  description: string;
  moodBonus: Partial<Record<"morale" | "loyalty" | "fear", number>>;
};

export type HeroStats = {
  hp: number;
  atk: number;
  def: number;
  mag: number;
  spd: number;
};

export type HeroSkill = {
  id: string;
  name: string;
  description: string;
  power: number;
  cost: number;
  type: "attack" | "support" | "utility";
};

export type Hero = {
  id: string;
  name: string;
  title: string;
  rarity: Rarity;
  archetype: ArchetypeKey;
  specialization: SpecializationKey;
  level: number;
  xp: number;
  stats: HeroStats;
  maxHp: number;
  skills: HeroSkill[];
  traits: HeroTrait[];
  mood: {
    morale: number;
    loyalty: number;
    fear: number;
    state: MoodState;
  };
  backstory: string;
  portrait: string;
};
