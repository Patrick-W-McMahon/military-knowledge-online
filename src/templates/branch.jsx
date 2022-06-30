import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { Modal } from "react-bootstrap";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container } from "react-bootstrap";
import LinkList from "../components/linkList";
import CardGrid from "../components/CardGrid";
import Workspace from "../components/workspace";

const initalState = {
  title: null,
  url: null,
  description: null,
  cardId: null
};

const Branch = ({ data, pageContext }) => {
  const [ state, setState] = useState(initalState);
  const { allLinksData } = data;
  const { branch } = pageContext; 
  const { groupLinks, links } = allLinksData;
  const validCards = links.filter(l => l.cardId !== null);

  const showInfo = ({ title, url, description, cardId }) => {
    console.log('clicked');
    setState({ title, url, description, cardId });
  }

  const handleClose = () => {
    console.log('close');
    setState(initalState);
  }
  console.log('test', state.url !== null);
  return (
    <Fragment>
      <Layout>
        <Seo title={`${branch} links`} />
        <Workspace filterGroups={[]}>
          <Workspace.Panel title={'Cards'}>
            {validCards.length === 0 ? (
              <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
            ): <CardGrid cards={validCards} showInfo={showInfo} />}
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