import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { useAction } from 'easy-peasy'

import { injectGlobal } from 'emotion'
import styled from 'react-emotion'
import { normalize, opacify } from 'polished'

import theme from '../theme'
import Header from './Header'

injectGlobal`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.black};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    margin: 0;
  }

  ::selection {
    background-color: ${opacify(-0.8, theme.colors.primary)};
  }
`

const Container = styled(({ products, ...props }) => {
  const setDatoMap = useAction((dispatch) => dispatch.setDatoMap)

  useEffect(
    () => {
      setDatoMap(products.edges.map(x => x.node))
    },
    []
  )

  return <div {...props} />
})`
  padding: 60px 12px 60px;
  max-width: 960px;
  margin: 0 auto;
`

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        datoCmsSite {
          globalSeo {
            siteName
            fallbackSeo {
              title
              description
            }
          }
          faviconMetaTags {
            ...GatsbyDatoCmsFaviconMetaTags
          }
        }

        allDatoCmsProduct {
          edges {
            node {
              id: originalId
              name
              sku
              price
            }
          }
        }
      }
    `}
    render={({ datoCmsSite: site, allDatoCmsProduct: products }) => {
      return (
        <>
          <HelmetDatoCms
            title={site.globalSeo.fallbackSeo.title}
            meta={[
              {
                name: 'description',
                content: site.globalSeo.fallbackSeo.description,
              },
            ]}
            favicon={site.faviconMetaTags}
          />

          <Header siteTitle={site.globalSeo.siteName} />

          <Container products={products}>{children}</Container>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
export { theme }
