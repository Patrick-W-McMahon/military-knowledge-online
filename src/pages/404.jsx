import * as React from "react";
import { Modal } from "react-bootstrap";
import Layout from "../components/layout";
import Seo from "../components/seo";

const title = "404: Not found";
const content = "You just hit a route that doesn't exist...";

const NotFoundPage = () => (
  <Layout>
    <Seo title={title} />
    <Modal.Dialog size="lg">
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>
    </Modal.Dialog>
  </Layout>
)

export default NotFoundPage;