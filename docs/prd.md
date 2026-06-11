# PRD: Interactive System Design Learning Web App

## Problem Statement

Vibe coders — people who build software intuitively using AI tools without formal CS education — have no resource that meets them where they are. Existing system design content (books, YouTube videos, courses) targets senior engineers preparing for FAANG interviews. It assumes deep CS knowledge, uses intimidating jargon, and skips the "why does this even matter to me?" moment. Vibe coders who want to understand how their apps actually work and how to scale them have nowhere to start.

## Solution

A web-based interactive learning platform that teaches system design through story-driven scenarios anchored to the vibe coder's own journey. Lessons follow a "layers of scale" curriculum — starting from a single user and progressing to 100,000 — where each layer introduces new concepts *because the previous architecture broke*. Content is delivered through bold illustrated animations and architecture diagrams, not walls of text. The experience feels like an interactive explainer (à la Ncase.me) rather than a dev tutorial or online course.

## User Stories

1. As a vibe coder, I want to follow a linear lesson path, so that I always know what to learn next without feeling overwhelmed by choices.
2. As a vibe coder, I want lessons framed as real scenarios I recognise ("your app just went viral"), so that I understand why the concept matters before I learn it.
3. As a vibe coder, I want animated diagrams that show me what's happening inside my app, so that I can visualise abstract concepts like HTTP requests or database queries.
4. As a vibe coder, I want architecture diagrams built with nodes and edges, so that I can see how system components connect to each other.
5. As a vibe coder, I want my progress saved automatically, so that I can close the browser and resume exactly where I left off.
6. As a vibe coder, I want to see which lessons I've completed and which are upcoming, so that I feel a sense of progress and momentum.
7. As a vibe coder, I want locked lessons to be clearly signposted but not hidden, so that I can see the full learning arc ahead of me.
8. As a vibe coder, I want each lesson to have a clear "what you'll learn" summary, so that I can set expectations before diving in.
9. As a vibe coder, I want animated step-by-step reveals inside diagrams, so that I'm not bombarded with the full architecture at once.
10. As a vibe coder, I want a chapter overview page, so that I can understand where each lesson fits in the bigger story.
11. As a vibe coder, I want a "mark as complete" action at the end of each lesson, so that I'm in control of my own progress.
12. As a vibe coder, I want to revisit completed lessons freely, so that I can refresh my memory without losing my progress.
13. As a vibe coder, I want the platform to work well on my laptop, so that I can learn comfortably at my desk.
14. As a vibe coder, I want lessons to load fast, so that I'm not waiting between steps.
15. As a vibe coder, I want the visual style to feel playful and bold, not like a boring dev tutorial, so that I stay engaged and enjoy the experience.
16. As a vibe coder, I want each chapter to have a clear scale milestone ("you just hit 1,000 users"), so that I understand the real-world stakes of what I'm learning.
17. As a vibe coder, I want short, focused lessons rather than long lectures, so that I can learn in short sessions.
18. As a vibe coder, I want architecture diagrams I can pan and zoom, so that I can explore complex systems at my own pace.
19. As a vibe coder, I want to see a "you are here" indicator in the curriculum, so that I always know my position in the zero-to-hero arc.
20. As a vibe coder, I want a landing page that explains what I'll learn and who this is for, so that I feel confident the platform is right for me before I start.

## Implementation Decisions

### Content Architecture
- Each lesson is a single MDX file containing prose, metadata (title, chapter, order, scale milestone), and embedded React components for diagrams and animations.
- Lessons are organised into chapters. Chapters map to scale layers: 1 user, 10 users, 1,000 users, 10,000 users, 100,000 users, and "design it right."
- A lesson manifest (static data file) defines the ordered list of all lessons and chapters. This is the single source of truth for lesson order and chapter grouping.

### Routing
- Each lesson is accessible at a predictable URL slug derived from its chapter and lesson identifier.
- The app uses Next.js App Router with dynamic routes for lesson pages.
- Direct URL access to a locked lesson redirects to the last completed lesson (or the first lesson if no progress exists).

### Progress Module
- Progress is stored as a serialised object in local storage: a set of completed lesson IDs and the ID of the current lesson.
- The progress module exposes read and write operations only — no business logic lives in storage.
- The module is designed as an interface so a future implementation can swap local storage for a remote database (Supabase) without changing call sites.

### Animation & Diagram Components
- Framer Motion is used for all lesson-level animations: step reveals, transitions between diagram states, and scroll-triggered highlights.
- React Flow is used for architecture diagrams (node/edge graphs showing servers, databases, CDNs, load balancers, etc.).
- Diagram components accept a `step` prop that controls which nodes/edges are visible, enabling animated walkthroughs.
- Animation components are embedded directly in MDX files as named React components.

### Navigation & Progress UI
- A persistent sidebar (or top progress bar on mobile) shows chapter and lesson structure, completion state, and current position.
- A "Mark as complete" button at the bottom of each lesson advances progress to the next lesson.
- Completed lessons show a visual indicator; locked lessons are shown greyed out with a lock icon.

### Curriculum (v1 scope: 0 → 100,000 users)
- **Chapter 1 — "You Just Shipped"** (1 user): HTTP cycle, frontend/backend/database trio, how a vibe-coded app works under the hood.
- **Chapter 2 — "10 Friends Use It"** (10 users): APIs, client-server architecture, environment variables.
- **Chapter 3 — "It Goes Viral"** (1,000 users): What breaks first, server limits, database bottlenecks, reading error logs.
- **Chapter 4 — "You Fix It"** (10,000 users): Caching, CDN, database indexing, async operations.
- **Chapter 5 — "You Scale It"** (100,000 users): Load balancers, horizontal vs vertical scaling, message queues, stateless servers.
- **Chapter 6 — "You Design It Right"**: System design principles, architecture diagrams, trade-offs (SQL vs NoSQL, consistency vs availability).

## Testing Decisions

### What makes a good test
Tests should verify external behaviour observable by a user or another module — not implementation details like internal state shape or component internals. A test should remain valid through refactors that don't change behaviour.

### Seams to test

**1. Lesson progression**
- Given the lesson manifest, navigating "next" from any lesson returns the correct following lesson in chapter order.
- Navigating "next" from the last lesson in a chapter returns the first lesson of the next chapter.
- Navigating "next" from the final lesson returns null (end of curriculum).

**2. Progress persistence**
- Completing a lesson writes its ID to local storage.
- On initialisation, the progress module correctly reads and deserialises state from local storage.
- Completing a lesson that was already completed does not corrupt progress state.
- Clearing progress resets to the first lesson.

**3. MDX content rendering**
- A lesson page renders without errors given a valid MDX file.
- Embedded diagram components receive their props and mount without throwing.

**4. Lesson gating**
- Accessing a locked lesson URL redirects to the correct fallback lesson.
- Accessing a completed or current lesson URL renders the lesson without redirect.

### Prior art
No existing tests in the codebase yet — these will be the first. Use Vitest for unit tests (progress module, lesson manifest navigation logic) and Playwright for end-to-end tests (lesson gating, progress persistence across page reloads).

## Out of Scope

- User authentication and accounts (planned for v2).
- Cross-device progress sync (requires auth — v2).
- Drag-and-drop architecture builder (planned for v2 milestone moments).
- Curriculum beyond 100,000 users: sharding, microservices, distributed systems.
- Mobile-first layout optimisation (desktop is primary target for v1).
- Community features: sharing diagrams, comments, forums.
- Certificates of completion.
- Video content.
- Internationalisation / translations.

## Further Notes

- The visual tone should feel like Ncase.me or Pudding.cool — bold, illustrated, playful — not a dev documentation site or Udemy course. This is the strongest product differentiator.
- "Vibe coder" is the domain term for the target user throughout the codebase and content.
- The progress abstraction boundary (local storage today, Supabase later) is the most important architectural seam to get right in v1. Don't let progress logic leak into UI components.
- Content authoring in MDX means non-engineers can contribute lessons via pull requests without touching React code, which is valuable for scaling content in v2.
