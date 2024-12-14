import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadLanguage, preloadCommonLanguages } from './languages';

describe('Language Support', () => {
  beforeEach(() => {
    // Clear module cache between tests
    vi.resetModules();
  });

  it('loads individual languages', async () => {
    await expect(loadLanguage('typescript')).resolves.not.toThrow();
    await expect(loadLanguage('python')).resolves.not.toThrow();
    await expect(loadLanguage('javascript')).resolves.not.toThrow();
  });

  it('preloads common languages', async () => {
    await expect(preloadCommonLanguages()).resolves.not.toThrow();
  });

  it('handles invalid language gracefully', async () => {
    // @ts-expect-error Testing invalid language
    await expect(loadLanguage('invalid-language')).resolves.not.toThrow();
  });

  it('loads all supported languages', async () => {
    const languages = [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'rust',
      'cpp',
      'ruby',
      'php',
      'swift',
      'kotlin',
      'scala',
      'html',
      'css',
      'json',
      'yaml',
      'markdown',
      'sql',
      'shell',
      'dockerfile',
    ] as const;

    for (const lang of languages) {
      await expect(loadLanguage(lang)).resolves.not.toThrow();
    }
  });
});
