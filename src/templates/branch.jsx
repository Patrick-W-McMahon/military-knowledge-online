import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import { Container } from "react-bootstrap";
import { abc } from '../libs/common';


const Branch = ({ data }) => {
    const { allLinksData } = data;
    const { groupLinks, links } = allLinksData;
    return (
        <Layout>
            <Container className="link-container">
              {/*
                {links.map((link, index) => (
                    <a key={index} href={link.url}>{link.title}</a>
                ))}
                */}
              {abc.map((a,i) => {
                const group = groupLinks.find(g => g.fieldValue === a);
                return (
                  <div key={i}>
                    <h1>{a}</h1>
                    {group ? group.links.map((g,x) => (
                      <a key={x} className="blocklink" href={g.url}>{g.title}</a>
                    )): <div>No data</div>}
                  </div>
                );
              })}

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
      groupLinks: group(field: alphaChar) {
        totalCount
        fieldValue
        links: nodes {
          title
          url
          description
          branch
          alphaChar
        }
      }
    }
  }
`

export default Branch;