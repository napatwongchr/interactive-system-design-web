'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Chapter, type Lesson } from '@/lib/manifest'
import { createLocalStorageProgress, type Progress } from '@/lib/progress'
import { isLessonAccessible } from '@/lib/gating'

function defaultProgress(): Progress {
  return { completedLessons: [], currentLessonId: '' }
}

interface Props {
  chapter: Chapter
  lessons: Lesson[]
}

export function ChapterOverview({ chapter, lessons }: Props) {
  const [progress, setProgress] = useState<Progress>(defaultProgress())

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
    <main className="p-8 max-w-3xl mx-auto">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
          {chapter.scaleMilestone}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{chapter.title}</h1>
        <p className="mt-3 text-lg text-gray-600">{chapter.description}</p>
      </header>

      <ul role="list" className="space-y-3">
        {lessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id)
          const isCurrent = lesson.id === progress.currentLessonId
          const accessible = isLessonAccessible(lesson.id, progress)

          const statusIcon = isCompleted ? '✓' : !accessible ? '🔒' : '·'

          const content = (
            <div className="flex items-start gap-4">
              <span
                data-testid={`chapter-status-${lesson.id}`}
                aria-hidden="true"
                className="flex-shrink-0 mt-1 text-sm font-bold w-5 text-center"
              >
                {statusIcon}
              </span>
              <div>
                <p
                  className={[
                    'font-semibold',
                    isCompleted ? 'text-green-700' : accessible ? 'text-gray-900' : 'text-gray-400',
                  ].join(' ')}
                >
                  {lesson.title}
                </p>
                <p className={['text-sm mt-0.5', accessible ? 'text-gray-600' : 'text-gray-400'].join(' ')}>
                  {lesson.summary}
                </p>
              </div>
            </div>
          )

          const cardClasses = [
            'block rounded-lg border p-4 transition-colors',
            accessible
              ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
              : 'border-gray-100 bg-gray-50 cursor-not-allowed',
            isCurrent ? 'border-blue-400 bg-blue-50' : '',
          ]
            .filter(Boolean)
            .join(' ')

          if (!accessible) {
            return (
              <li key={lesson.id}>
                <div className={cardClasses}>{content}</div>
              </li>
            )
          }

          return (
            <li key={lesson.id}>
              <Link
                href={`/learn/${lesson.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={cardClasses}
              >
                {content}
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
