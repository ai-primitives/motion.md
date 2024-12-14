import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeTransition } from './transition';
import { preloadCommonLanguages } from './languages';

// Mock Remotion hooks
vi.mock('remotion', () => ({
  useCurrentFrame: () => 15,
  interpolate: vi.fn((input, inputRange, outputRange) => input),
  Easing: {
    bezier: () => (t: number) => t,
  },
  continueRender: vi.fn(),
  delayRender: () => 'mock-handle',
}));

describe('CodeTransition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders code with transitions', async () => {
    await act(async () => {
      await preloadCommonLanguages();
    });

    const oldCode = {
      code: 'const x = 1;',
      language: 'typescript',
      tokens: [],
      annotations: [],
    };

    const newCode = {
      code: 'const x = 2;',
      language: 'typescript',
      tokens: [],
      annotations: [],
    };

    const { container } = render(
      <CodeTransition
        oldCode={oldCode}
        newCode={newCode}
        durationInFrames={30}
      />
    );

    expect(container.querySelector('pre')).toBeTruthy();
  });

  it('handles language transitions', async () => {
    await act(async () => {
      await preloadCommonLanguages();
    });

    const oldCode = {
      code: 'const x = 1;',
      language: 'typescript',
      tokens: [],
      annotations: [],
    };

    const newCode = {
      code: 'def x = 1',
      language: 'python',
      tokens: [],
      annotations: [],
    };

    const { container } = render(
      <CodeTransition
        oldCode={oldCode}
        newCode={newCode}
        durationInFrames={30}
      />
    );

    expect(container.querySelector('pre')).toBeTruthy();
  });

  it('handles null oldCode', async () => {
    await act(async () => {
      await preloadCommonLanguages();
    });

    const newCode = {
      code: 'const x = 1;',
      language: 'typescript',
      tokens: [],
      annotations: [],
    };

    const { container } = render(
      <CodeTransition
        oldCode={null}
        newCode={newCode}
        durationInFrames={30}
      />
    );

    expect(container.querySelector('pre')).toBeTruthy();
  });

  it('applies custom theme', async () => {
    await act(async () => {
      await preloadCommonLanguages();
    });

    const customTheme = {
      background: '#000000',
      text: '#ffffff',
    };

    const newCode = {
      code: 'const x = 1;',
      language: 'typescript',
      tokens: [],
      annotations: [],
    };

    const { container } = render(
      <CodeTransition
        oldCode={null}
        newCode={newCode}
        durationInFrames={30}
        theme={customTheme}
      />
    );

    const pre = container.querySelector('pre');
    expect(pre).toBeTruthy();
    expect(pre?.style.backgroundColor).toBe('rgb(0, 0, 0)');
    expect(pre?.style.color).toBe('rgb(255, 255, 255)');
  });
});
