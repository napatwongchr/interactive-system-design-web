import { beforeEach, describe, expect, test } from 'vitest'
import { createLocalStorageProgress } from '../lib/progress'
import { lessons } from '../lib/manifest'

const firstLessonId = lessons[0].id

beforeEach(() => {
  localStorage.clear()
})

describe('getProgress', () => {
  test('returns empty completed set and first lesson when no state stored', () => {
    const store = createLocalStorageProgress()
    const p = store.getProgress()
    expect(p.completedLessons).toEqual([])
    expect(p.currentLessonId).toBe(firstLessonId)
  })

  test('deserialises persisted state from local storage', () => {
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
    )
    const store = createLocalStorageProgress()
    const p = store.getProgress()
    expect(p.completedLessons).toContain('http-cycle')
    expect(p.currentLessonId).toBe('three-layers')
  })
})

describe('getCurrentLesson', () => {
  test('returns the first lesson when nothing is persisted', () => {
    const store = createLocalStorageProgress()
    expect(store.getCurrentLesson()).toBe(firstLessonId)
  })

  test('returns the persisted current lesson', () => {
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: [], currentLessonId: 'client-server' }),
    )
    const store = createLocalStorageProgress()
    expect(store.getCurrentLesson()).toBe('client-server')
  })
})

describe('completeLesson', () => {
  test('adds lesson to completed set', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    expect(store.getProgress().completedLessons).toContain(firstLessonId)
  })

  test('advances currentLessonId to the next lesson', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    // http-cycle is order-1, three-layers is order-2 in chapter-1
    expect(store.getCurrentLesson()).toBe('three-layers')
  })

  test('completing an already-completed lesson does not corrupt state', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    const afterFirst = store.getProgress()
    // complete the same lesson again
    store.completeLesson(firstLessonId)
    const afterSecond = store.getProgress()
    // completed list should not grow
    const count = afterSecond.completedLessons.filter((id) => id === firstLessonId).length
    expect(count).toBe(1)
    // current lesson should not regress
    expect(afterSecond.currentLessonId).toBe(afterFirst.currentLessonId)
  })

  test('completing the last lesson does not change currentLessonId', () => {
    const lastLesson = lessons[lessons.length - 1]
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: [], currentLessonId: lastLesson.id }),
    )
    const store = createLocalStorageProgress()
    store.completeLesson(lastLesson.id)
    expect(store.getCurrentLesson()).toBe(lastLesson.id)
  })

  test('persists state to local storage', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    const raw = localStorage.getItem('system-design-progress')
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.completedLessons).toContain(firstLessonId)
  })
})

describe('clearProgress', () => {
  test('resets completed lessons to empty', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    store.clearProgress()
    expect(store.getProgress().completedLessons).toEqual([])
  })

  test('resets current lesson to the first lesson', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    store.clearProgress()
    expect(store.getCurrentLesson()).toBe(firstLessonId)
  })

  test('clears local storage entry', () => {
    const store = createLocalStorageProgress()
    store.completeLesson(firstLessonId)
    store.clearProgress()
    expect(localStorage.getItem('system-design-progress')).toBeNull()
  })
})
