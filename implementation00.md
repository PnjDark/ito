# Infinite Towers Online — Phase 0: Core Prototype (Revised)

## Goal

Build a **playable, atmospheric web prototype** with a **stylized dark fantasy terminal aesthetic** that proves the core gameplay loop. Think Darkest Dungeon's narrator meets a CRT terminal meets runic interfaces.

### Demo Priorities
1. **Hero Generation** — Gacha summon with procedural personality, backstory, traits
2. **Tower Raid** — Turn-based room-by-room combat with AI defenders
3. **Social Uniqueness** — Personality-driven heroes with mood and dialogue
4. **Class Evolution** — Branching evolution trees with meaningful choices

---

## Tech Stack (Per User)

| Layer | Tech | Phase 0 Role |
|-------|------|--------------|
| **Frontend** | Next.js + Tailwind CSS | Full prototype UI |
| **Backend** | NestJS | Scaffolded, minimal API for Phase 0 |
| **Database** | PostgreSQL + Redis | Schema defined, seeded — game state in localStorage for now |
| **AI** | Local lightweight models | Stub/template system for Phase 0, real integration Phase 1 |
| **Real-time** | Socket.IO | Scaffolded gateway, not active in Phase 0 |

> [!NOTE]
> Phase 0 runs primarily client-side. The NestJS backend is scaffolded with the service structure but game logic executes in the browser. This lets us iterate on gameplay feel without backend round-trips. Phase 1 migrates game state server-side.

---

## Visual Identity: Dark Fantasy Terminal Aesthetic

### The Look
- **CRT / terminal feel** — scanline overlays, subtle screen flicker, monospace text for system messages
- **Runic UI chrome** — borders made of glyph patterns, glowing sigil accents
- **Text-heavy immersion** — backstories, dialogue, and combat logs presented as narrative text with typewriter reveals
- **Illustrated portraits** — stylized character art (static, not animated), framed in ornate terminal windows
- **Minimal animation** — glow pulses, text fades, subtle particle embers. No complex sprite animation
- **Dark palette** — near-black backgrounds, amber/gold text, muted jewel tones for rarity

### Color System (Tailwind Custom)
```
--bg-void:        #08080c      (deepest black)
--bg-terminal:    #0e0e14      (terminal background)
--bg-panel:       #14141e      (panel/card background)
--bg-elevated:    #1a1a28      (elevated surfaces)
--border-dim:     #2a2a3a      (subtle borders)
--border-glow:    #3a3a5a      (active borders)

--text-primary:   #d4c5a0      (warm parchment)
--text-secondary: #8a8070      (muted)
--text-system:    #5a7a5a      (terminal green for system msgs)
--text-dim:       #4a4a5a      (very muted)

--rarity-common:    #7a7a8a    (grey steel)
--rarity-rare:      #4a8ab5    (cold blue)
--rarity-elite:     #9b5de5    (arcane purple)
--rarity-mythic:    #d4a855    (ancient gold)
--rarity-ascendant: #ff6b6b    (blood ember)

--accent-fire:    #e85d3a      (ember)
--accent-ice:     #5bc0de      (frost)
--accent-nature:  #5a8a5a      (verdant)
--accent-shadow:  #6a4c93      (shadow)
--accent-holy:    #f0d060      (divine)
```

### Typography
- **Headings**: `"Cinzel Decorative"` — ornate fantasy serif
- **Body/Lore**: `"Crimson Text"` or `"EB Garamond"` — readable serif for narrative
- **System/Stats**: `"JetBrains Mono"` or `"Fira Code"` — monospace for stats, logs, terminal text
- **UI Labels**: `"Inter"` — clean sans-serif for buttons, navigation

### UI Patterns
- **Panels**: Dark glass with 1px glowing borders, subtle inner shadow
- **Cards**: Beveled edges with rune-pattern borders, rarity-colored glow
- **Buttons**: Terminal-style `[ SUMMON ]` with hover glow, no rounded corners
- **Text reveals**: Typewriter effect for backstories and combat narration
- **Scanlines**: CSS overlay with repeating gradient (subtle, toggleable)
- **Transitions**: Fade + slight vertical shift, no flashy page transitions

---

## User Review Required

> [!IMPORTANT]
> **Backend language**: You listed NestJS *or* Go. For Phase 0, I'll scaffold with **NestJS** (TypeScript across the full stack is faster for a solo/small team). The architecture supports swapping to Go later for performance-critical services. Agree?

> [!IMPORTANT]
> **Tailwind version**: I'll use **Tailwind CSS v4** (latest). Confirm?

> [!WARNING]
> **No LLM calls in Phase 0**: Hero backstories and dialogue use a **template engine** with procedural variable substitution (mad-libs style). This produces surprisingly good variety with zero API cost. Real model integration comes in Phase 1. Acceptable?

---

## Open Questions

1. **NestJS or Go?** — Recommendation: NestJS for Phase 0-2, consider Go for hot-path services (combat, matchmaking) in Phase 3+.
2. **Deployment target** — Running locally only, or deploy to Vercel/Railway for demo sharing?
3. **Mobile-first or desktop-first?** — The terminal aesthetic works great on both. Which is priority for layout breakpoints?

---

## Project Structure

```
ito/
├── Documentation/                    (existing)
├── frontend/                         (Next.js app)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            (root layout, fonts, global providers)
│   │   │   ├── page.tsx              (title/landing scene)
│   │   │   ├── globals.css           (Tailwind + custom design tokens)
│   │   │   ├── summon/
│   │   │   │   └── page.tsx          (gacha summoning scene)
│   │   │   ├── roster/
│   │   │   │   └── page.tsx          (hero collection)
│   │   │   ├── tower/
│   │   │   │   └── page.tsx          (tower builder)
│   │   │   ├── raid/
│   │   │   │   └── page.tsx          (raid combat)
│   │   │   └── evolve/
│   │   │       └── page.tsx          (class evolution)
│   │   ├── components/
│   │   │   ├── ui/                   (generic UI primitives)
│   │   │   │   ├── Panel.tsx         (dark glass panel)
│   │   │   │   ├── Button.tsx        (terminal-style button)
│   │   │   │   ├── StatBar.tsx       (animated stat bar)
│   │   │   │   ├── TypeWriter.tsx    (text reveal effect)
│   │   │   │   ├── Modal.tsx         (overlay modal)
│   │   │   │   ├── Toast.tsx         (notification)
│   │   │   │   ├── Tooltip.tsx       (hover info)
│   │   │   │   ├── Scanlines.tsx     (CRT overlay)
│   │   │   │   └── RuneBorder.tsx    (decorative borders)
│   │   │   ├── hero/
│   │   │   │   ├── HeroCard.tsx      (roster card)
│   │   │   │   ├── HeroDetail.tsx    (full hero sheet)
│   │   │   │   ├── HeroPortrait.tsx  (framed portrait)
│   │   │   │   ├── TraitBadge.tsx    (personality trait pill)
│   │   │   │   └── MoodGauge.tsx     (morale/loyalty/fear bars)
│   │   │   ├── combat/
│   │   │   │   ├── CombatLog.tsx     (scrolling combat narrative)
│   │   │   │   ├── TurnOrder.tsx     (initiative tracker)
│   │   │   │   ├── ActionPanel.tsx   (attack/defend/skill selection)
│   │   │   │   ├── CombatantRow.tsx  (hero HP/status in combat)
│   │   │   │   └── LootReveal.tsx    (post-combat rewards)
│   │   │   ├── tower/
│   │   │   │   ├── TowerGrid.tsx     (grid editor)
│   │   │   │   ├── RoomTile.tsx      (individual room)
│   │   │   │   ├── RoomPalette.tsx   (room type selector)
│   │   │   │   └── DPBudget.tsx      (defense point display)
│   │   │   ├── summon/
│   │   │   │   ├── SummonCircle.tsx  (summoning animation)
│   │   │   │   ├── SummonReveal.tsx  (hero reveal sequence)
│   │   │   │   └── PityCounter.tsx   (pity progress)
│   │   │   └── evolution/
│   │   │       ├── EvolutionTree.tsx  (branching path viz)
│   │   │       └── ClassPreview.tsx   (evolution preview card)
│   │   ├── systems/
│   │   │   ├── gacha.ts              (rarity rolls, pity, hero gen)
│   │   │   ├── combat.ts            (turn-based combat engine)
│   │   │   ├── tower.ts             (tower grid, room placement)
│   │   │   ├── hero.ts              (stats, leveling, evolution)
│   │   │   ├── personality.ts       (traits, mood, dialogue)
│   │   │   └── lore.ts              (names, backstories, factions)
│   │   ├── data/
│   │   │   ├── archetypes.ts        (8 base classes)
│   │   │   ├── specializations.ts   (24+ specs)
│   │   │   ├── evolutions.ts        (evolution trees)
│   │   │   ├── skills.ts            (50+ skills)
│   │   │   ├── traits.ts            (20+ personality traits)
│   │   │   ├── names.ts             (procedural name parts)
│   │   │   ├── backstories.ts       (template backstories)
│   │   │   ├── factions.ts          (6 factions)
│   │   │   └── tower-themes.ts      (5 themes)
│   │   ├── stores/
│   │   │   └── gameStore.ts         (Zustand store — heroes, tower, resources)
│   │   ├── hooks/
│   │   │   ├── useTypewriter.ts     (typewriter text hook)
│   │   │   ├── useGameState.ts      (game state access)
│   │   │   └── useCombat.ts         (combat state machine)
│   │   ├── lib/
│   │   │   ├── random.ts            (seeded RNG, weighted random)
│   │   │   ├── formatters.ts        (number/time formatting)
│   │   │   └── audio.ts             (optional ambient audio)
│   │   └── types/
│   │       ├── hero.ts              (Hero, Stat, Skill types)
│   │       ├── tower.ts             (Tower, Room, Grid types)
│   │       ├── combat.ts            (Combat state types)
│   │       └── game.ts              (Game state types)
│   ├── public/
│   │   └── assets/
│   │       ├── portraits/           (generated hero portraits)
│   │       ├── icons/               (rune/glyph icons)
│   │       └── backgrounds/         (scene backgrounds)
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                          (NestJS — scaffolded for Phase 1)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/                    (stub)
│   │   ├── player/                  (stub)
│   │   ├── hero/                    (stub)
│   │   ├── tower/                   (stub)
│   │   ├── combat/                  (stub)
│   │   ├── gacha/                   (stub)
│   │   └── common/
│   │       ├── dto/
│   │       └── entities/
│   ├── prisma/
│   │   └── schema.prisma            (full DB schema)
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml               (PostgreSQL + Redis for local dev)
└── README.md
```

---

## Proposed Changes — Build Order

### Phase 0A: Foundation (Steps 1-3)

#### Step 1 — Project Bootstrap

##### [NEW] Next.js frontend app
- `npx create-next-app@latest` with TypeScript, Tailwind, App Router, ESLint
- Install: `zustand` (state), Google Fonts via `next/font`
- Configure Tailwind with custom dark fantasy design tokens
- Set up `globals.css` with CRT scanline overlay, glow utilities, rune borders

##### [NEW] NestJS backend scaffold
- `npx @nestjs/cli new backend`
- Install: `@nestjs/websockets`, `socket.io`, `prisma`, `@prisma/client`
- Create module stubs for each service (auth, hero, tower, combat, gacha)
- Define Prisma schema (heroes, players, towers, rooms, combat_logs)

##### [NEW] Docker Compose
- PostgreSQL 16 + Redis 7 containers
- Prisma migration runner

---

#### Step 2 — Design System & UI Components

##### [NEW] globals.css + Tailwind config
- Full color system (void, terminal, panel, rarity colors)
- Typography scale with fantasy + mono fonts
- Scanline overlay keyframe
- Glow/pulse utility classes
- Responsive breakpoints (mobile-first)

##### [NEW] UI primitives
- `Panel.tsx` — dark glass container with rune borders
- `Button.tsx` — terminal bracket style `[ ACTION ]` with hover glow
- `StatBar.tsx` — animated fill bar with label
- `TypeWriter.tsx` — character-by-character text reveal
- `Scanlines.tsx` — toggleable CRT overlay
- `RuneBorder.tsx` — decorative glyph border component
- `Modal.tsx`, `Toast.tsx`, `Tooltip.tsx`

---

#### Step 3 — Data & Core Systems

##### [NEW] Type definitions
- `Hero`, `HeroStats`, `Skill`, `PersonalityTrait`, `Mood`, `Evolution`
- `Tower`, `TowerGrid`, `Room`, `RoomType`
- `CombatState`, `CombatAction`, `CombatResult`
- `GameState`, `PlayerResources`

##### [NEW] Data files
- 8 archetypes with full stat tables and growth curves
- 24+ specializations (3 per archetype)
- 50+ skills across archetypes
- 20+ personality traits with modifier effects
- 200+ name components (prefixes, roots, suffixes, epithets)
- 30+ backstory templates with variable slots
- 6 factions with lore and relationship data
- 5 tower themes

##### [NEW] Game systems
- `gacha.ts` — rarity rolls, pity, complete hero assembly pipeline
- `hero.ts` — stat calculation, leveling, evolution checks
- `personality.ts` — trait generation, mood updates, dialogue templates
- `lore.ts` — procedural name gen, backstory assembly, title generation
- `tower.ts` — grid management, room placement, DP validation
- `combat.ts` — initiative, damage, status effects, AI behavior, turn resolution

##### [NEW] Zustand game store
- Heroes roster, tower layout, resources (Fate Threads, gold)
- Pity counter, combat state, current scene
- localStorage persistence

---

### Phase 0B: Core Scenes (Steps 4-8)

#### Step 4 — Title Scene
- `/` route — atmospheric entry
- Game title in `Cinzel Decorative` with subtle glow animation
- Floating rune particles (CSS-only, minimal)
- Terminal-style subtitle text: `> Awakening thread connection...`
- Navigation: `[ ENTER THE TOWERS ]` → routes to main hub
- Scanline overlay active

#### Step 5 — Summon Scene (⭐ Key Scene)
- `/summon` route — the gacha experience
- **Summoning interface**:
  - Resource display (Fate Threads remaining)
  - `[ SUMMON ×1 ]` and `[ SUMMON ×10 ]` buttons
  - Pity counter: `THREAD RESONANCE: 45/90`
- **Summon animation**:
  - Screen dims, terminal text: `> Casting thread into the void...`
  - Rarity-colored glow intensifies (border + background pulse)
  - Text reveal of hero name, then traits, then backstory
  - Portrait fade-in with rarity frame
- **Hero reveal card**:
  - Portrait (illustrated, framed)
  - Name + epithet
  - Rarity badge
  - Archetype + specialization
  - Trait pills
  - Backstory in typewriter text
  - Stats preview
  - `[ ADD TO ROSTER ]` / `[ SUMMON AGAIN ]`

#### Step 6 — Roster Scene
- `/roster` route — hero collection browser
- **Grid layout**: Hero cards sorted by rarity, filterable
- **Hero card**: Portrait thumbnail, name, level, rarity glow border
- **Detail panel** (click to expand):
  - Full portrait
  - All stats with animated bars
  - Personality traits with descriptions
  - Full backstory (scrollable, serif font)
  - Mood gauges (morale / loyalty / fear)
  - Skills list
  - Evolution path preview
  - `[ ASSIGN TO TOWER ]` / `[ VIEW EVOLUTION ]`

#### Step 7 — Tower Scene
- `/tower` route — tower defense builder
- **Grid view**: 15×15 tile grid, dark with grid lines
- **Room palette**: Side panel with room types and DP costs
- **Click-to-place**: Select room type → click grid cell
- **DP budget**: `DP: 1650 / 2000` bar at top
- **Defender assignment**: Click guard/boss room → assign hero from roster
- **Pre-built enemy towers**: 3 generated towers for raiding

#### Step 8 — Raid Scene (⭐ Key Scene)
- `/raid` route — turn-based tower assault
- **Party select**: Choose 4 heroes from roster
- **Target select**: Choose enemy tower to raid
- **Combat view**:
  - Two-column layout: your party (left) vs defenders (right)
  - HP bars, status icons, level indicators
  - Turn order bar at top
  - **Combat log** (center): narrative text of each action
    - `> Lyra lunges from the shadows — BACKSTAB — 450 damage! (CRITICAL)`
    - `> The Rune Berserker's rage builds... ATK increased.`
  - **Action panel** (bottom): `[ ATTACK ]` `[ DEFEND ]` `[ SKILL ▼ ]` `[ FLEE ]`
  - Skill submenu with costs and descriptions
  - Target selection (click enemy)
- **Room progression**: Clear defenders → advance to next room
- **Victory/defeat**: Loot display, XP gains, mood changes

#### Step 9 — Evolution Scene
- `/evolve` route — class evolution
- **Tree visualization**: Branching paths from current class
- **Requirements**: Level, traits, combat history
- **Preview**: New stats, skills, class description
- **Evolution trigger**: `[ EVOLVE ]` with confirmation + animation

---

### Phase 0C: Polish (Step 10)

#### Step 10 — Final polish
- Navigation bar between scenes (persistent, terminal-style)
- Loading states and empty states
- Mobile responsive pass
- Generate hero portrait assets with image tool
- Sound design (optional): ambient drone, click SFX
- README with setup instructions
- Record demo video via browser tool

---

## Verification Plan

### Automated Tests
```bash
# Gacha distribution test — verify 10K rolls match expected rates
npm test -- --grep "gacha distribution"

# Combat engine — damage formula, initiative, status effects
npm test -- --grep "combat"

# Tower system — placement validation, DP budget
npm test -- --grep "tower"
```

### Browser Testing
- Full gameplay loop recording: Title → Summon → Roster → Tower → Raid → Evolve
- Mobile viewport test (375px width)
- Visual quality check: no placeholder-looking elements

### Quality Gates
- ✅ Every summoned hero feels unique (name + traits + backstory)
- ✅ Summon reveal is atmospheric and satisfying
- ✅ Combat is readable, strategic, narratively immersive
- ✅ Tower building feels tactile and meaningful
- ✅ Evolution feels like a earned reward
- ✅ Terminal aesthetic is consistent across all scenes
- ✅ Text is readable on mobile

---

## Estimated Build Time

| Step | Description | Estimate |
|------|-------------|----------|
| 1 | Project bootstrap | ~30 min |
| 2 | Design system + UI components | ~2 hrs |
| 3 | Data + core systems | ~3 hrs |
| 4 | Title scene | ~30 min |
| 5 | Summon scene | ~2 hrs |
| 6 | Roster scene | ~1.5 hrs |
| 7 | Tower scene | ~2 hrs |
| 8 | Raid/combat scene | ~3 hrs |
| 9 | Evolution scene | ~1 hr |
| 10 | Polish + assets | ~2 hrs |
| **Total** | | **~17 hrs** |
