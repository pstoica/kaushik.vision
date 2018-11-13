import React from 'react'
import Layout, { theme } from '../components/Layout'
import styled from 'react-emotion'

const Message = styled('div')`
  font-size: ${theme.fontSize[5]};
  max-width: 600px;
  margin: ${theme.scale[4]} auto 0;
  text-align: center;
  color: ${theme.colors.gray};
`

const NotFoundPage = () => (
  <Layout>
    <Message>page not found</Message>
  </Layout>
)

export default NotFoundPage
