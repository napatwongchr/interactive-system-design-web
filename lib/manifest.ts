export interface Lesson {
  id: string
  title: string
  chapterId: string
  order: number
  scaleMilestone: string
  summary: string
}

export interface Chapter {
  id: string
  title: string
  scaleMilestone: string
  order: number
}

export const chapters: Chapter[] = [
  { id: 'chapter-1', title: 'You Just Shipped', scaleMilestone: '1 user', order: 1 },
  { id: 'chapter-2', title: '10 Friends Use It', scaleMilestone: '10 users', order: 2 },
  { id: 'chapter-3', title: 'It Goes Viral', scaleMilestone: '1,000 users', order: 3 },
  { id: 'chapter-4', title: 'You Fix It', scaleMilestone: '10,000 users', order: 4 },
  { id: 'chapter-5', title: 'You Scale It', scaleMilestone: '100,000 users', order: 5 },
  { id: 'chapter-6', title: 'You Design It Right', scaleMilestone: 'Design it right', order: 6 },
]

export const lessons: Lesson[] = [
  // Chapter 1 — You Just Shipped (1 user)
  {
    id: 'http-cycle',
    title: 'The HTTP Cycle',
    chapterId: 'chapter-1',
    order: 1,
    scaleMilestone: '1 user',
    summary: 'Follow a single request from your browser to the server and back.',
  },
  {
    id: 'three-layers',
    title: "Your App's Three Layers",
    chapterId: 'chapter-1',
    order: 2,
    scaleMilestone: '1 user',
    summary: 'Understand how frontend, backend, and database work together.',
  },
  {
    id: 'how-it-works',
    title: 'How Your Vibe-Coded App Works Under the Hood',
    chapterId: 'chapter-1',
    order: 3,
    scaleMilestone: '1 user',
    summary: 'Map your AI-generated code to the real systems running it.',
  },

  // Chapter 2 — 10 Friends Use It (10 users)
  {
    id: 'what-is-api',
    title: 'What Is an API?',
    chapterId: 'chapter-2',
    order: 1,
    scaleMilestone: '10 users',
    summary: 'Learn why your app needs a structured interface for its data.',
  },
  {
    id: 'client-server',
    title: 'Client-Server Architecture',
    chapterId: 'chapter-2',
    order: 2,
    scaleMilestone: '10 users',
    summary: 'See how multiple clients share a single server.',
  },
  {
    id: 'env-variables',
    title: 'Environment Variables and Config',
    chapterId: 'chapter-2',
    order: 3,
    scaleMilestone: '10 users',
    summary: 'Keep secrets safe and manage config across environments.',
  },

  // Chapter 3 — It Goes Viral (1,000 users)
  {
    id: 'what-breaks-first',
    title: 'What Breaks First',
    chapterId: 'chapter-3',
    order: 1,
    scaleMilestone: '1,000 users',
    summary: 'Diagnose the first failure modes when traffic spikes.',
  },
  {
    id: 'server-limits',
    title: 'Server Limits',
    chapterId: 'chapter-3',
    order: 2,
    scaleMilestone: '1,000 users',
    summary: 'Understand CPU, memory, and connection limits.',
  },
  {
    id: 'database-bottlenecks',
    title: 'Database Bottlenecks',
    chapterId: 'chapter-3',
    order: 3,
    scaleMilestone: '1,000 users',
    summary: 'See why the database is usually the first thing that breaks.',
  },
  {
    id: 'reading-error-logs',
    title: 'Reading Error Logs',
    chapterId: 'chapter-3',
    order: 4,
    scaleMilestone: '1,000 users',
    summary: 'Turn cryptic logs into a clear picture of what went wrong.',
  },

  // Chapter 4 — You Fix It (10,000 users)
  {
    id: 'caching',
    title: 'Caching',
    chapterId: 'chapter-4',
    order: 1,
    scaleMilestone: '10,000 users',
    summary: "Store expensive results so you don't recompute them.",
  },
  {
    id: 'cdn',
    title: 'CDN',
    chapterId: 'chapter-4',
    order: 2,
    scaleMilestone: '10,000 users',
    summary: 'Serve static assets from servers close to your users.',
  },
  {
    id: 'database-indexing',
    title: 'Database Indexing',
    chapterId: 'chapter-4',
    order: 3,
    scaleMilestone: '10,000 users',
    summary: 'Speed up queries by building the right indexes.',
  },
  {
    id: 'async-operations',
    title: 'Async Operations',
    chapterId: 'chapter-4',
    order: 4,
    scaleMilestone: '10,000 users',
    summary: 'Move slow tasks off the request path with background jobs.',
  },

  // Chapter 5 — You Scale It (100,000 users)
  {
    id: 'load-balancers',
    title: 'Load Balancers',
    chapterId: 'chapter-5',
    order: 1,
    scaleMilestone: '100,000 users',
    summary: 'Distribute traffic across multiple servers.',
  },
  {
    id: 'scaling-strategies',
    title: 'Horizontal vs Vertical Scaling',
    chapterId: 'chapter-5',
    order: 2,
    scaleMilestone: '100,000 users',
    summary: 'Choose between bigger machines and more machines.',
  },
  {
    id: 'message-queues',
    title: 'Message Queues',
    chapterId: 'chapter-5',
    order: 3,
    scaleMilestone: '100,000 users',
    summary: 'Decouple services and absorb traffic bursts with queues.',
  },
  {
    id: 'stateless-servers',
    title: 'Stateless Servers',
    chapterId: 'chapter-5',
    order: 4,
    scaleMilestone: '100,000 users',
    summary: 'Design servers that can be added or removed without ceremony.',
  },

  // Chapter 6 — You Design It Right
  {
    id: 'design-principles',
    title: 'System Design Principles',
    chapterId: 'chapter-6',
    order: 1,
    scaleMilestone: 'Design it right',
    summary: 'The core mental models behind every scalable system.',
  },
  {
    id: 'architecture-diagrams',
    title: 'Drawing Architecture Diagrams',
    chapterId: 'chapter-6',
    order: 2,
    scaleMilestone: 'Design it right',
    summary: 'Learn the visual language of system design.',
  },
  {
    id: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    chapterId: 'chapter-6',
    order: 3,
    scaleMilestone: 'Design it right',
    summary: 'Choose the right database for the job.',
  },
  {
    id: 'consistency-vs-availability',
    title: 'Consistency vs Availability',
    chapterId: 'chapter-6',
    order: 4,
    scaleMilestone: 'Design it right',
    summary: 'Understand the CAP theorem trade-off in plain language.',
  },
]

// Lessons sorted in full curriculum order (used by navigation functions)
const sortedLessons: Lesson[] = [...lessons].sort((a, b) => {
  if (a.chapterId !== b.chapterId) return a.chapterId.localeCompare(b.chapterId)
  return a.order - b.order
})

export function getNextLesson(lessonId: string): Lesson | null {
  const idx = sortedLessons.findIndex((l) => l.id === lessonId)
  if (idx === -1 || idx >= sortedLessons.length - 1) return null
  return sortedLessons[idx + 1]
}

export function getPreviousLesson(lessonId: string): Lesson | null {
  const idx = sortedLessons.findIndex((l) => l.id === lessonId)
  if (idx === -1 || idx === 0) return null
  return sortedLessons[idx - 1]
}

export function getLessonsByChapter(chapterId: string): Lesson[] {
  return lessons.filter((l) => l.chapterId === chapterId).sort((a, b) => a.order - b.order)
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
