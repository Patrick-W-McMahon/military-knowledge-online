import React, { useState } from "react";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import { Container, Row, Col, Table, ButtonGroup } from 'react-bootstrap';
import MainLayout from "../components/layout/MainLayout";
import InsCmpBase from "../components/BaseUILib/InsCmpBase";

const SideMenuSection =  ({title, data, eventKey, onUpdate}) => (
    <InsCmpBase title={title} key={eventKey} style={{main: { padding: "0 5px 0 5px"}, body: { height: "auto", maxHeight: "200px", overflowY: "auto", padding: "0 3px 0 3px"}}}>
        <ul>
            {data.map((item, index) => (
                <div key={index}>
                    <input type="checkbox" id={`${title.replace(/\s/g, "")}-${item}`} name={item} value={item} onChange={e => onUpdate(e)}/>
                    <span> {item.length > 0 ? item : 'Empty Value'}</span>
                </div>
            ))}
        </ul> 
    </InsCmpBase>
);

const filterDocuments = (documents, filters) => {
    console.log(filters);
    let filteredDocuments = documents;
    Object.keys(filters).filter(key => filters[key].length > 0).forEach(key => {
        filteredDocuments = filteredDocuments.filter(d => filters[key].map(f => f.split('-').reduce((p, c, i) => i === 0 ? [c] : [p[0], [...p.slice(1), c].join('-')], [])[1]).includes(d[key]));
    });
    return filteredDocuments;
}

const DocumentsPage = ({ selectedContentPanel, data }) => {
    const initalState = {
        filters: {
            docType: [],
            fileType: []
        }
    };
    const [state, setState] = useState(initalState);
    const { docTypes, fileTypes, documents } = data.allDocument;
    const updateFilter = (type, e) => {
        const checked = e.target.checked;
        const id = e.target.id;
        const filterData = state.filters[type];
        if((checked && filterData.includes(id)) || (!checked && !filterData.includes(id))) return;
        if(checked) {
            let list = filterData;
            list.push(id);
            setState({...state, filters: {...state.filters, [type]: list} });
        } else {
            const list = filterData.filter(i => i !== id);
            setState({...state, filters:{...state.filters, [type]: list} });
        }
    }
    let filteredDocuments = filterDocuments(documents, state.filters);
    return (
        <MainLayout activePos={4} nonScroll pageName="documents">
            <Container fluid>
                <Row>
                    <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                        <SideMenuSection title="Document Types" data={docTypes} eventKey="0" onUpdate={e => updateFilter('docType', e)} />
                        <SideMenuSection title="File Types" data={fileTypes} eventKey="1" onUpdate={e => updateFilter('fileType', e)}/>  
                    </Col>
                    <Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
                        <div className="scroll-panel">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Document Num</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Doc Type</th>
                                        <th>Doc Group</th>
                                        <th>File Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocuments.map(doc => {
                                        const { num, title, date, hash, pdfLink, docType, fileType, pageUrl, nav } = doc;
                                        return (
                                            <tr key={hash}>
                                                <td>{num}</td>
                                                <td>{title}</td>
                                                <td>{date}</td>
                                                <td>{docType}</td>
                                                <td>{nav}</td>
                                                <td>{fileType}</td>
                                                <td>
                                                    <ButtonGroup className="actionButtonGroup">
                                                        {fileType === 'PDF' ? <a href={pdfLink} title="PDF" target="_blank" rel="noreferrer" aria-label="PDF link" className="btn btn-sm btn-secondary"><i className="far fa-file-pdf"></i></a>: ''}
                                                        <a href={pageUrl} title="Source Page" target="_blank" rel="noreferrer" aria-label="source page link" className="btn btn-sm btn-secondary"><i className="fas fa-external-link-alt"></i></a>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}

DocumentsPage.propTypes = {};

const mapStateToProps = (state, props) => {
    return { menuExtended: state.system.side_menu, selectedContentPanel: state.system.selectedContentPanel };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        doSomething: () => console.log('did something')
    });
};

export const query = graphql`
  query DocumentsQuery {
    allDocument {
        docTypes: distinct(field: {type: SELECT})
        fileTypes: distinct(field: {fileType: SELECT}) 
        categories: distinct(field: {nav: SELECT})
        documents: nodes {
            title
            docType: type
            status
            proponent
            pdfLink
            pageUrl
            num
            nav
            index
            id
            hash
            footnotes
            fileType
            directive
            date
            docError {
              error
              message
            }
        }
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);