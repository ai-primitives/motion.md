import React from "react";
import { InnerToken } from "@code-hike/lighter";
import { interpolate, useCurrentFrame } from "remotion";
import { AnnotationProps } from "../types";

export const errorInline = {
  name: "error-inline",
  render: ({ children }: AnnotationProps) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1]);

    return (
      <InnerToken
        merge={{
          style: {
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            textDecoration: "wavy underline red",
            opacity,
          }
        }}
      >
        {children}
      </InnerToken>
    );
  },
};

export const errorMessage = {
  name: "error-message",
  render: ({ children }: AnnotationProps) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 15], [0, 1]);

    return (
      <div
        style={{
          color: "#ff0000",
          fontSize: "0.9em",
          marginTop: "0.5em",
          opacity,
        }}
      >
        {children}
      </div>
    );
  },
};
