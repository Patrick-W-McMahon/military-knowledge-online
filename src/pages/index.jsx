import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Modal } from 'react-bootstrap';


const IndexPage = () => ( 
    <Layout>
        <Seo title="Home" />
        <Modal.Dialog size="lg">
            <Modal.Header>
                <Modal.Title>MKO just got an update, enjoy! </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Exciting new features just for you. You can now save links that you use regularly to your favorites.</p>
                <p>You will find the new configuration button in your workspace. Toggle the “Link Edit Mode” and you will notice a star icon in the top right of each card. Clicking on these will add them to your favorite list. To view your favorite list select favorites in the filter groups dropdown.</p>
                <p>All saved data is stored locally to your browser and is not sent out from your computer. Clearing your browser cache will delete your profile settings.  </p>
            </Modal.Body>
        </Modal.Dialog>
    </Layout>
);
export default IndexPage;