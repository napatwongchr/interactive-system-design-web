import { describe, expect, test } from 'vitest'
import { isLessonAccessible } from '../lib/gating'
import { lessons } from '../lib/manifest'

const firstId = lessons[0].id
const secondId = lessons[1].id
const thirdId = lessons[2].id

describe('isLessonAccessible', () => {
  test('first lesson is always accessible with default progress', () => {
    expect(isLessonAccessible(firstId, { completedLessons: [], currentLessonId: firstId })).toBe(true)
  })

  test('current lesson is accessible', () => {
    expect(
      isLessonAccessible(secondId, { completedLessons: [firstId], currentLessonId: secondId }),
    ).toBe(true)
  })

  test('completed lesson is accessible', () => {
    expect(
      isLessonAccessible(firstId, { completedLessons: [firstId], currentLessonId: secondId }),
    ).toBe(true)
  })

  test('future lesson beyond current is locked', () => {
    expect(
      isLessonAccessible(thirdId, { completedLessons: [], currentLessonId: firstId }),
    ).toBe(false)
  })

  test('lesson after current but not yet completed is locked', () => {
    expect(
      isLessonAccessible(thirdId, { completedLessons: [firstId], currentLessonId: secondId }),
    ).toBe(false)
  })
})
