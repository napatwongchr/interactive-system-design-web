import { Progress } from './progress'

export function isLessonAccessible(lessonId: string, progress: Progress): boolean {
  const { completedLessons, currentLessonId } = progress
  return lessonId === currentLessonId || completedLessons.includes(lessonId)
}
