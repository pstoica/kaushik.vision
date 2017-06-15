import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

import Header from "./Header";

const Container = styled.div`
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  padding: ${p => p.theme.space(2)};
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
