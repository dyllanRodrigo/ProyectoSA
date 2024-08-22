import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_MICROSERVICIO3}/usuarios/`)
      .then(response => {
        // Verifica que la respuesta es un array y maneja el caso
        const data = response.data;
        console.log(data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected an array but received:', data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (idUsuario) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      axios.delete(`${import.meta.env.VITE_MICROSERVICIO3}/usuarios/${idUsuario}`)
        .then(() => setUsers(users.filter(user => user.idUsuario !== idUsuario)))
        .catch(error => console.error('Error deleting user:', error));
    }
  };
  

  return (
    <div className="user-table">
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nickname</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Región</th>
            <th>Rol</th>
            <th>Confirmado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map(user => (
            <tr key={user.idUsuario}>
              <td>{user.idUsuario}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.nickname}</td>
              <td>{user.correo}</td>
              <td>{user.telefono}</td>
              <td>{user.direccion}</td>
              <td>{user.region}</td>
              <td>{user.rol}</td>
              <td>{user.isConfirmed ? 'Sí' : 'No'}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(user.idUsuario)}>Eliminar</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="11">No hay usuarios para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
