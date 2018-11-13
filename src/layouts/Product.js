import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useStore, useAction } from 'easy-peasy'
import styled from 'react-emotion'

import Layout, { theme } from '../components/Layout'
import Button from '../components/Button'

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
  padding: ${theme.scale[4]} 0 ${theme.scale[2]};
`

const Title = styled('h2')`
  font-size: ${theme.fontSize[5]};
  text-transform: lowercase;
`

const Dimensions = styled('div')`
  font-size: ${theme.fontSize[3]};
  color: ${theme.colors.gray};
  font-weight: lighter;
  margin: 1em 0;
`

const Price = styled('h3')`
  font-size: ${theme.fontSize[4]};
  padding: ${theme.scale[2]} ${theme.scale[2]} ${theme.scale[2]} 0;
`

const Description = styled('div')``

const WorkPage = ({ data: { product } }) => {
  const { itemsInCart, inventory } = useStore(store => ({
    itemsInCart: store.cart.items,
    inventory: store.inventory,
  }))
  const { addItem, removeItem } = useAction(dispatch => ({
    addItem: dispatch.cart.add,
    removeItem: dispatch.cart.remove,
  }))

  const isRemoving = itemsInCart.includes(product.id)
  const buttonAction = isRemoving ? removeItem : addItem

  const isSoldOut = inventory[product.id] === 0

  return (
    <Layout>
      <Container>
        <ImageSection images={product.images} />
        <Info>
          <Title>{product.name}</Title>
          <Description
            dangerouslySetInnerHTML={{
              __html: product.descriptionNode.childMarkdownRemark.html,
            }}
          />
          <Dimensions>{product.dimensions}</Dimensions>
          <Purchase>
            <Price>${product.price}</Price>
            {!!inventory[product.id] && (
              <Button
                onClick={() => buttonAction(product.id)}
                disabled={isSoldOut}
              >
                {isSoldOut
                  ? 'Sold out'
                  : `${isRemoving ? 'Remove from' : 'Add to'} cart`}
              </Button>
            )}
          </Purchase>
        </Info>
      </Container>
    </Layout>
  )
}

export default WorkPage

export const pageQuery = graphql`
  query WorkPage($sku: String!) {
    # Select the post which equals this id.
    product: datoCmsProduct(sku: { eq: $sku }) {
      id: originalId
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
          imgixParams: { fm: "jpg", auto: "compress", fit: "crop" }
        ) {
          ...GatsbyDatoCmsSizes_noBase64
        }
        thumbnailSizes: fluid(
          maxWidth: 120
          maxHeight: 120
          imgixParams: { fm: "jpg", auto: "compress", fit: "crop" }
        ) {
          ...GatsbyDatoCmsFluid_noBase64
        }
      }
    }
  }
`
