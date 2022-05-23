import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import '../style/bootstrap.min.css';
import '../style/fontawesome-free-5.15.4-web/css/all.min.css';
import './layout.css';
import '../style/style.css';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql `
      query {
        site {
          siteMetadata {
            title
          }
        },
        allBranch {
          nodes {
            name
            seal
            path
          }
        }
      }
    `);

    const { site, allBranch } = data;
    return (
      <Fragment>
        <Header siteTitle={site.siteMetadata?.title || `Title`} militaryBranches={allBranch.nodes || []} />
        <div className="page-wrapper">
          <div className="main-content">{children}</div>
          {/*<footer>©{new Date().getFullYear()}&middot; Built with <a href="https://www.gatsbyjs.com">Gatsby</a></footer>*/}
          <Footer />
        </div>
      </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;