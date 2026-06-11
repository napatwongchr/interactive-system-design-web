import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <h1 className="text-4xl font-bold mb-4">Interactive System Design</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Learn how apps work and how to scale them — through story-driven lessons
        built for vibe coders.
      </p>
      <Link
        href="/lesson/placeholder"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Learning
      </Link>
    </main>
  )
}
