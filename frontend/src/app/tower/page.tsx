"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { getRoomPalette, buildRoom, buildEmptyTower } from "@/systems/tower";
import type { TowerGridCell, RoomType } from "@/types/tower";

const EMPTY_TOWER = buildEmptyTower();

export default function TowerPage() {
  const [tower, setTower] = useState(EMPTY_TOWER);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>("guard");

  const usedDp = useMemo(
    () => tower.cells.reduce((sum, cell) => sum + (cell.room?.dpCost ?? 0), 0),
    [tower.cells]
  );

  const palette = getRoomPalette();

  const handlePlace = (cell: TowerGridCell) => {
    const room = buildRoom(selectedRoom);
    if (usedDp + room.dpCost > tower.dpBudget) return;
    setTower((current) => ({
      ...current,
      cells: current.cells.map((item) =>
        item.x === cell.x && item.y === cell.y ? { ...item, room } : item
      ),
    }));
  };

  return (
    <main className="relative min-h-[calc(100vh-86px)] px-6 py-10 lg:px-12">
      <div className="scanlines absolute inset-0 pointer-events-none opacity-45" />
      <div className="mx-auto grid max-w-7xl gap-8">
        <Panel className="space-y-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-system)]">&gt; tower editing</p>
            <h1 className="text-4xl font-semibold text-[var(--text-primary)]">Tower Builder</h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              Lay down rooms, manage your defense point budget, and prepare a tower for enemy raid assaults.
            </p>
          </div>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_0.45fr]">
          <Panel className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">DP budget</p>
                <p className="mt-2 text-lg text-[var(--text-primary)]">{usedDp} / {tower.dpBudget}</p>
              </div>
              <div className="rounded-full border border-[var(--border-dim)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[var(--text-secondary)]">
                {tower.theme}
              </div>
            </div>

            <div className="grid gap-2 rounded-[20px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)] p-4">
              {Array.from({ length: tower.height }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid grid-cols-8 gap-2">
                  {tower.cells.slice(rowIndex * tower.width, rowIndex * tower.width + tower.width).map((cell) => (
                    <button
                      key={`${cell.x}-${cell.y}`}
                      type="button"
                      onClick={() => handlePlace(cell)}
                      className="aspect-square rounded-xl border border-[var(--border-dim)] bg-[var(--bg-panel)] transition hover:border-[var(--text-primary)]"
                    >
                      <span className="block h-full w-full text-[0.65rem] text-[var(--text-secondary)]">
                        {cell.room?.label ?? "Empty"}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="space-y-5">
            <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">Room Palette</p>
              <div className="mt-4 space-y-3">
                {palette.map((room) => (
                  <button
                    key={room.type}
                    type="button"
                    onClick={() => setSelectedRoom(room.type)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${selectedRoom === room.type ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)]" : "border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"}`}
                  >
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{room.label}</p>
                      <p className="text-[var(--text-secondary)] text-sm">{room.description}</p>
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{room.cost} DP</span>
                  </button>
                ))}
              </div>
            </div>
            <Button disabled={usedDp >= tower.dpBudget} className="w-full">
              Place selected room
            </Button>
            <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5 text-sm text-[var(--text-secondary)]">
              <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Tip</p>
              <p className="mt-3">Select a room type, then click an empty tile to place it. Use guard rooms to slow intruders and boss chambers to anchor your tower.</p>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}
