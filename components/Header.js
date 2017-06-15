import Link from "next/link";

import styled from "styled-components";

const Header = styled.header`
  background-color: ${props => props.theme.colors.blue};
  text-transform: lowercase;

  a {
    color: ${props => props.theme.colors.white};
    box-shadow: 0 0 transparent;
    transition: box-shadow 0.15s ${props => props.theme.easings.cubicIn};
    padding-bottom: 2px;
  }

  a:hover {
    box-shadow: 0px 1px ${props => props.theme.colors.white};
  }
`;

const Container = styled.div`
  height: 100%;
  max-width: ${p => p.theme.maxWidth};
  margin: 0 auto;
  padding: ${p => `${p.theme.space(8)} ${p.theme.space(1)}`};
  text-align: center;
  font-family: ${p => p.theme.fonts.primary};
`;

const SiteTitle = styled.h1`
  font-weight: bold;
  font-size: ${p => p.theme.modularScale(2)};
  ${p => p.theme.media.sm`font-size: ${p.theme.modularScale(3)};`}
  ${p => p.theme.media.md`font-size: ${p.theme.modularScale(4)};`}

  margin-bottom: ${p => p.theme.space(2)};
`;

const Nav = styled.div`
  font-size: ${p => p.theme.modularScale(-0.5)};
  ${p => p.theme.media.md`font-size: ${p.theme.modularScale(1)};`}
  font-weight: normal;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      margin-right: ${p => p.theme.space(1)};
      ${p => p.theme.media.sm`margin-right: ${p.theme.space(3)};`}

      &:last-child {
        margin-right: 0;
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

export default class extends React.Component {
  render() {
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
  }
}

// export default () => {
//   return (
//     <Header>
//       <Container>
//         <SiteTitle>
//           <Link href="/index" as="/">
//             <a>Vision Sharma Kaushik</a>
//           </Link>
//         </SiteTitle>
//         <Nav>
//           <ul>
//             <Category name="ceramics">Ceramics</Category>
//             <Category name="painting">Painting</Category>
//             <Category name="photography">Photography</Category>
//             <ListLink href="/sounds" as="/sounds">Sounds</ListLink>
//             <ListLink href="/contact" as="/contact">Contact</ListLink>
//           </ul>
//         </Nav>
//       </Container>
//     </Header>
//   );
// };
