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
import WorkspaceSettingsForm from "../forms/workspaceSettingsForm";

const initalState = {
  title: null,
  url: null,
  description: null,
  cardId: null,
  showConfigWindow: false,
  linkEditMode: false
};



const Branch = ({ data, pageContext }) => {
  const [ state, setState] = useState(initalState);
  const { allLinksData, allCategoriesData } = data;
  const { branch } = pageContext; 
  const { groupLinks: linksList } = allLinksData;
  const { categories } = allCategoriesData;

  const showInfo = ({ title, url, description, cardId }) => {
    setState({...state, title, url, description, cardId });
  }

  const showWorkspaceConfigWindow = val => {
    setState({...state, showConfigWindow: val });
  }

  const handleClose = () => {
    setState({...initalState, linkEditMode: state.linkEditMode});
  }

  const handleSettingsChange = (name, val) => {
    console.log('handleSettingsChange', name, val);
    switch(name) {
      case "linkEditMode":
        //console.log('link edit mode state', val);
        setState({...state, linkEditMode: true});
        setTimeout(() => {
          alert("edit mode in next update.");
        }, 500);
        setTimeout(() => {
          setState({...state, linkEditMode: false});
        }, 1500);
      break;
      default:

    }
    setState({...state, linkEditMode: !state.linkEditMode});
  }

  const PageView = ({ linksList, linksListFlatten, filterGroups, setTab, selectFilter, selectedTab }) => {
    return (
      <WorkspaceView filterGroups={filterGroups} setTab={setTab} selectFilter={selectFilter} selectedTab={selectedTab} configBtnAction={showWorkspaceConfigWindow}>
        <WorkspaceView.Panel title={'Cards'}>
          {linksListFlatten.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
          ): <CardGrid cards={linksListFlatten} showInfo={showInfo} />}
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Link List'}>
          {linksList.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for links</div></Container>
          ): (
            <Container className="link-container">
              <LinkList links={linksList} />
            </Container>
          )}
        </WorkspaceView.Panel>
      </WorkspaceView>
    );
  };

  return (
    <Fragment>
      <Layout>
        <Seo title={`${branch} links`} />
        <WorkspaceContainer branch={branch} categories={categories} linksList={linksList} >
          <PageView />
        </WorkspaceContainer>
      </Layout>
      {state.showConfigWindow ? (
        <div className="backdrop">
          <Modal.Dialog size="lg" centered backdrop="static" className="info-dialogBox modal-120w" show={true} animation={true}>
            <Modal.Header>
              <Modal.Title><i aria-label="workspace config" className="fas fa-cogs fa-1x"></i> Workspace Configuration</Modal.Title>
              <button type="button" class="btn-close" aria-label="Close" onClick={() => handleClose()}><i className="fas fa-times"></i></button>
            </Modal.Header>
            <Modal.Body>
              <WorkspaceSettingsForm settingChanged={(name, val) => handleSettingsChange(name, val)} linkEditMode={state.linkEditMode}/>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      ) : null}
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
        active
      }
      groupLinks: group(field: alphaChar) {
        totalCount
        fieldValue
        links: nodes {
          title
          url
          description
          categories
          cardId
          alphaChar
          id
          hash
          active
        }
      }
    }
    allCategoriesData(filter: {branch: {eq: $branch}}) {
      categories: nodes {
        hash
        id
        label
        order
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