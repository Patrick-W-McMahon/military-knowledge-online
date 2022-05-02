import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import '../style/bootstrap.min.css';
import '../style/fontawesome-free-5.15.4-web/css/all.min.css';
import './layout.css';
import '../style/style.css';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql `
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `);

    return (
      <Fragment>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} militaryDepartments={[]} />
        <div className="page-wrapper">
          <div className="main-content">{children}</div>
          <footer>©{new Date().getFullYear()}&middot; Built with <a href="https://www.gatsbyjs.com">Gatsby</a></footer>
        </div>
      </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;