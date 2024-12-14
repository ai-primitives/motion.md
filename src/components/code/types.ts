import { ReactNode } from "react";
import { HighlightedCode } from "@code-hike/lighter";
import type { TokenTransitionsSnapshot } from "@code-hike/lighter";
import React from "react";

export interface CodeTransitionProps {
  oldCode: HighlightedCode | null;
  newCode: HighlightedCode;
  durationInFrames?: number;
  theme?: ThemeConfig;
}

export interface ThemeConfig {
  background: string;
  text: string;
  primary: string;
  lineNumbers: string;
  comments: string;
  types: string;
  strings: string;
  keywords: string;
  functions: string;
  numbers: string;
}

export interface TransitionState {
  oldSnapshot: TokenTransitionsSnapshot | null;
  handlers: Array<{
    name: string;
    render: (props: AnnotationProps) => React.ReactElement;
  }>;
}

export interface AnnotationProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
