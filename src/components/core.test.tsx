import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Intro, Outro } from './core'

describe('Core Components', () => {
  it('should render Intro component', () => {
    const { getByText } = render(
      <Intro title='Welcome' subtitle='Presentation' duration={5} transition='fade'>
        <p>Additional content</p>
      </Intro>
    )

    expect(getByText('Welcome')).toBeDefined()
    expect(getByText('Presentation')).toBeDefined()
    expect(getByText('Additional content')).toBeDefined()
  })

  it('should render Outro component', () => {
    const { getByText } = render(
      <Outro title='Thank You' subtitle='Questions?' duration={3} transition='slide'>
        <p>Contact info</p>
      </Outro>
    )

    expect(getByText('Thank You')).toBeDefined()
    expect(getByText('Questions?')).toBeDefined()
    expect(getByText('Contact info')).toBeDefined()
  })
})
