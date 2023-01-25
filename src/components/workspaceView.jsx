import React from "react";
import { ButtonToolbar, ButtonGroup, InputGroup, DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import { findByType } from "../libs/comp";

class ToolPanelLinks extends React.Component {
    render() {
        const { filterGroups, setTab, selectFilter } = this.props;
        return (
            <ButtonToolbar aria-label="Workspace Toolbar" className="workspace-toolbar sub-bar">
                <ButtonGroup aria-label="Display Select">
                <DropdownButton as={ButtonGroup} title={<span><i aria-label="List View" className="fas fa-bars fa-1x"></i> View</span>} id="links-view">
                    <Dropdown.Item onClick={() => setTab(1)}><i aria-label="Cards View" className="fas fa-th-large fa-1x"></i> Cards Large</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTab(2)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-1x"></i> Cards Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTab(3)}><i aria-label="Cards View" className="fas fa-th fa-1x"></i> Cards Small</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTab(4)}><i aria-label="List View" className="fas fa-grip-lines fa-1x"></i> List</Dropdown.Item>
                </DropdownButton>
                {/*
                <button className="btn btn-outline-primary" onClick={() => setTab(0)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-2x"></i></button>
                <button className="btn btn-outline-primary" onClick={() => setTab(1)}><i aria-label="List View" className="fas fa-grip-lines fa-2x"></i></button>
                */}
                </ButtonGroup>
                <InputGroup>
                    <DropdownButton as={ButtonGroup} title="Filter Category" id="filter-dropdown" style={{ margin: 0 }}>
                        {filterGroups.map((f, i) => <Dropdown.Item as="button" key={`filter_${i}`} onClick={() => selectFilter(f.hash)}>{f.label}</Dropdown.Item>)}
                    </DropdownButton>
                </InputGroup>
            </ButtonToolbar>
        );
    }
}

class ToolPanelForms extends React.Component {
    render() {
        return (
            <ButtonToolbar aria-label="Workspace Toolbar" className="workspace-toolbar sub-bar">
                <button className="btn btn-outline-primary" onClick={() => console.log('form editor')}>Form Editor</button>
            </ButtonToolbar>
        );
    }
}



const Panel = () => null;
class WorkspaceView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.renderPanels = this.renderPanels.bind(this);
    }

    renderPanels() {
        const { children, selectedTab } = this.props;
        const panels = findByType(children, Panel);
        return panels.length > 0 ? (
            panels.map((panel, index) => (
                <div key={index} className={`workspace-panel${index === selectedTab ? ' active' : ''}`}>{panel.props.children}</div>
            ))
        ) : null;
    }

    render() {
        const { filterGroups, setTab, selectFilter, configBtnAction, selectedTab } = this.props;
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col xs lg="11">
                        <ButtonToolbar aria-label="Workspace Toolbar" className="workspace-toolbar">
                            <button className="btn btn-outline-primary" onClick={() => configBtnAction(true)}><i aria-label="workspace config" className="fas fa-cogs fa-2x"></i></button>
                            <button className={`btn btn-outline-primary${selectedTab > 0 && selectedTab < 5 ? ' active':''}`} onClick={() => setTab(2)}>My Links</button>
                            <button className={`btn btn-outline-primary${selectedTab === 0? ' active':''}`} onClick={() => setTab(0)}>My Apps</button>
                            <button className={`btn btn-outline-primary${selectedTab === 5? ' active':''}`} onClick={() => setTab(5)}>Forms</button>
                        </ButtonToolbar>
                        {selectedTab > 0 && selectedTab < 5 ? (
                            <ToolPanelLinks setTab={setTab} filterGroups={filterGroups} selectFilter={selectFilter}/>
                        ) : null}
                        {selectedTab === 5 ? (
                            <ToolPanelForms />
                        ) : null}
                    </Col>
                </Row>
                {/*
                <Row className="justify-content-md-center">
                    <Col xs lg="11">
                        {selectedTab > 0 ? (
                            <ToolPanelLinks setTab={setTab} filterGroups={filterGroups} selectFilter={selectFilter}/>
                        ) : null}
                    </Col>
                </Row>
                */}
                <Row className="justify-content-md-center">
                    <Col xs lg="11">
                        <div className="workspace-content">{this.renderPanels()}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

WorkspaceView.Panel = Panel;

export default WorkspaceView;