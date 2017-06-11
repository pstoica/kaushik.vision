import styled, { ThemeProvider } from "styled-components";
import { py } from "styled-components-spacing";
import Header from "./Header";

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    black: "#111",
    white: "#fff",
    blue: "#0033cc",
  },
  maxWidth: "80em",
};

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  ${py(3)};
`;

export default ({ children, ...props }) => (
  <ThemeProvider theme={theme} {...props}>
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  </ThemeProvider>
);
