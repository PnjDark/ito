"use client";

import React, { useMemo } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { getRoomPalette, buildRoom } from "@/systems/tower";
import { Modal } from "@/components/ui/Modal";
import { TOWER_THEMES } from "@/data/tower-themes";
import type { TowerGridCell, RoomType, TowerRoom } from "@/types/tower";

export default function TowerPage() {
  const heroes = useGameStore((state) => state.heroes);
  const [selectedRoom, setSelectedRoom] = React.useState<RoomType>("guard");
  const [assigningCell, setAssigningCell] = React.useState<TowerGridCell | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const usedDp = useMemo(
    () => tower.cells.reduce((sum, cell) => sum + (cell.room?.dpCost ?? 0), 0),
    [tower.cells]
  );

  const palette = getRoomPalette();

  const handlePlace = (cell: TowerGridCell) => {
    if (cell.room) {
      if (cell.room.type === "guard" || cell.room.type === "boss") {
        setAssigningCell(cell);
        return;
      }
      // Simple room, just remove
      updateTower({
        ...tower,
        cells: tower.cells.map((item) =>
          item.x === cell.x && item.y === cell.y ? { ...item, room: undefined } : item
        ),
      });
      return;
    }
    const room = buildRoom(selectedRoom);
    if (usedDp + room.dpCost > tower.dpBudget) return;
    updateTower({
      ...tower,
      cells: tower.cells.map((item) =>
        item.x === cell.x && item.y === cell.y ? { ...item, room } : item
      ),
    });
  };

  const handleAssignHero = (heroId: string | undefined) => {
    if (!assigningCell) return;
    updateTower({
      ...tower,
      cells: tower.cells.map((item) =>
        item.x === assigningCell.x && item.y === assigningCell.y 
          ? { ...item, room: { ...item.room!, assignedHeroId: heroId } as TowerRoom } 
          : item
      ),
    });
    setAssigningCell(null);
  };

  const removeRoom = (cell: TowerGridCell) => {
    updateTower({
      ...tower,
      cells: tower.cells.map((item) =>
        item.x === cell.x && item.y === cell.y ? { ...item, room: undefined } : item
      ),
    });
    setAssigningCell(null);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const towerTheme = TOWER_THEMES.find(t => t.name === tower.theme) ?? TOWER_THEMES[0];

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
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-system)]">{tower.theme}</p>
                <p className="mt-1 text-sm italic text-[var(--text-secondary)]">{towerTheme.flavor}</p>
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
                      title={cell.room ? `${cell.room.label} — click to remove` : "Empty — click to place"}
                      className={`aspect-square rounded-xl border transition text-[0.6rem] leading-tight p-1 flex flex-col items-center justify-center gap-0.5 ${
                        cell.room
                          ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.08)] text-[var(--text-primary)]"
                          : "border-[var(--border-dim)] bg-[var(--bg-panel)] hover:border-[var(--text-primary)] text-[var(--text-dim)]"
                      }`}
                    >
                      {cell.room ? (
                        <>
                          <span className="font-bold">{cell.room.label.split(" ")[0]}</span>
                          {cell.room.assignedHeroId && (
                            <span className="text-[0.5rem] text-[var(--text-system)] truncate w-full">
                              {heroes.find(h => h.id === cell.room!.assignedHeroId)?.name.split(" ")[0]}
                            </span>
                          )}
                        </>
                      ) : (
                        "·"
                      )}
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
            <Button disabled={usedDp >= tower.dpBudget} onClick={() => {}} className="w-full">
              Place selected room
            </Button>
            <Button onClick={handleSave} className="w-full border-[var(--text-system)] text-[var(--text-system)] hover:bg-[var(--text-system)]/10">
              {isSaving ? "[ SYSTEM SAVED ]" : "[ Save Tower Layout ]"}
            </Button>
            <div className="rounded-[22px] border border-[var(--border-dim)] bg-[rgba(255,255,255,0.03)] p-5 text-sm text-[var(--text-secondary)]">
              <p className="uppercase tracking-[0.24em] text-[var(--text-system)]">Tip</p>
              <p className="mt-3">Select a room type, then click an empty tile to place it. Click a placed room to remove it. Use guard rooms to slow intruders and boss chambers to anchor your tower.</p>
            </div>
          </Panel>
        </div>
      </div>
       <Modal
        isOpen={!!assigningCell}
        onClose={() => setAssigningCell(null)}
        title={assigningCell?.room?.label ?? "Room Assignment"}
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Assign a hero from your roster to defend this {assigningCell?.room?.type}. Defenders will be the first line of defense during raids.
          </p>
          <div className="grid gap-2 max-h-60 overflow-y-auto">
            <button
              onClick={() => handleAssignHero(undefined)}
              className="w-full rounded-xl border border-[var(--border-dim)] p-3 text-left hover:border-[var(--text-primary)] transition"
            >
              <p className="font-semibold text-[var(--text-dim)]">[ None / Remove Defender ]</p>
            </button>
            {heroes.map(hero => (
              <button
                key={hero.id}
                onClick={() => handleAssignHero(hero.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  assigningCell?.room?.assignedHeroId === hero.id 
                    ? "border-[var(--text-primary)] bg-[rgba(212,197,160,0.1)]" 
                    : "border-[var(--border-dim)] hover:border-[var(--text-primary)]"
                }`}
              >
                <p className="font-semibold text-[var(--text-primary)]">{hero.name}</p>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-tighter">
                  {hero.rarity} {hero.archetype} · Level {hero.level}
                </p>
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-[var(--border-dim)]">
            <button
              onClick={() => assigningCell && removeRoom(assigningCell)}
              className="w-full rounded-xl border border-[var(--rarity-ascendant)] py-3 text-[var(--rarity-ascendant)] hover:bg-[var(--rarity-ascendant)]/10 transition"
            >
              [ Dismantle Room ]
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
