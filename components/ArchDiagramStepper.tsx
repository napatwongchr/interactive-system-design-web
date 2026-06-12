'use client'

import { useState, useMemo } from 'react'
import { ArchDiagram } from './ArchDiagram'
import type { DiagramNode, DiagramEdge } from './ArchDiagram'

interface ArchDiagramStepperProps {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  height?: string
}

export function ArchDiagramStepper({ nodes, edges, height }: ArchDiagramStepperProps) {
  const maxStep = useMemo(() => {
    const steps = [
      ...nodes.map((n) => n.step ?? 0),
      ...edges.map((e) => e.step ?? 0),
    ]
    return steps.length > 0 ? Math.max(...steps) : 0
  }, [nodes, edges])

  const [step, setStep] = useState(0)

  return (
    <div>
      <ArchDiagram nodes={nodes} edges={edges} step={step} height={height} />
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-white border-2 border-gray-900 rounded-lg font-semibold text-sm shadow-[3px_3px_0_#111] disabled:opacity-40 disabled:shadow-none hover:bg-gray-50 active:translate-y-0.5 transition-transform"
        >
          ← Previous
        </button>
        <span className="text-sm font-medium text-gray-600">
          Step {step + 1} of {maxStep + 1}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
          disabled={step === maxStep}
          className="px-4 py-2 bg-white border-2 border-gray-900 rounded-lg font-semibold text-sm shadow-[3px_3px_0_#111] disabled:opacity-40 disabled:shadow-none hover:bg-gray-50 active:translate-y-0.5 transition-transform"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
