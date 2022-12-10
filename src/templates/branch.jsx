import React, { Fragment, useState } from "react";
import { graphql } from "gatsby";
import { Modal } from "react-bootstrap";
import { Link } from "gatsby";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container } from "react-bootstrap";
import LinkList from "../components/linkList";
import CardGrid from "../components/CardGrid";
import WorkspaceView from "../components/workspaceView";
import WorkspaceContainer from "../containers/workspaceContainer";
import WorkspaceSettingsForm from "../forms/workspaceSettingsForm";
import WorkspaceModelContainer from "../containers/workspaceModelContainer";

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

  const PageView = ({ linksList, linksListFlatten, filterGroups, setTab, selectFilter, selectedTab, workspaceConfig, toggleFavLink }) => {
    return (
      <WorkspaceView filterGroups={filterGroups} setTab={setTab} selectFilter={selectFilter} selectedTab={selectedTab} configBtnAction={showWorkspaceConfigWindow}>
        <WorkspaceView.Panel title={'Apps'}>
          <Container className="app-tray" fluid>
            <h1>This is the applications tray. This will be added soon.</h1>
          </Container>
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Cards_large'}>
          {linksListFlatten.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
          ): <CardGrid cards={linksListFlatten} showInfo={showInfo} editMode={workspaceConfig.linkEditMode} toggleFav={toggleFavLink} classProps="lg" />}
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Cards_medium'}>
          {linksListFlatten.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
          ): <CardGrid cards={linksListFlatten} showInfo={showInfo} editMode={workspaceConfig.linkEditMode} toggleFav={toggleFavLink} />}
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Cards_Small'}>
          {linksListFlatten.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for cards</div></Container>
          ): <CardGrid cards={linksListFlatten} showInfo={showInfo} editMode={workspaceConfig.linkEditMode} toggleFav={toggleFavLink} classProps="sm" />}
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Link List'}>
          {linksList.length === 0 ? (
            <Container><div className="alert alert-info" role="alert">no data for links</div></Container>
          ): (
            <Container className="link-container">
              <LinkList links={linksList} editMode={workspaceConfig.linkEditMode} />
            </Container>
          )}
        </WorkspaceView.Panel>
        <WorkspaceView.Panel title={'Forms'}>
          <Container className="app-tray" fluid>
            <Link key={`form-00`} to={'/forms/hhd_survey'} className="app-form-btn">
              <i className="fas fa-poll-h fa-4x"></i>
              <div>HHD Survey</div> 
            </Link>
          </Container>
        </WorkspaceView.Panel>
      </WorkspaceView>
    );
  };

  const ModelView = ({ handleSettingsChange, workspaceConfig, filterGroups, defaultGroupFilterHash }) => {
    return (
      <Fragment>
        {state.showConfigWindow ? (
          <div className="backdrop">
            <Modal.Dialog size="lg" centered backdrop="static" className="info-dialogBox modal-120w" show={true} animation={true}>
              <Modal.Header>
                <Modal.Title><i aria-label="workspace config" className="fas fa-cogs fa-1x"></i> Workspace Configuration</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleClose()}><i className="fas fa-times"></i></button>
              </Modal.Header>
              <Modal.Body>
                <WorkspaceSettingsForm  settingChanged={(name, val) => handleSettingsChange(name, val)} 
                                        linkEditMode={workspaceConfig.linkEditMode}
                                        groupFilters={filterGroups}
                                        defaultGroupFilterHash={defaultGroupFilterHash || "ad60a8c37e7269baa4d772a57b0ac5df6933653e38a1bebf3d6e74636e8366dc"}
                />
              </Modal.Body>
            </Modal.Dialog>
          </div>
        ) : null}
        {state.url !== null ? (
          <div className="backdrop">
            <Modal.Dialog size="lg" centered backdrop="static" className="info-dialogBox modal-120w" show={(state.url !== null).toString()} animation={true}>
              <Modal.Header>
                  <Modal.Title>{state.title}</Modal.Title>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => handleClose()}><i className="fas fa-times"></i></button>
              </Modal.Header>
              <img src={`/img/cards/Card-${String(state.cardId).padStart(3, '0')}.png`} alt={state.title} />
              <Modal.Body>
                <h4>Link Description:</h4>
                <p>{state.description}</p>
                <h4>Link URL:</h4>
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

  return (
    <Fragment>
      <Layout>
        <Seo title={`${branch} links`} />
        <WorkspaceContainer branch={branch} categories={categories} linksList={linksList} >
          <PageView />
        </WorkspaceContainer>
      </Layout>
      <WorkspaceModelContainer branch={branch} categories={categories} linksList={linksList}>
        <ModelView />
      </WorkspaceModelContainer>
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