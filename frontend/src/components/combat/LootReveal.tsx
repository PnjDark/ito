"use client";

import { Panel } from "@/components/ui/Panel";
import { TypeWriter } from "@/components/ui/TypeWriter";
import type { CombatRewards } from "@/types/combat";

type LootRevealProps = {
  rewards: CombatRewards;
  onContinue: () => void;
};

export function LootReveal({ rewards, onContinue }: LootRevealProps) {
  return (
    <Panel className="space-y-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Raid Spoils</h2>
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Extraction complete</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1 rounded-xl border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] py-4">
          <p className="text-xs uppercase text-[var(--text-secondary)]">XP Gained</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">+{rewards.xp}</p>
        </div>
        <div className="space-y-1 rounded-xl border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] py-4">
          <p className="text-xs uppercase text-[var(--text-secondary)]">Gold Found</p>
          <p className="text-2xl font-bold text-[var(--accent-holy)]">+{rewards.gold}</p>
        </div>
      </div>

      <div className="space-y-3 py-2">
        <p className="text-sm text-[var(--text-secondary)] italic">
          <TypeWriter text="Your heroes emerge from the gloom, their threads of fate slightly stronger..." speed={30} />
        </p>
        <div className="flex justify-center gap-6 text-xs uppercase tracking-widest">
          <span className="text-[var(--text-system)]">Morale +{rewards.moodChange.morale}</span>
          <span className="text-[var(--rarity-ascendant)]">Fear {rewards.moodChange.fear}</span>
        </div>
      </div>

      <button onClick={onContinue} className="terminal-btn w-full">
        [ Claim & Continue ]
      </button>
    </Panel>
  );
}
