import React from "react";
import { InnerToken } from "@code-hike/lighter";
import { interpolate, useCurrentFrame } from "remotion";
import { AnnotationProps } from "../types";

export const callout = {
  name: "callout",
  render: ({ children }: AnnotationProps) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1]);
    const scale = interpolate(frame, [0, 15], [0.95, 1]);

    return (
      <InnerToken
        merge={{
          style: {
            backgroundColor: "rgba(62, 184, 255, 0.2)",
            borderRadius: "3px",
            padding: "2px 4px",
            opacity,
            transform: `scale(${scale})`,
          }
        }}
      >
        {children}
      </InnerToken>
    );
  },
};
