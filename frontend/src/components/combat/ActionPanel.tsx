import type { HeroSkill } from "@/types/hero";

type Props = {
  skills: HeroSkill[];
  onAttack: () => void;
  onDefend: () => void;
  onSkill: (skill: HeroSkill) => void;
  onFlee: () => void;
  disabled?: boolean;
};

export function ActionPanel({ skills, onAttack, onDefend, onSkill, onFlee, disabled }: Props) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          disabled={disabled}
          onClick={onAttack}
          className="terminal-btn disabled:opacity-40"
        >
          [ Attack ]
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onDefend}
          className="terminal-btn disabled:opacity-40"
        >
          [ Defend ]
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onFlee}
          className="terminal-btn disabled:opacity-40"
        >
          [ Flee ]
        </button>
      </div>
      {skills.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {skills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              disabled={disabled}
              onClick={() => onSkill(skill)}
              className="terminal-btn flex items-center justify-between gap-3 disabled:opacity-40"
            >
              <span>{skill.name}</span>
              <span className="text-[var(--text-dim)]">{skill.cost} MP</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
