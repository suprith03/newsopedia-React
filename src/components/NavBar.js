import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li><Link to="/sports ⚽️">Sports</Link></li>
        <li><Link to="/entertainment">Entertainment</Link></li>
        <li><Link to="/politics">Politics</Link></li>
        <li><Link to="/health">Health</Link></li>
        <li><Link to="/technology">Technology</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
