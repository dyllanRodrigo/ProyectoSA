import React, { useState } from 'react';
import Navbar from './Navbar';
import SidebarMenu from './SidebarMenu';
import UserTable from './UserTable';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('users');

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <SidebarMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        <div className="dashboard-main">
          {selectedMenu === 'users' && <UserTable />}
          {selectedMenu === 'reports' && <div>Reports Section (Placeholder)</div>}
          {selectedMenu === 'settings' && <div>Settings Section (Placeholder)</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
