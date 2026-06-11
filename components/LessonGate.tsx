'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createLocalStorageProgress } from '@/lib/progress'
import { isLessonAccessible } from '@/lib/gating'

interface Props {
  lessonId: string
  children: React.ReactNode
}

export function LessonGate({ lessonId, children }: Props) {
  const router = useRouter()
  const [accessible, setAccessible] = useState(false)

  useEffect(() => {
    const store = createLocalStorageProgress()
    const progress = store.getProgress()
    if (!isLessonAccessible(lessonId, progress)) {
      router.replace(`/learn/${progress.currentLessonId}`)
    } else {
      setAccessible(true)
    }
  }, [lessonId, router])

  if (!accessible) return null
  return <>{children}</>
}
