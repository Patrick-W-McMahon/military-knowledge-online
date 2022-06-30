import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container } from "react-bootstrap";
import LinkList from "../components/linkList";
import CardGrid from "../components/CardGrid";
import Workspace from "../components/workspace";

const Branch = ({ data, pageContext }) => {
    const { allLinksData } = data;
    const { branch } = pageContext; 
    const { groupLinks, links } = allLinksData;
    const validCards = links.filter(l => l.cardId !== null);
    return (
        <Layout>
          <Seo title={`${branch} links`} />
          <Workspace filterGroups={[]}>
            <Workspace.Panel title={'Cards'}>
              {validCards.length === 0 ? (
                <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
              ): <CardGrid cards={validCards} />}
            </Workspace.Panel>
            <Workspace.Panel title={'Link List'}>
              {groupLinks.length === 0 ? (
                <Container><div className="alert alert-info" role="alert">no data for links</div></Container>
              ): (
                <Container className="link-container">
                  <LinkList links={groupLinks} />
                </Container>
              )}
            </Workspace.Panel>
          </Workspace>
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
        cardId
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