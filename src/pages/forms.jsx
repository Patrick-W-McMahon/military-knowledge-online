import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from "../components/layout/MainLayout";
//import TreeMenu from 'react-simple-tree-menu';

const initalState = {
    websiteInfoModal: false,
    dataLoaded: false,
    contentPanelSelected: 0
};

const FormsPage = ({ selectedContentPanel, data: { allFormItems } }) => {
    const [state, setState] = useState(initalState);

    const { websiteInfoModal } = state;

    const handleShowModel = (event) => {
        console.log('event', event);

        setState({...state, websiteInfoModal: event === false ? false : { ...event,  actionType: 'form-group' }});
    }

    console.log('model: ', websiteInfoModal);

    return (
        <Fragment>
            <MainLayout activePos={3} nonScroll>
                <Container fluid>
                    <Row>
                        <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                            <div>Side nav data not accessible</div>
                        </Col>
                        <Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
                            {allFormItems !== undefined ? allFormItems.nodes.map((formItem, index, description) => {
                                switch(formItem.type) {
                                    case "link": 
                                        return (
                                            <a key={index} className="card-panel formElm" rel="noreferrer" target="_blank" href={formItem.url}>
                                                <h2>{formItem.title}</h2>
                                                <img src="" alt=""/>
                                                <span>{formItem.description}</span>
                                            </a>
                                        );
                                    case "group":
                                        return (
                                            <button className="card-panel formElm" onClick={() => handleShowModel(formItem)}>
                                                <div className="card-panel-content">
                                                    <img src={`/img/forms/Kopfjager.jpg`} alt=""/>
                                                    <span>{formItem.description}</span>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{formItem.title}</h5>
                                                </div>
                                            </button>
                                        );
                                    default:
                                        return (<span>ERR</span>);
                                }   
                            }) : <div>Data Validation Exception Error: Form data returned undefined. safe crash initiated.... System crashed in a stable state and can continue to run.</div>}
                        </Col>
                    </Row>
                </Container>
            </MainLayout>
            <Fragment>
                {websiteInfoModal !== false ? (
                    <div className="dialog-wrapper">
                        <dialog className="modal" open>
                            <header className="modal-header">
                                <h1>{websiteInfoModal.title}</h1>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowModel(false)}><i className="fas fa-times"></i></button>
                            </header>
                            {websiteInfoModal?.actionType === 'form-group' ? (
                                <Fragment>
                                    <div className="modal-body">
                                        <img className="banner-img" src={`/img/forms/Kopfjager.jpg`} alt={websiteInfoModal.title} />
                                        <div className="gridBtn">
                                            {websiteInfoModal?.forms.map((form, index) => {
                                                if(form.type === 'link') {
                                                    const { url, title, description } = form;
                                                    return (
                                                        <a key={index} className="btn" rel="noreferrer" target="_blank" href={url}>
                                                            <h1>{title}</h1>
                                                            <sub>{description}</sub>
                                                        </a>
                                                    ); 
                                                } else {
                                                    return (//NOTE: future items need to be made.
                                                        <div></div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className="modal-body">
                                        <p>Unknown State Exception: {JSON.stringify(websiteInfoModal)}</p>
                                    </div>
                                    <div className="modal-footer">The system is stable and can continue... Close this window.</div>
                                </Fragment>
                            )}
                        </dialog>
                    </div>
                ) : null}
            </Fragment>
        </Fragment>
    );
    
    /*
        
                
    */

    
}



FormsPage.propTypes = {};

const mapStateToProps = (state, props) => {
    return { menuExtended: state.system.side_menu, selectedContentPanel: state.system.selectedContentPanel };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({});
}

export const query = graphql`
    query FormQuery {
        allFormItems {
            nodes {
                hash
                title
                type
                forms {
                    description
                    title
                    type
                    url
                }
            }
        }
    }
`;

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);

/*

<Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={6} className="alert alert-warning text-center">
                        <h1 className="w-100 p-3"><i className="fas fa-tools fa-lg"></i> Page under construction <i className="fas fa-tools fa-lg"></i></h1>
                        <hr/>
                        <p>This page is under construction. Please check back later.</p>
                        <p>The forms page will have online forms that will submit data.</p>
                    </Col>
                </Row>
            </Container>

*/