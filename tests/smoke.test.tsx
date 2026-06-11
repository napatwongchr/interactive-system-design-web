import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

describe('smoke test', () => {
  test('React renders a component', () => {
    render(<Greeting name="vibe coder" />)
    expect(screen.getByText('Hello, vibe coder!')).toBeInTheDocument()
  })

  test('environment is jsdom', () => {
    expect(typeof window).toBe('object')
  })
})
