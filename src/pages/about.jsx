import * as React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { sourtContentBySlug } from '../libs/system';


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
    const { allMarkdownRemark } = data;
    const { mdNodes } = allMarkdownRemark;
    const MdContent = sourtContentBySlug(mdNodes);
    console.log(MdContent);
    return ( 
        <Layout>
            <Seo title="About" />
            <Container className="link-container">
                <Row>
                    <Col style={{ padding: "12px" }}>
                        <div dangerouslySetInnerHTML={{ __html: MdContent['/about'].html }}></div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AboutPage;