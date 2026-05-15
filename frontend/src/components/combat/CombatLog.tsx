export function CombatLog({ entries }: { entries: string[] }) {
  return (
    <div className="panel h-full overflow-y-auto rounded-[24px] border border-[var(--border-dim)] bg-[var(--bg-panel)]/95 p-4 text-sm text-[var(--text-secondary)]">
      <p className="mb-4 uppercase tracking-[0.2em] text-[var(--text-system)]">Combat Log</p>
      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-[var(--text-primary)]">No actions yet. Begin your assault.</p>
        ) : (
          entries.map((entry, index) => (
            <p className="leading-6" key={`${entry}-${index}`}>{entry}</p>
          ))
        )}
      </div>
    </div>
  );
}
