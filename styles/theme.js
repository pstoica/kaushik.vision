import { css } from "styled-components";
import { modularScale } from "polished";

const scale = 8;

const breakpoints = {
  xs: 0,
  sm: 32,
  md: 48,
  lg: 64,
};

export default {
  modularScale,
  scale,
  breakpoints,
  space: x => `${scale * x}px`,
  width: x => {
    return `width: ${(x * 100).toFixed(3)}%`;
  },
  media: Object.keys(breakpoints).reduce(
    (accumulator, label) => {
      // use em in breakpoints to work properly cross-browser and support users
      // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
      accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}em) {
        ${css(...args)}
      }
    `;
      return accumulator;
    },
    {},
  ),
  colors: {
    black: "#111",
    white: "#fff",
    blue: "#0033cc",
  },
  fonts: {
    primary: "'Noto Sans', sans-serif",
    secondary: "'Open Sans', sans-serif",
  },
  easings: {
    cubicIn: "cubic-bezier(0.42, 0.0, 1.0, 1.0)",
    cubicInOut: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
  },
  maxWidth: "80em",
};
