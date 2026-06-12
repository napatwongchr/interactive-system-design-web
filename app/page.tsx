import Link from 'next/link'
import { chapters } from '@/lib/manifest'

const CHAPTER_COLORS = [
  '#FDE68A', // yellow
  '#BBF7D0', // green
  '#BFDBFE', // blue
  '#FCA5A5', // red
  '#DDD6FE', // purple
  '#FED7AA', // orange
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans">
      {/* Hero */}
      <section className="border-b-4 border-black px-6 py-20 md:py-32 max-w-5xl mx-auto">
        <div className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-sm font-bold mb-6 uppercase tracking-wide">
          For vibe coders
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          You shipped it.
          <br />
          <span className="underline decoration-4 decoration-black">
            Now what happens
          </span>
          <br />
          when 10,000 people use it?
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-10 leading-relaxed">
          System design for vibe coders — no CS degree required. Follow your
          app from first deploy to viral scale through story-driven lessons with
          animated diagrams.
        </p>
        <Link
          href="/learn/http-cycle"
          className="inline-block border-4 border-black bg-black text-white text-xl font-bold px-10 py-4 hover:bg-white hover:text-black transition-colors"
        >
          Start learning for free →
        </Link>
      </section>

      {/* Who this is for */}
      <section className="border-b-4 border-black px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-10 uppercase tracking-tight">
          This is for you if…
        </h2>
        <div className="grid md:grid-cols-3 gap-0 border-2 border-black">
          {[
            {
              emoji: '🤖',
              heading: 'You used AI to build it',
              body: 'You shipped a real app — maybe with Cursor, Copilot, or Claude. You don\'t fully know how it works under the hood.',
            },
            {
              emoji: '🤷',
              heading: 'You\'ve never heard of a load balancer',
              body: 'Terms like "horizontal scaling" and "message queues" sound like someone else\'s problem. Until they\'re yours.',
            },
            {
              emoji: '🔍',
              heading: 'You want to understand what you shipped',
              body: 'Not just make it work — actually understand it. So when it breaks at 2am, you know where to look.',
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-8 border-black ${i < 2 ? 'border-r-2' : ''}`}
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className="text-xl font-black mb-3">{card.heading}</h3>
              <p className="text-gray-600 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum arc */}
      <section className="border-b-4 border-black px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tight">
          The scale journey
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Six chapters. One app growing from 1 user to viral.
        </p>
        <div className="grid md:grid-cols-3 gap-0 border-2 border-black">
          {chapters.map((chapter, i) => (
            <Link
              key={chapter.id}
              href={`/learn/chapter/${chapter.id}`}
              className={`block p-6 border-black hover:opacity-80 transition-opacity
                ${i % 3 !== 2 ? 'md:border-r-2' : ''}
                ${i < 3 ? 'border-b-2' : ''}
              `}
              style={{ backgroundColor: CHAPTER_COLORS[i] }}
            >
              <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">
                Chapter {chapter.order}
              </div>
              <div className="inline-block border-2 border-black bg-white/60 px-2 py-0.5 text-xs font-bold mb-3">
                {chapter.scaleMilestone}
              </div>
              <h3 className="text-xl font-black mb-2 leading-tight">
                {chapter.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {chapter.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/learn/http-cycle"
            className="inline-block border-4 border-black bg-white text-black text-lg font-bold px-8 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Start from the beginning →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-gray-500 font-medium">
          Built for the AI-native generation. No CS jargon, no gatekeeping.
        </p>
        <Link
          href="/learn/http-cycle"
          className="text-sm font-black underline decoration-2 hover:no-underline"
        >
          Start lesson 1 →
        </Link>
      </footer>
    </main>
  )
}
