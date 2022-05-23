module.exports = {
    siteMetadata: {
        title: `Military Knowledge Online`,
        description: `Central knowledge hub for military web services`,
        author: `Patrick W. McMahon`,
        siteUrl: `https://github.com/Patrick-W-McMahon/military-knowledge-online`,
    },
    plugins: [
        `gatsby-plugin-no-sourcemaps`,
        "gatsby-plugin-slug",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/static/content/`
            }
        },
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages/`,
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        }
    ]
}