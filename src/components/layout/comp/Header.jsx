import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ({ extended, titleLong, titleShort, mainSideMenu, appSideMenu, appTopMenu }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">{extended ? titleLong : titleShort }</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                {/*
                <Nav className="me-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Features</Nav.Link>
                    <Nav.Link href="#">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#">Login</Nav.Link>
                </Nav>
                */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;