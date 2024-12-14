declare module "@code-hike/lighter" {
  import { ReactNode } from "react";

  export interface CustomTokenProps {
    className?: string;
    style?: React.CSSProperties;
  }

  export interface InnerTokenProps {
    merge: CustomTokenProps;
    children: ReactNode;
  }

  export interface HighlightedCode {
    code: string;
    language: string;
    tokens: Array<any>;
    annotations: Array<any>;
  }

  export interface PreProps {
    ref?: React.RefObject<HTMLPreElement>;
    code: HighlightedCode | {
      code: string;
      language: string;
    };
    handlers?: Array<{
      name: string;
      render: (props: any) => React.ReactElement;
    }>;
    style?: React.CSSProperties;
  }

  export interface TokenTransitionsSnapshot {
    tokens: Array<any>;
    annotations: Array<any>;
  }

  export interface TransitionKeyframe {
    element: HTMLElement;
    keyframes: Keyframe[];
    options: {
      delay: number;
      duration: number;
    };
  }

  export function getStartingSnapshot(element: HTMLElement): TokenTransitionsSnapshot;
  export function calculateTransitions(
    element: HTMLElement,
    snapshot: TokenTransitionsSnapshot
  ): Array<TransitionKeyframe>;

  export const Pre: React.FC<PreProps>;
  export const InnerToken: React.FC<InnerTokenProps>;

  export interface TokenColor {
    scope: string[] | string;
    settings: {
      foreground?: string;
      fontStyle?: string;
    };
  }

  export interface ThemeColors {
    colorScheme: string;
    foreground: string;
    background: string;
    editor: {
      background: string;
      foreground: string;
      lineHighlightBackground: string;
      rangeHighlightBackground: string;
      infoForeground: string;
      selectionBackground: string;
      tokenColors: TokenColor[];
    };
    editorLineNumber: {
      foreground: string;
    };
  }

  export function getThemeColors(theme: Theme): Promise<ThemeColors>;
  export type Theme = string;
}

declare module "@code-hike/mdx" {
  export interface LanguageSupport {
    [key: string]: () => Promise<any>;
  }

  export const languages: LanguageSupport;
}
