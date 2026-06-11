import { describe, expect, test } from 'vitest'
import {
  lessons,
  getNextLesson,
  getPreviousLesson,
  getLessonsByChapter,
} from '../lib/manifest'

describe('lesson manifest', () => {
  test('covers all 6 chapters', () => {
    const chapterIds = [...new Set(lessons.map((l) => l.chapterId))]
    expect(chapterIds).toHaveLength(6)
  })

  test('each lesson has required fields', () => {
    for (const lesson of lessons) {
      expect(lesson.id).toBeTruthy()
      expect(lesson.title).toBeTruthy()
      expect(lesson.chapterId).toBeTruthy()
      expect(typeof lesson.order).toBe('number')
      expect(lesson.scaleMilestone).toBeTruthy()
      expect(lesson.summary).toBeTruthy()
    }
  })
})

describe('getLessonsByChapter', () => {
  test('returns lessons in correct order', () => {
    const ch1 = getLessonsByChapter('chapter-1')
    const orders = ch1.map((l) => l.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
  })

  test('returns only lessons for the given chapter', () => {
    const ch1 = getLessonsByChapter('chapter-1')
    expect(ch1.every((l) => l.chapterId === 'chapter-1')).toBe(true)
  })

  test('returns empty array for unknown chapter', () => {
    expect(getLessonsByChapter('nonexistent')).toEqual([])
  })
})

describe('getNextLesson', () => {
  test('returns the next lesson within a chapter', () => {
    const [first, second] = getLessonsByChapter('chapter-1')
    expect(getNextLesson(first.id)?.id).toBe(second.id)
  })

  test('crosses chapter boundary: last of ch1 → first of ch2', () => {
    const ch1 = getLessonsByChapter('chapter-1')
    const lastCh1 = ch1[ch1.length - 1]
    const firstCh2 = getLessonsByChapter('chapter-2')[0]
    expect(getNextLesson(lastCh1.id)?.id).toBe(firstCh2.id)
  })

  test('returns null for the final lesson', () => {
    const ch6 = getLessonsByChapter('chapter-6')
    const last = ch6[ch6.length - 1]
    expect(getNextLesson(last.id)).toBeNull()
  })

  test('returns null for unknown lesson id', () => {
    expect(getNextLesson('does-not-exist')).toBeNull()
  })
})

describe('getPreviousLesson', () => {
  test('returns the previous lesson within a chapter', () => {
    const ch1 = getLessonsByChapter('chapter-1')
    const [first, second] = ch1
    expect(getPreviousLesson(second.id)?.id).toBe(first.id)
  })

  test('crosses chapter boundary: first of ch2 → last of ch1', () => {
    const firstCh2 = getLessonsByChapter('chapter-2')[0]
    const ch1 = getLessonsByChapter('chapter-1')
    const lastCh1 = ch1[ch1.length - 1]
    expect(getPreviousLesson(firstCh2.id)?.id).toBe(lastCh1.id)
  })

  test('returns null for the first lesson', () => {
    const first = getLessonsByChapter('chapter-1')[0]
    expect(getPreviousLesson(first.id)).toBeNull()
  })

  test('returns null for unknown lesson id', () => {
    expect(getPreviousLesson('does-not-exist')).toBeNull()
  })
})
