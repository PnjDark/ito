import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <section className={`panel rounded-[24px] border border-[var(--border-dim)] p-6 ${className}`}>
      {children}
    </section>
  );
}
