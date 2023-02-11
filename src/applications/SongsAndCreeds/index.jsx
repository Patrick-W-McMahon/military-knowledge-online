import React, { Fragment } from "react";
import { Alert } from 'react-bootstrap';
import Layout from '../../components/layout';
import Seo from "../../components/seo";

const AppView = () => {
    return (
        <Fragment>
          <Layout>
            <Seo title={`app`} />
            <Alert variant={'info'}>This app is still being developed.</Alert>
          </Layout>
        </Fragment>
      );
}

export default AppView;