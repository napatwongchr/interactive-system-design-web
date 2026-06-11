'use client'

import { useRouter } from 'next/navigation'
import { createLocalStorageProgress } from '@/lib/progress'
import { getNextLesson, getPreviousLesson } from '@/lib/manifest'

interface Props {
  lessonId: string
}

export function LessonNav({ lessonId }: Props) {
  const router = useRouter()
  const prev = getPreviousLesson(lessonId)
  const next = getNextLesson(lessonId)

  function handleMarkComplete() {
    const store = createLocalStorageProgress()
    store.completeLesson(lessonId)
    if (next) {
      router.push(`/learn/${next.id}`)
    }
  }

  return (
    <nav aria-label="Lesson navigation" className="mt-12 pt-8 border-t border-gray-200">
      <button
        onClick={handleMarkComplete}
        className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        {next ? 'Mark complete & continue →' : 'Mark complete'}
      </button>

      <div className="flex justify-between mt-4">
        {prev ? (
          <button
            onClick={() => router.push(`/learn/${prev.id}`)}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            aria-label={`Previous lesson: ${prev.title}`}
          >
            ← {prev.title}
          </button>
        ) : (
          <span />
        )}

        {next ? (
          <button
            onClick={() => router.push(`/learn/${next.id}`)}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            aria-label={`Next lesson: ${next.title}`}
          >
            {next.title} →
          </button>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
