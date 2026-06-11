'use client'

import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 80 },
    data: { label: 'Client (Browser)' },
  },
  {
    id: '2',
    position: { x: 220, y: 80 },
    data: { label: 'Server' },
  },
  {
    id: '3',
    position: { x: 440, y: 80 },
    data: { label: 'Database' },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

export default function DiagramDemo() {
  return (
    <div className="h-64 border border-gray-200 rounded-lg my-4">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  )
}
