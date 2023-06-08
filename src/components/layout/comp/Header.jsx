import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ({ extended, titleLong, titleShort, appMenu, handleSidebarToggle, handleToggleContentPanel }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/"><span className='brand-lg'>{extended ? titleLong : titleShort }</span><span className='brand-sm'>{titleShort}</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <button onClick={handleToggleContentPanel} type="button" aria-label="Toggle content panel" className="toggle-content-panel-btn"><i className="fas fa-exchange-alt fa-lg"></i></button>
            <button onClick={handleSidebarToggle} type="button" aria-label="Toggle main navigation" className="side-menu-btn"><i className="fas fa-ellipsis-v fa-lg"></i></button>
            <Navbar.Collapse id="basic-navbar-nav">{appMenu ? appMenu : null}</Navbar.Collapse>
        </Navbar>
    );
}

export default Header;