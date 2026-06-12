'use client'

import { useMemo } from 'react'
import { ReactFlow, Background } from '@xyflow/react'
import type { Node, Edge, NodeProps } from '@xyflow/react'
import { motion } from 'framer-motion'
import '@xyflow/react/dist/style.css'

export interface DiagramNodeData extends Record<string, unknown> {
  label: string
}

export interface DiagramNode {
  id: string
  position: { x: number; y: number }
  data: DiagramNodeData
  step?: number
}

export interface DiagramEdge {
  id: string
  source: string
  target: string
  step?: number
  animated?: boolean
  label?: string
}

export interface ArchDiagramProps {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  step: number
  height?: string
}

function AnimatedNode({ data }: NodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="px-4 py-2 bg-white border-2 border-gray-900 rounded-lg shadow-[4px_4px_0_#111] font-bold text-gray-900 text-sm"
    >
      {data.label as string}
    </motion.div>
  )
}

const nodeTypes = { animated: AnimatedNode }

export function ArchDiagram({ nodes, edges, step, height = '320px' }: ArchDiagramProps) {
  const visibleNodes = useMemo<Node[]>(
    () =>
      nodes
        .filter((n) => (n.step ?? 0) <= step)
        .map((n) => ({ ...n, type: 'animated' })),
    [nodes, step],
  )

  const visibleEdges = useMemo<Edge[]>(
    () => edges.filter((e) => (e.step ?? 0) <= step),
    [edges, step],
  )

  return (
    <div
      style={{ height }}
      className="border-2 border-gray-900 rounded-xl my-4 overflow-hidden bg-gray-50"
    >
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
