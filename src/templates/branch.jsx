import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import { Container } from "react-bootstrap";
import LinkList from "../components/linkList";
import CardGrid from "../components/CardGrid";
import Workspace from "../components/workspace";

const Branch = ({ data }) => {
    const { allLinksData } = data;
    const { groupLinks, links } = allLinksData;
    //const validCards = links.filter(l => l.cardId !== null);
    return (
        <Layout>
          <Workspace>
            {/*
            <Workspace.Panel title={'Cards'}>
              <CardGrid cards={validCards} />
            </Workspace.Panel>
            */}
            <Workspace.Panel title={'Link List'}>
              <Container className="link-container">
                <LinkList links={groupLinks} />
              </Container>
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