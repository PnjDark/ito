import type { Hero } from "@/types/hero";

const moodColors: Record<Hero["mood"]["state"], string> = {
  steadfast: "var(--accent-nature)",
  inspired: "var(--accent-holy)",
  tense: "var(--accent-fire)",
  broken: "var(--rarity-ascendant)",
};

export function MoodGauge({ mood }: { mood: Hero["mood"] }) {
  const color = moodColors[mood.state] ?? "var(--text-secondary)";
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.2em] text-[var(--text-system)] text-xs">Mood</span>
        <span className="capitalize text-[var(--text-primary)]" style={{ color }}>{mood.state}</span>
      </div>
      {(["morale", "loyalty", "fear"] as const).map((key) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between text-[var(--text-secondary)]">
            <span className="capitalize">{key}</span>
            <span>{mood[key]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full transition-all"
              style={{ width: `${Math.min(mood[key] / 30, 1) * 100}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
