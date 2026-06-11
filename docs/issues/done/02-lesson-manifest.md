# Issue 02 — Lesson Manifest

## What to build

Create the static data file that defines the full curriculum structure — the single source of truth for lesson order, chapter grouping, scale milestones, and lesson metadata. No UI yet; this is the data layer that routing and navigation will consume.

The manifest should define all 6 chapters and their lessons, including: lesson ID (used as URL slug), title, chapter ID, order within chapter, scale milestone label (e.g. "1,000 users"), and a short summary shown on overview pages.

Also implement the lesson navigation logic (get next lesson, get previous lesson, get lessons by chapter) with unit tests.

## Acceptance criteria

- [x] Lesson manifest covers all 6 chapters and all planned lessons
- [x] Each lesson entry includes: id, title, chapterId, order, scaleMilestone, summary
- [x] `getNextLesson(lessonId)` returns the correct following lesson across chapter boundaries
- [x] `getPreviousLesson(lessonId)` returns the correct preceding lesson
- [x] `getNextLesson` returns null for the final lesson
- [x] `getLessonsByChapter(chapterId)` returns lessons in correct order
- [x] All navigation logic is unit tested

## Blocked by

- Issue 01 — Project Scaffold

## Work log

2026-06-11: Implemented `lib/manifest.ts` and `tests/manifest.test.ts`.

Files created:
- `lib/manifest.ts` — `Lesson` and `Chapter` types; 22 lessons across 6 chapters (3–4 per chapter); `getNextLesson`, `getPreviousLesson`, `getLessonsByChapter` navigation functions
- `tests/manifest.test.ts` — 12 unit tests covering manifest shape, chapter ordering, cross-chapter boundary navigation, null returns for first/last/unknown lessons

Note: `npm run test` and `npm run typecheck` require shell permission approval — run manually to verify.
