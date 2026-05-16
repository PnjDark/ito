"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/summon", label: "Summon" },
  { href: "/roster", label: "Roster" },
  { href: "/tower", label: "Tower" },
  { href: "/raid", label: "Raid" },
  { href: "/evolve", label: "Evolve" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--border-dim)] bg-[rgba(14,14,20,0.82)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-[var(--text-secondary)] sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--text-primary)] hover:opacity-80 transition">
            <span className="inline-flex h-3 w-3 rounded-full bg-[var(--accent-fire)] shadow-[0_0_15px_rgba(232,93,58,0.4)]" />
            <span className="hidden sm:inline">Infinite Towers Online</span>
            <span className="sm:hidden">ITO</span>
          </Link>
          <nav className="hidden items-center gap-3 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm border px-3 py-2 text-sm uppercase tracking-[0.16em] transition ${
                  pathname === link.href 
                    ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)] text-[var(--text-primary)]" 
                    : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-right text-[var(--text-dim)] text-xs uppercase tracking-[0.25em]">
            v0.1.0-alpha
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--border-dim)] bg-[var(--bg-terminal)]/90 px-2 pb-5 pt-3 backdrop-blur-xl sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1.5 px-3 py-1 transition-all ${
              pathname === link.href 
                ? "text-[var(--text-primary)] scale-110" 
                : "text-[var(--text-dim)] hover:text-[var(--text-secondary)]"
            }`}
          >
            <span className={`h-1 w-1 rounded-full ${pathname === link.href ? "bg-[var(--text-primary)]" : "bg-transparent"}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
