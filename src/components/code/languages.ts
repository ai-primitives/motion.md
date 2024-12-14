import { getHighlighter, type BundledLanguage, type Highlighter } from 'shiki';

let highlighterInstance: Highlighter | null = null;

async function getOrCreateHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await getHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript',
        'typescript',
        'python',
        'java',
        'go',
        'rust',
        'cpp',
        'c',
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
        'shellscript',
        'dockerfile'
      ] as BundledLanguage[]
    });
  }
  return highlighterInstance;
}

export const languageSupport = {
  javascript: async () => (await getOrCreateHighlighter()).loadLanguage('javascript' as BundledLanguage),
  typescript: async () => (await getOrCreateHighlighter()).loadLanguage('typescript' as BundledLanguage),
  python: async () => (await getOrCreateHighlighter()).loadLanguage('python' as BundledLanguage),
  java: async () => (await getOrCreateHighlighter()).loadLanguage('java' as BundledLanguage),
  go: async () => (await getOrCreateHighlighter()).loadLanguage('go' as BundledLanguage),
  rust: async () => (await getOrCreateHighlighter()).loadLanguage('rust' as BundledLanguage),
  cpp: async () => (await getOrCreateHighlighter()).loadLanguage('cpp' as BundledLanguage),
  ruby: async () => (await getOrCreateHighlighter()).loadLanguage('ruby' as BundledLanguage),
  php: async () => (await getOrCreateHighlighter()).loadLanguage('php' as BundledLanguage),
  swift: async () => (await getOrCreateHighlighter()).loadLanguage('swift' as BundledLanguage),
  kotlin: async () => (await getOrCreateHighlighter()).loadLanguage('kotlin' as BundledLanguage),
  scala: async () => (await getOrCreateHighlighter()).loadLanguage('scala' as BundledLanguage),
  html: async () => (await getOrCreateHighlighter()).loadLanguage('html' as BundledLanguage),
  css: async () => (await getOrCreateHighlighter()).loadLanguage('css' as BundledLanguage),
  json: async () => (await getOrCreateHighlighter()).loadLanguage('json' as BundledLanguage),
  yaml: async () => (await getOrCreateHighlighter()).loadLanguage('yaml' as BundledLanguage),
  markdown: async () => (await getOrCreateHighlighter()).loadLanguage('markdown' as BundledLanguage),
  sql: async () => (await getOrCreateHighlighter()).loadLanguage('sql' as BundledLanguage),
  shell: async () => (await getOrCreateHighlighter()).loadLanguage('shellscript' as BundledLanguage),
  dockerfile: async () => (await getOrCreateHighlighter()).loadLanguage('dockerfile' as BundledLanguage),
} as const;

export async function loadLanguage(language: keyof typeof languageSupport): Promise<void> {
  try {
    await languageSupport[language]();
  } catch (error) {
    console.warn(`Failed to load language support for ${language}`);
  }
}

export async function preloadCommonLanguages(): Promise<void> {
  const commonLanguages: Array<keyof typeof languageSupport> = [
    'javascript',
    'typescript',
    'python',
    'java',
    'html',
    'css',
    'json',
    'markdown'
  ];

  await Promise.all(commonLanguages.map(loadLanguage));
}
