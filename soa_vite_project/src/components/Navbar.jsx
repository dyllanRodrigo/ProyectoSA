import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="logo"><Link to="/">NotSteam</Link></div>
        <div >
            <ul className="nav-links">
                <li><a><Link to="/">Home</Link></a></li>
                <li><a><Link to="/store">Tienda</Link></a></li>
                <li><a><Link to="/support">Soporte</Link></a></li>
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;


/*
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">NotSteam</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/store">Store</a></li>
        <li><a href="/community">Community</a></li>
        <li><a href="/support">Support</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
*/