import * as React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import MainLayout from "../components/layout/MainLayout";
import { Container, Row, Col } from 'react-bootstrap';
import TreeMenu from 'react-simple-tree-menu';
import { sourtContentBySlug } from '../libs/system';

const treeData = [
    { key: 'about_mko', label: 'About MKO' },
    //{ key: 'about_team', label: 'The Team' }
];

const AboutPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(filter: { fields: { slug: { regex: "/(about)/" }}}) {
                mdNodes: nodes {
                  fields {
                    slug
                  }
                  html
                }
            }
        }
    `);
    const MdContent = sourtContentBySlug(data.allMarkdownRemark.mdNodes);
    return ( 
        <MainLayout activePos={7}>
            <Container fluid>
                <Row>
                    <Col md="2" className="page-menu">
                        <TreeMenu data={treeData} />
                    </Col>
                    <Col md="10" className="body-page">
                        <h1>About Military Knowledge Online</h1>
                        <div dangerouslySetInnerHTML={{ __html: MdContent['/about'].html }}></div>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}

export default AboutPage;