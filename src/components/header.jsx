import * as React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = ({ siteTitle, militaryBranches }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">{siteTitle}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/cards">Cards</Nav.Link>
        {/*
        <NavDropdown title="Branches" id="basic-nav-dropdown">
          {militaryBranches.length > 0 ? militaryBranches.map((branch, index) => <NavDropdown.Item key={index} href={`branch/${branch.name}`}>{branch.name}</NavDropdown.Item>): null}
        </NavDropdown>
        */}
      </Nav>
      <div className="nav navbar-nav ml-auto military-branch-select">
        {militaryBranches.length > 0 ? militaryBranches.map((branch, index) => (
          <a key={index} href={`/branch/${branch.path}`}>
            <div>
              <img src={`/img/insignia/${branch.seal}`} alt={branch.name} />
              <span>{branch.name}</span>
            </div>
          </a>
        )): null}
      </div>
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