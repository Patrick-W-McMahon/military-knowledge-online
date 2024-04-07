import React, { Fragment, useState } from "react";
//import { graphql } from "gatsby";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container } from 'react-bootstrap';

const initalState = {
  showModal: false
}

const Applications = ({ data, pageContext }) => {
  const [ state, setState] = useState(initalState);
  console.log('data: ', data);
  console.log('pageContext: ', pageContext);
  //const { title, fields } = pageContext;

  return (
    <Fragment>
      <Layout>
        <Seo title={`Applications`} />
        <Container className="app-form">
          <div></div>
        </Container>
      </Layout>
    </Fragment>
  );
}

export default Applications;