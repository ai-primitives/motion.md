import React from 'react';
import { Sequence } from 'remotion';
import { CodeTransition } from '../transition';

const typescriptExample = {
  code: `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`,
  language: 'typescript',
  tokens: [],
  annotations: [],
};

const pythonExample = {
  code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  language: 'python',
  tokens: [],
  annotations: [],
};

const rustExample = {
  code: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
  language: 'rust',
  tokens: [],
  annotations: [],
};

export const CodeTransitionDemo: React.FC = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1b26' }}>
      <Sequence from={0} durationInFrames={30}>
        <CodeTransition
          oldCode={null}
          newCode={typescriptExample}
          durationInFrames={30}
        />
      </Sequence>

      <Sequence from={30} durationInFrames={30}>
        <CodeTransition
          oldCode={typescriptExample}
          newCode={pythonExample}
          durationInFrames={30}
        />
      </Sequence>

      <Sequence from={60} durationInFrames={30}>
        <CodeTransition
          oldCode={pythonExample}
          newCode={rustExample}
          durationInFrames={30}
        />
      </Sequence>
    </div>
  );
};
