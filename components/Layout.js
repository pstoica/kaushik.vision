import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

import Header from "./Header";

const Container = styled.div`
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  padding: ${p => p.theme.space(2)};
`;

const Details = styled.div`
  text-align: center;
  margin: ${p => `${p.theme.space(2)} 0 ${p.theme.space(4)}`};
`;

const Title = styled.h2`
  text-transform: lowercase;
  font-size: ${p => p.theme.modularScale(4)};
  font-weight: bold;
  margin-bottom: ${p => p.theme.space(1)};
`;

const Description = styled.div``;

export default ({ children, pageTitle, title, subtitle, ...props }) =>
  <ThemeProvider theme={theme} {...props}>
    <div>
      <Head>
        <title>
          {title || pageTitle ? `${title || pageTitle} | ` : ""}Vision Kaushik
        </title>
      </Head>
      <Header />
      <Container>
        {title &&
          <Details>
            <Title>{title}</Title>
            <Description>{subtitle}</Description>
          </Details>}
        {children}
      </Container>
    </div>
  </ThemeProvider>;
