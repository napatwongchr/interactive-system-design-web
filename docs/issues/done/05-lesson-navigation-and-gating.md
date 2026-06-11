# Issue 05 — Lesson Navigation and Gating

## What to build

Wire up lesson navigation and progress-based gating end-to-end. A vibe coder can mark a lesson as complete (which writes to the progress module and advances to the next lesson), navigate forward and backward between lessons, and is redirected away from locked lessons they haven't unlocked yet.

This slice connects the progress module (Issue 03) to the lesson route (Issue 04) and makes the learning flow functional.

## Acceptance criteria

- [x] "Mark as complete" button at the bottom of each lesson writes progress and navigates to the next lesson
- [x] Next / previous navigation buttons appear on lesson pages and route correctly
- [x] Visiting a locked lesson URL redirects to the vibe coder's current lesson
- [x] Visiting a completed or current lesson URL renders the lesson without redirect
- [x] The final lesson's "mark as complete" does not navigate to a next lesson (end of curriculum)
- [x] Gating logic is covered by Playwright E2E tests (complete a lesson, verify redirect behaviour)

## Blocked by

- Issue 03 — Progress Module
- Issue 04 — Single Lesson Route

## Implementation notes (2026-06-12)

All acceptance criteria implemented. Files created:

- `lib/gating.ts` — `isLessonAccessible(lessonId, progress)` pure function
- `components/LessonGate.tsx` — client component; reads localStorage on mount, redirects locked lessons to `/learn/{currentLessonId}`
- `components/LessonNav.tsx` — client component; prev/next navigation buttons + "Mark complete & continue" button
- `app/learn/[lessonId]/page.tsx` — updated to wrap content in `LessonGate` and render `LessonNav` below the article
- `tests/gating.test.ts` — unit tests for `isLessonAccessible`
- `e2e/lesson-navigation.spec.ts` — Playwright E2E tests for gating redirect, mark-complete, prev/next, and final-lesson edge case

**NOTE:** Commit pending — `git add` and `git commit` require user approval in sandbox mode. Tests also could not be run (`npm run test` and `npm run typecheck` require approval). Needs: user to approve git operations or configure `.claude/settings.json` with git permissions.
