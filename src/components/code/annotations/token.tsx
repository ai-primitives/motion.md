import React from "react";
import { InnerToken } from "@code-hike/lighter";
import { interpolate, useCurrentFrame } from "remotion";
import { AnnotationProps } from "../types";

export const tokenTransitions = {
  name: "token",
  render: ({ children, className, style }: AnnotationProps) => {
    const frame = useCurrentFrame();

    // Fade in animation
    const opacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Scale animation
    const scale = interpolate(frame, [0, 10], [0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Position animation
    const translateY = interpolate(frame, [0, 10], [10, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <InnerToken
        merge={{
          className,
          style: {
            ...style,
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`,
            transition: "all 0.3s cubic-bezier(0.17, 0.67, 0.76, 0.91)",
          },
        }}
      >
        {children}
      </InnerToken>
    );
  },
};
