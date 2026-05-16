# Infinite Towers Online (ITO) — Phase 0 Prototype

**Infinite Towers Online** is a dark fantasy MMORPG prototype with a stylized terminal aesthetic. This Phase 0 prototype implements the core gameplay loop: summoning heroes, building tower defenses, raiding enemy spires, and evolving your champions.

![Project Preview](https://via.placeholder.com/1200x600?text=Infinite+Towers+Online+Terminal+Interface)

## 🌌 Core Features

### 1. The Summoning Circle (Gacha)
- **Procedural Heroes**: Millions of possible name/epithet combinations.
- **Lore Generation**: Each hero has a unique backstory based on their archetype and faction.
- **Rarity System**: Common to Ascendant tiers with specific visual glows and animations.
- **Pity System**: Incremental "Thread Resonance" guarantees higher rarity draws.

### 2. Tower Architect
- **Grid-Based Builder**: Place rooms (Guard Posts, Vaults, Ritual Chambers, Boss Lairs).
- **Defender Assignment**: Assign specific heroes from your roster to defend rooms.
- **DP Budget**: Manage your Defense Point budget to build a formidable spire.

### 3. Combat & Raids
- **Multi-Room Raids**: Fight through multiple rooms of increasing difficulty.
- **Tactical Combat**: Turn-based battles with status effects (Burn, Shield, Stun).
- **Archetype Skills**: Every hero has unique skills tailored to their class (Warden, Pyromancer, etc.).
- **Loot & Rewards**: Gain XP, Gold, and improve hero Morale upon victory.

### 4. Hero Evolution
- **Ascension Paths**: Branching paths to upgrade heroes once they reach level 3.
- **Stat Growth**: Precise control over hero scaling through chosen paths.
- **Lineage History**: Track your hero's entire journey from summon to ascension.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, Zustand.
- **Backend**: NestJS (API scaffold), Prisma (ORM), Postgres.
- **Styling**: Vanilla CSS variables with Tailwind utilities for a consistent dark terminal aesthetic.
- **Typography**: Cinzel, Crimson Text, and JetBrains Mono for a "Dark Fantasy Terminal" feel.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# Install dependencies for all workspaces
npm install
```

### Development
```bash
# Run frontend and backend concurrently
npm run dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:4000](http://localhost:4000)

## 📱 Mobile Support
ITO is designed with a "Mobile-First" terminal UI. A persistent bottom navigation bar is active on smaller screens, and all grid-based systems (Tower/Combat) scale gracefully.

---

*Infinite Towers Online — Built with Fate Threads and Void Arcana.*
