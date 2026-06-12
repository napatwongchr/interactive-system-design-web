import { describe, expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

vi.mock('@xyflow/react', () => ({
  ReactFlow: ({
    nodes,
    edges,
    children,
  }: {
    nodes: unknown[]
    edges: unknown[]
    children?: React.ReactNode
  }) => (
    <div
      data-testid="react-flow"
      data-node-count={nodes.length}
      data-edge-count={edges.length}
    >
      {children}
    </div>
  ),
  Background: () => <div data-testid="rf-background" />,
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      style,
    }: {
      children?: React.ReactNode
      className?: string
      style?: React.CSSProperties
    }) => (
      <div className={className} style={style}>
        {children}
      </div>
    ),
  },
}))

import { ArchDiagram } from '../components/ArchDiagram'
import { ArchDiagramStepper } from '../components/ArchDiagramStepper'

const sampleNodes = [
  { id: 'client', position: { x: 0, y: 0 }, data: { label: 'Client' }, step: 0 },
  { id: 'server', position: { x: 200, y: 0 }, data: { label: 'Server' }, step: 1 },
  { id: 'db', position: { x: 400, y: 0 }, data: { label: 'Database' }, step: 2 },
]

const sampleEdges = [
  { id: 'e1', source: 'client', target: 'server', step: 1 },
  { id: 'e2', source: 'server', target: 'db', step: 2 },
]

describe('ArchDiagram', () => {
  test('renders without error when step is 0', () => {
    render(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={0} />)
    expect(screen.getByTestId('react-flow')).toBeInTheDocument()
  })

  test('shows only nodes with step <= current step', () => {
    const { rerender } = render(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={0} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '1')

    rerender(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={1} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '2')

    rerender(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={2} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '3')
  })

  test('shows only edges with step <= current step', () => {
    const { rerender } = render(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={0} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-edge-count', '0')

    rerender(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={1} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-edge-count', '1')

    rerender(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={2} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-edge-count', '2')
  })

  test('nodes without step prop default to step 0', () => {
    const noStepNodes = [{ id: 'a', position: { x: 0, y: 0 }, data: { label: 'A' } }]
    render(<ArchDiagram nodes={noStepNodes} edges={[]} step={0} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '1')
  })

  test('shows no nodes when step is below all node steps', () => {
    const lateNodes = [
      { id: 'a', position: { x: 0, y: 0 }, data: { label: 'A' }, step: 3 },
    ]
    render(<ArchDiagram nodes={lateNodes} edges={[]} step={0} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '0')
  })

  test('renders the Background component', () => {
    render(<ArchDiagram nodes={sampleNodes} edges={sampleEdges} step={0} />)
    expect(screen.getByTestId('rf-background')).toBeInTheDocument()
  })
})

describe('ArchDiagramStepper', () => {
  test('renders previous and next buttons', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  test('previous button is disabled at step 0', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })

  test('next button is disabled at max step', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    const next = screen.getByRole('button', { name: /next/i })
    fireEvent.click(next) // step 1
    fireEvent.click(next) // step 2 (maxStep from sampleNodes)
    expect(next).toBeDisabled()
  })

  test('clicking next shows more nodes', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '1')
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '2')
  })

  test('clicking previous hides nodes', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    const next = screen.getByRole('button', { name: /next/i })
    fireEvent.click(next)
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '2')
    fireEvent.click(screen.getByRole('button', { name: /previous/i }))
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-node-count', '1')
  })

  test('displays step counter', () => {
    render(<ArchDiagramStepper nodes={sampleNodes} edges={sampleEdges} />)
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument()
  })
})
