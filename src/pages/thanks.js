import React, { useEffect } from 'react'
import { useAction } from 'easy-peasy'
import Layout, { theme } from '../components/Layout'
import styled from 'react-emotion'

const Message = styled('div')`
  font-size: ${theme.fontSize[5]};
  max-width: 600px;
  margin: ${theme.scale[4]} auto 0;
  text-align: center;
  color: ${theme.colors.gray};
`

const ThanksPage = () => {
  const clearCart = useAction(dispatch => dispatch.cart.clear)
  useEffect(() => {
    clearCart()
  }, 0)

  return (
    <Layout>
      <Message>thank you for your order!</Message>
    </Layout>
  )
}

export default ThanksPage
