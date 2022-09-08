import React from "react";
import { ButtonToolbar, ButtonGroup, InputGroup, DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import { findByType } from "../libs/comp";

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
        const { filterGroups, setTab, selectFilter, configBtnAction } = this.props;
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col xs lg="11">
                        <ButtonToolbar aria-label="Workspace Toolbar" className="workspace-toolbar">
                            <ButtonGroup aria-label="Display Select">
                                <button className="btn btn-outline-primary" onClick={() => configBtnAction(true)}><i aria-label="workspace config" className="fas fa-cogs fa-2x"></i></button>
                                <button className="btn btn-outline-primary" onClick={() => setTab(0)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-2x"></i></button>
                                <button className="btn btn-outline-primary" onClick={() => setTab(1)}><i aria-label="List View" className="fas fa-grip-lines fa-2x"></i></button>
                            </ButtonGroup>
                            <InputGroup>
                                <DropdownButton as={ButtonGroup} title="Filter Category" id="filter-dropdown" style={{ margin: 0 }}>
                                    {filterGroups.map((f, i) => <Dropdown.Item as="button" key={`filter_${i}`} onClick={() => selectFilter(f.hash)}>{f.label}</Dropdown.Item>)}
                                </DropdownButton>
                            </InputGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
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


/*

<div className="btn-group btn-group-toggle">
                        <button className="btn btn-outline-primary" onClick={() => this.setTab(0)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-3x"></i></button>
                        <button className="btn btn-outline-primary" onClick={() => this.setTab(1)}><i aria-label="List View" className="fas fa-grip-lines fa-3x"></i></button>
                    </div>

*/