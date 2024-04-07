import React, { Fragment } from "react";
//import { connect } from "react-redux";
import { useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import MainLayout from "../components/layout/MainLayout";

const AppsPage = ({ selectedContentPanel }) => {
    const { allApplication } = useStaticQuery(graphql `
        query AppQuery {
            allApplication(filter: {active: {eq: true}}, sort: {app_name: ASC}) {
                appsList: nodes {
                    id
                    hash
                    dir
                    configFileName
                    app_name
                    app_icon
                    appURI
                    appRootPath
                }
            }
        }
    `);

    const { appsList } = allApplication;

    return (
        <Fragment>
            <MainLayout activePos={2} nonScroll>
                <MainLayout.Navigation>
                    <Nav className="me-auto"></Nav>
                </MainLayout.Navigation>
                <Container fluid>
                    <Row>
                        {/*<Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                            <div>Side nav data not accessible</div>
                        </Col>*/}
                        {/*<Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>*/}
                        <Col md="12" className={`body-page active`}>
                            {/*<Row className="justify-content-md-center">
                                <Col xs={6} md={6} className="alert alert-warning text-center">
                                    <h1 className="w-100 p-3"><i className="fas fa-tools fa-lg"></i> Page under construction <i className="fas fa-tools fa-lg"></i></h1>
                                    <hr/>
                                    <p>This page is under construction. Please check back later.</p>
                                    <p>The apps page will hold all your applications</p>
                                </Col>
                            </Row>*/}
                            <Container fluid className="app-tray">
                                <Row>
                                    {appsList.map((app, index) => {
                                        const { app_name, app_icon, appURI } = app;
                                        return (
                                            <Col key={index} className="appIcon" xs={3} md={1} lg={1}>
                                                <a className="" rel="noreferrer" target="_blank" href={appURI}>
                                                    <img src={`/img/appIcons/${app_icon}.png`} alt={app_name} />
                                                    <span>{app_name}</span>
                                                </a>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </MainLayout>
        </Fragment>
    );
}

export default AppsPage;