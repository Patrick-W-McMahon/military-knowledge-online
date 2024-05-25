import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
//import localStore from '../../libs/localStore';
import { ActionCreateBuilding } from '../../state/reducers/appBarracksManagementReducer';
import * as Dockable from '../../components/DockableFrame';
import Navigator from './components/panels/Navigator';
import FloorView from "./components/panels/FloorView";
import Inspector from "./components/panels/Inspector";
import DbView from "./components/panels/DbView";

import datasetTemplete from './templates/datasetTemplete.json';
//import personTemplate  from './templates/personTemplate.json';
//import buildingTemplate from './templates/buildingTemplate.json';

import './app.css';

const VMODES = {
  WELCOME: 'welcome_view',
  SOLDIER: 'soldier_management',
  BUILDING: 'buildings_view'
}

const testData = {
  people: [
    {
        _internal: {
            label: "person 1",
            type: "person"
        }
        
    },
    {
        _internal: {
            label: "person 2",
            type: "person"
        }
        
    },
    {
        _internal: {
            label: "person 3",
            type: "person"
        }
        
    }
  ],
  units: [
    {
        _internal: {
            label: "24th",
            type: "unit"
        }
        
    },
    {
        _internal: {
            label: "2nd MI",
            type: "unit"
        }
        
    }
  ],
  buildings: [
    {
        _internal: {
            label: "1202",
            type: "building"
        }
        
    }
  ]
};

const initalState = {
  buildings: [...testData.buildings],
  people: [...testData.people],
  units: [...testData.units],
  selectedObj: { hash: "list_people", inspectorStr: "array<people>person" }
}

const applicationName = "Barracks Management";
const AppView = ({ selectedContentPanel }) => {
  const [ state, setState] = useState(initalState);

  const onNavigatorSelection = ({ hash, inspectorStr }) => {
    setState({...state, selectedObj: { hash, inspectorStr } });
  }

  const dockState = Dockable.useDockable(s => {
    const { createDockedPanel, DockMode } = Dockable;
    const { Full, Left, Right } = DockMode;
    const { rootPanel } = s;
    createDockedPanel(s, rootPanel, Full, <FloorView/>);
    createDockedPanel(s, rootPanel, Full, <DbView/>);
    createDockedPanel(s, rootPanel, Left, <Navigator onSelection={onNavigatorSelection} />);
    createDockedPanel(s, rootPanel, Right, <Inspector />);
  });


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
 
  const { selectedObjHash } = state;
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
                    <NavDropdown.Item disabled={selectedObjHash === 'building'} onClick={() => null}>New Floor</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Suite</NavDropdown.Item>
                    <NavDropdown.Item disabled={false} onClick={() => null}>New Room</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View">
                  <NavDropdown.Item disabled={false} onClick={() => setSysView(VMODES.SOLDIER)}>Soldier Management</NavDropdown.Item>
                  <NavDropdown.Item disabled={false} onClick={() => setSysView(VMODES.BUILDING)}>Buildings View</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Window">
                  <NavDropdown.Item disabled={false} onClick={() => Dockable.spawnFloating(dockState, <Navigator onSelection={onNavigatorSelection} />)}>Navigator</NavDropdown.Item>
                  <NavDropdown.Item disabled={false} onClick={() => Dockable.spawnFloating(dockState, <Inspector selectedObjHash={state.selectedObjHash} />)}>Inspector</NavDropdown.Item>
                  <NavDropdown.Item disabled={false} onClick={() => Dockable.spawnFloating(dockState, <FloorView />)}>Floor Plan View</NavDropdown.Item>
                  <NavDropdown.Item disabled={false} onClick={() => Dockable.spawnFloating(dockState, <DbView />)}>Database Viewer</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Reports">
                </NavDropdown>
            </Nav>
          </MainLayout.Navigation>
          <Container fluid>
            <Row>
              {/*<Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
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
              </Col>*/}
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
              <Col md={12} className={`body-page${selectedContentPanel===1 ? ' active' : ''} dock-frame`}>
                <Dockable.Container state={{ ...dockState, ...state }}/>
                {/*selectedObj !== null && selectedObj.type === "new-building" ? (
                  <form>
                    <h1>New Building</h1>
                    <label>Building Name/Label: <input name="label" type="text"/></label>
                    <label>Building Address: <input name="label" type="text"/></label>
                  </form>
                ):null*/}
                {/*<DockFrame />*/}
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