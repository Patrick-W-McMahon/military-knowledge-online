import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import { Container } from "react-bootstrap";

const Branch = ({ data }) => {
    const { allLinksData } = data;
    return (
        <Layout>
            <Container className="link-container">
                {allLinksData.links.map((link, index) => (
                    <a key={index} href={link.url}>{link.title}</a>
                ))}
            </Container>
        </Layout>
    );
    
}

export const query = graphql`
  query PageQuery($branch: String){
    allLinksData(filter: {branch: {eq: $branch}}) {
      links: nodes {
        title
        url
        description
        branch
      }
    }
  }
`

export default Branch;