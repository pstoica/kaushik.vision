import React from 'react'
import { Link } from 'gatsby'
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
  height: 100%;
  max-width: 960px;
  padding: 0 12px;
  margin: 0 auto;
  text-align: center;
  text-transform: lowercase;
  font-size: 16px;

  background: ${theme.colors.secondary};

  a {
    color: ${theme.colors.primary};
  }
`

const Header = ({ siteTitle }) => (
  <Container>
    <Content>
      <Link to="/">vsk</Link>
    </Content>
  </Container>
)

export default Header
