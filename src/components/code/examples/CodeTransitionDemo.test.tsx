import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeTransitionDemo } from './CodeTransitionDemo';

// Mock Remotion components and hooks
vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  interpolate: vi.fn((input, inputRange, outputRange) => {
    const [inMin, inMax] = inputRange;
    const [outMin, outMax] = outputRange;
    const progress = (input - inMin) / (inMax - inMin);
    return outMin + progress * (outMax - outMin);
  }),
  Sequence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Easing: {
    bezier: () => (t: number) => t,
  },
  continueRender: vi.fn(),
  delayRender: () => 'mock-handle',
}));

describe('CodeTransitionDemo', () => {
  it('renders all code transitions', () => {
    const { container } = render(<CodeTransitionDemo />);

    // Check if all code examples are rendered
    expect(container.textContent).toContain('function greet');
    expect(container.textContent).toContain('def greet');
    expect(container.textContent).toContain('fn greet');
  });

  it('applies proper styling', () => {
    const { container } = render(<CodeTransitionDemo />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle({
      padding: '2rem',
      backgroundColor: '#1a1b26',
    });
  });

  it('contains three sequences', () => {
    const { container } = render(<CodeTransitionDemo />);
    const sequences = container.querySelectorAll('div > div');
    expect(sequences).toHaveLength(3);
  });
});
