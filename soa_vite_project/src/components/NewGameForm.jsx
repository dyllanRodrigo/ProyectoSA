import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './NewGameForm.css';

const NewGameForm = () => {
  const [nombre, setNombre] = useState('');
  const [clasificacionEdad, setClasificacionEdad] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [restriccionRegion, setRestriccionRegion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [desarrolladores, setDesarrolladores] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [desarrolladorSeleccionado, setDesarrolladorSeleccionado] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setError('Error al cargar las categorías.');
        console.error('Error al cargar las categorías:', error);
      }
    };

    const fetchDesarrolladores = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/desarrolladores');
        const data = await response.json();
        setDesarrolladores(data);
      } catch (error) {
        setError('Error al cargar los desarrolladores.');
        console.error('Error al cargar los desarrolladores:', error);
      }
    };

    fetchCategorias();
    fetchDesarrolladores();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const dataToSend = {
      nombre,
      clasificacion_edad: clasificacionEdad,
      fecha_lanzamiento: fechaLanzamiento,
      restriccion_region: restriccionRegion,
      precio: parseFloat(precio),
      categorias: categoriaSeleccionada.map(c => parseInt(c)),
      desarrolladores: desarrolladorSeleccionado.map(d => parseInt(d)),
    };
  
    // Mostrar la información en la consola antes de enviarla
    console.log('Data being sent:', JSON.stringify(dataToSend, null, 2));
  
    try {
      const response = await fetch('http://localhost:3002/api/juegos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Juego registrado exitosamente.');
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: data.message || 'Juego registrado exitosamente.',
        });
        setTimeout(() => window.location.href = '/', 4000);
      } else {
        throw new Error(data.message || 'Error en el registro del juego.');
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (


      <div className="container">
        <h2>REGISTRAR JUEGO</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Nombre del juego:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Clasificación de edad:</label>
            <select
              value={clasificacionEdad}
              onChange={(e) => setClasificacionEdad(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona la clasificación</option>
              <option value="E">E (Everyone)</option>
              <option value="T">T (Teen)</option>
              <option value="M">M (Mature)</option>
              <option value="AO">AO (Adults Only)</option>
              <option value="RP">RP (Rating Pending)</option>
            </select>
          </div>
          <div>
            <label>Fecha de lanzamiento:</label>
            <input
              type="date"
              value={fechaLanzamiento}
              onChange={(e) => setFechaLanzamiento(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Restricción de región:</label>
            <select
              value={restriccionRegion}
              onChange={(e) => setRestriccionRegion(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona la restricción de región</option>
              <option value="Ninguna">Ninguna</option>
              <option value="NA">NA (North America)</option>
              <option value="LATAM">LATAM (Latinoamerica)</option>
              <option value="EU">EU (Europe)</option>
              <option value="JP">JP (Japan)</option>
            </select>
          </div>
          <div>
            <label>Precio ($):</label>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categorías:</label>
            <p className="tip">Puedes seleccionar múltiples categorías manteniendo presionada la tecla Ctrl y haciendo clic en las opciones.</p>
            <select
              multiple
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada([...e.target.selectedOptions].map(option => option.value))}
              required
            >
              {categorias.map(categoria => (
                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Desarrolladores:</label>
            <p className="tip">Puedes seleccionar múltiples desarrolladores manteniendo presionada la tecla Ctrl y haciendo clic en las opciones.</p>
            <select
              multiple
              value={desarrolladorSeleccionado}
              onChange={(e) => setDesarrolladorSeleccionado([...e.target.selectedOptions].map(option => option.value))}
              required
            >
              {desarrolladores.map(desarrollador => (
                <option key={desarrollador.idDesarrollador} value={desarrollador.idDesarrollador}>
                  {desarrollador.nombre}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Registrar Juego</button>
        </form>
      </div>
  );
};

export default NewGameForm;
