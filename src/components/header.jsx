import * as React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from 'react-bootstrap';
import BranchSelect from './branchSelect';

const Header = ({ siteTitle, militaryBranches }) => (
  <Navbar bg="light" expand="lg" fixed="top">
    <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link rel="noreferrer" target="_blank" href="https://webmail.apps.mil/"><i className="far fa-envelope fa-1x btn btn-primary email-link"></i></Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        {/*
        <Nav.Link href="/cards">Cards</Nav.Link>
        */}
        {/*
        <NavDropdown title="Branches" id="basic-nav-dropdown">
          {militaryBranches.length > 0 ? militaryBranches.map((branch, index) => <NavDropdown.Item key={index} href={`branch/${branch.name}`}>{branch.name}</NavDropdown.Item>): null}
        </NavDropdown>
        */}
      </Nav>
      <BranchSelect militaryBranches={militaryBranches} />
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  militaryBranches: PropTypes.arrayOf(PropTypes.object)
}

Header.defaultProps = {
  siteTitle: ``,
  militaryBranches: []
}

export default Header;