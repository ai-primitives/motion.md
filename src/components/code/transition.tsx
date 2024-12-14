import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Easing, interpolate, useCurrentFrame, continueRender, delayRender } from "remotion";
import { Pre, type HighlightedCode } from "@code-hike/lighter";
import {
  calculateTransitions,
  getStartingSnapshot,
  type TokenTransitionsSnapshot,
} from "@code-hike/lighter";
import { CodeTransitionProps } from "./types";
import { defaultTheme } from "./theme";
import { tokenTransitions } from "./annotations/token";
import { errorInline, errorMessage } from "./annotations/error";
import { callout } from "./annotations/callout";
import { preloadCommonLanguages } from "./languages";

const DEFAULT_DURATION = 30;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_LINE_HEIGHT = 1.5;
const DEFAULT_TAB_SIZE = 2;

export function CodeTransition({
  oldCode,
  newCode,
  durationInFrames = DEFAULT_DURATION,
  theme = defaultTheme,
}: CodeTransitionProps) {
  const frame = useCurrentFrame();
  const ref = useRef<HTMLPreElement>(null);
  const [oldSnapshot, setOldSnapshot] = useState<TokenTransitionsSnapshot | null>(null);
  const [handle] = useState(() => delayRender());
  const [error, setError] = useState<Error | null>(null);

  const prevCode = useMemo(() => {
    if (!oldCode) {
      return {
        code: "",
        language: newCode.language,
        tokens: [],
        annotations: [],
      };
    }
    return oldCode;
  }, [oldCode, newCode.language]);

  const code = useMemo(() => {
    if (error) {
      return {
        code: "Error loading code transition",
        language: "text",
        tokens: [],
        annotations: [],
      };
    }
    return oldSnapshot ? newCode : prevCode;
  }, [newCode, prevCode, oldSnapshot, error]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        await preloadCommonLanguages();
      } catch (error) {
        console.error("Failed to preload languages:", error);
        setError(error as Error);
      }
      continueRender(handle);
    };
    loadLanguages();
  }, [handle]);

  useEffect(() => {
    if (!ref.current || !oldCode) {
      return;
    }

    try {
      const snapshot = getStartingSnapshot(ref.current);
      setOldSnapshot(snapshot);
    } catch (error) {
      console.error("Failed to get starting snapshot:", error);
      setError(error as Error);
    }
  }, [oldCode]);

  useLayoutEffect(() => {
    if (!oldSnapshot || !ref.current || error) {
      return;
    }

    try {
      const transitions = calculateTransitions(ref.current, oldSnapshot);
      transitions.forEach(({ element, keyframes, options }) => {
        const delay = durationInFrames * options.delay;
        const duration = durationInFrames * options.duration;

        const linearProgress = interpolate(frame, [delay, delay + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const progress = interpolate(linearProgress, [0, 1], [0, 1], {
          easing: Easing.bezier(0.17, 0.67, 0.76, 0.91),
        });

        element.animate(keyframes, {
          duration: (duration * 1000) / 30,
          delay: (delay * 1000) / 30,
          easing: "cubic-bezier(0.17, 0.67, 0.76, 0.91)",
          fill: "both",
        });
      });
    } catch (error) {
      console.error("Failed to calculate transitions:", error);
      setError(error as Error);
    }

    continueRender(handle);
  }, [frame, oldSnapshot, durationInFrames, handle, error]);

  const handlers = useMemo(() => {
    return [tokenTransitions, callout, errorInline, errorMessage];
  }, []);

  const style: React.CSSProperties = useMemo(() => {
    return {
      position: "relative",
      fontSize: DEFAULT_FONT_SIZE,
      lineHeight: DEFAULT_LINE_HEIGHT,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      tabSize: DEFAULT_TAB_SIZE,
      backgroundColor: theme.background,
      color: theme.text,
      ...(error && {
        border: "1px solid #ff0000",
        padding: "1rem",
        borderRadius: "4px",
      }),
    };
  }, [theme, error]);

  if (error) {
    return (
      <div style={{ color: "#ff0000", padding: "1rem" }}>
        Error: {error.message}
      </div>
    );
  }

  const preRef = ref as unknown as React.RefObject<HTMLPreElement>;
  return <Pre ref={preRef} code={code} handlers={handlers} style={style} />;
}
