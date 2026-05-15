# Infinite Towers Online - Team Structure & Resource Plan

---

## TEAM COMPOSITION (Minimum Viable: 8 Core + Support)

### CORE TEAM

#### 1. **Tech Lead / Engineering Manager**
**Reports to:** Project Manager / Producer
**Responsibilities:**
- Overall technical architecture and decisions
- Code review quality & standards enforcement
- Performance optimization & scalability planning
- DevOps & deployment pipeline management
- Technical mentorship & knowledge sharing
- Sprint planning & velocity tracking

**Required Skills:**
- 7+ years backend/full-stack development
- Kubernetes & microservices architecture
- PostgreSQL optimization
- Team leadership experience
- Game backend preferred (but not required)

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Architecture doc, code review, deployment runbooks

---

#### 2. **Game Design Lead**
**Reports to:** Creative Director / Producer
**Responsibilities:**
- Mechanics design & balance framework
- Economy tuning (resource generation, sink points)
- Hero class design & evolution trees
- Quest/narrative structure design
- Live ops strategy (seasons, events, battle pass)
- Feature prioritization & design doc writing

**Required Skills:**
- 5+ years game design (RPG/strategy preferred)
- Spreadsheet proficiency (Excel, Google Sheets)
- Balance expertise (PvP, progression)
- Writing & communication skills
- Live ops experience

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Balance docs, design specs, live ops calendar

---

#### 3. **AI / ML Engineer**
**Reports to:** Tech Lead
**Responsibilities:**
- LLM integration & prompt engineering
- Fine-tuning models for consistency
- Image generation pipeline optimization
- Content filtering system design
- Cost analysis & vendor selection
- Monitoring & safety guardrails

**Required Skills:**
- 3+ years ML/AI (LLM experience critical)
- Prompt engineering expertise
- API integration (Anthropic, OpenAI, Replicate)
- Python proficiency
- Distributed systems knowledge (queues, caching)

**Time Allocation:** 100% (full-time)
**Key Deliverables:** AI pipeline, content filter, cost reports

---

#### 4. **Backend Lead (Services Architecture)**
**Reports to:** Tech Lead
**Responsibilities:**
- Microservice design & implementation
- Database schema design & migrations
- API specification & contract management
- Service-to-service communication patterns
- Caching strategy & Redis optimization
- Third-party integrations (Stripe, etc.)

**Required Skills:**
- 6+ years backend development
- Microservices architecture
- Database design (PostgreSQL)
- API design (REST, OpenAPI)
- System design interviews level

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Service implementations, API specs, database schema

---

#### 5. **Backend Engineer #2 (Services)**
**Reports to:** Backend Lead
**Responsibilities:**
- Implement assigned microservices (combat, gacha, monetization, etc.)
- Unit & integration testing
- Database query optimization
- Redis cache implementation
- Follow architectural patterns set by Backend Lead

**Required Skills:**
- 4+ years backend development
- Node.js / TypeScript proficiency
- Testing frameworks (Jest, pytest)
- Database query optimization
- Learning orientation

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Service implementations, test coverage, documentation

---

#### 6. **Frontend Lead (Game Client)**
**Reports to:** Tech Lead
**Responsibilities:**
- Client architecture & state management
- UI/UX implementation
- 3D/2D rendering pipeline
- Network synchronization (WebSockets)
- Performance profiling & optimization
- Cross-platform compatibility (Web, Mobile, Desktop)

**Required Skills:**
- 5+ years game development or 3D/2D graphics
- Unity or custom engine experience
- WebGL & shader knowledge (bonus)
- UI/UX design principles
- Networking (TCP/IP, WebSockets)

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Client architecture, UI implementation, performance reports

---

#### 7. **Frontend Engineer #2 (Game Client)**
**Reports to:** Frontend Lead
**Responsibilities:**
- Implement game scenes (summon, tower, raid, arena)
- UI components & menus
- Asset integration & optimization
- Multiplayer synchronization
- Mobile platform support
- Follow frontend patterns set by Lead

**Required Skills:**
- 3+ years game development or frontend
- Unity / Phaser / game engine experience
- TypeScript or C#
- UI implementation
- Learning orientation

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Game scenes, UI screens, test coverage

---

#### 8. **QA / Test Automation Engineer**
**Reports to:** Tech Lead
**Responsibilities:**
- Test automation framework setup & maintenance
- E2E test creation for critical paths
- Performance testing & benchmarking
- Bug triage & reproduction
- Test coverage reporting
- Manual testing of new features

**Required Skills:**
- 3+ years QA automation
- Playwright / Cypress / Selenium
- Performance testing tools (Artillery, JMeter)
- SQL for database validation
- Communication skills (clear bug reports)

**Time Allocation:** 100% (full-time)
**Key Deliverables:** Test automation, performance reports, bug tracking

---

### SUPPORT ROLES (Contractors / Part-time)

#### 9. **Character Artist** (Part-time: 20 hrs/week)
**Focus:** Phase 1-5
**Deliverables:**
- Hero portrait templates (20+ style variations)
- Character sprite sheets (isometric perspective)
- UI icons & assets
- Tower theme visual assets

**Expected Cost:** $80-120/hr (based on skill level)

---

#### 10. **Sound Designer / Composer** (Part-time: 15 hrs/week)
**Focus:** Phase 2-6
**Deliverables:**
- Background music tracks (6-8 per world/theme)
- Combat SFX library
- UI feedback sounds
- Voice acting direction (optional)

**Expected Cost:** $60-100/hr

---

#### 11. **Community Manager** (Part-time: 15 hrs/week)
**Focus:** Phase 5-6 (launch prep)
**Deliverables:**
- Discord/community setup
- Content moderation
- Player feedback collection
- Patch notes & communication

**Expected Cost:** $40-60/hr

---

#### 12. **DevOps / Infrastructure** (Part-time: 10 hrs/week)
**Focus:** Phase 2-6 (as infrastructure grows)
**Deliverables:**
- Kubernetes cluster management
- Monitoring & alerting setup
- Backup & disaster recovery
- Cost optimization

**Expected Cost:** $100-150/hr

---

## ORGANIZATION CHART

```
                        Project Producer
                              |
                ______________|______________
               |              |              |
          Tech Lead      Game Design Lead  Creative Director
          (8-person core)     (solo)       (contractor oversight)
               |
    ___________|_________________________
    |         |         |        |       |
  Backend  Backend   Frontend  Frontend  QA
  Lead     Eng #2     Lead      Eng #2   Eng
    |
    |---> AI/ML Eng
           (reports here for
            technical guidance)
```

---

## PHASE-BY-PHASE RESOURCE ALLOCATION

### PHASE 0 (Weeks 1-4): Pre-Production
**Core Team:** 8 engineers
**Support:** Artist (5 hrs/week for concept art)
**Focus:** Prototyping, infrastructure, zero external dependencies

| Role | % Allocation | Tasks |
|------|--------------|-------|
| Tech Lead | 100% | Arch design, setup, code review |
| Backend Lead | 100% | Service design, tower system |
| Backend Eng #2 | 100% | Combat engine, gacha system |
| Frontend Lead | 100% | Engine selection, scene prototyping |
| Frontend Eng #2 | 100% | Tower UI, raid UI mockups |
| Game Design Lead | 100% | Balance framework, class design |
| AI/ML Eng | 100% | LLM integration, hero gen |
| QA Eng | 100% | Test framework, E2E tests |

**Budget:** $480k/month (8 engineers × $60k/month avg)

---

### PHASE 1-2 (Weeks 5-20): Foundation + Core Gameplay
**Core Team:** 8 engineers
**Support:** Artist (25 hrs/week), Sound (10 hrs/week)
**Focus:** Full vertical slice, API implementation, hero progression

| Role | % Allocation | Tasks |
|------|--------------|-------|
| Tech Lead | 80% | Architecture oversight, performance |
| Backend Lead | 100% | Hero, quest, social services |
| Backend Eng #2 | 100% | Combat, tower, matchmaking |
| Frontend Lead | 100% | Hero progression UI, raid combat |
| Frontend Eng #2 | 100% | Tower editor, arena, settings |
| Game Design Lead | 100% | Balance tuning, live testing |
| AI/ML Eng | 80% | Image gen optimization, filtering |
| QA Eng | 100% | Regression testing, performance |

**Support Budget:**
- Artist: $2k/week = $8k/month
- Sound: $800/week = $3.2k/month

**Total Budget:** $480k + $11.2k = $491.2k/month

---

### PHASE 3-4 (Weeks 21-36): Social + Advanced Features
**Core Team:** 8 engineers
**Support:** Artist (15 hrs/week), Sound (20 hrs/week), DevOps (5 hrs/week)
**Focus:** Guilds, factions, arena, monetization

| Role | % Allocation | Tasks |
|------|--------------|-------|
| Tech Lead | 70% | Performance tuning, scaling |
| Backend Lead | 100% | Guild, world, monetization services |
| Backend Eng #2 | 100% | Faction AI, matchmaking, analytics |
| Frontend Lead | 100% | Arena UI, cosmetics, settings |
| Frontend Eng #2 | 100% | Guild interface, marketplace |
| Game Design Lead | 100% | Season 1 design, event calendar |
| AI/ML Eng | 60% | Dialogue caching, model optimization |
| QA Eng | 100% | PvP testing, combat balance |

**Support Budget:**
- Artist: $1.2k/week = $4.8k/month
- Sound: $1.6k/week = $6.4k/month
- DevOps: $500/week = $2k/month

**Total Budget:** $480k + $13.2k = $493.2k/month

---

### PHASE 5 (Weeks 37-40): Optimization & Launch Prep
**Core Team:** 8 engineers
**Support:** Artist (20 hrs/week), Sound (25 hrs/week), DevOps (10 hrs/week), CM (10 hrs/week)
**Focus:** Performance, stability, content moderation, launch

| Role | % Allocation | Tasks |
|------|--------------|-------|
| Tech Lead | 100% | Production deployment, monitoring |
| Backend Lead | 90% | Services hardening, scaling |
| Backend Eng #2 | 100% | Load testing, optimization |
| Frontend Lead | 90% | Performance profiling, optimization |
| Frontend Eng #2 | 100% | Polish, bug fixes, stability |
| Game Design Lead | 100% | Balance adjustments, Season 1 ready |
| AI/ML Eng | 50% | Content filter tuning, latency checks |
| QA Eng | 100% | Regression, load testing, sign-off |

**Support Budget:**
- Artist: $1.6k/week = $6.4k/month
- Sound: $2k/week = $8k/month
- DevOps: $1k/week = $4k/month
- CM: $400/week = $1.6k/month

**Total Budget:** $480k + $20k = $500k/month

---

### PHASE 6 (Post-Launch): Live Ops & Iteration
**Core Team:** 8 engineers (sustain 50%), 2 new hires (live ops)
**Support:** Artist (15 hrs/week), Sound (20 hrs/week), CM (30 hrs/week), DevOps (20 hrs/week)
**Focus:** Season content, balance, community, monitoring

| Role | % Allocation | Tasks |
|------|--------------|-------|
| Tech Lead | 40% | Strategic direction, hiring |
| Backend Lead | 50% | Service maintenance, live ops |
| Backend Eng #2 | 50% | Content server (events, items) |
| Frontend Lead | 40% | Technical debt, new features |
| Frontend Eng #2 | 50% | Live ops features (battle pass, events) |
| Game Design Lead | 100% | Season design, content calendar |
| AI/ML Eng | 30% | Hero gen optimization |
| QA Eng | 60% | Live regression, hot-fix testing |
| **Live Ops Lead** | **100%** | **New hire: event design, content** |
| **Community Lead** | **100%** | **New hire: moderation, player engagement** |

**Support Budget:**
- Artist: $1.2k/week = $4.8k/month
- Sound: $1.6k/week = $6.4k/month
- CM (full-time): $50k/month
- DevOps: $2k/week = $8k/month

**Total Budget:** $480k (core, 50%) + $200k (2 new hires) + $69.2k (support) = $749.2k/month

---

## HIRING TIMELINE & ONBOARDING

### **Before Week 1:**
- [ ] Tech Lead & Game Design Lead hired
- [ ] Backend Lead & Frontend Lead hired
- [ ] AI/ML Eng & QA Eng hired
- [ ] 2x Backend/Frontend Engineers hired

**Week 0 (Setup):**
- Onboarding docs prepared
- Dev environment scripts ready
- First team sync (3 hours): Vision, architecture, sprint planning

### **End of Phase 0 (Week 4):**
- Team is productive (shipping code daily)
- No major onboarding blockers
- Ready for Phase 1 acceleration

### **Mid-Phase 2 (Week 15):**
- Hire part-time Artist (if not already)
- Hire Sound Designer
- Establish working relationship

### **End of Phase 4 (Week 36):**
- Hire DevOps contractor (if not already)
- Hire Community Manager
- Launch prep acceleration

### **Pre-Launch (Week 40):**
- Deploy live ops team
- Finalize moderation processes

---

## COMPENSATION & BUDGET

### **Senior Engineers (Tech Lead, Game Design Lead, Backend/Frontend Leads)**
- Base: $120-150k/year
- Bonus (performance): 10-20% of base
- Equity: 0.5-1% (if startup)
- Benefits: Full health, 401k, unlimited PTO

### **Mid-Level Engineers (Backend/Frontend Engineers #2, AI/ML, QA)**
- Base: $90-120k/year
- Bonus: 10-15%
- Equity: 0.25-0.5%
- Benefits: Full health, 401k, unlimited PTO

### **Part-Time Contractors**
- Artist: $100/hr × 20 hrs/week = $8k/month
- Sound: $80/hr × 15 hrs/week = $4.8k/month
- DevOps: $120/hr × 10 hrs/week = $4.8k/month
- Community Manager: $50/hr × 15 hrs/week = $3k/month (pre-launch)

### **Total Fully Loaded Cost (40-week development)**

```
Phase 0 (4 weeks):    $480k × 1 month = $480k
Phase 1-2 (16 weeks): $491.2k × 4 months = $1,964.8k
Phase 3-4 (16 weeks): $493.2k × 4 months = $1,972.8k
Phase 5 (4 weeks):    $500k × 1 month = $500k
────────────────────────────────────────────
SUBTOTAL (dev team):                    $4,917.6k

Infrastructure (servers, storage, etc):  $180k (est.)
AI/LLM compute (inference):              $80k (est.)
Third-party services (Stripe, etc):      $20k (est.)
────────────────────────────────────────────
TOTAL (soft launch):                    ~$5.2M
```

---

## COMMUNICATION & COLLABORATION TOOLS

### **Required:**
- **Slack:** Daily standups, announcements (#general, #dev, #design, #infra)
- **Jira / Linear:** Sprint planning, issue tracking, backlog management
- **GitHub:** Code review, CI/CD, wiki (documentation)
- **Confluence / Notion:** Design docs, meeting notes, runbooks
- **Zoom / Google Meet:** Sync meetings (weekly standup, sprint review)
- **Figma:** UI/UX mockups (Frontend Lead, Designer)
- **Google Sheets:** Balance spreadsheets (Design Lead, Tech Lead)

### **Sync Meeting Schedule:**
- **Daily standup:** 15 min, async (Slack updates) or 2x weekly sync (9am PDT)
- **Weekly tech sync:** Friday 2pm, 30 min (Tech Lead + all engineers)
- **Sprint planning:** Monday 10am, 1 hour (start of each 2-week sprint)
- **Sprint review:** Friday 4pm, 45 min (demo + feedback)
- **Retrospective:** Friday 4:45pm, 30 min (process improvements)
- **All-hands:** Bi-weekly, 1 hour (producer, leads, team)

### **Documentation Standards:**
- Every service has a README explaining purpose, APIs, data model
- API docs auto-generated from OpenAPI specs
- Design decisions logged in ADR (Architecture Decision Records)
- Runbooks for common operational tasks
- Weekly progress reports (what shipped, blockers, risks)

---

## PERFORMANCE METRICS & KPIs (Team Level)

### **Velocity & Delivery:**
- Sprint velocity (points completed per sprint) — target 80-100 by sprint 3
- On-time delivery (% of stories completed by sprint end) — target 90%+
- Code review cycle time — target <24 hours
- Bug escape rate (bugs found in production) — target <1%

### **Quality:**
- Test coverage (% of code with tests) — target >80%
- Automated test pass rate — target >95%
- Code quality score (linting, complexity) — target A
- Performance latency (p95 API response time) — target <200ms

### **Team Health:**
- Sprint retrospective action items completion — target 80%
- Knowledge sharing (pair programming sessions) — 1-2x per week
- Documentation completion — 100% of features documented
- Team satisfaction (monthly survey) — target 4/5 or higher

---

## CONTINGENCY PLANNING

### **If a critical engineer leaves mid-project:**

**Scenario 1: Backend Lead leaves**
- Promote Backend Engineer #2 (requires 2-week transition)
- Hire backfill ASAP (contract basis for 4 weeks)
- Redistribute workload temporarily (others absorb 10-20% overload)

**Scenario 2: Frontend Lead leaves**
- Promote Frontend Engineer #2 + hire contractor lead
- Redistribute UI implementation work

**Scenario 3: Tech Lead leaves**
- Backend Lead + Frontend Lead co-lead architecture decisions
- Hire replacement lead (critical role, search begins immediately)

**Risk Mitigation:**
- Knowledge sharing & documentation (no single points of failure)
- Cross-training (each service has 2+ people who understand it)
- Competitive compensation to reduce attrition risk

---

## SUCCESS CRITERIA (Team Organization)

✅ All core roles filled by Week 0
✅ Onboarding completed within 2 weeks (productive by Week 3)
✅ Zero critical dependencies on any single person
✅ Velocity increasing sprint-over-sprint (sprint 1 ≈ 50pts, sprint 8 ≈ 100pts)
✅ Team morale high (survey >4/5, low turnover)
✅ Code quality maintained (no quality debt accumulation)

