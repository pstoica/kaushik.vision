import React from 'react'
import { Link } from 'gatsby'
import { useStore } from 'easy-peasy'
import styled from 'react-emotion'

import theme from '../theme'

const Container = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1;
`

const Content = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 960px;
  padding: 0 12px;
  margin: 0 auto;
  text-align: center;
  text-transform: lowercase;
  font-size: ${theme.fontSize[4]};

  background: ${theme.colors.background};
`

const HomeLink = styled(Link)`
  color: ${theme.colors.primary};
`

const CartLink = styled(Link)`
  color: ${theme.colors.black};
  font-size: ${theme.fontSize[3]};
`

const Header = ({ siteTitle }) => {
  const itemsInCart = useStore(store => store.cart.items.length)

  return (
    <Container>
      <Content>
        <HomeLink to="/">vsk</HomeLink>
        {itemsInCart > 0 && (
          <CartLink to="/cart">cart ({itemsInCart})</CartLink>
        )}
      </Content>
    </Container>
  )
}

export default Header
