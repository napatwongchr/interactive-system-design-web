export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <article className="prose prose-lg prose-gray max-w-none">
        {children}
      </article>
    </main>
  )
}
