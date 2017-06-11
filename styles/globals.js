import { injectGlobal } from "styled-components";
import { normalize } from "polished";

injectGlobal`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Hind:300,400,600|Open+Sans:300,400,600,700');

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Hind', sans-serif;
    margin: 0;
  }
`;
