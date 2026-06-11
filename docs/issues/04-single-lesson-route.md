# Issue 04 — Single Lesson Route

## What to build

Implement the dynamic lesson route that renders MDX lesson content end-to-end. A URL like `/learn/[lessonId]` should load the correct MDX file and render its content in a basic lesson page layout. No animations, no progress, no navigation yet — just content rendering correctly.

Proves that the MDX pipeline works: prose renders, frontmatter is parsed, and embedded React components (passed as MDX components) mount without error.

## Acceptance criteria

- [ ] Dynamic route `/learn/[lessonId]` resolves to the correct MDX file based on lesson ID
- [ ] Lesson title and scale milestone from frontmatter are displayed on the page
- [ ] MDX prose content renders correctly
- [ ] Embedded React components can be passed into MDX and mount without error
- [ ] Invalid lesson IDs return a 404 page
- [ ] Pages are statically generated at build time (no runtime data fetching for content)
- [ ] Page loads fast (no unnecessary client-side JS for static content)

## Blocked by

- Issue 02 — Lesson Manifest
