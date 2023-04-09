import React, { Fragment, useState, useEffect } from "react";
import AceEditor from "react-ace";
import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
//import { Alert } from 'react-bootstrap';
import Layout from '../../components/layout';
import Seo from "../../components/seo";
import { Container, Navbar, Nav, NavDropdown, ButtonToolbar, ButtonGroup, Button, Row, Col } from "react-bootstrap";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import './app.css';

const AppView = () => {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const savedText = localStorage.getItem('notepad-text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  function handleTextChange(text) {
    setText(text);
    setCharacterCount(text.length);
  }

  function handleSaveClick() {
    localStorage.setItem('notepad-text', text);
    alert('content saved');
  }

  function handleClearClick() {
    setText('');
    setCharacterCount(0);
    localStorage.removeItem('notepad-text');
  }

  function handleError() {
    alert('this function is not ready yet.');
  }

  let currentPage = 1;
  let totalPages = 1;
  let currentBook = 1;
  let totalBook = 1;

  const treeData = [{
    key: 'book01',
    label: 'book 1',
    nodes: [
      {
        key: 'section01',
        label: 'section 1',
        nodes: [{
          key: 'page01',
          label: 'page 1'
        }]
      },
    ],
  }];

  return (
      <Fragment>
        <Layout>
          <Seo title={`greenbook`} />
          <Container fluid className="notepad">
            <Navbar className="notepad-navbar">
              <Nav className="me-auto my-2 my-lg-0">
                <NavDropdown title="File">
                  <NavDropdown.Item onClick={handleError}>New Book</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleError}>New Group</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleError}>New Page</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleSaveClick}>Save Page</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleClearClick}>Clear Page</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <div className="character-count">{characterCount} Char Count</div>
                <ButtonToolbar className="d-flex" aria-label="Toolbar with button groups">
                  <ButtonGroup className="page-select" aria-label="Page Select">
                    <Button disabled>{'<<'}</Button>
                    <div>Pages {currentPage} / {totalPages}</div>
                    <Button disabled>{'>>'}</Button>
                  </ButtonGroup>
                  <ButtonGroup className="page-select" aria-label="Book Select">
                    <Button disabled>{'<<'}</Button>
                    <div>Book {currentBook} / {totalBook}</div>
                    <Button disabled>{'>>'}</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Nav>
            </Navbar>
            <Container fluid>
              <Row className="notepad-body">
                <Col md="3">
                  <TreeMenu data={treeData} />
                </Col>
                <Col md="9">
                  <AceEditor mode="markdown" theme="monokai" value={text} onChange={handleTextChange} 
                    name="page-editor" 
                    editorProps={{ $blockScrolling: true }} 
                    fontSize={14}
                    width={'100%'}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true} 
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Container>
        </Layout>
      </Fragment>
    );
}

export default AppView;