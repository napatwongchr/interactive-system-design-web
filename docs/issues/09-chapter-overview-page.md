# Issue 09 — Chapter Overview Page

## What to build

Add a chapter overview page at `/learn/chapter/[chapterId]` that shows all lessons within a chapter, the chapter's scale milestone, and each lesson's completion state. Gives vibe coders a map of each chapter before they dive in, and lets them return to a specific lesson directly.

## Acceptance criteria

- [ ] Route `/learn/chapter/[chapterId]` renders the correct chapter
- [ ] Page shows chapter title, scale milestone, and a short chapter description
- [ ] All lessons in the chapter are listed in order with their titles and summaries
- [ ] Completed lessons show a completion indicator
- [ ] The current lesson is highlighted
- [ ] Locked lessons are shown greyed out but visible
- [ ] Each lesson links directly to its lesson route
- [ ] Invalid chapter IDs return a 404 page

## Blocked by

- Issue 06 — Progress Sidebar
