import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Welcome from './components/HomePage';
import './App.css'; 

const App = () => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  return (
    <Router>
      <div className="app-container">
        {token && <Navbar />} {/* Mostrar el Navbar solo si hay un token */}
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={token ? <Welcome /> : <Navigate to="/login" />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {rol === 'Admin' && (
              <Route path="/dashboardAdmin" element={<AdminDashboard />} />
            )}
            {/* Ruta para redirigir cualquier ruta no encontrada a login si no está autenticado */}
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
          </Routes>
        </div>
        {token && <Footer />} {/* Mostrar el Footer solo si hay un token */}
      </div>
    </Router>
  );
};

export default App;
