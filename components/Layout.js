import Head from "next/head";
import styled, { css, ThemeProvider } from "styled-components";
import { Flex, Box } from "grid-styled/dist/index.js";
import { modularScale } from "polished";

import Header from "./Header";

const scale = 8;

const breakpoints = {
  xs: 0,
  sm: 32,
  md: 48,
  lg: 64,
};

const theme = {
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
  easings: {
    cubicIn: "cubic-bezier(0.42, 0.0, 1.0, 1.0)",
    cubicInOut: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
  },
  maxWidth: "80em",
};

const Container = styled.div`
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  padding: ${p => p.theme.space(2)};

  ${p => p.theme.media.lg`padding: ${p => p.theme.space(6)} ${p => p.theme.space(2)}`}
`;

export default ({ children, title, ...props }) => (
  <ThemeProvider theme={theme} {...props}>
    <div>
      <Head>
        <title>{title ? `${title} | ` : ""}Vision Kaushik</title>
      </Head>
      <Header />
      <Container>
        {children}
      </Container>
    </div>
  </ThemeProvider>
);
