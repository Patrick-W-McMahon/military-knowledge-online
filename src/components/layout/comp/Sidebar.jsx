import React, { Fragment } from 'react';
import { Link } from "gatsby";
import { Nav } from 'react-bootstrap';

const Sidebar = ({ extended, handleSidebarToggle, menuItems, activePos }) => {
    return (
        <Fragment>
            <div className={`sidebar${extended ? ' extended' : ''}`}>
                <Nav className="flex-column">
                    {menuItems.map((item, index) => <Link key={index} to={item.url} className={`nav-link${activePos === index ? ' active' : ''}`}><i className={`fas ${item.icon} fa-lg`}></i> <span className={`${extended ? '' : 'hidden'}`}>{item.text}</span></Link>)}
                </Nav>
            </div>
            <button className={'sidebar-toggle-btn'} onClick={handleSidebarToggle}><span>{'|'}</span></button>
        </Fragment>
    );
}

export default Sidebar;