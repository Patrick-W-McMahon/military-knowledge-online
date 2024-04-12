import React, { Fragment, useState } from "react";
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";

import datasetTemplete from './templates/datasetTemplete.json';
//import personTemplate  from './templates/personTemplate.json';
//import buildingTemplate from './templates/buildingTemplate.json';

import './app.css';

const VMODES = {
  WELCOME: 'welcome_view',
  SOLDIER: 'soldier_management',
  BUILDING: 'buildings_view'
}

const initalState = {
  currentView: VMODES.WELCOME,
  dataset: undefined
}

const applicationName = "Barracks Management";
const AppView = ({ selectedContentPanel }) => {
  const [ state, setState] = useState(initalState);

  const createNewDataset = () => {
    setState({...state, dataset: datasetTemplete, currentView: VMODES.SOLDIER });
  } 

  const setSysView = newView => {
    setState({...state, currentView: newView });
  }
 
  const { currentView, dataset } = state;
  return (
      <Fragment>
        <Seo title={applicationName} />
        <MainLayout activePos={null} nonScroll noSidePanel subTitle={applicationName}>
          <MainLayout.Navigation>
            <Nav className="me-auto">
                <NavDropdown title="File">
                    <NavDropdown.Item onClick={() => createNewDataset()}>New Dataset</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => null}>Load Dataset</NavDropdown.Item>
                    <NavDropdown.Item disabled={dataset === undefined} onClick={() => null}>Export Dataset</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Edit">
                    <NavDropdown.Item disabled={currentView !== VMODES.SOLDIER} onClick={() => null}>New Soldier</NavDropdown.Item>
                    <NavDropdown.Item disabled={currentView !== VMODES.BUILDING} onClick={() => null}>New Building</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View">
                  <NavDropdown.Item disabled={dataset === undefined} onClick={() => setSysView(VMODES.SOLDIER)}>Soldier Management</NavDropdown.Item>
                  <NavDropdown.Item disabled={dataset === undefined} onClick={() => setSysView(VMODES.BUILDING)}>Buildings View</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </MainLayout.Navigation>
          <Container fluid>
            <Row>
              {currentView !== VMODES.WELCOME? (
                <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                  {currentView === VMODES.SOLDIER ? (
                    <div>Soldier Management</div>
                  ):null}
                  {currentView === VMODES.BUILDING ? (
                    <div>Buildings View</div>
                  ):null}
                </Col>
              ):null }
              <Col md={currentView === VMODES.WELCOME? 12: 10} className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
                {currentView === VMODES.WELCOME ? (
                  <Container>
                    <Row className="justify-content-md-center text-center">
                      <Col xs={8} md={8}>
                        <div className="alert alert-info" role="alert">
                            <span>Welcome to the Barracks Management Tool</span>
                            <hr/>
                            <p>To begin go to [File] "New Dataset" to start a new Management Project. If you already have a dataset file select "Load Dataset".</p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                ):null}
                {currentView === VMODES.SOLDIER ? (
                  <div>Soldier Management</div>
                ):null}
                {currentView === VMODES.BUILDING ? (
                  <div>Buildings View</div>
                ):null}
              </Col>
            </Row>
          </Container>
        </MainLayout>
      </Fragment>
    );
}

export default AppView;