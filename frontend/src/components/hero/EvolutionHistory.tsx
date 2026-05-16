"use client";

type EvolutionHistoryProps = {
  history: string[];
};

export function EvolutionHistory({ history }: EvolutionHistoryProps) {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-2 py-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-system)]">Lineage Path</p>
      <div className="flex flex-wrap items-center gap-2">
        {history.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">{step}</span>
            {i < history.length - 1 && (
              <span className="text-[var(--text-dim)]">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
