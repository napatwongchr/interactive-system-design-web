# Issue 06 — Progress Sidebar

## What to build

Add a persistent sidebar to the lesson layout that shows the full curriculum structure, completion state per lesson, and a "you are here" indicator. Vibe coders can see their progress through the zero-to-hero arc at a glance and understand where each lesson sits within its chapter.

Locked lessons are shown greyed out with a lock icon but are not hidden — the full arc is always visible.

## Acceptance criteria

- [ ] Sidebar lists all chapters and their lessons in order
- [ ] Each chapter shows its scale milestone label (e.g. "1,000 users")
- [ ] Completed lessons show a visual completion indicator (e.g. checkmark)
- [ ] The current lesson is highlighted as "you are here"
- [ ] Locked lessons are visually distinct (greyed out + lock icon) but visible
- [ ] Sidebar updates in real time when a lesson is marked as complete
- [ ] Sidebar is accessible (keyboard navigable, appropriate ARIA labels)

## Blocked by

- Issue 05 — Lesson Navigation and Gating (done)

## Implementation status

All acceptance criteria implemented (pending commit/test run approval):

- `components/ProgressSidebar.tsx` — client component using `usePathname` to
  detect active lesson; reads progress from localStorage; listens to `storage`
  (cross-tab) and custom `lessonCompleted` (same-tab) events for real-time updates;
  chapters with scale milestone labels; ✓/🔒/· lesson status icons; `aria-current`,
  `aria-label`, `disabled` attributes for accessibility
- `app/learn/layout.tsx` — `h-screen flex overflow-hidden` layout wrapping all
  `/learn/*` routes; sidebar pinned, content area scrolls independently
- `lib/progress.ts` — dispatches `lessonCompleted` custom event after `save()`
  so sidebar refreshes in the same tab
- `app/learn/[lessonId]/page.tsx` — removed `min-h-screen` (layout handles it)
- `tests/progress-sidebar.test.tsx` — 9 unit tests: render, a11y, locked/
  completed/active states, real-time event update
