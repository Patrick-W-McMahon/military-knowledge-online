import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from "../components/layout/MainLayout";

const SettingsPage = () => {

    return (
        <MainLayout activePos={6} nonScroll>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={6} className="alert alert-warning text-center">
                        <h1 className="w-100 p-3"><i className="fas fa-tools fa-lg"></i> Page under construction <i className="fas fa-tools fa-lg"></i></h1>
                        <hr/>
                        <p>This page is under construction. Please check back later.</p>
                        <p>This settings page will show system settings for MKO for your workspace.</p>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}

export default SettingsPage;