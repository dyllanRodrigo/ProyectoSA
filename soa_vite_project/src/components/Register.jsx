import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto-js';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nickname, setNickname] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Definir la lista de regiones
  const regiones = ['Guatemala', 'Mexico', 'Estados Unidos', 'Canada']; 


  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const encryptedPassword = crypto.SHA256(password).toString();
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre, 
          apellido, 
          nickname, 
          correo, 
          telefono, 
          direccion, 
          region,
          password: encryptedPassword,
        }),
      });
      const data = await response.json();
      if (data.status == "OK") {
        setSuccess(data.me);
        setTimeout(() => window.location.href = '/', 2000);
      } else {
        throw new Error('Registración fallida, intente de nuevo.');
      }
    } catch (error) {
      setError('Registración fallida, intente de nuevo.');
      console.log({error});
    }
  };
    

  return (
    <div className="register-wrapper">
      <div className="register-background"></div>
      <div className="container">
        <h2>CREAR TU CUENTA</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nickname:</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefono:</label>
            <input
              type="phone"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Dirección:</label>
            <input
              type="Address"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Region:</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona una región</option>
              {regiones.map((reg, index) => (
                <option key={index} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
