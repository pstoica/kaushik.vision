import React, { useEffect } from 'react'
import { useAction } from 'easy-peasy'
import Layout, { theme } from '../components/Layout'
import styled from 'react-emotion'

const Container = styled('div')`
  max-width: 600px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  display: flex;
  text-align: center;
  flex-direction: column;
  ${theme.mq({
    justifyContent: ['flex-start', 'center']
  })};
`

const Message = styled('div')`
  font-size: ${theme.fontSize[5]};
  color: ${theme.colors.gray};
  ${theme.mq({
    padding: ['64px 0 0', 0]
  })};
`

// const Message = styled('div')`
//   font-size: ${theme.fontSize[5]};
//   max-width: 600px;
//   margin: ${theme.scale[4]} auto 0;
//   text-align: center;
//   color: ${theme.colors.gray};
// `

const ThanksPage = () => {
  const clearCart = useAction(dispatch => dispatch.cart.clear)
  useEffect(() => {
    clearCart()
  }, 0)

  return (
    <Layout>
      <Container>
        <Message>thank you for your order!</Message>
        <p small>check your email for a receipt</p>
      </Container>
    </Layout>
  )
}

export default ThanksPage
