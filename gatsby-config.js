module.exports = {
  siteMetadata: {
    title: `HardwareStore`,
    description: `Prodejna Elektroniky a PC Hardwaru`,
    author: `Vojtěch Pavelka`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./src/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/cart.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-portal`,
    `gatsby-plugin-styled-components`,
  ],
};
