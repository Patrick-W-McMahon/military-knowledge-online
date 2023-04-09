import React, { Fragment, useState, useEffect } from "react";
//import { Alert } from 'react-bootstrap';
import Layout from '../../components/layout';
import Seo from "../../components/seo";
import { Container, Navbar, Nav, NavDropdown, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";

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

  function handleTextChange(event) {
    const newText = event.target.value;
    setText(newText);
    setCharacterCount(newText.length);
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
            <div className="notepad-body">
              <textarea className="notepad-textarea" value={text} onChange={handleTextChange} />
            </div>
          </Container>
        </Layout>
      </Fragment>
    );
}

export default AppView;