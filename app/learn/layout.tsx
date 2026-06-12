import { ProgressSidebar } from '@/components/ProgressSidebar'

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ProgressSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
