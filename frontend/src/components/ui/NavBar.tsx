import Link from "next/link";

const links = [
  { href: "/summon", label: "Summon" },
  { href: "/roster", label: "Roster" },
  { href: "/tower", label: "Tower" },
  { href: "/raid", label: "Raid" },
  { href: "/evolve", label: "Evolve" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-dim)] bg-[rgba(14,14,20,0.82)]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-[var(--text-secondary)] sm:px-8">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--text-primary)]">
          <span className="inline-flex h-3 w-3 rounded-full bg-[var(--accent-fire)] shadow-[0_0_15px_rgba(232,93,58,0.4)]" />
          <span>Infinite Towers Online</span>
        </div>
        <nav className="hidden items-center gap-3 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm uppercase tracking-[0.16em] transition hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-right text-[var(--text-dim)] text-xs uppercase tracking-[0.25em]">
          Phase 0 Prototype
        </div>
      </div>
    </header>
  );
}
