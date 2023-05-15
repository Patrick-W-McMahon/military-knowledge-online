import React, { useState } from 'react';

function Sidebar() {
  const [isExtended, setIsExtended] = useState(false);

  function toggleSidebar() {
    setIsExtended(!isExtended);
  }

  return (
    <nav className={`left-nav ${isExtended ? 'extended' : ''}`}>
      <h2 className="logo">{isExtended ? 'Military Knowledge Online' : 'MKO'}</h2>
      <ul>
        <li><a href="#"><i className="fas fa-home"></i><span>Home</span></a></li>
        <li><a href="#"><i className="fas fa-user"></i><span>Profile</span></a></li>
        <li><a href="#"><i className="fas fa-cog"></i><span>Settings</span></a></li>
      </ul>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isExtended ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>}
      </button>
    </nav>
  );
}

export default Sidebar;
