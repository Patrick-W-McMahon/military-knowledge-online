import React, { Fragment } from "react";
import Layout from '../../components/layout';
import Seo from "../../components/seo";

const AppView = () => {
    return (
        <Fragment>
          <Layout>
            <Seo title={`app`} />
            <p>app view</p>
          </Layout>
        </Fragment>
      );
}

export default AppView;