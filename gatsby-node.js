const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsProduct {
          edges {
            node {
              sku
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsProduct.edges.map(({ node }) => {
        createPage({
          path: `products/${node.sku}`,
          component: path.resolve(`./src/layouts/Product.js`),
          context: node,
        })
      })

      resolve()
    })
  })
}
