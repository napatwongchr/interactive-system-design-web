import { getNextLesson, lessons } from './manifest'

const STORAGE_KEY = 'system-design-progress'
const FIRST_LESSON_ID = lessons[0].id

export interface Progress {
  completedLessons: string[]
  currentLessonId: string
}

export interface ProgressStore {
  getProgress(): Progress
  completeLesson(lessonId: string): void
  getCurrentLesson(): string
  clearProgress(): void
}

function defaultProgress(): Progress {
  return { completedLessons: [], currentLessonId: FIRST_LESSON_ID }
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw)
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      currentLessonId: parsed.currentLessonId ?? FIRST_LESSON_ID,
    }
  } catch {
    return defaultProgress()
  }
}

function save(p: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function createLocalStorageProgress(): ProgressStore {
  return {
    getProgress(): Progress {
      return load()
    },

    completeLesson(lessonId: string): void {
      const p = load()
      if (!p.completedLessons.includes(lessonId)) {
        p.completedLessons = [...p.completedLessons, lessonId]
        // only advance current lesson if this is the lesson the user is on
        if (p.currentLessonId === lessonId) {
          const next = getNextLesson(lessonId)
          if (next) p.currentLessonId = next.id
        }
        save(p)
      }
    },

    getCurrentLesson(): string {
      return load().currentLessonId
    },

    clearProgress(): void {
      localStorage.removeItem(STORAGE_KEY)
    },
  }
}
