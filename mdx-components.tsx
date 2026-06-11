import type { MDXComponents } from 'mdx/types'
import AnimationDemo from './components/AnimationDemo'
import DiagramDemo from './components/DiagramDemo'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AnimationDemo,
    DiagramDemo,
    ...components,
  }
}
