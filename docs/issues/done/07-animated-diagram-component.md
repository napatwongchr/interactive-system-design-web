# Issue 07 — Animated Diagram Component

## What to build

Build the reusable animated architecture diagram component that powers the visual storytelling in lessons. Combines React Flow (node/edge graph) with Framer Motion (sequenced step reveals) behind a single component API.

The component accepts a `step` prop that controls which nodes and edges are currently visible, enabling lessons to walk through an architecture diagram one piece at a time. Nodes and edges animate in/out as `step` changes.

This component will be embedded in MDX files as a named React component.

## Acceptance criteria

- [ ] Component accepts `nodes`, `edges`, and `step` props
- [ ] Only nodes/edges assigned to steps `<= current step` are visible
- [ ] Nodes and edges animate in using Framer Motion when they become visible
- [ ] Component is pannable and zoomable (React Flow default behaviour)
- [ ] Component renders correctly when embedded in an MDX file
- [ ] A step-through control (next step / previous step buttons) is optionally embeddable alongside the diagram
- [ ] Component is visually consistent with the bold/playful design direction
- [ ] Renders without error when `step` is 0 (empty diagram)

## Blocked by

- Issue 01 — Project Scaffold
