# Infinite Towers Online - Phase 0 Quick Start Guide
## Pre-Production Setup (Weeks 1-4)

---

## WEEK 1: Foundation & Prototyping Kickoff

### Monday-Tuesday: Project Setup

#### 1. GitHub Repository Structure
```
infinite-towers-online/
├── backend/
│   ├── services/
│   │   ├── auth-service/
│   │   ├── player-service/
│   │   ├── tower-service/
│   │   ├── combat-service/
│   │   ├── hero-service/
│   │   ├── ai-content-service/
│   │   ├── quest-service/
│   │   ├── social-service/
│   │   ├── world-service/
│   │   ├── gacha-service/
│   │   ├── monetization-service/
│   │   └── matchmaking-service/
│   ├── shared/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── middleware/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── schemas.sql
│   ├── docker-compose.yml
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── scenes/
│   │   │   ├── LoginScene.ts
│   │   │   ├── SummonScene.ts
│   │   │   ├── TowerScene.ts
│   │   │   ├── RaidScene.ts
│   │   │   └── ...
│   │   ├── components/
│   │   ├── systems/
│   │   ├── assets/
│   │   └── main.ts
│   └── package.json
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── design/
│   └── onboarding.md
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── build.yml
│       └── deploy.yml
├── docker-compose.yml (full stack)
├── README.md
└── CONTRIBUTING.md
```

#### 2. Create Team Onboarding Document
**File:** `docs/onboarding.md`
```markdown
# Infinite Towers Online - Developer Onboarding

## Local Development Setup (30 min)

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (via Docker)
- Python 3.10+ (for AI service)
- Git

### Quick Start
1. Clone repo: `git clone https://github.com/yourorg/infinite-towers-online.git`
2. Copy env: `cp .env.example .env.local`
3. Start stack: `docker-compose -f docker-compose.yml up`
4. Run migrations: `npm run db:migrate`
5. Seed test data: `npm run db:seed`
6. Backend should be at http://localhost:3000
7. Client at http://localhost:5173

### Project Structure
- **Backend (Node.js/Express):** Microservices running on ports 3001-3012
- **Client (TypeScript/Phaser):** Game client, isometric 2D
- **Database:** PostgreSQL + Redis cache

### Coding Standards
- TypeScript strict mode enabled
- ESLint configuration: `.eslintrc.json`
- Format with Prettier: `npm run format`
- Test before commit: `npm run test`
- Max line length: 100 characters

### Git Workflow
- Branch naming: `feature/auth-login`, `fix/raid-crash`, `docs/api-v1`
- Commit messages: `feat: add summon endpoint`, `fix: hero XP calculation`
- PR required before merge to main
- 2 code reviews before approval

### Running Locally
Backend:
```bash
cd backend
npm install
npm run dev  # Starts all services with nodemon
```

Client:
```bash
cd client
npm install
npm run dev  # Vite dev server on port 5173
```

### Debugging
- Backend logs in `backend/logs/`
- Use `curl` or Postman to test endpoints
- Set breakpoints in VS Code (debug config in `.vscode/launch.json`)
- Database query logs: `PGDEBUG=all npm run dev`

### Useful Commands
- `npm run test` — Run unit tests
- `npm run test:e2e` — Run integration tests
- `npm run lint` — Lint and format
- `npm run db:migrate` — Apply migrations
- `npm run db:rollback` — Rollback last migration
- `npm run start:prod` — Production build & start

### Getting Help
- Slack channel: #infinite-towers-dev
- Wiki: https://wiki.internal.example.com/towers
- Tech Lead: @technical-lead on Slack
```

#### 3. Initialize Jira / Linear Project
**Epics for Phase 0:**
- [PHASE0-1] Design Validation & Prototyping
- [PHASE0-2] Technical Stack Setup
- [PHASE0-3] AI Pipeline PoC
- [PHASE0-4] Balance Framework
- [PHASE0-5] Narrative Design

**Stories in Sprint 1:**
- [PHASE0-1-1] Create tower grid prototype (estimate: 5 pts)
- [PHASE0-1-2] Implement basic combat engine (8 pts)
- [PHASE0-1-3] Test gacha generation logic (5 pts)
- [PHASE0-2-1] Set up dev environment & CI/CD (8 pts)
- [PHASE0-3-1] Local LLM setup & hero generation PoC (13 pts)

---

### Wednesday-Friday: Core Prototype Development

#### 1. Tower Grid System (Combat Service foundation)

**File:** `backend/services/tower-service/src/tower-grid.ts`

```typescript
import { v4 as uuid } from 'uuid';

export type RoomType = 'guard' | 'trap' | 'resource' | 'boss' | 'puzzle' | 'environmental';
export type AiStance = 'aggressive' | 'defensive' | 'support';
export type TrapType = 'spike' | 'freeze' | 'teleport';

export interface Room {
  id: string;
  x: number;
  y: number;
  type: RoomType;
  defenderHeroId?: string;
  aiStance?: AiStance;
  properties: Record<string, unknown>;
}

export interface TowerGrid {
  id: string;
  width: number;
  height: number;
  rooms: Room[];
  dpTotal: number;
  dpUsed: number;
}

export const ROOM_DP_COSTS: Record<RoomType, number> = {
  guard: 50,
  trap: 30,
  resource: 100,
  boss: 200,
  puzzle: 40,
  environmental: 20,
};

export class TowerGridManager {
  /**
   * Create a new empty tower grid
   */
  static createGrid(width = 15, height = 15, dpTotal = 2000): TowerGrid {
    return {
      id: uuid(),
      width,
      height,
      rooms: [],
      dpTotal,
      dpUsed: 0,
    };
  }

  /**
   * Check if position is valid (within bounds, no overlap)
   */
  static isValidPlacement(grid: TowerGrid, x: number, y: number): boolean {
    if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) {
      return false;
    }
    return !grid.rooms.some(room => room.x === x && room.y === y);
  }

  /**
   * Place a room in the grid
   */
  static placeRoom(
    grid: TowerGrid,
    x: number,
    y: number,
    type: RoomType,
    properties: Record<string, unknown> = {}
  ): { success: boolean; error?: string; grid?: TowerGrid } {
    if (!this.isValidPlacement(grid, x, y)) {
      return { success: false, error: 'Invalid placement' };
    }

    const cost = ROOM_DP_COSTS[type];
    if (grid.dpUsed + cost > grid.dpTotal) {
      return {
        success: false,
        error: `Insufficient DP. Need ${cost}, have ${grid.dpTotal - grid.dpUsed}`,
      };
    }

    const newRoom: Room = {
      id: uuid(),
      x,
      y,
      type,
      properties,
    };

    return {
      success: true,
      grid: {
        ...grid,
        rooms: [...grid.rooms, newRoom],
        dpUsed: grid.dpUsed + cost,
      },
    };
  }

  /**
   * Remove a room from the grid, refunding DP
   */
  static removeRoom(grid: TowerGrid, roomId: string): TowerGrid {
    const room = grid.rooms.find(r => r.id === roomId);
    if (!room) return grid;

    const refund = ROOM_DP_COSTS[room.type];
    return {
      ...grid,
      rooms: grid.rooms.filter(r => r.id !== roomId),
      dpUsed: Math.max(0, grid.dpUsed - refund),
    };
  }

  /**
   * Get all rooms of a specific type
   */
  static getRoomsByType(grid: TowerGrid, type: RoomType): Room[] {
    return grid.rooms.filter(room => room.type === type);
  }

  /**
   * Check if tower has a boss room (required for valid tower)
   */
  static hasBossRoom(grid: TowerGrid): boolean {
    return this.getRoomsByType(grid, 'boss').length > 0;
  }
}
```

**Test File:** `backend/services/tower-service/src/__tests__/tower-grid.test.ts`

```typescript
import { TowerGridManager } from '../tower-grid';

describe('TowerGridManager', () => {
  it('should create a new grid', () => {
    const grid = TowerGridManager.createGrid();
    expect(grid.width).toBe(15);
    expect(grid.height).toBe(15);
    expect(grid.dpTotal).toBe(2000);
    expect(grid.rooms).toEqual([]);
  });

  it('should place a room successfully', () => {
    const grid = TowerGridManager.createGrid();
    const result = TowerGridManager.placeRoom(grid, 7, 7, 'boss');
    
    expect(result.success).toBe(true);
    expect(result.grid!.rooms).toHaveLength(1);
    expect(result.grid!.dpUsed).toBe(200);
  });

  it('should prevent placement outside bounds', () => {
    const grid = TowerGridManager.createGrid();
    const result = TowerGridManager.placeRoom(grid, 20, 20, 'guard');
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid placement');
  });

  it('should prevent placement when DP insufficient', () => {
    const grid = TowerGridManager.createGrid();
    const gridWith1Dp = { ...grid, dpUsed: 1950 };
    const result = TowerGridManager.placeRoom(gridWith1Dp, 0, 0, 'boss');
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Insufficient DP');
  });

  it('should refund DP on room removal', () => {
    let grid = TowerGridManager.createGrid();
    const placeResult = TowerGridManager.placeRoom(grid, 7, 7, 'boss');
    grid = placeResult.grid!;
    
    expect(grid.dpUsed).toBe(200);
    
    const removedGrid = TowerGridManager.removeRoom(grid, grid.rooms[0].id);
    expect(removedGrid.dpUsed).toBe(0);
  });
});
```

#### 2. Basic Combat Engine (Minimal)

**File:** `backend/services/combat-service/src/combat-engine.ts`

```typescript
export interface CombatHero {
  id: string;
  name: string;
  hpCurrent: number;
  hpMax: number;
  atk: number;
  def: number;
  spd: number;
  isAlive: boolean;
  owner: 'attacker' | 'defender';
}

export interface CombatAction {
  actorId: string;
  actionType: 'attack' | 'defend' | 'skill';
  targetId: string;
  skillId?: string;
}

export interface CombatResult {
  damageDealt: number;
  isCritical: boolean;
  targetHpAfter: number;
}

export class CombatEngine {
  /**
   * Calculate turn order based on speed stat
   */
  static calculateInitiative(heroes: CombatHero[]): string[] {
    return heroes
      .filter(h => h.isAlive)
      .sort((a, b) => b.spd - a.spd)
      .map(h => h.id);
  }

  /**
   * Resolve a basic attack action
   */
  static resolveAttack(
    attacker: CombatHero,
    target: CombatHero
  ): CombatResult {
    if (!attacker.isAlive || !target.isAlive) {
      throw new Error('Cannot attack with dead heroes');
    }

    // Base damage: ATK vs DEF
    let damage = Math.max(5, attacker.atk - target.def / 2);

    // Crit chance: 15% base
    const isCritical = Math.random() < 0.15;
    if (isCritical) {
      damage *= 1.5;
    }

    // Variation: ±10%
    const variation = 0.9 + Math.random() * 0.2;
    damage *= variation;
    damage = Math.round(damage);

    // Apply damage
    const targetHpAfter = Math.max(0, target.hpCurrent - damage);

    return {
      damageDealt: damage,
      isCritical,
      targetHpAfter,
    };
  }

  /**
   * Simulate a full turn for all heroes
   */
  static simulateTurn(
    heroes: CombatHero[],
    actions: Map<string, CombatAction>
  ): CombatHero[] {
    const updatedHeroes = JSON.parse(JSON.stringify(heroes)) as CombatHero[];
    const turnOrder = this.calculateInitiative(updatedHeroes);

    for (const heroId of turnOrder) {
      const hero = updatedHeroes.find(h => h.id === heroId);
      const action = actions.get(heroId);

      if (!hero || !hero.isAlive || !action) continue;

      const target = updatedHeroes.find(h => h.id === action.targetId);
      if (!target || !target.isAlive) continue;

      if (action.actionType === 'attack') {
        const result = this.resolveAttack(hero, target);
        target.hpCurrent = result.targetHpAfter;
        if (target.hpCurrent <= 0) {
          target.isAlive = false;
        }
      }
      // Other action types implemented similarly
    }

    return updatedHeroes;
  }
}
```

#### 3. Gacha System (Logic Only)

**File:** `backend/services/gacha-service/src/gacha-engine.ts`

```typescript
export type Rarity = 'common' | 'rare' | 'elite' | 'mythic' | 'ascendant';
export type Archetype = 'warrior' | 'mage' | 'rogue' | 'cleric' | 'ranger' | 'summoner' | 'bard' | 'alchemist';

export interface SpecializationTemplate {
  name: string;
  archetype: Archetype;
  baseStats: { hpMult: number; atkMult: number; defMult: number; spdMult: number };
  passive: string;
}

export interface RarityWeights {
  common: number;
  rare: number;
  elite: number;
  mythic: number;
  ascendant: number;
}

const RARITY_RATES: RarityWeights = {
  common: 0.4,
  rare: 0.3,
  elite: 0.2,
  mythic: 0.09,
  ascendant: 0.01,
};

const SPECIALIZATION_TEMPLATES: Record<Archetype, SpecializationTemplate[]> = {
  warrior: [
    {
      name: 'Rune Berserker',
      archetype: 'warrior',
      baseStats: { hpMult: 1.2, atkMult: 1.1, defMult: 0.9, spdMult: 1.0 },
      passive: 'Rage: ATK +2% per hit, DEF -1% per hit (resets on action)',
    },
    // ... more specs
  ],
  // ... other archetypes
};

export class GachaEngine {
  /**
   * Roll rarity based on weighted distribution
   */
  static rollRarity(pityCounter: number): Rarity {
    // Pity at 90: guarantee 5-star
    if (pityCounter >= 90) {
      return 'ascendant';
    }

    // Soft pity (75-89): increased 5-star rate
    if (pityCounter >= 75) {
      const weights = { ...RARITY_RATES, ascendant: 0.05 };
      return this.weightedRandomRarity(weights);
    }

    return this.weightedRandomRarity(RARITY_RATES);
  }

  /**
   * Assign archetype and specialization
   */
  static assignSpecialization(rarity: Rarity, bannerTheme?: string): SpecializationTemplate {
    // Rare heroes get more variety; ascendant heroes get premium specs
    // Pseudocode: weight by rarity, bias by banner theme
    const archetype = this.selectArchetype(rarity, bannerTheme);
    const specs = SPECIALIZATION_TEMPLATES[archetype];
    const randSpec = specs[Math.floor(Math.random() * specs.length)];
    return randSpec;
  }

  /**
   * Calculate base stats from rarity + spec
   */
  static calculateStats(rarity: Rarity, spec: SpecializationTemplate) {
    const baseStats = {
      hp: 100,
      atk: 50,
      def: 40,
      spd: 60,
    };

    // Scale by rarity
    const rarityMult = {
      common: 1.0,
      rare: 1.1,
      elite: 1.2,
      mythic: 1.35,
      ascendant: 1.5,
    }[rarity];

    return {
      hp: Math.round(baseStats.hp * spec.baseStats.hpMult * rarityMult),
      atk: Math.round(baseStats.atk * spec.baseStats.atkMult * rarityMult),
      def: Math.round(baseStats.def * spec.baseStats.defMult * rarityMult),
      spd: Math.round(baseStats.spd * spec.baseStats.spdMult * rarityMult),
    };
  }

  private static weightedRandomRarity(weights: RarityWeights): Rarity {
    const rand = Math.random();
    let cumulative = 0;
    for (const [rarity, weight] of Object.entries(weights)) {
      cumulative += weight;
      if (rand < cumulative) return rarity as Rarity;
    }
    return 'common';
  }

  private static selectArchetype(rarity: Rarity, bannerTheme?: string): Archetype {
    // Simplified: banners bias toward certain archetypes
    const allArchetypes: Archetype[] = ['warrior', 'mage', 'rogue', 'cleric', 'ranger', 'summoner', 'bard', 'alchemist'];
    return allArchetypes[Math.floor(Math.random() * allArchetypes.length)];
  }
}
```

---

### WEEK 2: AI Pipeline PoC & Balance Framework

#### 1. LLM Integration Template

**File:** `backend/services/ai-content-service/src/llm-client.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';

export interface HeroGenerationPrompt {
  archetype: string;
  specialization: string;
  rarity: string;
  bannerTheme: string;
}

export interface GeneratedHeroContent {
  name: string;
  backstory: string;
  traits: string[];
  motivation: string;
}

const client = new Anthropic();

export async function generateHeroBackstory(
  prompt: HeroGenerationPrompt
): Promise<GeneratedHeroContent> {
  const systemPrompt = `You are a fantasy world narrator for a game called "Infinite Towers Online."
Generate unique heroes by drawing from a rich lore about towers, factions, and an ancient Unraveling event.
Always respond with valid JSON only, no preamble.`;

  const userPrompt = `Generate a unique hero with these specifications:

Archetype: ${prompt.archetype}
Specialization: ${prompt.specialization}
Rarity: ${prompt.rarity}
Banner Theme: ${prompt.bannerTheme}

Write a 3-4 paragraph backstory (150-200 words) that connects to the world, reflects their role, and suggests character depth.

Respond ONLY with this JSON (no markdown, no extra text):
{
  "name": "Hero Name",
  "backstory": "Multi-paragraph backstory...",
  "traits": ["trait1", "trait2", "trait3"],
  "motivation": "One-line motivation or goal"
}`;

  const message = await client.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

  try {
    const parsed = JSON.parse(responseText);
    return {
      name: parsed.name || 'Unknown Hero',
      backstory: parsed.backstory || '',
      traits: Array.isArray(parsed.traits) ? parsed.traits : [],
      motivation: parsed.motivation || '',
    };
  } catch (e) {
    console.error('Failed to parse LLM response:', responseText);
    throw new Error(`LLM response parsing failed: ${responseText}`);
  }
}
```

**Test File:** `backend/services/ai-content-service/src/__tests__/llm-client.test.ts`

```typescript
import { generateHeroBackstory } from '../llm-client';

describe('LLM Hero Generation', () => {
  it('should generate a valid hero with all required fields', async () => {
    const hero = await generateHeroBackstory({
      archetype: 'rogue',
      specialization: 'blood_duelist',
      rarity: 'mythic',
      bannerTheme: 'crimson_eclipse',
    });

    expect(hero.name).toBeTruthy();
    expect(hero.backstory).toBeTruthy();
    expect(Array.isArray(hero.traits)).toBe(true);
    expect(hero.traits.length).toBeGreaterThan(0);
    expect(hero.motivation).toBeTruthy();
  }, 30000); // LLM call may take up to 30s
});
```

#### 2. Balance Framework Spreadsheet

**Create:** `docs/balance/hero-stats-template.csv`

```csv
Rarity,Archetype,HP,ATK,DEF,SPD,Passive,Notes
Common,Warrior,100,50,40,60,None,Baseline
Rare,Warrior,110,55,44,66,+5% DEF after block,More defensive
Elite,Warrior,120,60,48,72,+10% ATK per consecutive hit,High reward builds
Mythic,Warrior,135,67,54,80,+15% ATK, -10% DEF per hit,Risk/reward
Ascendant,Warrior,150,75,60,90,Unblockable every 3rd hit,Game-changing

Common,Mage,80,65,30,70,None,Low HP High DMG
Rare,Mage,88,72,33,77,+10% Magic DMG on crit,Burst potential
Elite,Mage,96,80,36,84,Chain spells (2nd spell -30% mana),Chaining
Mythic,Mage,108,90,40,94,+20% DMG per buff on self,Buff stacking
Ascendant,Mage,120,105,45,105,Spells ignore 50% DEF,Piercing
```

Create similar rows for all 8 archetypes × 5 rarities.

---

### WEEK 3: Narrative Structure & Continued Dev

#### 1. Story Node Graph Design

**File:** `docs/narrative/story-node-graph.md`

```markdown
# Story Node Graph - Example Chain

## Personal Story: Lyra the Shadow (Mythic Rogue)

### Node 1: Awakening (Lv 1)
**Type:** Personal intro
**Trigger:** Hero summoned
**Content:**
- Hero backstory display
- Dialogue: "I remember... fragments of a life I never lived..."
- Introduction quest: "Investigate the abandoned tower"

### Node 2: Syndicate Discovery (Lv 15)
**Type:** Personal quest
**Trigger:** Reach level 15
**Objective:** Infiltrate Black Spiral hideout in Tower 3B
**Choices:**
- A) Confront the Syndicate leader directly (→ Combat, +Bravery)
- B) Steal evidence quietly (→ Stealth, +Cunning)
- C) Bribe an informant (→ Diplomacy, costs 500 gold)
**Outcome:** 
- If A: +500 XP, Loyalty +10, Unlocks "Avenger" evolution path
- If B: +300 XP, Loyalty +5, Unlocks "Shadow" evolution path
- If C: +200 XP, Gold -500, Loyalty +3

### Node 3: Revenge Quest (Lv 60)
**Type:** Personal, evolution trigger
**Trigger:** 
- Reach level 60
- AND have Loyalty > 60
- AND have followed "Avenger" path
**Content:**
- Locate Syndicate leader (mini-boss in Abyss)
- Dialogue: "Time to finish what we started..."
- Boss battle: 1v1 duel
**Reward:** "Lyra the Avenger" evolution (unique class)

### Node 4: Redemption or Damnation (Lv 100)
**Type:** Personal end-game
**Trigger:** Reach level 100
**Choice:** 
- Accept Syndicate's amnesty (become double agent)
- OR finish the leader's legacy (become crime boss)
**Outcome:** Sets up post-100 content, affects server politics

## Faction Story: Ashen Dominion (Global)

### Node F1: Dominion's Call (Server-wide)
**Trigger:** 5000 total PvP kills on server
**Content:** Ashen Dominion sends recruitment propaganda
**Result:** Players can join faction, gain fire-themed heroes

### Node F2: Holy War (Server-wide)
**Trigger:** Ashen Dominion territory > Verdant Choir territory
**Content:** War declared, territory becomes PvP hotspot
**Result:** Special raid bonuses in claimed towers

## Echo Node: Abandoned Hero (Server-wide)

### Node E1: Ghost in the Tower (Player encounter)
**Trigger:** A high-level hero dies and is abandoned for 7+ days
**Content:** New quest appears: "Investigate the memorial in Tower X"
**Result:** Player learns about the dead hero's story via AI-generated narrative
```

---

### WEEKS 3-4: Integration & Testing

#### 1. Create Vertical Slice E2E Test

**File:** `backend/__tests__/e2e/summon-to-raid.test.ts`

```typescript
import { request } from 'supertest';
import { app } from '../../src/app';

describe('E2E: Summon → Tower → Raid', () => {
  let playerId: string;
  let heroId: string;
  let towerId: string;

  beforeAll(async () => {
    // Create test account
    const authRes = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'Test123!', username: 'TestPlayer' });
    
    playerId = authRes.body.player_id;
  });

  it('should summon a hero successfully', async () => {
    const summonRes = await request(app)
      .post('/summon')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ summon_type: 'fate_threads' });
    
    expect(summonRes.status).toBe(200);
    expect(summonRes.body.job_id).toBeTruthy();

    // Poll until hero is ready
    let hero;
    for (let i = 0; i < 30; i++) {
      const statusRes = await request(app)
        .get(`/summon/${summonRes.body.job_id}/status`)
        .set('Authorization', `Bearer ${authToken}`);
      
      if (statusRes.body.result) {
        hero = statusRes.body.result;
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    expect(hero).toBeTruthy();
    expect(hero.name).toBeTruthy();
    expect(hero.rarity).toMatch(/^(common|rare|elite|mythic|ascendant)$/);
    heroId = hero.id;
  }, 60000);

  it('should place hero in tower', async () => {
    // Get tower
    const towerRes = await request(app)
      .get(`/tower/${playerId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    towerId = towerRes.body.id;

    // Place guard room
    const roomRes = await request(app)
      .put(`/tower/${towerId}/room`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        x: 6,
        y: 7,
        type: 'guard',
      });
    
    expect(roomRes.status).toBe(200);
    const roomId = roomRes.body.id;

    // Assign hero as defender
    const assignRes = await request(app)
      .post(`/tower/${towerId}/assign-defender`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        room_id: roomId,
        hero_id: heroId,
        ai_stance: 'aggressive',
      });
    
    expect(assignRes.status).toBe(200);
  });

  it('should execute a successful raid', async () => {
    // Create attacker hero
    // ... (similar to summon)

    // Start raid
    const raidRes = await request(app)
      .post('/raid/start')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        attacker_id: attackerPlayerId,
        defender_tower_id: towerId,
        difficulty: 'normal',
        attacker_party: [attackerHeroId, ...],
      });
    
    const raidId = raidRes.body.raid_id;
    expect(raidId).toBeTruthy();

    // Wait for raid to complete
    let raid;
    for (let i = 0; i < 60; i++) {
      const statusRes = await request(app)
        .get(`/raid/${raidId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      if (statusRes.body.completed_at) {
        raid = statusRes.body;
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    expect(raid).toBeTruthy();
    expect(raid.result).toMatch(/^(attacker_won|defender_won|timeout)$/);
    expect(raid.loot_gold).toBeGreaterThanOrEqual(0);
  }, 120000);
});
```

---

## PHASE 0 COMPLETION CHECKLIST

### Design Validation
- [ ] Tower grid system prototyped & tested (DP costs, room placement)
- [ ] Basic combat engine works (initiative, attack resolution)
- [ ] Gacha logic validated (rarity distribution, stat scaling)
- [ ] 10 AI-generated heroes created and reviewed
- [ ] 3 story chains documented with branch nodes
- [ ] Balance spreadsheet completed for all archetypes

### Technical Setup
- [ ] GitHub repo initialized with proper structure
- [ ] Docker Compose dev environment works locally
- [ ] CI/CD pipeline deployed (GitHub Actions)
- [ ] Database migrations created and tested
- [ ] Kubernetes cluster ready for Phase 1
- [ ] Team onboarding doc complete & shared

### AI Pipeline
- [ ] Local LLM or API wrapper tested (Anthropic Claude)
- [ ] Backstory generation tested with 10 examples
- [ ] Image generation pipeline stubbed (ready for implementation)
- [ ] Content filtering design documented
- [ ] Performance measured (generation time per hero)

### Risk Assessment
- [x] Scope creep mitigation: Detailed phase plan created
- [ ] Schedule risk: Buffer time added (spare week if needed)
- [ ] Technical risk: All core mechanics prototyped, no blockers identified
- [ ] AI risk: Cost & latency estimated, fallbacks identified (API vs self-hosted)
- [ ] Balance risk: Framework created, ready for live testing in Phase 1

---

## NEXT STEPS (End of Week 4)

1. **Team Sync:** Review Phase 0 deliverables, confirm readiness for Phase 1
2. **Code Review:** Tech lead reviews all Phase 0 code, identifies refactoring needs
3. **Documentation:** Update wiki with Phase 0 learnings
4. **Backlog:** Finalize Phase 1 sprint 1 stories (detailed estimates)
5. **Infrastructure:** Spin up production-like staging environment
6. **Start Phase 1:** Begin full Backend + Frontend integration for vertical slice demo

---

## Success Criteria (Subjective)

✅ Core mechanics feel fun in prototype
✅ AI generation produces diverse, non-repetitive heroes
✅ No major technical blockers identified
✅ Team has confidence in scope & timeline
✅ Stakeholders excited about vertical slice demo (Week 5-6)

