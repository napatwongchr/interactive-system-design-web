import { describe, expect, test, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { chapters, getChapterById, getLessonsByChapter } from '../lib/manifest'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

import { ChapterOverview } from '../components/ChapterOverview'

const chapter1 = chapters[0]
const chapter1Lessons = getLessonsByChapter('chapter-1')

beforeEach(() => {
  localStorage.clear()
})

describe('getChapterById', () => {
  test('returns chapter for valid id', () => {
    const ch = getChapterById('chapter-1')
    expect(ch).toBeDefined()
    expect(ch?.title).toBe('You Just Shipped')
    expect(ch?.scaleMilestone).toBe('1 user')
    expect(ch?.description).toBeTruthy()
  })

  test('returns undefined for unknown id', () => {
    expect(getChapterById('chapter-99')).toBeUndefined()
  })

  test('every chapter id resolves', () => {
    for (const ch of chapters) {
      expect(getChapterById(ch.id)).toBe(ch)
    }
  })

  test('all chapters have descriptions', () => {
    for (const ch of chapters) {
      expect(ch.description).toBeTruthy()
    }
  })
})

describe('ChapterOverview', () => {
  test('shows chapter title and scale milestone', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    expect(screen.getByRole('heading', { name: /You Just Shipped/i })).toBeInTheDocument()
    expect(screen.getByText('1 user')).toBeInTheDocument()
  })

  test('shows chapter description', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    expect(screen.getByText(chapter1.description)).toBeInTheDocument()
  })

  test('lists all chapter lessons in order', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    expect(screen.getByText('The HTTP Cycle')).toBeInTheDocument()
    expect(screen.getByText("Your App's Three Layers")).toBeInTheDocument()
    expect(screen.getByText('How Your Vibe-Coded App Works Under the Hood')).toBeInTheDocument()
  })

  test('shows lesson summaries', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    expect(
      screen.getByText('Follow a single request from your browser to the server and back.'),
    ).toBeInTheDocument()
  })

  test('first lesson is accessible (not disabled)', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    const firstLesson = screen.getByRole('link', { name: /The HTTP Cycle/i })
    expect(firstLesson).toBeInTheDocument()
    expect(firstLesson).toHaveAttribute('href', '/learn/http-cycle')
  })

  test('locked lessons are not linked (greyed out)', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    // three-layers is locked initially
    const lockedLesson = screen.queryByRole('link', { name: /Your App's Three Layers/i })
    expect(lockedLesson).toBeNull()
  })

  test('completed lessons show a check indicator', async () => {
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
    )
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    const indicator = screen.getByTestId('chapter-status-http-cycle')
    expect(indicator.textContent).toContain('✓')
  })

  test('locked lessons show a lock indicator', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    const indicator = screen.getByTestId('chapter-status-three-layers')
    expect(indicator.textContent).toContain('🔒')
  })

  test('current lesson is highlighted', async () => {
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
    )
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })
    const currentLink = screen.getByRole('link', { name: /Your App's Three Layers/i })
    expect(currentLink).toHaveAttribute('aria-current', 'page')
  })

  test('updates when lessonCompleted event fires', async () => {
    await act(async () => {
      render(<ChapterOverview chapter={chapter1} lessons={chapter1Lessons} />)
    })

    // Initially three-layers is locked
    expect(screen.getByTestId('chapter-status-three-layers').textContent).toContain('🔒')

    await act(async () => {
      localStorage.setItem(
        'system-design-progress',
        JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
      )
      window.dispatchEvent(new CustomEvent('lessonCompleted'))
    })

    expect(screen.getByTestId('chapter-status-http-cycle').textContent).toContain('✓')
    expect(screen.getByTestId('chapter-status-three-layers').textContent).not.toContain('🔒')
  })
})
