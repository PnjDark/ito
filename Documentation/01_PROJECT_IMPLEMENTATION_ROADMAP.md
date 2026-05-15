# Infinite Towers Online - Implementation Roadmap
## Phase-Based Project Lifecycle

---

## PHASE 0: PRE-PRODUCTION (Weeks 1-4)
### Objective: Validate core mechanics, establish foundation, minimize future rework

#### 0.1 Design Validation & Prototyping
- [ ] **Mechanic Core Tests** (Week 1)
  - Prototype tower grid layout system (15x15 rooms, expandability)
  - Test basic tactical combat pause system (4v4 hero parties)
  - Validate gacha generation pipeline (rarity rolls, spec assignment, stat curves)
  - **Deliverable:** Unity prototype scene with demo tower and 1v1 combat

- [ ] **AI Pipeline Proof-of-Concept** (Week 1-2)
  - Set up local LLM inference (Llama 3 70B or API wrapper)
  - Create hero backstory generation template prompt
  - Test image generation pipeline (Stable Diffusion XL)
  - Measure generation time and cost per hero
  - **Deliverable:** 10 AI-generated heroes with portraits, names, backstories

- [ ] **Balance Framework** (Week 2)
  - Define base archetype stat curves (HP, ATK, DEF, SPD)
  - Create specialization templates (damage modifiers, passive calculations)
  - Design evolution tree branching (5-7 nodes per specialization)
  - **Deliverable:** Spreadsheet with complete balance matrix

- [ ] **Narrative Structure Audit** (Week 2)
  - Map story node graph (personal/faction/world/echo types)
  - Define trigger conditions for key story branches
  - Create 3 full example story chains (hero → personal quest → evolution → world impact)
  - **Deliverable:** Narrative design doc with story node flow diagrams

#### 0.2 Technical Stack Finalization
- [ ] **Engine Selection** (Week 1)
  - Confirm: Unity (2D with 3D depth) or custom engine
  - Set up version control (GitHub), project management (Jira/Linear)
  - Configure CI/CD pipeline skeleton

- [ ] **Backend Architecture Design** (Week 2)
  - Finalize microservices split (Auth, Tower, Combat, AI Content, Social, World)
  - Define API contracts (OpenAPI specs) for each service
  - Design database schema for heroes, towers, events
  - **Deliverable:** Architecture diagram + API specification document

- [ ] **AI Infrastructure Setup** (Week 2-3)
  - Evaluate: Self-hosted Llama vs. API (Anthropic, OpenAI)
  - Estimate operational cost and latency
  - Design caching and rate-limiting strategy
  - Set up content filtering pipeline
  - **Deliverable:** Cost-benefit analysis + infrastructure diagram

#### 0.3 Team & Process Setup
- [ ] **Create Implementation Charter**
  - Define roles: Tech Lead, Game Design Lead, AI/ML Lead, Backend Lead, Frontend Lead
  - Establish coding standards, documentation requirements
  - Set up development environment setup scripts
  - **Deliverable:** Team onboarding guide

- [ ] **Kanban/Scrum Setup**
  - Create Jira board with epics for each phase
  - Define DoD (Definition of Done): code review, tests, documentation
  - Schedule 2-week sprints
  - **Deliverable:** Sprint 1 backlog with committed stories

---

## PHASE 1: FOUNDATION (Weeks 5-12) — *2 Sprints*
### Objective: Build playable core loop with one hero summon, tower building, and basic raid

#### 1.1 Authentication & Player Infrastructure
- [ ] **Player Account System**
  - Create accounts (email/social login)
  - Session management, JWT tokens
  - Profile data storage (level, resources, tower ID)
  - **Tech:** Auth service (Auth0 or custom JWT) + Player service
  - **Test:** Unit tests for login flow, E2E for account creation

- [ ] **Inventory & Hero Storage**
  - Hero roster (store hero JSON: rarity, spec, stats, evolution state)
  - Hero filtering/sorting UI
  - Hero detail view (backstory, stats, relationships)
  - **Tech:** PostgreSQL heroes table + Redis caching
  - **Test:** CRUD operations, roster limit enforcement

#### 1.2 Gacha & Hero Summoning System
- [ ] **Summoning Pipeline**
  - Rarity roll logic (40% Common, 30% Rare, 20% Elite, 9% Mythic, 1% Ascendant)
  - Pity counter (90 pulls guarantees Ascendant)
  - Banner system with time-limited pools
  - **Tech:** Summon service with weighted randomization
  - **Test:** Statistical validation of rates, pity logic

- [ ] **AI Hero Generation (Async)**
  - Integrate LLM for backstory (prompt with spec, archetype, banner theme)
  - Integrate image gen for portrait
  - Cache pre-computed common heroes for speed
  - **Tech:** AI Content service with async queues
  - **Test:** Generate 100 heroes, validate diversity, check output filtering

- [ ] **Hero Stat Calculation**
  - Calculate base stats from archetype + level
  - Apply specialization modifiers
  - Store in hero object
  - **Test:** Validate stat curves match design doc

#### 1.3 Tower System (Basic)
- [ ] **Tower Grid & Room System**
  - 15x15 grid representation (JSON)
  - 4 basic room types: Guard, Trap, Resource, Boss Chamber
  - Place/remove rooms with DP cost
  - **Tech:** Tower service, room layout storage
  - **Test:** Grid validation, DP budget enforcement

- [ ] **Hero Placement as Defenders**
  - Assign hero to Guard Room
  - Set AI stance (Aggressive, Defensive, Support)
  - Simple behavior tree for defender AI
  - **Tech:** Tower placement logic + combat AI service
  - **Test:** Verify defender positioning, stance effects

- [ ] **Tower UI & Customization**
  - Top-down tower editor view
  - Drag-and-drop room placement
  - Display DP budget and upgrade costs
  - **Tech:** Unity UI or web frontend
  - **Test:** Usability testing (placement responsiveness)

#### 1.4 Combat System (Minimal)
- [ ] **Turn-Based Combat Engine**
  - Initiative system (hero speed stat)
  - Action economy: 1 action per turn (attack/skill/defend)
  - Base archetype skills (3 per archetype)
  - Damage calculation (ATK vs. DEF)
  - **Tech:** Combat service (authoritative, stateless)
  - **Test:** Unit tests for damage, skill effects, turn order

- [ ] **Pause & Tactical Mode**
  - Pause button pauses real-time, allows command issuance
  - Only allow pauses on player-controlled heroes
  - 2-minute per-room timer
  - **Tech:** Combat UI + combat state machine
  - **Test:** Pause/unpause doesn't break state

- [ ] **Basic Raid Flow**
  - Enter tower, progress room by room
  - Defeat enemies → advance
  - Reach boss chamber, defeat champion → win
  - Return loot and resources
  - **Tech:** Raid orchestration in tower service
  - **Test:** E2E raid flow (easy/medium difficulty)

#### 1.5 Resource & Currency System
- [ ] **Currency Types**
  - Gold (earned from raids, quests, generators)
  - Fate Threads (summon currency, daily login)
  - Mana Shards (skill upgrades)
  - **Tech:** Player inventory service
  - **Test:** Addition/subtraction, overflow protection

- [ ] **Tower Generators**
  - Place generator rooms, produce gold over time
  - Display production rate
  - Collect manually or automatically
  - **Tech:** Background job, periodic updates
  - **Test:** Production math, overflow handling

#### 1.6 Sprint Deliverable: Vertical Slice Demo
- **Flow:** Login → Summon hero → Build 1-room tower → Auto-defend once → Raid demo tower → See result
- **Acceptance Criteria:**
  - Hero generation takes <5 seconds (animation covers latency)
  - Tower editor is intuitive
  - Combat is deterministic and fair
  - All actions log to backend correctly

---

## PHASE 2: CORE GAMEPLAY (Weeks 13-20) — *2 Sprints*
### Objective: Full tower offense/defense loop, hero progression, class evolution

#### 2.1 Advanced Tower Systems
- [ ] **Room Type Expansion**
  - Trap rooms (damage, freeze, teleport)
  - Puzzle rooms (AI-generated quick puzzle)
  - Environmental rooms (water, lava, darkness)
  - Boss chamber customization
  - **Tech:** Room logic plugins
  - **Test:** Verify trap triggers, puzzle generation

- [ ] **Tower Themes & Bonuses**
  - 6 themes (Frost, Necrotic, Fire, Nature, Crystal, Abyss)
  - Theme passive effects (environmental modifiers)
  - Exclusive room types per theme
  - Visual skin application
  - **Tech:** Theme config system
  - **Test:** Verify bonuses apply correctly in raids

- [ ] **Tower Guardian (Boss Monster)**
  - Place a themed mega-boss defending the final chamber
  - AI behavior: pattern attacks, phases
  - **Tech:** Guardian entity, advanced combat AI
  - **Test:** Guardian damage patterns, rewards on defeat

#### 2.2 Hero Progression & Evolution
- [ ] **Experience & Leveling**
  - Heroes gain XP from combat (raid, defense, quests)
  - Level cap: 100 (initial)
  - Stat growth per level (use curve from balance doc)
  - **Tech:** Hero service level-up logic
  - **Test:** XP accumulation, level thresholds

- [ ] **Class Evolution (Layer 3)**
  - Evolution trees (2-3 branches per spec)
  - Unlock evolution at levels 30, 60, 100
  - Display UI with evolution preview
  - Apply stat/skill changes on evolution
  - **Tech:** Evolution branching logic
  - **Test:** Validate stat changes, skill replacements

- [ ] **Emotional State & Permadeath**
  - Mood system (morale, loyalty, fear: 0-100)
  - Update mood based on recent events
  - Permadeath in Hardcore raids (opt-in)
  - Generate funeral narrative AI dialogue
  - Create memorial item from fallen hero
  - **Tech:** Hero emotional state DB, AI narrative gen
  - **Test:** Mood decay, death trigger logic, memorial creation

#### 2.3 Personal Quest System
- [ ] **Quest Node Generation**
  - AI generates quest chain per hero
  - Quest types: Kill, Fetch, Explore
  - Dynamic location/enemy selection
  - **Tech:** Quest service + AI prompt engineering
  - **Test:** Quest generation, objective tracking

- [ ] **Choice & Consequence**
  - Present 2-3 choices per quest step
  - Track choice for hero relationship/personality
  - AI uses choice history for future dialogue
  - **Tech:** Quest state machine, choice logging
  - **Test:** Choice persists, affects subsequent quests

- [ ] **Quest Rewards & Evolution Triggers**
  - Quest completion grants XP, resources, relationship boost
  - Certain choices trigger special evolution paths
  - **Tech:** Reward logic, evolution trigger conditions
  - **Test:** Verify evolution unlocks after correct choices

#### 2.4 PvP Foundations
- [ ] **Raid Matchmaking**
  - Calculate power score (stats + synergy)
  - Match players of similar strength
  - Queue system with wait time
  - **Tech:** Matchmaking service
  - **Test:** Power score calculation, queue fairness

- [ ] **Battle Reports & History**
  - Store raid outcomes (attacker, defender, result, casualties)
  - Generate narrative AI summary of raid
  - Display to both players post-raid
  - **Tech:** Battle log service + AI narrative
  - **Test:** Report generation, history retrieval

- [ ] **Reputation & Bounty Tracker**
  - Track kill/death records per player
  - Renown score (positive actions boost it)
  - Bounty board UI (upcoming in Phase 3)
  - **Tech:** Reputation service
  - **Test:** Score updates, leaderboard queries

#### 2.5 Sprint Deliverable: Full Core Loop
- **Flow:** Summon hero → Complete personal quest → Evolve class → Build tower defenses → Raid 3 towers → Defend against raids
- **Acceptance Criteria:**
  - 3 personal quests available per hero by lv30
  - Evolution tree UI is clear
  - Tower raids have meaningful strategy
  - Defense AI provides reasonable challenge

---

## PHASE 3: SOCIAL & WORLD SYSTEMS (Weeks 21-28) — *2 Sprints*
### Objective: Guild wars, factions, server history, relationship mechanics

#### 3.1 Guild System
- [ ] **Guild CRUD**
  - Create/disband guild (guildmaster)
  - Join/leave (apply system or invite)
  - Member roles (Guildmaster, Officer, Architect, Warmonger, Scholar)
  - Guild chat
  - **Tech:** Guild service
  - **Test:** Permissions, chat delivery

- [ ] **Guild Spire (Shared Tower)**
  - Guild builds megatower collaboratively
  - Members contribute rooms with shared DP pool
  - Spire can be raided (guild war mechanic)
  - **Tech:** Special tower variant
  - **Test:** Multi-member contributions, raid logic

- [ ] **Guild Wars (24-hour declaration)**
  - Declare war on enemy guild
  - All member towers in contested territory become vulnerable
  - Scoring: most successful raids wins
  - Territory control rewards
  - **Tech:** War state machine, territory DB
  - **Test:** War start/end, territory update, scoring

- [ ] **Guild Research**
  - Unlock passive buffs (raiding loot %, XP boost)
  - Members contribute resources to research
  - Tree of 10-15 upgrades
  - **Tech:** Research tech tree, unlock logic
  - **Test:** Progression, buff application

#### 3.2 Faction System (AI-Driven)
- [ ] **Faction Reputation Tracking**
  - Track player reputation with each of 6 factions
  - Gain rep from faction-aligned quests
  - Unlock faction-exclusive tower themes, heroes
  - **Tech:** Faction service, reputation DB
  - **Test:** Rep gain/loss, threshold unlocks

- [ ] **Faction AI & Global Events**
  - Factions have stat pools (military power, resources)
  - Simulate faction interactions (wars, treaties)
  - Trigger server-wide events based on faction states
  - Example: "Verdant Choir declares Wild Hunt" → roaming bosses spawn
  - **Tech:** World service with faction simulation
  - **Test:** Event triggering, world state updates

- [ ] **Faction Quest Chains**
  - Generate faction-specific quests
  - Completing them advances faction agenda
  - Server-wide progress visible on world map
  - **Tech:** Faction quest service
  - **Test:** Quest generation, state updates

#### 3.3 Hero Relationships & Social Features
- [ ] **Relationship Tracking**
  - Heroes track relationships (friend, rival, love, mentor)
  - Relationships are bidirectional (if you have A as ally, A sees you as ally)
  - Affect dialogue and stat bonuses in co-op
  - **Tech:** Relationship graph DB
  - **Test:** Relationship creation, stat bonuses

- [ ] **Mentorship System**
  - Veteran can mentor new player
  - Bonus XP when playing together
  - Mentor receives rewards for mentee milestones
  - **Tech:** Mentorship service
  - **Test:** Bonus application, milestone detection

- [ ] **Bloodline Heroes (Rare)**
  - Two mentors' heroes can create offspring hero
  - Generated as new unique summon inheriting visual/personality traits
  - Only available to mentors
  - **Tech:** Special summon variant, trait inheritance
  - **Test:** Bloodline hero generation, trait visibility

#### 3.4 World Chronicle & Echo Nodes
- [ ] **Event Logging System**
  - Log all major events (tower falls, hero dies, unique class unlocked)
  - Aggregate into narrative summaries (AI-written)
  - Display in world chronicle accessible to all
  - **Tech:** Chronicle service, AI summarization
  - **Test:** Event capture, summary generation

- [ ] **Echo Nodes (Cross-Player Stories)**
  - AI detects when hero from fallen tower is abandoned
  - Other players can find quest to investigate tower's history
  - Generates story about what happened (based on logs)
  - **Tech:** Echo quest generation service
  - **Test:** Quest appearance, narrative coherence

- [ ] **Server History UI**
  - Timeline view of server milestones
  - Notable deaths, wars, unique class unlocks
  - Search and filtering
  - **Tech:** Chronicle UI
  - **Test:** Usability, load performance

#### 3.5 Sprint Deliverable: Living World
- **Flow:** Summon hero → Join guild → Guild declares war → Complete faction quests → Participate in global event
- **Acceptance Criteria:**
  - Guild wars are competitive and engaging
  - Factions feel alive (visible state, active events)
  - Chronicle tells coherent server story
  - Heroes develop relationships naturally

---

## PHASE 4: ADVANCED FEATURES (Weeks 29-36) — *2 Sprints*
### Objective: Arena PvP, unique classes, cosmetics, advanced AI

#### 4.1 Arena System (Synchronized PvP)
- [ ] **Arena Match Logic**
  - 4v4 symmetrical maps
  - Real-time simultaneous combat (not turn-based pause)
  - 60-second timer per round
  - Best-of-3 rounds
  - **Tech:** Real-time combat service, WebSocket broadcast
  - **Test:** Latency handling, fairness of simultaneous actions

- [ ] **Arena Leaderboard & Ranking**
  - ELO-style ranking system
  - Seasonal resets (quarterly)
  - Rank tiers (Bronze → Gold → Platinum → Diamond)
  - **Tech:** Ranking service
  - **Test:** ELO calculation, tier promotion

- [ ] **Arena Cosmetics & Rewards**
  - Exclusive cosmetics per rank tier
  - Battle pass integration (free + premium tracks)
  - **Tech:** Cosmetic unlock logic
  - **Test:** Reward delivery, duplicate prevention

#### 4.2 Hidden & Unique Classes
- [ ] **Hidden Class Discovery**
  - Design 5-10 hidden classes with obtuse unlock conditions
  - Track player actions for trigger detection
  - Generate discovery notification when condition met
  - **Tech:** Achievement/trigger service
  - **Test:** Trigger detection, notification delivery

- [ ] **Unique Class (One-of-One Per Server)**
  - Define 3-5 unique class milestones (1000th Abyss floor clear, etc.)
  - Generate unique class with custom mechanics
  - Announce to server (hall of fame moment)
  - Apply curse (loss = permanent removal)
  - **Tech:** Unique class service, milestone tracking
  - **Test:** Milestone detection, class generation

- [ ] **Corruption Mechanics**
  - Build corruption meter in hardcore zones
  - High corruption grants power but random negatives
  - Decay over time or via purification quest
  - **Tech:** Status effect system
  - **Test:** Corruption application, effect randomization

#### 4.3 AI Personality Engine (Advanced)
- [ ] **Memory System Implementation**
  - Store structured event facts per hero
  - Efficient querying for relevant memory
  - **Tech:** MongoDB for flexible event storage
  - **Test:** Memory persistence, query performance

- [ ] **Dialogue Generation (Context-Aware)**
  - LLM receives hero memory, current mood, recent events
  - Generate contextual dialogue
  - Cache common scenarios for speed
  - **Tech:** Dialogue service with caching
  - **Test:** Dialogue relevance, generation time

- [ ] **Combat AI Behavior Trees**
  - Advanced behavior selection (tactical, cowardly, reckless)
  - Emotional state modulates strategy
  - Special combo detection (synergy between heroes)
  - **Tech:** Behavior tree engine
  - **Test:** AI decision quality, combo detection

#### 4.4 Cosmetic Shop & Monetization
- [ ] **Cosmetic Asset System**
  - Tower skins (6-10 per theme)
  - Hero skin overlays (visual only, no stat change)
  - Spell effects, UI themes, chat badges
  - Portrait frames
  - **Tech:** Cosmetic asset DB, application logic
  - **Test:** Asset loading, preview accuracy

- [ ] **Shop UI & Purchase Flow**
  - Browse cosmetics by category
  - Purchase with FC (premium currency)
  - Inventory display
  - **Tech:** Shop service, payment integration (Stripe)
  - **Test:** Purchase flow, inventory sync

- [ ] **Season Pass (Free & Premium)**
  - 50-tier pass with cosmetics + currency rewards
  - Premium track ($9.99) for additional rewards
  - AI-generated exclusive hero "memory" story
  - **Tech:** Battle pass service, tier progression
  - **Test:** Tier unlocks, pass expiry

#### 4.5 Sprint Deliverable: Complete Feature Set
- **Flow:** Arena 4v4 ranked match → Unlock hidden class → Purchase cosmetics → Enjoy cosmetic on hero in raid
- **Acceptance Criteria:**
  - Arena is lag-free and fair
  - Hidden classes feel earned
  - Cosmetics look good in all contexts

---

## PHASE 5: OPTIMIZATION & LIVE PREP (Weeks 37-40) — *1 Sprint*
### Objective: Performance, stability, launch readiness

#### 5.1 Performance Optimization
- [ ] **Backend Load Testing**
  - Simulate 1000 concurrent players
  - Identify bottlenecks in combat, raid matching, AI generation
  - Optimize database queries, add indexing
  - **Tool:** Artillery, JMeter
  - **Target:** <100ms p95 latency for all endpoints

- [ ] **Frontend Optimization**
  - Reduce bundle size (code splitting, lazy loading)
  - Optimize asset loading (sprite atlasing, LOD)
  - Profile with DevTools
  - **Target:** <3s first meaningful paint

- [ ] **AI Generation Optimization**
  - Measure hero generation latency end-to-end
  - Increase caching hit rate (pre-generate common patterns)
  - Batch image generation requests
  - **Target:** <3s 95th percentile per hero

#### 5.2 Data Integrity & Testing
- [ ] **Integration Testing**
  - Full raid flow E2E tests
  - Evolution + quest + equipment flow
  - Guild war scenario
  - **Framework:** Playwright or custom test harness
  - **Coverage:** 80% of critical paths

- [ ] **Load Test Gacha**
  - Simulate high-volume summons
  - Verify rarity distribution under load
  - **Tool:** Locust
  - **Target:** No data corruption, correct parity math

- [ ] **Chaos Engineering**
  - Failure injection: kill services, drop DB connections
  - Verify graceful degradation and recovery
  - **Tool:** Chaos Toolkit
  - **Test:** All services recover without data loss

#### 5.3 Content Safeguards
- [ ] **AI Output Filtering at Scale**
  - Deploy content filter on 10,000 generated heroes
  - Flag and review any problematic outputs
  - Tune model prompts to reduce filter hits
  - **Target:** <0.1% filter rejection rate

- [ ] **Player Reporting System**
  - Build UI for reporting inappropriate hero names/dialogues
  - Create moderation queue
  - Implement hero regeneration (new AI attempt)
  - **Tech:** Moderation service
  - **Test:** Report flow, regeneration triggering

#### 5.4 Launch Prep
- [ ] **Server Infrastructure**
  - Provision production Kubernetes cluster
  - Set up monitoring (Prometheus, Grafana)
  - Configure backup & disaster recovery
  - **Tech:** AWS/GCP Kubernetes, backup jobs

- [ ] **Documentation & Runbooks**
  - Create deployment guide
  - Incident response playbooks (service down, data corruption)
  - Scaling procedures
  - **Deliverable:** Ops wiki

- [ ] **Soft Launch Plan**
  - Launch to 500 beta testers (Week 39)
  - Run for 1 week, collect feedback
  - Fix critical issues
  - **Metrics:** Crash rate, server stability, fun engagement

---

## PHASE 6: LIVE OPS & ITERATION (Post-Launch)
### Objective: Player engagement, seasonal content, balance adjustments

#### 6.1 Day-1 Monitoring
- [ ] **Live Dashboards**
  - DAU, MAU, ARPU
  - Server health (latency, error rate)
  - Feature adoption rates
  - **Tool:** Grafana + custom dashboards

#### 6.2 Content Rollout
- [ ] **Season 1 (Week 1-4)**
  - Introduce first unique class milestone (1000 Abyss clears)
  - Drop 3 new tower themes
  - Launch limited-time banner (themed heroes)

- [ ] **Balance Patches**
  - Monitor PvP win rates
  - Nerf overpowered specializations
  - Buff underused archetypes
  - **Cadence:** Weekly small patches, monthly balance update

- [ ] **New Content (Monthly)**
  - New faction quests
  - New environmental towers (procedural generation)
  - AI-generated world events
  - **Goal:** Fresh reason to log in each month

---

## PROJECT MANAGEMENT FRAMEWORK

### Tracking & Communication
- **Kanban Board:** Jira with epics per phase, stories per sprint
- **Standups:** 15-min daily async (Slack updates) or 2x weekly sync
- **Sprint Reviews:** Friday end-of-sprint demos to stakeholders
- **Retrospectives:** 30-min team reflection on process improvements
- **Documentation:** Confluence wiki for design decisions, API docs, ops guides

### Risk Mitigation
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| AI generation too slow | Medium | High | Pre-cache common patterns, use faster models, measure latency early |
| Gacha monetization backlash | Medium | Medium | Transparent rates, no P2W mechanics, balance carefully |
| Unique balance with AI | High | High | Hard cap on evolution stats, normalizer for PvP, active balance team |
| Scope creep | High | High | Strict definition of each phase, defer "nice-to-haves" to post-launch |
| Toxic player behavior | Medium | Medium | Report system, moderation queue, swift action on abusers |

### Definition of Done (DoD)
- [ ] Code review approval (2 reviewers)
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests pass (if applicable)
- [ ] Documented in code comments & wiki
- [ ] No new console warnings/errors
- [ ] Performance impact assessed (<10% increase in latency)
- [ ] Approved by design lead (game feel OK)

---

## ESTIMATED TIMELINE & RESOURCE NEEDS

**Total Duration:** 40 weeks (~9-10 months) to soft launch

**Core Team (Minimum Viable):**
- 1 Tech Lead (architecture, performance)
- 1 Game Design Lead (mechanics, balance)
- 1 AI/ML Engineer (LLM integration, prompt engineering)
- 2 Backend Engineers (services, database)
- 2 Frontend Engineers (client, UI)
- 1 QA Engineer (testing, automation)
- **Total: 8 people**

**Contractors/Outsource:**
- Artist (character portraits, UI assets) — sprints 1-5
- Sound Designer (music, SFX) — sprints 2-6
- Community Manager (launch prep, moderation) — sprints 5-6

**Infrastructure Cost (Rough Estimates):**
- **Development (AWS/GCP):** $2-3k/month (k8s, databases, storage)
- **AI Inference (self-hosted Llama):** $1-2k/month (GPU cluster)
- **Image Generation (Stable Diffusion):** $500-1k/month (dedicated GPU)
- **Post-launch (1000 concurrent):** $5-10k/month

---

## SUCCESS METRICS (First 3 Months)

- **Retention:** >30% D1 retention, >10% D30 retention
- **Engagement:** >2 raids/day per player, >5 heroes summoned per player
- **Monetization:** >5% conversion to FC purchase, >$2 ARPU
- **Server Health:** >99.9% uptime, <100ms p95 latency
- **Content Quality:** >4/5 avg rating on hero uniqueness, >85% of AI outputs pass filter

---

## NEXT STEPS (Immediate: Weeks 1-2)

1. **Lock the team:** Confirm all 8 roles are hired or allocated
2. **Set up infrastructure:** GitHub repos, Jira, development Kubernetes cluster
3. **Start Phase 0.1:** Begin mechanic prototyping + AI pipeline PoC
4. **Weekly sync:** Schedule kickoff meeting with full team to align on vision
5. **Create sprint 1 backlog:** Detailed task breakdown for Phase 1 entry

