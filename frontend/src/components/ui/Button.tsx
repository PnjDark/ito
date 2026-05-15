import type { ReactNode } from "react";

export function Button({
  children,
  className = "",
  ...props
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
}>) {
  return (
    <button
      className={`terminal-btn border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-[var(--text-primary)] hover:bg-[rgba(212,197,160,0.1)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
