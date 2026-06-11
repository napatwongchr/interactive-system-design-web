# Issue 02 — Lesson Manifest

## What to build

Create the static data file that defines the full curriculum structure — the single source of truth for lesson order, chapter grouping, scale milestones, and lesson metadata. No UI yet; this is the data layer that routing and navigation will consume.

The manifest should define all 6 chapters and their lessons, including: lesson ID (used as URL slug), title, chapter ID, order within chapter, scale milestone label (e.g. "1,000 users"), and a short summary shown on overview pages.

Also implement the lesson navigation logic (get next lesson, get previous lesson, get lessons by chapter) with unit tests.

## Acceptance criteria

- [ ] Lesson manifest covers all 6 chapters and all planned lessons
- [ ] Each lesson entry includes: id, title, chapterId, order, scaleMilestone, summary
- [ ] `getNextLesson(lessonId)` returns the correct following lesson across chapter boundaries
- [ ] `getPreviousLesson(lessonId)` returns the correct preceding lesson
- [ ] `getNextLesson` returns null for the final lesson
- [ ] `getLessonsByChapter(chapterId)` returns lessons in correct order
- [ ] All navigation logic is unit tested

## Blocked by

- Issue 01 — Project Scaffold
