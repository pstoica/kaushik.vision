import Link from "next/link";

import styled from "styled-components";

const Header = styled.header`
  background-color: ${props => props.theme.colors.blue};
  text-transform: lowercase;
  height: 80px;

  a {
    color: ${props => props.theme.colors.white};
    box-shadow: 0 0 transparent;
    transition: box-shadow 0.2s ${props => props.theme.easings.cubicInOut};
  }

  a:hover {
    box-shadow: 0px 1px ${props => props.theme.colors.white};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${p => p.theme.space(3)};
`;

const SiteTitle = styled.h1`
  font-size: ${p => p.theme.modularScale(2)};
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
        padding: ${p => p.theme.space(3)} 0;
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
