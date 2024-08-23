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

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nickname, setNickname] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [region, setRegion] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Cifrar la contraseña
      const encryptedPassword = crypto.SHA256(password).toString();

      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo,
          password: encryptedPassword,
        }),
      });
      
      const data = await response.json();
      //Verificamos si esta confirmado el email
      if((data.message == "Por favor confirma tu cuenta") || (data.message ==  'Contraseña incorrecta' ) || (data.message ==  'Usuario no encontrado' ) ){
        Swal.fire({
          icon: 'error',
          title: 'Verificar!',
          text: data.message ,
        });
        return;
      }

     
  // Guardar el token JWT y el rol en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('nickname', data.nickname);
    localStorage.setItem('rol', data.rol); // para manejo de navbar diferentes


      console.log(data.rol);

      //Verificamos si es usuario o admin
      if(data.rol == "Admin"){
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: `Inicio exitoso!`,
        });
        setTimeout(() => window.location.href = '/dashboardAdmin', 3000);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: `Inicio exitoso!`,
      });
      // Redirigir a dashboard de usuario
      setTimeout(() => window.location.href = '/dashboard', 3000);
    } catch (error) {
      setError('Error al iniciar sesion, ', error);
    }
  };

  const handleRegister = () => {
    window.location.href = '/register'; // Reemplaza con la URL adecuada para el registro
  };

  const handleResend= async (e)  => {
    e.preventDefault();

    try {
      const encryptedPassword = crypto.SHA256(password).toString();
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo
        }),
      });
      const data = await response.json();
      if(!(data.message == "")){
        Swal.fire({
          icon: 'success',
          title: 'Verificar!',
          text: data.message ,
        });
      } 
    } catch (error) {
      setError('Error al enviar el correo, verificar la información.');
      console.log({error});
    }
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
            <button type="button" onClick={handleResend} className="resend-code-button">
              Reenviar codigo email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
