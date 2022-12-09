import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Modal, Tabs, Tab, Container, Form } from 'react-bootstrap';
import { getEventMessage } from '../libs/common';

const message = getEventMessage();
const IndexPage = () => ( 
    <Layout>
        <Seo title="Home" />
        {message ? <div className="calendarEventBar">{message}</div>:null}
        <Modal.Dialog size="lg">
            <Modal.Header>
                <Modal.Title>Military News Room</Modal.Title>
                <Form.Group id="base-select">
                    <Form.Label>Select Base</Form.Label>
                    <Form.Select><option>USAG Wiesbaden Army Base</option></Form.Select>
                </Form.Group>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="mko-news" id="news-tabs" className="modal-content-tabs">
                    <Tab eventKey="company" title="Company">
                        <Container>
                            <p>Your local company news will be here.</p>
                        </Container>
                    </Tab>
                    <Tab eventKey="battalion" title="Battalion">
                        <Container>
                            <p>Your local Battalion news will be here.</p>
                        </Container>
                    </Tab>
                    <Tab eventKey="brigade" title="Brigade">
                        <Container>
                            <p>Your local Brigade news will be here.</p>
                        </Container>
                    </Tab>
                    <Tab eventKey="chaplain" title="Chaplain">
                        <Container>
                            <p>Your Chaplain News will be here.</p>
                        </Container>
                    </Tab>
                    <Tab eventKey="mko-news" title="MKO">
                        <Container>
                            <p>The news room is currently being developed. please stand by....</p>
                        </Container>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal.Dialog>
    </Layout>
);
export default IndexPage;