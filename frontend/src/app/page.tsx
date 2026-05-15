import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-86px)] overflow-hidden px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-80" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="panel relative overflow-hidden border-[var(--border-dim)] bg-[var(--bg-elevated)]/95 px-8 py-10 shadow-[0_0_45px_rgba(0,0,0,0.25)]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(212,197,160,0.08)] blur-3xl" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-system)]">
                &gt; awakening thread connection...
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] text-[var(--text-primary)] sm:text-6xl">
                Infinite Towers Online
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                A dark fantasy terminal rogue-lite prototype for summoning heroes, raiding layered towers,
                and shaping personalities in a haunted network of fate.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/summon" className="terminal-btn">
                Enter the Summoning Circle
              </Link>
              <Link href="/raid" className="terminal-btn">
                Strike a Tower Raid
              </Link>
              <Link href="/evolve" className="terminal-btn">
                Explore Evolution Paths
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Hero Generation</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Summon procedurally crafted champions with unique names, backstories, traits, and evolving destinies.
            </p>
          </div>
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Tower Raid</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Build a defensive tower and test your party against AI guardians in narrated turn-based combat.
            </p>
          </div>
          <div className="panel p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Class Evolution</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Unlock branching class upgrades after battle — choose a path that reshapes your hero’s power and story.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
