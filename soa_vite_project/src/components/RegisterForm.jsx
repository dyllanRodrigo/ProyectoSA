import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import './RegisterForm.css'; // Import your CSS file

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nickname: '',
    correo: '',
    telefono: '',
    direccion: '',
    region: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error en el registro');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingrese su nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Ingrese su apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Ingrese su nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="correo">Email</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ingrese su correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ingrese su teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Ingrese su dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="region">Región</label>
          <input
            type="text"
            id="region"
            name="region"
            placeholder="Ingrese su región"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterForm;
