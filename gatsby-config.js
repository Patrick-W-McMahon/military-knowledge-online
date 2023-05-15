module.exports = {
    siteMetadata: {
        titleLong: `Military Knowledge Online`,
        title: `Military Knowledge Online`,
        titleShort: `MKO`,
        description: `Central knowledge hub & workspace for military web services`,
        author: `Patrick W. McMahon`,
        siteUrl: `https://github.com/Patrick-W-McMahon/military-knowledge-online`,
        footerText: `DISCLAIMER! This is a Third Party Site. While most (not ALL) links on this website link to Official U.S. Military/Government websites; it is not endorsed or maintained by the U.S. Military/Government.`
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