import type { ReactNode } from "react";
import React from "react";

export function Panel({
  children,
  className = "",
  style,
}: Readonly<{ children: ReactNode; className?: string; style?: React.CSSProperties }>) {
  return (
    <section className={`panel rounded-[24px] border border-[var(--border-dim)] p-6 ${className}`} style={style}>
      {children}
    </section>
  );
}
