import { notFound } from 'next/navigation'
import { getLessonById, lessons } from '@/lib/manifest'

export function generateStaticParams() {
  return lessons.map((l) => ({ lessonId: l.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const lesson = getLessonById(lessonId)
  if (!lesson) return {}
  return { title: `${lesson.title} — Interactive System Design` }
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const lesson = getLessonById(lessonId)
  if (!lesson) notFound()

  const mdxModule = await import(`@/content/lessons/${lessonId}.mdx`).catch(() => null)
  if (!mdxModule) notFound()

  const LessonContent = mdxModule.default

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
          {lesson.scaleMilestone}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{lesson.title}</h1>
        <p className="mt-2 text-gray-600">{lesson.summary}</p>
      </header>
      <article className="prose prose-lg prose-gray max-w-none">
        <LessonContent />
      </article>
    </main>
  )
}
