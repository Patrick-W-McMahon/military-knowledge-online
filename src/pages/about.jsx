import * as React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { Modal } from "react-bootstrap";
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
    const MdContent = sourtContentBySlug(data.allMarkdownRemark.mdNodes);
    return ( 
        <Layout>
            <Seo title="About" />
            <Modal.Dialog size="lg">
                <Modal.Header>
                    <Modal.Title>About Military Knowledge Online</Modal.Title>
                </Modal.Header>
                <Modal.Body><div dangerouslySetInnerHTML={{ __html: MdContent['/about'].html }}></div></Modal.Body>
            </Modal.Dialog>
        </Layout>
    );
}

export default AboutPage;