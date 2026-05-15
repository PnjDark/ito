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

---

## Next Steps — Phase 0C: Polish & Depth

### Step 11 — Data Expansion *(~2 hrs)*

The current data is minimal (5 skills, 8 traits, 8 backstory templates). Expand to make heroes feel genuinely unique:

- **`skills.ts`** — expand from 5 → 20+ skills, distributed across archetypes (each archetype gets 3–4 unique skills)
- **`traits.ts`** — expand from 8 → 20+ traits with varied mood bonus combinations
- **`backstories.ts`** — expand from 8 → 30+ templates, add `{archetype}`, `{faction}`, `{epithet}` variable slots in `lore.ts`
- **`names.ts`** — expand name parts (prefixes ×15, middles ×12, suffixes ×12, epithets ×20) for more name variety
- **`archetypes.ts`** — add missing specializations so each archetype has 3 (currently most have 2)
- **`gacha.ts`** — wire `chooseSkills` to archetype key so heroes get archetype-appropriate skills

### Step 12 — Combat Depth *(~2 hrs)*

Current combat is functional but shallow — every round is identical. Add:

- **Status effects** — Burn (damage over time), Shield (damage reduction), Stun (skip turn), stored on `Combatant.status`
- **Skill effects** — map skill IDs to status application logic in `combat.ts`
- **XP + gold rewards** — on victory, grant XP to party heroes (`hero.xp += reward`) and gold to resources
- **Level-up check** — after XP gain, check threshold and increment `hero.level`, recalculate stats
- **Mood changes** — victory raises morale, defeat raises fear; update `hero.mood` post-combat
- **Room progression** — after clearing defenders, show "Advance to next room?" prompt; generate a new defender set for room 2+
- **`LootReveal` component** — post-combat panel showing XP gained, gold, mood changes

### Step 13 — Tower Depth *(~1 hr)*

- **Defender assignment** — click a placed guard/boss room → pick a hero from roster to assign as defender; show assigned hero name on the tile
- **Tower save** — `[ Save Tower ]` button persists the current layout to the store's `tower` (already wired, just needs UI confirmation)
- **Enemy tower generation** — generate 3 enemy towers procedurally with rooms and named defenders drawn from `createDefender()`, replacing the hardcoded string arrays
- **Tower theme display** — show theme name and a short flavor line on the tower builder header

### Step 14 — Evolution Depth *(~1 hr)*

- **Requirements gate** — show evolution paths as locked if `hero.level < 3`; display requirement text
- **Stat diff preview** — show `+4 ATK / +2 SPD` diff inline on each path card before confirming
- **Post-evolution feedback** — after evolving, show a brief typewriter message: `> {name} has become {newTitle}.`
- **Evolution history** — store applied path ID on hero so the same path can't be applied twice; show "Evolved" badge on roster card

### Step 15 — Visual Polish *(~1.5 hrs)*

- **Rarity glow borders** — hero cards and summon reveal should have a colored `box-shadow` matching rarity color (currently only background tint)
- **Summon animation** — add a CSS keyframe flash/pulse on summon button click before the result appears (dim screen → glow → reveal)
- **Page transitions** — add `opacity-0 → opacity-100` fade on route change using a layout wrapper
- **Mobile nav** — current navbar hides links on mobile; add a hamburger menu or bottom tab bar for `sm` breakpoints
- **Empty state illustrations** — replace plain text empty states with terminal-style ASCII art blocks (e.g. `[ NO HEROES FOUND ]` with rune border)
- **Scanline toggle** — add a `[ CRT: ON ]` toggle in the navbar that persists to localStorage

### Step 16 — README + Demo Prep *(~30 min)*

- `README.md` — setup instructions (`npm install`, `npm run dev`), feature overview, screenshot
- Verify full gameplay loop: Title → Summon ×10 → Roster → Tower build → Raid → Evolve
- Mobile viewport check at 375px

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
- ⬜ Text is readable on mobile (Step 15)
- ⬜ Heroes gain XP and level up after raids (Step 12)
- ⬜ Skills feel distinct per archetype (Step 11)

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

## Estimated Remaining Time

| Step | Description | Estimate |
|------|-------------|----------|
| 11 | Data expansion | ~2 hrs |
| 12 | Combat depth (XP, status effects, loot, room progression) | ~2 hrs |
| 13 | Tower depth (defender assignment, enemy tower gen) | ~1 hr |
| 14 | Evolution depth (requirements, stat diff, history) | ~1 hr |
| 15 | Visual polish (glow, animations, mobile nav) | ~1.5 hrs |
| 16 | README + demo prep | ~30 min |
| **Total remaining** | | **~8 hrs** |
