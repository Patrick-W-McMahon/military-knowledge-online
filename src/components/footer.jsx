import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BASE_URL = 'https://github.com/Patrick-W-McMahon/military-knowledge-online/';

const Footer = () => (
    <div className="footer">
        <Container fluid>
            <Row>
                <Col>
                    <p>DISCLAIMER! This is a Third Party Site. While most (not ALL) links on this website link to Official U.S. Military/Government websites; it is not endorsed or maintained by the U.S. Military/Government. For more information please see the About page. Found a missing/broken link or have any suggestions? <a rel="noreferrer" target="_blank" href={`${BASE_URL}issues`} >Report it HERE!</a>. This is an open source site. source can be found <a rel="noreferrer" target="_blank" href={BASE_URL}>here</a>. If you would like to update or change a link you can make the change <a rel="noreferrer" target="_blank" href={`${BASE_URL}tree/main/static/data`} >here</a></p>
                </Col>
            </Row>
        </Container>
    </div>
);

export default Footer;