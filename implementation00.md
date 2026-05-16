# Infinite Towers Online — Phase 0: Core Prototype (Revised)

## Goal

Build a **playable, atmospheric web prototype** with a **stylized dark fantasy terminal aesthetic** that proves the core gameplay loop. Think Darkest Dungeon's narrator meets a CRT terminal meets runic interfaces.

### Demo Priorities
1. **Hero Generation** — Gacha summon with procedural personality, backstory, traits
2. **Tower Raid** — Turn-based room-by-room combat with AI defenders
3. **Social Uniqueness** — Personality-driven heroes with mood and dialogue
4. **Class Evolution** — Branching evolution trees with meaningful choices

---

## Tech Stack

| Layer | Tech | Phase 0 Role |
|-------|------|--------------|
| **Frontend** | Next.js 16 + Tailwind CSS v4 | Full prototype UI |
| **Backend** | NestJS | Scaffolded, minimal API for Phase 0 |
| **Database** | PostgreSQL + Redis | Schema defined — game state in localStorage for now |
| **AI** | Template engine | Mad-libs style procedural text, real LLM in Phase 1 |
| **Real-time** | Socket.IO | Scaffolded gateway, not active in Phase 0 |

---

## Visual Identity: Dark Fantasy Terminal Aesthetic

### Color System
```
--bg-void:        #08080c
--bg-terminal:    #0e0e14
--bg-panel:       #14141e
--bg-elevated:    #1a1a28
--border-dim:     #2a2a3a
--border-glow:    #3a3a5a

--text-primary:   #d4c5a0
--text-secondary: #8a8070
--text-system:    #5a7a5a
--text-dim:       #4a4a5a

--rarity-common:    #7a7a8a
--rarity-rare:      #4a8ab5
--rarity-elite:     #9b5de5
--rarity-mythic:    #d4a855
--rarity-ascendant: #ff6b6b

--accent-fire:    #e85d3a
--accent-ice:     #5bc0de
--accent-nature:  #5a8a5a
--accent-shadow:  #6a4c93
--accent-holy:    #f0d060
```

### Typography
- **Headings**: `"Cinzel"` — ornate fantasy serif
- **Body/Lore**: `"Crimson Text"` — readable serif for narrative
- **System/Stats**: `"JetBrains Mono"` — monospace for stats, logs, terminal text
- **UI Labels**: `"Inter"` — clean sans-serif for buttons, navigation

---

## Progress Status

### ✅ Phase 0A: Foundation — COMPLETE

| Item | Status |
|------|--------|
| Next.js + Tailwind v4 + Zustand bootstrap | ✅ Done |
| IDX dev environment (dev.nix, preview, PORT) | ✅ Done |
| `globals.css` — full color tokens, scanlines, terminal-btn, panel utilities | ✅ Done |
| UI primitives: `Panel`, `Button`, `StatBar`, `TypeWriter`, `Scanlines`, `NavBar` | ✅ Done |
| Type definitions: `Hero`, `Tower`, `Combat`, `GameState` | ✅ Done |
| Data: 8 archetypes, 8 specializations, 5 skills, 8 traits, names, backstories | ✅ Done |
| Systems: `gacha`, `hero`, `personality`, `lore`, `tower`, `combat`, `evolution` | ✅ Done |
| Zustand store with localStorage persistence | ✅ Done |
| NestJS backend scaffold + Prisma schema + Docker Compose | ✅ Done |

### ✅ Phase 0B: Core Scenes — COMPLETE

| Scene | Status | Notes |
|-------|--------|-------|
| `/` Title scene | ✅ Done | Atmospheric entry, nav links |
| `/summon` Summon scene | ✅ Done | ×1/×10 summon, multi-result grid, trait badges, stat bars, typewriter backstory |
| `/roster` Roster scene | ✅ Done | Hero list, full detail panel, stats, mood gauges, trait badges, skills |
| `/tower` Tower builder | ✅ Done | Click-to-place/remove rooms, DP budget, persists to store |
| `/raid` Raid scene | ✅ Done | Full multi-round combat, HP bars, turn order, action panel, skill use, flee |
| `/evolve` Evolution scene | ✅ Done | Hero select, 3 branching paths, stat preview, evolve action |

### ✅ Combat Components — COMPLETE

| Component | Status |
|-----------|--------|
| `CombatLog` | ✅ Done |
| `CombatantRow` — HP bar, color-coded health, fallen state | ✅ Done |
| `TurnOrder` — speed-sorted initiative bar | ✅ Done |
| `ActionPanel` — Attack / Defend / Skill / Flee | ✅ Done |
| `MoodGauge` — morale/loyalty/fear bars | ✅ Done |
| `TraitBadge` — pill with tooltip | ✅ Done |
| Data Expansion (Skills, Traits, Backstories, Names) | ✅ Done |
| Combat Depth (Status effects, XP, Loot, Progression) | ✅ Done |
| Tower Depth (Defenders, Procedural Gen, Saving) | ✅ Done |
| Evolution Depth (Level gates, Stat diffs, History) | ✅ Done |
| Visual Polish (Glows, Animations, Mobile Nav) | ✅ Done |

---

## Next Steps — Phase 0C: Polish & Depth

### ✅ Step 11 — Data Expansion — COMPLETE

The data layer has been expanded to support unique hero generation:
- **`skills.ts`** — 26 skills (3+ per archetype)
- **`traits.ts`** — 22 traits
- **`backstories.ts`** — 32 templates with dynamic slot interpolation
- **`names.ts`** — 15 prefixes, 12 middles, 12 suffixes, 20 epithets
- **`archetypes.ts`** — 3 specializations per archetype
- **`gacha.ts`** — Archetype-specific skill assignment wired

---

### ✅ Step 12 — Combat Depth — COMPLETE

Combat has been deepened with status effects, progression, and rewards:
- **Status effects** — Burn (DoT), Shield (DR), and Stun (turn skip) implemented.
- **Skill logic** — Mapped skills to status application in `combat.ts`.
- **Rewards** — XP and Gold calculated per room level and persisted to store.
- **Leveling** — XP triggers level-up, stat recalculation, and max HP increases.
- **Progression** — Multi-room raids implemented with "Next Room" flow.
- **Loot UI** — Created `LootReveal` component for post-combat feedback.

---

### ✅ Step 13 — Tower Depth — COMPLETE

Tower management has been enhanced with defenders and procedural variety:
- **Defender assignment** — Click-to-assign heroes to guard/boss rooms via new Modal.
- **Visual feedback** — Assigned hero names now appear on tower tiles.
- **Procedural Enemy Towers** — Enemy towers are now generated with random themes, names, and defender pools.
- **Tower Themes** — `tower-themes.ts` added with flavor text displayed in the builder.
- **Persistence** — "Save Tower Layout" button added with system confirmation.

---

### ✅ Step 14 — Evolution Depth — COMPLETE

Evolution has been deepened with progression gates and history tracking:
- **Requirements gate** — Evolution paths are now locked until `hero.level >= 3`, with UI warnings.
- **Stat diff preview** — The evolution UI now displays precise stat gains (`+HP`, `+ATK`, etc.) for each path.
- **Evolution history** — Heroes now track their ascension journey in `evolutionHistory`.
- **Lineage UI** — Created `EvolutionHistory` component to visualize the hero's journey in the profile.

---

### ✅ Step 15 — Visual Polish — COMPLETE

The prototype's visual identity has been refined for a premium, immersive feel:
- **Rarity Glows** — Mythic and Ascendant heroes now possess unique glowing borders and pulse animations.
- **Summon Ritual** — Added a dramatic overlay during summoning with spinning sigils and thread resonance effects.
- **Micro-transitions** — Integrated a global page fade-in transition and interactive hover states.
- **Mobile Optimization** — Implemented a persistent bottom navigation bar for mobile users.
- **Active Navigation** — Nav links now highlight based on the current active route.

---
- **Empty state illustrations** — replace plain text empty states with terminal-style ASCII art blocks (e.g. `[ NO HEROES FOUND ]` with rune border)
- **Scanline toggle** — add a `[ CRT: ON ]` toggle in the navbar that persists to localStorage

### ✅ Step 16 — README + Demo Prep — COMPLETE

- **`README.md`** — Comprehensive setup and feature guide created.
- **Verification** — Full gameplay loop verified (Summon → Roster → Tower → Raid → Evolve).
- **Final Polish** — Mobile responsiveness and visual consistency checked across all breakpoints.

---

## Remaining Gaps (Known)

| Gap | Priority | Notes |
|-----|----------|-------|
| Hero portrait images | Low | Placeholder color blocks work for Phase 0; real art in Phase 1 |
| Faction data | Low | Referenced in spec but not yet implemented |
| Tower themes data file | Low | `tower-themes.ts` not yet created |
| `useCombat` hook | Low | Combat logic lives in raid page directly; extract if it grows |
| `useGameState` hook | Low | Direct store selectors used everywhere; fine for Phase 0 |
| Backend API active | Deferred | Phase 1 — migrate game state server-side |
| Socket.IO real-time | Deferred | Phase 1 |

---

## Verification Plan

### Quality Gates
- ✅ Every summoned hero feels unique (name + traits + backstory)
- ✅ Summon reveal is atmospheric and satisfying
- ✅ Combat is readable, strategic, narratively immersive
- ✅ Tower building feels tactile and meaningful
- ✅ Evolution feels like an earned reward
- ✅ Terminal aesthetic is consistent across all scenes
- ✅ Text is readable on mobile (Step 15)
- ✅ Heroes gain XP and level up after raids (Step 12)
- ✅ Skills feel distinct per archetype (Step 11)

### Automated Tests (Step 16)
```bash
# Gacha distribution — verify 10K rolls match expected rates
npm test -- --grep "gacha distribution"

# Combat engine — damage formula, status effects, XP rewards
npm test -- --grep "combat"

# Tower system — placement validation, DP budget
npm test -- --grep "tower"
```

---

## ✅ Phase 0 Complete

All core systems for the "Infinite Towers Online" prototype have been implemented and verified.

| Step | Status |
|------|--------|
| 11 | ✅ Done |
| 12 | ✅ Done |
| 13 | ✅ Done |
| 14 | ✅ Done |
| 15 | ✅ Done |
| 16 | ✅ Done |

**Total remaining: 0 hrs**
