import { describe, expect, test } from 'vitest'
import { getLessonById, lessons } from '../lib/manifest'

describe('getLessonById', () => {
  test('returns the lesson for a valid id', () => {
    const lesson = getLessonById('http-cycle')
    expect(lesson).toBeDefined()
    expect(lesson?.title).toBe('The HTTP Cycle')
    expect(lesson?.scaleMilestone).toBe('1 user')
    expect(lesson?.chapterId).toBe('chapter-1')
  })

  test('returns undefined for an unknown id', () => {
    expect(getLessonById('nonexistent-lesson')).toBeUndefined()
  })

  test('every lesson id in the manifest resolves', () => {
    for (const l of lessons) {
      expect(getLessonById(l.id)).toBe(l)
    }
  })

  test('generateStaticParams can be derived from manifest', () => {
    const params = lessons.map((l) => ({ lessonId: l.id }))
    expect(params).toHaveLength(lessons.length)
    expect(params[0]).toEqual({ lessonId: 'http-cycle' })
  })
})
