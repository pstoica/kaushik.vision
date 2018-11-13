require('dotenv-extended').load()

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          // 'karla:400,400i,700',
          'cardo:400,400i,700',
          // 'montserrat:400,400i,700',
          // 'josefin sans:400,400i,700',
        ],
      },
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: false,
        disableLiveReload: false,
      },
    },
  ],
}
