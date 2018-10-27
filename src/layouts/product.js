import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'

import Layout, { theme } from '../components/layout'

const Button = styled('button')`
  display: inline-block;
  border: 1px solid ${theme.colors.primary};
  padding: ${theme.scale[2]};
  background: transparent;
  color: ${theme.colors.primary};
  border-radius: 5px;
  text-transform: lowercase;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSize[4]};
  cursor: pointer;
`

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const Image = styled('div')(
  theme.mq({
    width: ['100%', '50%'],
    padding: `0 0 ${theme.scale[4]}`,
  })
)

const Info = styled('div')(
  theme.mq({
    padding: ['0', `0 ${theme.scale[3]}`],
    width: ['100%', '50%'],
  })
)

const Purchase = styled('div')`
  padding: ${theme.scale[3]} 0;
`

const Title = styled('h2')`
  font-size: ${theme.fontSize[5]};
  text-transform: lowercase;
`

const Dimensions = styled('div')`
  font-size: ${theme.fontSize[3]};
  font-family: ${theme.fonts.primary};
`

const Price = styled('h3')`
  font-size: ${theme.fontSize[4]};
  padding: ${theme.scale[2]} ${theme.scale[2]} ${theme.scale[2]} 0;
  font-family: ${theme.fonts.primary};
`

const Description = styled('div')``

const WorkPage = ({ data: { product } }) => (
  <Layout>
    <Container>
      <Image>
        <Img sizes={product.images[0].sizes} />
      </Image>
      <Info>
        <Title>{product.name}</Title>
        <Dimensions>{product.dimensions}</Dimensions>
        <Description
          dangerouslySetInnerHTML={{
            __html: product.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <Purchase>
          <Price>${product.price}</Price>
          <Button>Add to cart</Button>
        </Purchase>
      </Info>
    </Container>
  </Layout>
)

export default WorkPage

export const pageQuery = graphql`
  query Workpage($sku: String!) {
    # Select the post which equals this id.
    product: datoCmsProduct(sku: { eq: $sku }) {
      name
      sku
      price
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      dimensions
      images {
        url
        sizes(
          maxWidth: 600
          maxHeight: 600
          imgixParams: { fm: "jpg", auto: "compress" }
        ) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
