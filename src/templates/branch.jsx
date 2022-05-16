import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import { Container } from "react-bootstrap";
import { abc } from '../libs/common';


const Branch = ({ data }) => {
    const { allLinksData } = data;
    const { groupLinks, links } = allLinksData;
    console.log('groupLinks: ', groupLinks);
    return (
        <Layout>
            <Container className="link-container">
              <div className="btn-group btn-group-toggle">
                <button className="btn btn-outline-primary"><i className="fas fa-grip-horizontal fa-3x"></i></button>
                <button className="btn btn-outline-primary"><i className="fas fa-grip-lines fa-3x"></i></button>
              </div>
              {/*
                {links.map((link, index) => (
                    <a key={index} href={link.url}>{link.title}</a>
                ))}
                */}
              {abc.map((a,i) => {
                const group = groupLinks.find(g => g.fieldValue === a);
                console.log(a, group);
                return (
                  <details key={i} open>
                    <summary><b> - {a.toUpperCase()} - </b></summary>
                    {group ? group.links.map((g,x) => (
                      <details>
                        <summary><a key={x} rel="noreferrer" target="_blank" href={g.url}>{g.title}</a></summary>
                        <p>{g.description}</p>
                      </details>
                    )): <div>No data</div>}
                  </details>
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