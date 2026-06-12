import type { MDXComponents } from 'mdx/types'
import AnimationDemo from './components/AnimationDemo'
import DiagramDemo from './components/DiagramDemo'
import { ArchDiagram } from './components/ArchDiagram'
import { ArchDiagramStepper } from './components/ArchDiagramStepper'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AnimationDemo,
    DiagramDemo,
    ArchDiagram,
    ArchDiagramStepper,
    ...components,
  }
}
