import { notFound } from 'next/navigation'
import { chapters, getChapterById, getLessonsByChapter } from '@/lib/manifest'
import { ChapterOverview } from '@/components/ChapterOverview'

export function generateStaticParams() {
  return chapters.map((c) => ({ chapterId: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params
  const chapter = getChapterById(chapterId)
  if (!chapter) return {}
  return { title: `${chapter.title} — Interactive System Design` }
}

export default async function ChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params
  const chapter = getChapterById(chapterId)
  if (!chapter) notFound()

  const lessons = getLessonsByChapter(chapterId)

  return <ChapterOverview chapter={chapter} lessons={lessons} />
}
