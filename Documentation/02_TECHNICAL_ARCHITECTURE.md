# Infinite Towers Online - Technical Architecture
## System Design & Implementation Guide

---

## 1. OVERALL ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Unity/Web   │  │   Mobile App │  │  Web Browser │           │
│  │   (2D+3D)    │  │   (WebGL)    │  │   (WebGL)    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (HTTPS/WSS)
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│  (Kong or AWS API Gateway)                                       │
│  - Rate limiting, auth validation, request routing              │
│  - SSL termination, CORS handling                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES LAYER                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Auth Service (Port 3001)                                │   │
│  │ - Account creation, login, JWT generation              │   │
│  │ - Session validation                                    │   │
│  │ - 2FA, social auth (optional)                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Player Service (Port 3002)                              │   │
│  │ - Profile CRUD, inventory management                   │   │
│  │ - Hero roster, equipment, cosmetics                    │   │
│  │ - Resource tracking (gold, FT, FC, mana shards)       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Tower Service (Port 3003)                               │   │
│  │ - Tower layout CRUD, room placement, DP budgets        │   │
│  │ - Tower themes, upgrades                               │   │
│  │ - Defender assignment, AI stance config                │   │
│  │ - Raid orchestration (request → combat → result)       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Combat Service (Port 3004)                              │   │
│  │ - Turn-based combat engine (turn order, action eval)   │   │
│  │ - Skill/ability resolution                             │   │
│  │ - Damage calculation, status effects                   │   │
│  │ - Real-time arena sync (WebSocket)                     │   │
│  │ - Defender AI execution, player pause handling         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Hero Service (Port 3005)                                │   │
│  │ - Hero CRUD, stat calculation, leveling                │   │
│  │ - Class evolution, skill unlocks                        │   │
│  │ - Mood/emotional state management                      │   │
│  │ - Experience + level gain, death/permadeath            │   │
│  │ - Relationship tracking                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ AI Content Service (Port 3006)                          │   │
│  │ - Summon request handling (async job queue)            │   │
│  │ - Rarity roll, spec assignment                         │   │
│  │ - LLM backstory generation (Llama 3 70B or API)        │   │
│  │ - Image generation (Stable Diffusion XL)               │   │
│  │ - Personal quest generation, dialogue caching          │   │
│  │ - Content filtering (profanity, NSFW, IP checks)       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Quest Service (Port 3007)                               │   │
│  │ - Personal quest node generation & progression         │   │
│  │ - Objective tracking (kill, fetch, explore)            │   │
│  │ - Choice logging, consequence application              │   │
│  │ - Reward calculation                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Social Service (Port 3008)                              │   │
│  │ - Guild CRUD, member management                        │   │
│  │ - Guild chat, roles & permissions                      │   │
│  │ - Guild Spire (megatower) storage                       │   │
│  │ - Mentorship tracking                                  │   │
│  │ - Relationship graph                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ World Service (Port 3009)                               │   │
│  │ - Faction AI simulation & state                        │   │
│  │ - Global event triggers                                │   │
│  │ - World map (tower locations, territories)             │   │
│  │ - Territory control tracking                           │   │
│  │ - Guild wars orchestration                             │   │
│  │ - Reputation service                                   │   │
│  │ - Chronicle/history logging & summarization            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Gacha Service (Port 3010)                               │   │
│  │ - Summon economy (pity counters, rates)                │   │
│  │ - Banner management, time-limited pools               │   │
│  │ - Pull history, statistics                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Monetization Service (Port 3011)                        │   │
│  │ - FC currency purchases (Stripe integration)           │   │
│  │ - Cosmetic shop inventory                              │   │
│  │ - Battle pass tracking & reward unlocks                │   │
│  │ - Transaction history, refund handling                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Matchmaking Service (Port 3012)                         │   │
│  │ - Tower raid power score calculation                   │   │
│  │ - Queue management, match finding                      │   │
│  │ - Arena ELO ranking, seasonal resets                   │   │
│  │ - Battle report generation                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                    │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐            │
│  │ PostgreSQL Primary   │  │ PostgreSQL Replica   │            │
│  │ (Main DB)            │  │ (Read-heavy queries) │            │
│  │ - Heroes             │  │                      │            │
│  │ - Players            │  │  Failover setup      │            │
│  │ - Towers             │  │                      │            │
│  │ - Events/logs        │  │                      │            │
│  └──────────────────────┘  └──────────────────────┘            │
│            │ (bidirectional replication)                        │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐            │
│  │ Redis Cache Cluster  │  │ Redis Session Store  │            │
│  │ (In-memory cache)    │  │ (User sessions, JWT) │            │
│  │ - Hero stats (live)  │  │                      │            │
│  │ - Leaderboards       │  │  TTL: 24 hours       │            │
│  │ - World state        │  │                      │            │
│  │ - Rate limit buckets │  │                      │            │
│  │ - Job queue (RQ)     │  │                      │            │
│  └──────────────────────┘  └──────────────────────┘            │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐            │
│  │ MongoDB (Optional)   │  │ S3 / Cloud Storage   │            │
│  │ (Flexible docs)      │  │ (CDN-backed)         │            │
│  │ - Hero events/memory │  │ - Hero portraits     │            │
│  │ - Battle logs        │  │ - Tower themes       │            │
│  │ - Chronicles         │  │ - Cosmetic assets    │            │
│  │ - Dialogue cache     │  │ - Backups            │            │
│  └──────────────────────┘  └──────────────────────┘            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ AI Inference Layer                                     │    │
│  │ ┌─────────────────────────────────────────────────┐   │    │
│  │ │ Option A: Self-Hosted (Recommended for volume) │   │    │
│  │ │ - A100 GPU cluster running Llama 3 70B vLLM    │   │    │
│  │ │ - Stable Diffusion XL on separate A100s        │   │    │
│  │ │ - vLLM for fast batched inference              │   │    │
│  │ │ - Custom content filter plugin                 │   │    │
│  │ └─────────────────────────────────────────────────┘   │    │
│  │ OR                                                     │    │
│  │ ┌─────────────────────────────────────────────────┐   │    │
│  │ │ Option B: API (Cost-efficient at low volume)    │   │    │
│  │ │ - Anthropic Claude API for backstories         │   │    │
│  │ │ - Replicate for Stable Diffusion              │   │    │
│  │ │ - Content filtering API (Azure/OpenAI)        │   │    │
│  │ └─────────────────────────────────────────────────┘   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Payment Processing                                      │   │
│  │ - Stripe for FC purchases                             │   │
│  │ - Webhook handling, reconciliation                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Analytics & Monitoring                                  │   │
│  │ - Grafana (metrics dashboards)                         │   │
│  │ - Prometheus (metric scraping)                         │   │
│  │ - Datadog/New Relic (distributed tracing)              │   │
│  │ - CloudWatch/Stackdriver logs                          │   │
│  │ - ELK Stack (centralized logging)                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. MICROSERVICE SPECIFICATIONS

### 2.1 Auth Service (Port 3001)

**Responsibilities:**
- User registration and login
- JWT token generation and validation
- Session management
- OAuth2 integration (Google, Discord, etc.)

**Data Model:**
```json
{
  "user_id": "uuid",
  "email": "player@example.com",
  "password_hash": "bcrypt",
  "username": "PlayerName",
  "created_at": "2025-01-01T00:00:00Z",
  "last_login": "2025-01-15T10:30:00Z",
  "auth_provider": "email | google | discord",
  "two_fa_enabled": false,
  "two_fa_secret": "base32_encoded"
}
```

**Key Endpoints:**
```
POST /auth/register
  Input: { email, password, username }
  Output: { user_id, access_token, refresh_token }

POST /auth/login
  Input: { email, password }
  Output: { access_token, refresh_token, expires_in }

POST /auth/refresh
  Input: { refresh_token }
  Output: { access_token }

POST /auth/logout
  Input: { access_token }
  Output: { success: true }

GET /auth/validate
  Input: header Authorization: Bearer <token>
  Output: { user_id, email, roles }
```

**Security Measures:**
- Passwords hashed with bcrypt (cost factor 12)
- JWT signed with RS256 (RSA asymmetric)
- Refresh tokens rotated on each use
- Rate limiting: 5 failed login attempts → 15-min lockout
- HTTPS only
- CORS restricted to trusted domains

---

### 2.2 Player Service (Port 3002)

**Responsibilities:**
- Player profile and account-level data
- Inventory (heroes, equipment, cosmetics)
- Resource management (gold, FT, FC, mana shards)
- Notifications

**Data Model:**
```json
{
  "player_id": "uuid",
  "user_id": "uuid",
  "display_name": "PlayerName",
  "level": 25,
  "experience": 15000,
  "tower_id": "uuid",
  "faction_id": "ashen_dominion",
  "guild_id": "uuid | null",
  "created_at": "2025-01-01T00:00:00Z",
  "last_active": "2025-01-15T10:30:00Z",
  "resources": {
    "gold": 50000,
    "fate_threads": 300,
    "fate_crystals": 0,
    "mana_shards": 200,
    "reputation": {
      "ashen_dominion": 500,
      "church_of_hollow_light": 200,
      "verdant_choir": -100,
      "black_spiral_syndicate": 0,
      "forgotten_court": 50,
      "abyssal_engineers": 150
    }
  },
  "heroes": ["hero_id_1", "hero_id_2", ...],
  "cosmetics": {
    "owned": ["cosmetic_id_1", ...],
    "equipped": {
      "tower_skin": "cosmetic_id_5",
      "chat_badge": "cosmetic_id_12"
    }
  },
  "stats": {
    "total_raids_won": 45,
    "total_raids_lost": 12,
    "total_defenses_won": 78,
    "heroes_killed": 15
  }
}
```

**Key Endpoints:**
```
GET /player/profile
  Output: Player object + calculated stats

PUT /player/profile
  Input: { display_name, faction_id, ... }
  Output: Updated player object

POST /player/resources/add
  Input: { resource_type, amount }
  Output: Updated resources

POST /player/resources/deduct
  Input: { resource_type, amount }
  Output: Updated resources or error if insufficient

GET /player/inventory
  Output: { heroes, equipment, cosmetics }

POST /player/cosmetics/equip
  Input: { cosmetic_id, slot }
  Output: Updated cosmetics

GET /player/notifications
  Output: [ { id, type, message, created_at }, ...]

DELETE /player/notifications/:id
  Output: { success: true }
```

**Cache Strategy:**
- Player profile cached in Redis with 5-minute TTL
- Resources updated on every transaction, cache invalidated
- Cosmetics cached separately (24-hour TTL)

---

### 2.3 Tower Service (Port 3003)

**Responsibilities:**
- Tower layout and room management
- Tower themes, upgrades, and leveling
- Defender assignment and configuration
- Raid orchestration (matchmaking, execution, result logging)

**Data Model (Tower):**
```json
{
  "tower_id": "uuid",
  "player_id": "uuid",
  "name": "Frostheim's Citadel",
  "theme_id": "frost_cathedral",
  "level": 8,
  "experience": 12000,
  "layout": {
    "width": 15,
    "height": 15,
    "rooms": [
      {
        "id": "room_1",
        "x": 7,
        "y": 7,
        "type": "boss_chamber",
        "defender_hero_id": "hero_123",
        "properties": {
          "threshold_damage": 0
        }
      },
      {
        "id": "room_2",
        "x": 6,
        "y": 7,
        "type": "guard_room",
        "defender_hero_id": "hero_456",
        "properties": {
          "ai_stance": "aggressive"
        }
      },
      {
        "id": "room_3",
        "x": 5,
        "y": 7,
        "type": "trap_room",
        "trap_type": "spike",
        "properties": {
          "damage_per_trigger": 500,
          "triggers_remaining": 10
        }
      },
      {
        "id": "room_4",
        "x": 7,
        "y": 8,
        "type": "resource_generator",
        "resource_type": "gold",
        "properties": {
          "generation_rate_per_hour": 1000,
          "last_collected": "2025-01-15T10:00:00Z"
        }
      }
    ]
  },
  "defense_points": {
    "total": 2000,
    "used": 1650,
    "available": 350
  },
  "upgrades": {
    "grid_expansion": 1,
    "storage_capacity": 3,
    "defender_slots": 1
  },
  "created_at": "2025-01-01T00:00:00Z",
  "last_modified": "2025-01-15T09:45:00Z"
}
```

**Data Model (Raid Instance):**
```json
{
  "raid_id": "uuid",
  "attacker_id": "uuid",
  "attacker_party": ["hero_1", "hero_2", "hero_3", "hero_4"],
  "defender_tower_id": "uuid",
  "difficulty": "normal", // or "hardcore"
  "started_at": "2025-01-15T10:00:00Z",
  "completed_at": "2025-01-15T10:15:30Z",
  "result": "attacker_won",
  "rooms_cleared": 8,
  "total_rooms": 12,
  "casualties": {
    "attacker": ["hero_1"],
    "defender": ["hero_456", "hero_789"]
  },
  "loot": {
    "gold": 5000,
    "mana_shards": 250,
    "war_trophy_id": "trophy_12345"
  },
  "battle_log": "firebase ref or S3 key"
}
```

**Key Endpoints:**
```
GET /tower/:tower_id
  Output: Tower object

PUT /tower/:tower_id/room
  Input: { room_id, x, y, type, properties }
  Output: Updated room, validation of DP usage

DELETE /tower/:tower_id/room/:room_id
  Output: { success, freed_dp }

POST /tower/:tower_id/assign-defender
  Input: { room_id, hero_id, ai_stance }
  Output: { success, updated_room }

POST /tower/:tower_id/upgrade
  Input: { upgrade_type }
  Output: { success, new_upgrade_level, resources_deducted }

GET /tower/:tower_id/raid-history
  Output: [ Raid object, ... ]

POST /raid/start
  Input: { attacker_id, defender_tower_id, difficulty, attacker_party }
  Output: { raid_id, initial_state }
  Note: Triggers combat service asynchronously

GET /raid/:raid_id
  Output: Raid object (live or completed)

GET /raid/:raid_id/battle-log
  Output: Turn-by-turn combat log (paginated)
```

**Tower DP Costs (Example):**
- Guard Room: 50 DP
- Trap Room: 30 DP
- Resource Generator: 100 DP
- Boss Chamber: 200 DP
- Environmental Room: 20 DP
- Each additional defender: 150 DP

---

### 2.4 Combat Service (Port 3004)

**Responsibilities:**
- Turn-based combat engine (turn order, action evaluation)
- Skill resolution, damage calculation
- Status effects and crowd control
- Defender AI execution
- Real-time arena sync

**Combat Flow:**
```
1. Initialize Combat
   - Input: 4 attacking heroes, 4 defending heroes (or fewer)
   - Calculate initiative for all heroes (based on SPD stat)
   - Create turn queue

2. Per Turn (while either side has alive heroes):
   a. Get next hero in queue
   b. If player-controlled:
      - Wait for player input (1-minute timeout)
      - Validate action (hero in range, skill available, mana sufficient)
   c. If AI-controlled (defender):
      - Execute behavior tree (role, mood, tactical context)
      - Log AI decision
   d. Execute action:
      - Calculate damage/healing (modified by stats, buffs, debuffs)
      - Apply status effects (burn, freeze, poison)
      - Update HP
      - Trigger on-hit effects
   e. Add next hero to queue

3. Victory/Defeat
   - If attacker kills all defenders: attacker wins
   - If attacker's entire party dies: defender wins
   - Timeout after 2 minutes per room: attacker loses
```

**Data Model (Combat State):**
```json
{
  "combat_id": "uuid",
  "raid_id": "uuid",
  "room_id": "uuid",
  "current_turn": 45,
  "turn_timer_remaining_seconds": 120,
  "heroes": [
    {
      "id": "hero_1",
      "name": "Lyra the Shadow",
      "archetype": "rogue",
      "specialization": "blood_duelist",
      "level": 35,
      "hp_current": 340,
      "hp_max": 600,
      "mana_current": 85,
      "mana_max": 150,
      "stats": { "atk": 120, "def": 60, "spd": 100, ... },
      "effects": [
        {
          "name": "burn",
          "stacks": 2,
          "duration": 3,
          "damage_per_turn": 50
        }
      ],
      "is_alive": true,
      "owner": "attacker"
    },
    ...
  ],
  "turn_queue": ["hero_1", "hero_2", "hero_3", ...],
  "last_action": {
    "actor_id": "hero_1",
    "action_type": "skill",
    "skill_id": "backstab",
    "target_id": "hero_defense_1",
    "damage_dealt": 450,
    "was_critical": true,
    "effects_applied": ["bleed"]
  },
  "phase": "active" // or "attacker_victory" or "defender_victory"
}
```

**Key Endpoints:**
```
POST /combat/action
  Input: { combat_id, hero_id, action_type, action_id, target_id }
  Output: { success, combat_state_updated, log_entry }

POST /combat/pause
  Input: { combat_id }
  Output: { paused: true, remaining_time }

POST /combat/resume
  Input: { combat_id }
  Output: { resumed: true }

GET /combat/:combat_id/state
  Output: Current combat state (public info only for spectators)

POST /combat/:combat_id/surrender
  Input: { combat_id }
  Output: { defender_wins, loot_reduced_by: 50% }
```

**Arena (Real-Time) Implementation:**
- WebSocket connection per arena match
- Server broadcasts turn results to both players every 2 seconds
- Actions are validated and executed on server (authoritative)
- Client shows turn timer and action queue
- Latency target: <100ms for action response

---

### 2.5 Hero Service (Port 3005)

**Responsibilities:**
- Hero CRUD and lifecycle
- Experience and leveling
- Class evolution and skill progression
- Emotional state (mood, loyalty, fear)
- Relationship tracking
- Permadeath handling

**Data Model:**
```json
{
  "hero_id": "uuid",
  "player_id": "uuid",
  "name": "Lyra the Shadow",
  "rarity": "mythic",
  "archetype": "rogue",
  "specialization_template": "blood_duelist",
  "level": 35,
  "experience": 45000,
  "experience_to_next_level": 50000,
  "created_at": "2025-01-01T12:00:00Z",
  "backstory": "A former soldier of the Ashen Dominion...",
  "personality": {
    "traits": ["cunning", "protective", "haunted"],
    "initial_relationship": "suspicious"
  },
  "portrait_url": "https://cdn.example.com/portraits/hero_xyz.png",
  "stats": {
    "hp": 600,
    "atk": 120,
    "def": 60,
    "spd": 100,
    "magic_atk": 40,
    "magic_def": 55,
    "crit_rate": 0.25,
    "crit_damage": 1.5
  },
  "skills": {
    "active": [
      {
        "id": "backstab",
        "name": "Backstab",
        "level": 3,
        "description": "Single-target burst attack",
        "mana_cost": 30,
        "cooldown_turns": 2
      },
      ...
    ],
    "passive": [
      {
        "id": "blood_duelist_passive",
        "effect": "Life steal 20% of damage dealt"
      }
    ]
  },
  "evolution": {
    "current_class": "blood_duelist",
    "path_taken": ["rogue", "blood_duelist"],
    "available_evolutions": [
      {
        "class_name": "Crimson Reaper",
        "unlock_level": 60,
        "description": "Ultimate life-steal form"
      }
    ]
  },
  "mood": {
    "morale": 85,
    "loyalty": 70,
    "fear": 20,
    "last_updated": "2025-01-15T10:00:00Z"
  },
  "relationships": {
    "hero_id_2": "friend",
    "hero_id_3": "rival",
    "hero_id_4": "love"
  },
  "events": [
    {
      "type": "combat_victory",
      "detail": "Defeated 3 enemies solo",
      "timestamp": "2025-01-15T10:00:00Z"
    },
    {
      "type": "companion_death",
      "detail": "Watched hero_id_2 die in combat",
      "timestamp": "2025-01-14T18:30:00Z"
    }
  ],
  "is_alive": true,
  "death_date": null,
  "memorial_item_id": null
}
```

**Key Endpoints:**
```
POST /hero/:hero_id/gain-experience
  Input: { experience_amount, source }
  Output: { new_level, new_exp, level_up: boolean }

POST /hero/:hero_id/evolve
  Input: { evolution_path }
  Output: { new_class, updated_stats, new_skills }

POST /hero/:hero_id/update-mood
  Input: { event_type, detail }
  Output: { updated_mood }

POST /hero/:hero_id/add-relationship
  Input: { target_hero_id, relationship_type }
  Output: { success }

POST /hero/:hero_id/death
  Input: { cause, permadeath: boolean }
  Output: { funeral_narrative, memorial_item, affected_heroes }

GET /hero/:hero_id
  Output: Full hero object

GET /hero/:hero_id/dialogue
  Input: { context, recent_events }
  Output: { dialogue_lines: [ ... ], suggested_action }
```

---

### 2.6 AI Content Service (Port 3006)

**Responsibilities:**
- Summon request queuing and execution
- Rarity roll and specialization assignment
- LLM-based backstory and dialogue generation
- Image generation for portraits
- Personal quest generation
- Content filtering (NSFW, profanity, IP violation)

**Architecture:**
```
Summon Request
      ↓
   Queue (Redis RQ)
      ↓
   Worker Pool (3-5 workers)
      ├─ Rarity Roll (instant)
      ├─ Spec Assignment (instant)
      ├─ LLM Backstory (2-3 seconds)
      │  └─ Content Filter (0.5 seconds)
      ├─ Image Gen (10-15 seconds, batched)
      │  └─ Image Filter (1-2 seconds)
      └─ Quest Seed (0.5 seconds)
      ↓
   Result → Cache + Database
      ↓
   Client notification (WebSocket)
```

**Data Model (Summon Job):**
```json
{
  "job_id": "uuid",
  "player_id": "uuid",
  "status": "queued", // or "processing", "completed", "failed"
  "summon_type": "fate_threads", // or "fate_crystals"
  "banner_id": "crimson_eclipse_v2",
  "started_at": "2025-01-15T10:00:00Z",
  "completed_at": null,
  "result": {
    "hero_id": "uuid",
    "rarity": "mythic",
    "archetype": "warrior",
    "specialization": "rune_berserker",
    "name": "Thorak Stonefist",
    "backstory": "Once a proud member of...",
    "personality_traits": ["reckless", "honorable"],
    "portrait_url": "https://cdn.example.com/portraits/thorak.png",
    "initial_quest": {
      "quest_id": "personal_q_1",
      "objective": "Investigate the ruined temple",
      "location": "Tower 3B",
      "reward_xp": 500
    }
  },
  "error": null
}
```

**Prompts (Templated):**

*Backstory Prompt:*
```
You are a fantasy world narrator. Generate a unique hero with the following specs:

Archetype: {archetype_name}
Specialization: {specialization_name}
Rarity: {rarity}
Banner Theme: {banner_theme}

Write a 3-4 paragraph backstory (150-200 words) that:
- Connects to the world's lore (Unraveling, towers, factions)
- Reflects their specialization visually and thematically
- Suggests 2-3 personality traits
- Hints at a personal motivation or conflict

Include a name (fantasy style, 2-3 words).

Output as JSON:
{
  "name": "...",
  "backstory": "...",
  "traits": ["trait1", "trait2", "trait3"],
  "motivation": "..."
}
```

*Image Prompt (for Stable Diffusion):*
```
Create a fantasy character portrait in the style of our game (anime-influenced, rich colors, isometric perspective):

Name: {hero_name}
Class: {specialization}
Personality: {traits_joined}
Visual cues from backstory: {extracted_visual_elements}

Medium: Digital painting, vibrant, character portrait, isometric angle, professional.
```

**Content Filter Pipeline:**
```python
def filter_hero_output(hero_dict):
    # 1. Profanity check (LISTA library)
    if contains_profanity(hero_dict['name']):
        return fail("Profanity in name")
    if contains_profanity(hero_dict['backstory']):
        return fail("Profanity in backstory")
    
    # 2. NSFW detection (image classification)
    image = download_image(hero_dict['portrait_url'])
    if is_nsfw(image):
        return fail("NSFW image detected")
    
    # 3. IP detection (image similarity search)
    if is_copyrighted_character(image):
        return fail("Copyrighted IP detected")
    
    # 4. Hate speech check (NLP classifier)
    if contains_hate_speech(hero_dict['backstory']):
        return fail("Hate speech detected")
    
    return pass()
```

**Key Endpoints:**
```
POST /summon
  Input: { player_id, summon_type, banner_id }
  Output: { job_id, queue_position }
  Note: Async, returns immediately

GET /summon/:job_id/status
  Output: { status, progress, result: Hero | null }

POST /quest/generate
  Input: { hero_id, context }
  Output: { quest_node_id, objective, location, reward }
```

---

### 2.7 Quest Service (Port 3007)

**Similar structure to other services. Store:**
- Quest node definitions (type, objective, NPC, location)
- Player progress per quest
- Choice history and consequences
- Rewards (XP, resources, relationship changes)

---

### 2.8 Social Service (Port 3008)

**Guild Structure:**
```json
{
  "guild_id": "uuid",
  "name": "Dragon Slayers",
  "description": "We hunt dragons",
  "guildmaster_id": "player_1",
  "level": 5,
  "member_count": 24,
  "max_members": 50,
  "created_at": "2025-01-01T00:00:00Z",
  "spire_id": "tower_xyz",
  "treasury": {
    "gold": 100000,
    "mana_shards": 5000
  },
  "research": {
    "raid_loot_boost": {
      "level": 2,
      "bonus_percent": 10
    },
    "xp_boost": {
      "level": 1,
      "bonus_percent": 5
    }
  },
  "members": [
    {
      "player_id": "uuid",
      "role": "guildmaster",
      "joined_at": "2025-01-01T00:00:00Z",
      "contribution": 5000 // resource points
    }
  ]
}
```

---

### 2.9 World Service (Port 3009)

**Tracks:**
- Faction AI states (military power, resources, goals)
- Territory control map
- Global event triggers
- War declarations
- Chronicle entries

**Faction Simulation (Pseudocode):**
```python
def simulate_faction_turn():
    for faction in all_factions:
        # Update faction resources
        faction.gold += faction.gold_generation_rate
        faction.military_power += faction_expansion
        
        # Check for war triggers
        if faction.enemy_faction.territory > threshold:
            declare_war(faction, faction.enemy_faction)
        
        # Check for event triggers
        if faction.military_power > 10000:
            trigger_event("faction_name declares holy war")
            spawn_roaming_bosses(faction.theme, count=5)
        
        # Update world state
        broadcast_faction_update()
```

---

## 3. DATABASE SCHEMA (PostgreSQL)

```sql
-- Players
CREATE TABLE players (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    experience BIGINT DEFAULT 0,
    tower_id UUID,
    faction_id VARCHAR(50),
    guild_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (tower_id) REFERENCES towers(id),
    FOREIGN KEY (guild_id) REFERENCES guilds(id)
);

CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_guild_id ON players(guild_id);

-- Heroes
CREATE TABLE heroes (
    id UUID PRIMARY KEY,
    player_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    rarity VARCHAR(20) NOT NULL, -- common, rare, elite, mythic, ascendant
    archetype VARCHAR(50) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    experience BIGINT DEFAULT 0,
    hp INT NOT NULL,
    atk INT NOT NULL,
    def INT NOT NULL,
    spd INT NOT NULL,
    morale INT DEFAULT 75,
    loyalty INT DEFAULT 50,
    fear INT DEFAULT 0,
    is_alive BOOLEAN DEFAULT TRUE,
    death_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE INDEX idx_heroes_player_id ON heroes(player_id);
CREATE INDEX idx_heroes_is_alive ON heroes(is_alive);

-- Towers
CREATE TABLE towers (
    id UUID PRIMARY KEY,
    player_id UUID UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    theme_id VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    experience BIGINT DEFAULT 0,
    layout JSONB NOT NULL, -- Serialized room layout
    defense_points_total INT NOT NULL,
    defense_points_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    last_modified TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Raids
CREATE TABLE raids (
    id UUID PRIMARY KEY,
    attacker_id UUID NOT NULL,
    defender_tower_id UUID NOT NULL,
    difficulty VARCHAR(20) NOT NULL, -- normal, hardcore
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    result VARCHAR(20), -- attacker_won, defender_won, timeout
    rooms_cleared INT DEFAULT 0,
    loot_gold INT DEFAULT 0,
    loot_mana_shards INT DEFAULT 0,
    battle_log JSONB,
    FOREIGN KEY (attacker_id) REFERENCES players(id),
    FOREIGN KEY (defender_tower_id) REFERENCES towers(id)
);

CREATE INDEX idx_raids_attacker_id ON raids(attacker_id);
CREATE INDEX idx_raids_defender_tower_id ON raids(defender_tower_id);
CREATE INDEX idx_raids_completed_at ON raids(completed_at);

-- Quests
CREATE TABLE quests (
    id UUID PRIMARY KEY,
    hero_id UUID NOT NULL,
    node_type VARCHAR(50) NOT NULL, -- personal, faction, world, echo
    objective VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, abandoned
    choices JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE
);

-- Guild
CREATE TABLE guilds (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    guildmaster_id UUID NOT NULL,
    level INT DEFAULT 1,
    spire_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (guildmaster_id) REFERENCES players(id),
    FOREIGN KEY (spire_id) REFERENCES towers(id)
);

-- Guild Members
CREATE TABLE guild_members (
    guild_id UUID NOT NULL,
    player_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL, -- guildmaster, officer, architect, warmonger, scholar, member
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (guild_id, player_id),
    FOREIGN KEY (guild_id) REFERENCES guilds(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Chronicles
CREATE TABLE chronicles (
    id UUID PRIMARY KEY,
    server_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- hero_death, tower_fall, unique_class, war_declared
    player_id UUID,
    hero_id UUID,
    description TEXT NOT NULL,
    narrative_summary TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
);

CREATE INDEX idx_chronicles_created_at ON chronicles(created_at);
CREATE INDEX idx_chronicles_event_type ON chronicles(event_type);
```

---

## 4. API RATE LIMITING & DDoS PROTECTION

**Rate Limits (per user per minute):**
- Summon: 1 pull per 30 seconds
- Raid initiation: 1 per 5 seconds
- Hero actions: unlimited (controlled by combat timer)
- Chat message: 1 per 2 seconds (burst: 10 messages)
- API queries: 100 requests per minute

**DDoS Mitigation:**
- Cloudflare or AWS Shield (layer 3-4)
- API Gateway rate limiting (layer 7)
- Redis distributed rate limit buckets

---

## 5. CACHING STRATEGY

| Resource | Cache | TTL | Invalidation |
|----------|-------|-----|--------------|
| Player profile | Redis | 5 min | On profile update |
| Hero stats | Redis | 10 min | On level-up, evolution |
| Tower layout | Redis | 15 min | On room placement |
| Leaderboards | Redis | 1 min | On raid completion |
| Common dialogue | Redis | 1 day | On model update |
| Cosmetics catalog | Redis | 1 hour | On shop update |
| World state (factions) | Redis | 5 min | On faction simulation tick |

---

## 6. DEPLOYMENT ARCHITECTURE (Kubernetes)

**Cluster Setup:**
- Managed Kubernetes (AWS EKS, GCP GKE)
- 3 master nodes (HA)
- 10-15 worker nodes (auto-scaling: 2-30 pods)
- Persistent storage (EBS, Cloud Persistent Disk)

**Microservice Pod Specs:**
- Requests: 0.5 CPU, 512 MB RAM
- Limits: 2 CPU, 2 GB RAM
- Replicas: 3 per service (rolling updates)
- Liveness probe: HTTP /health every 30s
- Readiness probe: HTTP /ready every 10s

**CI/CD (GitHub Actions):**
```yaml
on: [push to main, PR]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - checkout code
      - run tests (jest, pytest)
      - run lint checks
      - push coverage to Codecov
  
  build:
    needs: test
    steps:
      - build docker image
      - push to Docker Hub / ECR
      - tag with git commit SHA
  
  deploy-staging:
    needs: build
    steps:
      - update k8s deployment YAML
      - apply to staging cluster
      - run smoke tests
  
  deploy-production:
    needs: deploy-staging
    if: [manual approval]
    steps:
      - apply to production cluster
      - monitor for 5 minutes
      - auto-rollback on alert
```

---

## 7. MONITORING & ALERTING

**Prometheus Metrics (per service):**
- Request latency (p50, p95, p99)
- Request volume (req/sec)
- Error rate (500s, 4xxs)
- CPU/Memory usage
- Database query latency
- Cache hit rate

**Alert Rules:**
- Error rate > 1% → page on-call
- Latency p95 > 500ms → page on-call
- Pod memory > 90% → auto-scale
- Database connection pool > 80% → alert
- Redis memory > 80% → alert

**Dashboards:**
- Service health (uptime, latency, errors)
- Business metrics (DAU, raids/day, summons/day)
- Infrastructure (pod count, network I/O, disk usage)
- AI generation (queue depth, avg latency, filter hit rate)

This completes the technical architecture. Ready to move to Phase 0?
