import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage

  const handleLogout = () => {
    // Eliminar el token, nickname y rol del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('rol');

    // Redirigir al login
    navigate('/login');
  };

  // Si no hay rol o nickname en el localStorage, no mostrar el navbar
  if (!rol || !nickname) {
    return null; // No renderiza nada
  }

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">NotSteam</Link></div>
      <div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/store">Tienda</Link></li>
          <li><Link to="/support">Soporte</Link></li>
          {rol === 'Admin' && (
            <li><Link to="/dashboardAdmin">Admin Dashboard</Link></li>
          )}
        </ul>
      </div>
      <div className="user-actions">
        {nickname && (
          <>
            <span className="navbar-nickname">Bienvenido, {nickname}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
