import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto-js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Cifrar la contraseña
      const encryptedPassword = crypto.SHA256(password).toString();

      // Enviar la petición al backend
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        correo,
        password: encryptedPassword,
      });

      //Verificamos si esta confirmado el email
      if(!(response.data.isConfirmed == 1)){
        Swal.fire({
          icon: 'error',
          title: 'Falta confirmacion de correo.',
          text: `Por favor vuelva a confirmar su correo electronico.`,
        });
        setTimeout(() => window.location.href = '/', 3000);
      }

      // Guardar el token JWT en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('nickname', response.data.nickname);

      //Verificamos si es usuario o admin
      if(response.data.rol == "Admin"){
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: `Inicio exitoso!`,
        });
        setTimeout(() => window.location.href = '/dashboardAdmin', 3000);
      }

      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: `Inicio exitoso!`,
      });
      // Redirigir a dashboard de usuario
      setTimeout(() => window.location.href = '/dashboard', 3000);
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
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
              Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
