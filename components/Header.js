import Link from "next/link";

import styled from "styled-components";
import { p, px, py } from "styled-components-spacing";
import { modularScale } from "polished";

const Header = styled.header`
  background-color: ${props => props.theme.colors.blue};
  text-transform: lowercase;
  height: 80px;

  a {
    color: ${props => props.theme.colors.white};
    box-shadow: 0 0 transparent;
    transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1.000);
  }

  a:hover {
    box-shadow: 0px 1px ${props => props.theme.colors.white};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  ${px(3)};
`;

const SiteTitle = styled.h1`
  font-size: ${modularScale(2)};
  font-weight: 500;
  flex: auto 1;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Nav = styled.div`
  height: 100%;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    height: 100%;
    margin: 0;

    li {
      display: inline-block;
      margin-left: 2em;
      font-weight: 300;

      a {
        ${py(1)};
      }
    }
  }
`;

const ListLink = ({ href, as, children }) => (
  <li>
    <Link href={href} as={as}>
      <a>
        {children}
      </a>
    </Link>
  </li>
);

const Category = ({ name, children }) => (
  <ListLink href={`/work?category=${name}`} as={`/category/${name}`}>
    {children}
  </ListLink>
);

export default () => {
  return (
    <Header>
      <Container>
        <SiteTitle>
          <Link href="/index" as="/">
            <a>Vision Sharma Kaushik</a>
          </Link>
        </SiteTitle>
        <Nav>
          <ul>
            <Category name="ceramics">Ceramics</Category>
            <Category name="painting">Painting</Category>
            <Category name="photography">Photography</Category>
            <ListLink href="/sounds" as="/sounds">Sounds</ListLink>
            <ListLink href="/contact" as="/contact">Contact</ListLink>
          </ul>
        </Nav>
      </Container>
    </Header>
  );
};
