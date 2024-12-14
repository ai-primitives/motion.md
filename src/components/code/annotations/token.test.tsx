import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { tokenTransitions } from './token';

// Mock Remotion hooks
vi.mock('remotion', () => ({
  useCurrentFrame: () => 10,
  interpolate: vi.fn((input, inputRange, outputRange) => {
    // Simple linear interpolation for testing
    const [inMin, inMax] = inputRange;
    const [outMin, outMax] = outputRange;
    const progress = (input - inMin) / (inMax - inMin);
    return outMin + progress * (outMax - outMin);
  }),
}));

describe('Token Transitions', () => {
  it('renders token with animations', () => {
    const { container } = render(
      React.createElement(tokenTransitions.render, {
        children: 'test',
        className: 'test-class',
      })
    );

    const token = container.firstChild;
    expect(token).toBeTruthy();

    // Check if animations are applied
    const style = window.getComputedStyle(token as Element);
    expect(style.opacity).toBeDefined();
    expect(style.transform).toContain('scale');
    expect(style.transform).toContain('translateY');
    expect(style.transition).toContain('cubic-bezier');
  });

  it('applies custom styles', () => {
    const customStyle = { color: 'red' };
    const { container } = render(
      React.createElement(tokenTransitions.render, {
        children: 'test',
        className: 'test-class',
        style: customStyle,
      })
    );

    const token = container.firstChild;
    expect(token).toBeTruthy();
    expect(window.getComputedStyle(token as Element).color).toBe('red');
  });

  it('preserves className', () => {
    const { container } = render(
      React.createElement(tokenTransitions.render, {
        children: 'test',
        className: 'test-class',
      })
    );

    const token = container.firstChild;
    expect(token).toBeTruthy();
    expect(token).toHaveClass('test-class');
  });
});
