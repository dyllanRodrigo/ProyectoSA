import React from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <div className="sidebar-menu">
      <button className={`menu-item ${selectedMenu === 'users' ? 'active' : ''}`} onClick={() => setSelectedMenu('users')}>
        Usuarios
      </button>
      <button className={`menu-item ${selectedMenu === 'reports' ? 'active' : ''}`} onClick={() => setSelectedMenu('reports')}>
        Descuentos
      </button>
      <button className={`menu-item ${selectedMenu === 'settings' ? 'active' : ''}`} onClick={() => setSelectedMenu('settings')}>
        Settings
      </button>
    </div>
  );
};

export default SidebarMenu;
