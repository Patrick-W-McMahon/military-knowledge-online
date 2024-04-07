import React, { Fragment, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Tab, Row, Col, Button } from "react-bootstrap";

import './style.css';


const initalState = {
    phraseStr: "",
    phrases: [],
    sourceData: "",
    results: ""
}

const AppView = () => {
    const [ state, setState] = useState(initalState);
    //const { } = pageContext; { pageContext }
    

    const updatePhrases = event => {
        const { value: phraseStr } = event.target;
        const phrases = phraseStr.split(',');
        console.log("updatePhrases", phrases);
        setState({...state, phraseStr, phrases });
    }

    const updateSourceData = event => {
        const { value: sourceData } = event.target;
        setState({...state, sourceData });
    }

    const generateResults = () => {
        let results = "";
        const { phrases, sourceData } = state;
        const lowSD = sourceData.toLowerCase();
        phrases.forEach(phrase => {
            const lp = phrase.toLowerCase();
            if(lowSD.includes(lp)) {
                results+=`${phrase}\n`;
            }
        });
        console.log("results",results);
        setState({...state, results });
    }

    return (
        <Fragment>
            <Seo title={`Phrase Finder`} />
            <MainLayout activePos={null} nonScroll>
                <MainLayout.Navigation>
                    <Nav className="me-auto">
                        <NavDropdown title="File">
                            <NavDropdown.Item disabled onClick={() => null}>Load Phrases</NavDropdown.Item>
                            <NavDropdown.Item disabled onClick={() => null}>Save Phrases</NavDropdown.Item>
                            <NavDropdown.Item disabled onClick={() => null}>Export Results</NavDropdown.Item>
                        </NavDropdown>
                        <Button variant="success" onClick={() => generateResults()}>Generate Results</Button>
                    </Nav>
                </MainLayout.Navigation>
                <Container fluid className="phraseFinderWindow">
                    <Tab.Container id="PhraseFinder" defaultActiveKey="Source">
                        <Row>
                            <Col sm={12}>
                                <Nav variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="Results">Results</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Source">Source</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Results">
                                        <Row>
                                            <Col>
                                                <h3>Phrases <span className="subtext">(Seperate phrases with commas)</span></h3>
                                                <textarea id="phrases" rows="20"  value={state.phraseStr} onChange={e => updatePhrases(e)}></textarea>
                                            </Col>
                                            <Col>
                                                <h3>Results</h3>
                                                <textarea id="results" rows="20" value={state.results} readOnly={true}></textarea>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Source">
                                        <h3>Source Data</h3>
                                        <textarea id="source" rows="20" value={state.sourceData} onChange={e => updateSourceData(e)}></textarea>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </MainLayout>
        </Fragment>
    );
}
export default AppView;