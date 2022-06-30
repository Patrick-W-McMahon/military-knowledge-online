import React from "react";
import { ButtonToolbar, ButtonGroup, InputGroup, DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import { findByType } from "../libs/comp";

const Panel = () => null;
class Workspace extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          selectedTab: 0
      };
      this.renderPanels = this.renderPanels.bind(this);
      this.setTab = this.setTab.bind(this);
    }

    setTab(tabId) {
        this.setState({ selectedTab: tabId });
    }

    renderPanels() {
        const { children } = this.props;
        const { selectedTab } = this.state;
        const panels = findByType(children, Panel);
        return panels.length > 0 ? (
            panels.map((panel, index) => (
                <div key={index} className={`workspace-panel${index === selectedTab ? ' active' : ''}`}>{panel.props.children}</div>
            ))
        ) : null;
    }

    render() {
        const { filterGroups } = this.props;
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <Col xs lg="10">
                        <ButtonToolbar aria-label="Workspace Toolbar" className="workspace-toolbar">
                            <ButtonGroup aria-label="Display Select">
                                <button className="btn btn-outline-primary" onClick={() => this.setTab(0)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-3x"></i></button>
                                <button className="btn btn-outline-primary" onClick={() => this.setTab(1)}><i aria-label="List View" className="fas fa-grip-lines fa-3x"></i></button>
                            </ButtonGroup>
                            <InputGroup>
                                <DropdownButton as={ButtonGroup} title="Filter Category" id="filter-dropdown">
                                    {filterGroups.map((f, i) => <Dropdown.Item key={`filter_${i}`} value={f.value} eventKey={`filter_${i}`}>{f.name}</Dropdown.Item>)}
                                </DropdownButton>
                            </InputGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="10">
                        <div className="workspace-content">{this.renderPanels()}</div>
                    </Col>
                </Row>
            </Container>
        );
    }
  }

Workspace.Panel = Panel;

export default Workspace;


/*

<div className="btn-group btn-group-toggle">
                        <button className="btn btn-outline-primary" onClick={() => this.setTab(0)}><i aria-label="Cards View" className="fas fa-grip-horizontal fa-3x"></i></button>
                        <button className="btn btn-outline-primary" onClick={() => this.setTab(1)}><i aria-label="List View" className="fas fa-grip-lines fa-3x"></i></button>
                    </div>

*/