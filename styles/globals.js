import { injectGlobal } from "styled-components";
import { normalize } from "polished";
import theme from "./theme";
import slick from "./slick";

injectGlobal`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:300,400,600|Open+Sans:300,400,600,700');

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    font-family: ${theme.fonts.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.primary};
    margin: 0;
  }
`;
