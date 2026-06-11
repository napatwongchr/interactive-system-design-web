# Interactive System Design Web App — Blueprint

## Overview

An interactive web learning platform about system design for non-tech people who have vibe coding experience but no CS fundamentals. The goal is to teach them how apps work and how to design software that scales — using visual storytelling, animations, and diagrams.

**Target audience:** Vibe coders with no CS background who want to understand what's happening under the hood and how to scale their apps.

---

## Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Format | Linear lessons | Beginners need structure, not free exploration |
| Content style | Story-driven scenarios | Anchored to relatable vibe coder moments |
| Diagrams | Static illustrated animations | Cheaper to build, still highly visual |
| Animation libraries | Framer Motion + React Flow | Framer for transitions/reveals, React Flow for architecture graphs |
| Stack | Next.js + React | Familiar to vibe coders, easy Vercel deploy |
| Content management | MDX files | Markdown ease + embedded React components |
| Progress tracking | Local storage (auth later) | Ship fast, add Supabase auth in v2 |
| Visual style | Interactive explainer | Bold, playful, storytelling-first (like Ncase.me / Pudding.cool) |
| Curriculum structure | Layers of scale | Maps to the vibe coder's natural journey |
| v1 scope | 0 → 100,000 users | Covers 95% of real needs; 1M+ is v2 |

---

## Tech Stack

- **Framework:** Next.js + React
- **Animations:** Framer Motion (transitions, step reveals, highlights)
- **Architecture diagrams:** React Flow (node/edge graphs)
- **Content:** MDX files (one file per lesson)
- **Progress:** Local storage
- **Deployment:** Vercel

---

## Curriculum Arc

### Chapter 1 — "You Just Shipped"
**Scale: 1 user (you)**
- What is an app?
- HTTP request/response cycle
- Frontend, backend, database — the basic trio
- How your vibe-coded app actually works under the hood

### Chapter 2 — "10 Friends Use It"
**Scale: 10 users**
- Why APIs exist
- What happens when someone else hits your app
- Basic client-server architecture diagram
- Introduction to environment variables and secrets

### Chapter 3 — "It Goes Viral"
**Scale: 1,000 users**
- What breaks first and why
- Server CPU/memory limits
- Database bottlenecks — why slow queries kill your app
- Reading error logs for the first time

### Chapter 4 — "You Fix It"
**Scale: 10,000 users**
- Caching — what it is and why it's magical
- CDN — serving static assets from the edge
- Database indexing — the single biggest quick win
- Async operations — stop making users wait

### Chapter 5 — "You Scale It"
**Scale: 100,000 users**
- Load balancers — spreading the work
- Horizontal vs vertical scaling
- Message queues — decoupling your system
- Stateless servers — why it matters

### Chapter 6 — "You Design It Right"
**Scale: thinking beyond today**
- System design principles
- Reading and drawing architecture diagrams
- Trade-offs: consistency vs availability, SQL vs NoSQL
- How to think about scale before you need it

---

## Design Direction

- **Style:** Interactive explainer — bold illustrations, playful animations, storytelling-first
- **Inspiration:** Ncase.me, Pudding.cool
- **Not:** Another dark-mode dev tutorial or Udemy-style course
- **Tone:** Friendly, non-intimidating, celebrates the vibe coder's existing intuition

---

## Future (v2+)

- User auth + cross-device progress sync (Supabase)
- Hands-on drag-and-drop architecture builder at chapter milestones
- Curriculum expansion to 1,000,000 users (sharding, microservices, distributed systems)
- Community: share your architecture diagrams
