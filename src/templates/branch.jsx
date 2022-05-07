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
  {
    allLinksData(filter: {branch: {eq: "army"}}) {
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