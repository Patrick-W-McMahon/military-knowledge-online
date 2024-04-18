import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Row, Col, Tab, Tabs, Button } from "react-bootstrap";
//import localStore from '../../libs/localStore';
import { ActionCreateBuilding } from '../../state/reducers/appBarracksManagementReducer';

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
  buildings: [],
  people: [],
  units: [],
  selectedObj: null
}

const applicationName = "Barracks Management";
const AppView = ({ selectedContentPanel, createBuilding }) => {
  const [ state, setState] = useState(initalState);

  const createNewDataset = () => {
    setState({...state, dataset: datasetTemplete, currentView: VMODES.SOLDIER });
  } 

  const setSysView = newView => {
    setState({...state, currentView: newView });
  }

  const handleCreateBtn = (e) => {
    switch(e.target.name){
      case "create new building":
        setState({...state, selectedObj: {
          type: "new-building"
        }});
      break;
      default:
        console.log("ERR: unsupported action ", e.target.name);
    }
  }
 
  const { selectedObj } = state;
  return (
      <Fragment>
        <Seo title={applicationName} />
        <MainLayout activePos={null} nonScroll noSidePanel subTitle={applicationName}>
          <MainLayout.Navigation>
            <Nav className="me-auto">
                <NavDropdown title="File">
                    <NavDropdown.Item onClick={() => createNewDataset()}>New Dataset</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => null}>Load Dataset</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} onClick={() => null}>Export Dataset</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Edit">
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Soldier</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Unit</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} name="create new building" onClick={handleCreateBtn}>New Building</NavDropdown.Item>
                    <NavDropdown.Item disabled={selectedObj !== null && selectedObj.type === 'building'} onClick={() => null}>New Floor</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Suite</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Room</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View">
                  <NavDropdown.Item disabled={false} onClick={() => setSysView(VMODES.SOLDIER)}>Soldier Management</NavDropdown.Item>
                  <NavDropdown.Item disabled={false} onClick={() => setSysView(VMODES.BUILDING)}>Buildings View</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Reports">
                </NavDropdown>
            </Nav>
          </MainLayout.Navigation>
          <Container fluid>
            <Row>
              <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                <Tabs defaultActiveKey="buildings" id="side_control_tabs" >
                  <Tab eventKey="buildings" title="Buildings">
                    <Button name="create new building" className="newItemBtn" variant="success" size="md" onClick={handleCreateBtn}>New Building</Button>
                  </Tab>
                  <Tab eventKey="people" title="People">
                    <Button name="create new person" className="newItemBtn" variant="success" size="md" onClick={handleCreateBtn}>New Person</Button>
                  </Tab>
                  <Tab eventKey="units" title="Units">
                    <Button name="create new unit" className="newItemBtn" variant="success" size="md" onClick={handleCreateBtn}>New Unit</Button>
                  </Tab>
                </Tabs>
              </Col>
              {/*currentView !== VMODES.WELCOME && false? (
                <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                  {currentView === VMODES.SOLDIER ? (
                    <div>Soldier Management</div>
                  ):null}
                  {currentView === VMODES.BUILDING ? (
                    <div>Buildings View</div>
                  ):null}
                </Col>
              ):null */}
              <Col md={10} className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
                {selectedObj !== null && selectedObj.type === "new-building" ? (
                  <form>
                    <h1>New Building</h1>
                    <label>Building Name/Label: <input name="label" type="text"/></label>
                    <label>Building Address: <input name="label" type="text"/></label>
                  </form>
                ):null}
                {/*currentView === VMODES.WELCOME ? (
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
                ):null*/}
                {/*currentView === VMODES.SOLDIER ? (
                  <div>Soldier Management</div>
                ):null}
                {currentView === VMODES.BUILDING ? (
                  <div>Buildings View</div>
                ):null*/}
              </Col>
            </Row>
          </Container>
        </MainLayout>
      </Fragment>
    );
}

AppView.propTypes = {};

const mapStateToProps = (state, props) => {
  const { Buildings, people, units } = state.appBarracksManagement;
  return { Buildings, people, units };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createBuilding: (label, address) => ActionCreateBuilding(dispatch, label, address)
});
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);