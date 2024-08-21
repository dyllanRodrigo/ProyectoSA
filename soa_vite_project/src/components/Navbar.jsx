import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  const handleLogout = () => {
    // Eliminar el token y el nickname del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');

    // Redirigir al login
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">NotSteam</Link></div>
      <div>
        <ul className="nav-links">
          <li><a><Link to="/">Home</Link></a></li>
          <li><a><Link to="/store">Tienda</Link></a></li>
          <li><a><Link to="/support">Soporte</Link></a></li>
        </ul>
      </div>
      <div className="user-actions">
        {nickname ? (
          <>
            <span className="navbar-nickname">Welcome, {nickname}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
