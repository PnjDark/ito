"use client";

import { Panel } from "./Panel";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Panel className="w-full max-w-lg shadow-2xl border-[var(--border-glow)] animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between border-b border-[var(--border-dim)] pb-4 mb-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            [ Close ]
          </button>
        </div>
        <div>{children}</div>
      </Panel>
    </div>
  );
}
