import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import Layout, { theme } from '../components/Layout'

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

const ImageContainer = styled('div')(
  theme.mq({
    width: ['100%', '50%'],
    padding: `0 0 ${theme.scale[4]}`,
  })
)

const Thumbnails = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: ${theme.scale[1]} -${theme.scale[1]} 0;

  button {
    ${theme.mq({
      width: ['25%', '33.33%', '25%'].map(x => `calc(${x} - 8px)`),
    })};
    appearance: none;
    background: transparent;
    outline: 0;
    border: none;
    margin: 0;
    padding: 0;
    line-height: 0;
    margin: ${theme.scale[1]};
    cursor: pointer;
    opacity: 0.4;
    transition: opacity 0.15s ease-in;

    &:hover,
    &:focus {
      opacity: 0.6;
    }

    &.active {
      opacity: 1;
    }
  }
`

const ImageSection = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0)

  const HiddenImages = styled('div')`
    width: 0;
    height: 0;
  `

  return (
    <ImageContainer>
      <a
        href={images[activeImage].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Img sizes={images[activeImage].sizes} />
      </a>
      <Thumbnails>
        {images.map((x, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={i === activeImage ? 'active' : null}
          >
            <Img fluid={x.thumbnailSizes} />
          </button>
        ))}
      </Thumbnails>
      <HiddenImages>
        {images.map((x, i) => (
          <Img key={i} sizes={x.sizes} />
        ))}
      </HiddenImages>
    </ImageContainer>
  )
}

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

const WorkPage = ({ data: { product }, store, addItem }) => {
  return (
    <Layout>
      <Container>
        <ImageSection images={product.images} />
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
            <Button onClick={() => addItem(product.sku)}>Add to cart</Button>
          </Purchase>
        </Info>
      </Container>
    </Layout>
  )
}

export default connect(
  state => ({
    store: state,
  }),
  dispatch => ({
    addItem: sku => dispatch({ type: 'ADD_ITEM', sku }),
  })
)(WorkPage)

export const pageQuery = graphql`
  query WorkPage($sku: String!) {
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
          ...GatsbyDatoCmsSizes_noBase64
        }
        thumbnailSizes: fluid(
          maxWidth: 120
          maxHeight: 120
          imgixParams: { fm: "jpg", auto: "compress" }
        ) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`
