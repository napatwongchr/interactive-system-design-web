# Issue 05 — Lesson Navigation and Gating

## What to build

Wire up lesson navigation and progress-based gating end-to-end. A vibe coder can mark a lesson as complete (which writes to the progress module and advances to the next lesson), navigate forward and backward between lessons, and is redirected away from locked lessons they haven't unlocked yet.

This slice connects the progress module (Issue 03) to the lesson route (Issue 04) and makes the learning flow functional.

## Acceptance criteria

- [ ] "Mark as complete" button at the bottom of each lesson writes progress and navigates to the next lesson
- [ ] Next / previous navigation buttons appear on lesson pages and route correctly
- [ ] Visiting a locked lesson URL redirects to the vibe coder's current lesson
- [ ] Visiting a completed or current lesson URL renders the lesson without redirect
- [ ] The final lesson's "mark as complete" does not navigate to a next lesson (end of curriculum)
- [ ] Gating logic is covered by Playwright E2E tests (complete a lesson, verify redirect behaviour)

## Blocked by

- Issue 03 — Progress Module
- Issue 04 — Single Lesson Route
