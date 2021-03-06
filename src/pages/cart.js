import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useStore, useAction } from 'easy-peasy'
import styled from 'react-emotion'

import Button from '../components/Button'
import theme from '../theme'
import lib from '../stdlib'

const Container = styled('div')`
  max-width: 600px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  ${theme.mq({
    justifyContent: ['flex-start', 'center']
  })};
`

const Message = styled('div')`
  font-size: ${theme.fontSize[5]};
  text-align: center;
  color: ${theme.colors.gray};
  ${theme.mq({
    padding: ['64px 0 0', 0]
  })};
`

const Item = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.gray};
  padding: ${theme.scale[3]} 0;

  .gatsby-image-wrapper {
    width: 100px;
    flex-shrink: 0;
  }
`

const Name = styled('div')`
  margin: 0 ${theme.scale[3]};
  font-size: ${theme.fontSize[4]};
  flex: 1 1 auto;
`

const Price = styled('div')`
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize[4]};
  text-align: right;
`

const RemoveButton = styled('button')`
  appearance: none;
  outline: none;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize[3]};
  font-family: ${theme.fonts.primary};
  cursor: pointer;
`

const Summary = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding: ${theme.scale[3]} 0;
  color: ${theme.colors.black};
  font-size: ${theme.fontSize[4]};
`

const Checkout = styled('div')`
  text-align: center;
  margin: ${theme.scale[4]} 0;
`

const Error = styled('div')`
  text-align: center;
  color: ${theme.colors.gray};
`

const CartPage = ({ data: { allDatoCmsProduct } }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const hasSynced = useStore(store => store.hasSynced)

  const idToItem = {}
  allDatoCmsProduct.edges.forEach(({ node }) => {
    idToItem[node.id] = node
  })
  const removeItem = useAction(dispatch => dispatch.cart.remove)

  const items = useStore(store => store.cart.items)
  const itemsInCart = items.map(x => idToItem[x]).filter(x => !!x);

  if (!hasSynced) {
    return <Layout />
  }

  const total = itemsInCart.reduce((sum, x) => sum + x.price, 0)

  const onCheckout = () => {
    setLoading(true)
    setError(null)

    lib.sunupnyc.h2o['@0.0.1']
      .checkout(items)
      .then(result => {
        window.location = result.checkout_page_url
      })
      .catch(err => {
        setLoading(false)
        setError('something went wrong when placing your order')
      })
  }

  if (itemsInCart.length > 0) {
    return (
      <Layout>
        <Container>
          {itemsInCart.map(item => {
            return (
              <Item key={item.id}>
                <Link to={`/products/${item.sku}`}>
                  <Img fluid={item.images[0].fluid} />
                </Link>
                <Name>{item.name}</Name>
                <Price>
                  <div>${item.price}</div>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    remove
                  </RemoveButton>
                </Price>
              </Item>
            )
          })}
          <Summary>${total.toFixed(2).replace('.00', '')}</Summary>

          <Checkout>
            <Button disabled={loading} onClick={onCheckout}>
              {loading ? 'loading...' : 'continue to checkout'}
            </Button>
          </Checkout>

          <Error>{error}</Error>
        </Container>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Container>
          <Message>your cart is <br />empty</Message>
        </Container>
      </Layout>
    )
  }
}

export default CartPage

// prettier-ignore
export const pageQuery = graphql`
  {
    allDatoCmsProduct {
      edges {
        node {
          id: originalId
          name
          sku
          price
          images {
            url
            fluid(maxWidth: 120, maxHeight: 120, imgixParams: { fm: "jpg", auto: "compress", fit: "crop" }) {
              ...GatsbyDatoCmsFluid_noBase64
            }
          }
        }
      }
    }
  }
`
