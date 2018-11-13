import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import styled from 'react-emotion'

import Layout, { theme } from '../components/Layout'

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -${theme.scale[2]};
`

const Artwork = styled(({ to, children, ...props }) => (
  <div {...props}>
    <Link to={to}>{children}</Link>
  </div>
))`
  display: flex;
  flex-direction: column;
  padding: 0px 8px 12px;

  ${theme.mq({ width: ['50%', '33.333%'] })};
`

const Details = styled('div')`
  color: ${theme.colors.black};
  padding: ${theme.scale[1]} 0;
  text-transform: lowercase;
  line-height: 1.3;
`

const Title = styled('h2')`
  padding-top: ${theme.scale[1]};
  font-size: ${theme.fontSize[3]};
`

const Price = styled('div')`
  font-size: ${theme.fontSize[2]};
  padding-top: ${theme.scale[2]};
  color: ${theme.colors.gray};
`

const IndexPage = ({ data }) => (
  <Layout>
    <Container>
      {data.allDatoCmsProduct.edges.map(({ node }) => (
        <Artwork to={'/products/' + node.sku} key={node.sku}>
          <Img sizes={node.images[0].sizes} />
          <Details>
            <Title>{node.name}</Title>
            <Price>${node.price}</Price>
          </Details>
        </Artwork>
      ))}
    </Container>
  </Layout>
)

export default IndexPage

// prettier-ignore
export const pageQuery = graphql`
  {
    allDatoCmsProduct(sort: { fields: [updatedAt], order: DESC }) {
      edges {
        node {
          name
          sku
          description
          price
          images {
            url
            sizes(maxWidth: 500, maxHeight: 500, imgixParams: { bg: "f3fbf6", fm: "jpg", fit: "crop" }) {
              ...GatsbyDatoCmsSizes_noBase64
            }
          }
        }
      }
    }
  }
`
