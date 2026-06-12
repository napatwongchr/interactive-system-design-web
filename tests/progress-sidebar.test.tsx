import { describe, expect, test, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

import { usePathname } from 'next/navigation'
import { ProgressSidebar } from '../components/ProgressSidebar'

beforeEach(() => {
  localStorage.clear()
  vi.mocked(usePathname).mockReturnValue('/learn/http-cycle')
})

describe('ProgressSidebar', () => {
  test('renders all chapter titles', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    expect(screen.getByText('You Just Shipped')).toBeInTheDocument()
    expect(screen.getByText('10 Friends Use It')).toBeInTheDocument()
    expect(screen.getByText('It Goes Viral')).toBeInTheDocument()
  })

  test('renders scale milestone for each chapter', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    expect(screen.getByText('1 user')).toBeInTheDocument()
    expect(screen.getByText('10 users')).toBeInTheDocument()
    expect(screen.getByText('1,000 users')).toBeInTheDocument()
  })

  test('renders lesson titles', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    expect(screen.getByText('The HTTP Cycle')).toBeInTheDocument()
    expect(screen.getByText("Your App's Three Layers")).toBeInTheDocument()
  })

  test('marks the currently viewed lesson with aria-current', async () => {
    vi.mocked(usePathname).mockReturnValue('/learn/http-cycle')
    await act(async () => {
      render(<ProgressSidebar />)
    })
    const currentBtn = screen.getByRole('button', { name: /The HTTP Cycle/ })
    expect(currentBtn).toHaveAttribute('aria-current', 'page')
  })

  test('second lesson is disabled (locked) when first is not completed', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    const threeLayers = screen.getByRole('button', { name: /Your App's Three Layers/ })
    expect(threeLayers).toBeDisabled()
  })

  test('completed lessons show a completed status indicator', async () => {
    localStorage.setItem(
      'system-design-progress',
      JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
    )
    vi.mocked(usePathname).mockReturnValue('/learn/three-layers')
    await act(async () => {
      render(<ProgressSidebar />)
    })
    const statusEl = screen.getByTestId('status-http-cycle')
    expect(statusEl.textContent).toContain('✓')
  })

  test('locked lessons show a locked status indicator', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    // three-layers is locked at start (http-cycle not complete)
    const statusEl = screen.getByTestId('status-three-layers')
    expect(statusEl.textContent).toContain('🔒')
  })

  test('nav has an accessible label', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    expect(screen.getByRole('navigation', { name: /course progress/i })).toBeInTheDocument()
  })

  test('unlocked accessible lessons are not disabled', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })
    // http-cycle is the first lesson and always accessible
    const httpCycle = screen.getByRole('button', { name: /The HTTP Cycle/ })
    expect(httpCycle).not.toBeDisabled()
  })

  test('updates when lessonCompleted event fires', async () => {
    await act(async () => {
      render(<ProgressSidebar />)
    })

    // Initially three-layers is locked
    expect(screen.getByTestId('status-three-layers').textContent).toContain('🔒')

    // Simulate completing http-cycle via localStorage + custom event
    await act(async () => {
      localStorage.setItem(
        'system-design-progress',
        JSON.stringify({ completedLessons: ['http-cycle'], currentLessonId: 'three-layers' }),
      )
      window.dispatchEvent(new CustomEvent('lessonCompleted'))
    })

    expect(screen.getByTestId('status-http-cycle').textContent).toContain('✓')
    expect(screen.getByTestId('status-three-layers').textContent).not.toContain('🔒')
  })
})
