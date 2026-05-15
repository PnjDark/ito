"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { useGameStore } from "@/stores/gameStore";
import { formatRarity, rarityColor } from "@/lib/formatters";

export default function SummonPage() {
  const fateThreads = useGameStore((state) => state.resources.fateThreads);
  const pity = useGameStore((state) => state.pity);
  const lastSummon = useGameStore((state) => state.lastSummon);
  const summon = useGameStore((state) => state.summonHeroes);
  const [busy, setBusy] = useState(false);

  const handleSummon = async (count: number) => {
    setBusy(true);
    await summon(count);
    setBusy(false);
  };

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-8">
        <Panel className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">
              &gt; thread resonance engaged...
            </p>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Summoning Circle</h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              Cast fate threads into the void and draw forth heroes shaped by ancient sigils and volatile personalities.
            </p>
          </div>

          <div className="grid gap-4 rounded-[20px] border border-[var(--border-dim)] bg-[var(--bg-elevated)] p-6 sm:grid-cols-[1fr_auto]">
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <p>Fate Threads: <span className="text-[var(--text-primary)]">{fateThreads}</span></p>
              <p>Thread Resonance: <span className="text-[var(--text-primary)]">{pity}/90</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled={busy || fateThreads < 10} onClick={() => handleSummon(1)}>
                Summon ×1
              </Button>
              <Button disabled={busy || fateThreads < 100} onClick={() => handleSummon(10)}>
                Summon ×10
              </Button>
            </div>
          </div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Panel className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Latest Summon</h2>
              {!lastSummon ? (
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  No hero has been summoned yet. Use the summoning circle to tear a new champion from the tower's thread.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">{formatRarity(lastSummon.rarity)}</p>
                      <h3 className="text-3xl font-semibold text-[var(--text-primary)]">{lastSummon.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{lastSummon.title}</p>
                    </div>
                    <div className="h-24 w-24 rounded-[18px] border border-[var(--border-dim)] bg-white/5" style={{ backgroundColor: rarityColor(lastSummon.rarity) + "22" }} />
                  </div>

                  <div className="grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                    <div className="rounded-lg bg-[rgba(255,255,255,0.03)] p-4">
                      <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Archetype</p>
                      <p className="mt-2 text-[var(--text-primary)] capitalize">{lastSummon.archetype}</p>
                    </div>
                    <div className="rounded-lg bg-[rgba(255,255,255,0.03)] p-4">
                      <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Specialization</p>
                      <p className="mt-2 text-[var(--text-primary)] capitalize">{lastSummon.specialization}</p>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-[18px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-4 text-sm text-[var(--text-secondary)]">
                    <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Backstory</p>
                    <TypeWriter text={lastSummon.backstory} speed={30} />
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <Panel className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Summon Notes</h2>
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
              <li>• Cost: 10 Fate Threads per summon.</li>
              <li>• Pity increases with non-mythic summons.</li>
              <li>• Rare and above heroes bring stronger traits and backstories.</li>
            </ul>
            <Link href="/roster" className="terminal-btn w-full text-center">
              View Your Roster
            </Link>
          </Panel>
        </div>
      </div>
    </main>
  );
}
