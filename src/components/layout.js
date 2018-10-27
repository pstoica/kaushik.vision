import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import { injectGlobal } from 'emotion'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import { normalize, opacify } from 'polished'

import theme from '../theme'
import Header from './header'

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
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.black};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    margin: 0;
  }

  ::selection {
    background-color: ${opacify(-0.8, theme.colors.secondary)};
  }
`

const Container = styled('div')`
  padding: 60px 12px 0;
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
      }
    `}
    render={({ datoCmsSite: site }) => (
      <ThemeProvider theme={theme}>
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

          <Container>{children}</Container>
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
export { theme }