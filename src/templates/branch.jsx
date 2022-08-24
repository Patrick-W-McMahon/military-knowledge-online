import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { Modal } from "react-bootstrap";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container } from "react-bootstrap";
import LinkList from "../components/linkList";
import CardGrid from "../components/CardGrid";
import WorkspaceView from "../components/workspaceView";
import WorkspaceContainer from "../containers/workspaceContainer";

const initalState = {
  title: null,
  url: null,
  description: null,
  cardId: null
};

const PageView = ({ showInfo, validCards, groupLinks, filterGroups, setTab, selectFilter, selectedTab }) => {
  return (
    <WorkspaceView filterGroups={filterGroups} setTab={setTab} selectFilter={selectFilter} selectedTab={selectedTab}>
      <WorkspaceView.Panel title={'Cards'}>
        {validCards.length === 0 ? (
          <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
        ): <CardGrid cards={validCards} showInfo={showInfo} />}
      </WorkspaceView.Panel>
      <WorkspaceView.Panel title={'Link List'}>
        {groupLinks.length === 0 ? (
          <Container><div className="alert alert-info" role="alert">no data for links</div></Container>
        ): (
          <Container className="link-container">
            <LinkList links={groupLinks} />
          </Container>
        )}
      </WorkspaceView.Panel>
    </WorkspaceView>
  );
};

const Branch = ({ data, pageContext }) => {
  const [ state, setState] = useState(initalState);
  const { allLinksData, allCategoriesData } = data;
  const { branch } = pageContext; 
  const { groupLinks, links } = allLinksData;
  const { categories } = allCategoriesData;
  const validCards = links.filter(l => l.cardId !== null);

  const showInfo = ({ title, url, description, cardId }) => {
    setState({ title, url, description, cardId });
  }

  const handleClose = () => {
    setState(initalState);
  }

  return (
    <Fragment>
      <Layout>
        <Seo title={`${branch} links`} />
        <WorkspaceContainer categories={categories} groupLinks={groupLinks} validCards={validCards} >
          <PageView showInfo={showInfo} />
        </WorkspaceContainer>
        
      </Layout>
      {state.url !== null ? (
        <div className="backdrop">
          <Modal.Dialog size="lg" centered backdrop="static" className="info-dialogBox modal-120w" show={(state.url !== null).toString()} animation={true}>
            <Modal.Header>
                <Modal.Title>{state.title}</Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={() => handleClose()}><i className="fas fa-times"></i></button>
            </Modal.Header>
            <img src={`/img/cards/Card-${String(state.cardId).padStart(3, '0')}.png`} alt={state.title} />
            <Modal.Body>
              <h5>Link Description:</h5>
              <p>{state.description}</p>
              <h6>Link URL:</h6>
              <p>{state.url}</p>
            </Modal.Body>
            <Modal.Footer>
              <a rel="noreferrer" target="_blank" href={state.url}>Go To Link</a>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ):null}
    </Fragment>
  );
}

export const query = graphql`
  query PageQuery($branch: String){
    allLinksData(filter: {branch: {eq: $branch}}) {
      links: nodes {
        title
        url
        description
        categories
        branch
        cardId
        id
        hash
      }
      groupLinks: group(field: alphaChar) {
        totalCount
        fieldValue
        links: nodes {
          title
          url
          description
          categories
          branch
          cardId
          alphaChar
          id
          hash
        }
      }
    }
    allCategoriesData(filter: {branch: {eq: $branch}}) {
      categories: nodes {
        branch
        hash
        id
        label
        action {
          func
          obj
          val
        }
      }
    }
  }
`

export default Branch;