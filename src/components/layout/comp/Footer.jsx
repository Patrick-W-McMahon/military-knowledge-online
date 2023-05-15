import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = ({ children }) => {
    return (
        <footer className="bg-dark text-white py-3">
            <Container fluid>
                <Row>
                    <Col>{children}</Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;