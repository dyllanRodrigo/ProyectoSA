import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto-js';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Cifrar la contraseña
      const encryptedPassword = crypto.SHA256(password).toString();

      // Enviar la petición al backend
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        email,
        password: encryptedPassword,
      });

      // Guardar el token JWT en localStorage
      localStorage.setItem('token', response.data.token);

      //Verificamos si es usuario o admin
      if(response.data.rol == "Admin"){
            window.location.href = '/dashboardAdmin';
      }

      // Redirigir a dashboard de usuario
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Credenciales incorrectas, intente de nuevo.');
    }
  };

  const handleRegister = () => {
    window.location.href = '/register'; // Reemplaza con la URL adecuada para el registro
  };

  return  (
    <div className="login-wrapper">
      <div className="login-background"></div>
      <div className="container">
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
          {error && <p>{error}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegister} className="register-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
