'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { chapters, getLessonsByChapter } from '@/lib/manifest'
import { createLocalStorageProgress, type Progress } from '@/lib/progress'
import { isLessonAccessible } from '@/lib/gating'

function defaultProgress(): Progress {
  return { completedLessons: [], currentLessonId: '' }
}

export function ProgressSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [progress, setProgress] = useState<Progress>(defaultProgress())

  const activeLessonId = pathname.startsWith('/learn/') ? pathname.slice('/learn/'.length) : ''

  useEffect(() => {
    const store = createLocalStorageProgress()
    const refresh = () => setProgress(store.getProgress())
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('lessonCompleted', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('lessonCompleted', refresh)
    }
  }, [])

  return (
    <nav
      aria-label="Course progress"
      className="w-64 h-full bg-gray-50 border-r border-gray-200 flex-shrink-0 overflow-y-auto"
    >
      <div className="p-4 border-b border-gray-200">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-900">Course Progress</p>
      </div>

      {chapters.map((chapter) => {
        const chapterLessons = getLessonsByChapter(chapter.id)
        return (
          <section key={chapter.id}>
            <div className="px-4 py-3 bg-white border-b border-gray-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                {chapter.scaleMilestone}
              </p>
              <h3 className="text-sm font-semibold text-gray-900 mt-0.5">{chapter.title}</h3>
            </div>

            <ul role="list">
              {chapterLessons.map((lesson) => {
                const isCompleted = progress.completedLessons.includes(lesson.id)
                const isActive = lesson.id === activeLessonId
                const accessible = isLessonAccessible(lesson.id, progress)

                const statusIcon = isCompleted ? '✓' : !accessible ? '🔒' : '·'

                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => accessible && router.push(`/learn/${lesson.id}`)}
                      disabled={!accessible}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`${lesson.title}${isCompleted ? ', completed' : !accessible ? ', locked' : ''}`}
                      className={[
                        'w-full text-left px-4 py-2.5 flex items-start gap-3 text-sm transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                          : '',
                        !isActive && accessible ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : '',
                        !accessible ? 'text-gray-400 cursor-not-allowed' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <span
                        aria-hidden="true"
                        data-testid={`status-${lesson.id}`}
                        className="flex-shrink-0 mt-0.5 text-xs font-bold w-4 text-center"
                      >
                        {statusIcon}
                      </span>
                      <span>{lesson.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </nav>
  )
}
