# Issue 03 — Progress Module

## What to build

Build the progress tracking module behind a clean interface. Stores which lessons a vibe coder has completed and what their current lesson is. v1 implementation uses local storage; the interface must be designed so a future implementation can swap in Supabase without changing call sites.

No UI in this slice — pure logic and storage only.

## Acceptance criteria

- [ ] Progress interface defines: `getProgress()`, `completeLesson(lessonId)`, `getCurrentLesson()`, `clearProgress()`
- [ ] Local storage implementation satisfies the interface
- [ ] `completeLesson` correctly adds a lesson ID to the completed set and advances the current lesson
- [ ] `completeLesson` on an already-completed lesson does not corrupt state
- [ ] `getProgress()` correctly deserialises state from local storage on initialisation
- [ ] `clearProgress()` resets to the first lesson
- [ ] All module logic is unit tested (mock local storage in tests)

## Blocked by

- Issue 01 — Project Scaffold
