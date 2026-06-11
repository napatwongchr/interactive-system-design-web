# Issue 03 — Progress Module

## What to build

Build the progress tracking module behind a clean interface. Stores which lessons a vibe coder has completed and what their current lesson is. v1 implementation uses local storage; the interface must be designed so a future implementation can swap in Supabase without changing call sites.

No UI in this slice — pure logic and storage only.

## Acceptance criteria

- [x] Progress interface defines: `getProgress()`, `completeLesson(lessonId)`, `getCurrentLesson()`, `clearProgress()`
- [x] Local storage implementation satisfies the interface
- [x] `completeLesson` correctly adds a lesson ID to the completed set and advances the current lesson
- [x] `completeLesson` on an already-completed lesson does not corrupt state
- [x] `getProgress()` correctly deserialises state from local storage on initialisation
- [x] `clearProgress()` resets to the first lesson
- [x] All module logic is unit tested (mock local storage in tests)

## Blocked by

- Issue 01 — Project Scaffold

## Work log

2026-06-11: Implemented `lib/progress.ts` and `tests/progress.test.ts`.

Files created:
- `lib/progress.ts` — `Progress` and `ProgressStore` interfaces; `createLocalStorageProgress()` factory that returns the localStorage-backed implementation
- `tests/progress.test.ts` — 11 unit tests covering initialisation defaults, deserialization, completeLesson advancement, idempotency, last-lesson edge case, persistence, and clearProgress

Design decisions:
- Interface is a plain object (`ProgressStore`) rather than a class, so a Supabase implementation just needs to return the same shape
- `completeLesson` only advances `currentLessonId` when the completed lesson equals the current one, preventing regressions if lessons are completed out of order
- `clearProgress` calls `localStorage.removeItem` (not `setItem` with defaults) so `getProgress` cleanly re-initialises from defaults
