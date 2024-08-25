import React, { useState, useEffect } from 'react';
import './Store.css';

const Store = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [desarrolladores, setDesarrolladores] = useState([]);
  const [filtro, setFiltro] = useState({
    masVendidos: false,
    desarrollador: '',
    recomendaciones: false,
    calificaciones: '',
    clasificacion: '',
    categoria: '',
    desarrolladorSeleccionado: '',
    ratingMinimo: '' // Nuevo filtro para el rating mínimo
  });
  const [currentPage, setCurrentPage] = useState(1);
  const juegosPorPagina = 4;

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_MICROSERVICIO1}/juegos`);
        const data = await response.json();
        console.log("Juegos recibidos:", data);  // Verificar datos recibidos
        setJuegos(data);
        setJuegosFiltrados(data); // Inicialmente mostrar todos los juegos
      } catch (error) {
        console.error('Error al cargar los juegos:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/categorias');
        const data = await response.json();
        console.log("Categorías recibidas:", data);  // Verificar datos recibidos
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    const fetchDesarrolladores = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/desarrolladores');
        const data = await response.json();
        console.log("Desarrolladores recibidos:", data);  // Verificar datos recibidos
        setDesarrolladores(data);
      } catch (error) {
        console.error('Error al cargar los desarrolladores:', error);
      }
    };

    fetchJuegos();
    fetchCategorias();
    fetchDesarrolladores();
  }, []);

  useEffect(() => {
    filtrarJuegos();
  }, [filtro]);

  const filtrarJuegos = () => {
    let juegosFiltrados = [...juegos];

    if (filtro.masVendidos) {
        juegosFiltrados.sort((a, b) => b.descargas - a.descargas);
    }

    if (filtro.desarrolladorSeleccionado) {
        const desarrolladorSeleccionadoNombre = desarrolladores.find(dev => dev.idDesarrollador === parseInt(filtro.desarrolladorSeleccionado))?.nombre;
        console.log("Aplicando filtro de desarrollador con ID:", filtro.desarrolladorSeleccionado);
        juegosFiltrados = juegosFiltrados.filter(juego => 
            juego.desarrolladores && 
            juego.desarrolladores.some(d => d === desarrolladorSeleccionadoNombre)
        );
    }

    if (filtro.categoria) {
        const categoriaSeleccionadaNombre = categorias.find(cat => cat.idCategoria === parseInt(filtro.categoria))?.nombre;
        console.log("Aplicando filtro de categoría con nombre:", categoriaSeleccionadaNombre);
        juegosFiltrados = juegosFiltrados.filter(juego => 
            juego.categorias && 
            juego.categorias.some(c => c === categoriaSeleccionadaNombre)
        );
    }

    if (filtro.recomendaciones) {
        juegosFiltrados = juegosFiltrados.filter(juego => juego.recomendado);
    }

    if (filtro.calificaciones) {
        juegosFiltrados = juegosFiltrados.filter(juego => juego.calificaciones === filtro.calificaciones);
    }

    if (filtro.clasificacion) {
        juegosFiltrados = juegosFiltrados.filter(juego => juego.clasificacion_edad === filtro.clasificacion);
    }

    if (filtro.ratingMinimo) {
        juegosFiltrados = juegosFiltrados.filter(juego => {
            const rating = juego.averageRating ? parseFloat(juego.averageRating) : 0;
            return rating >= parseInt(filtro.ratingMinimo);
        });
    }

    setJuegosFiltrados(juegosFiltrados);
    setCurrentPage(1); // Reiniciar la paginación al aplicar filtros
  };


  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltro(prevFiltro => ({
      ...prevFiltro,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const indexOfLastJuego = currentPage * juegosPorPagina;
  const indexOfFirstJuego = indexOfLastJuego - juegosPorPagina;
  const juegosActuales = juegosFiltrados.slice(indexOfFirstJuego, indexOfLastJuego);

  console.log("Juegos actuales en esta página:", juegosActuales);  // Verificar los juegos que se van a mostrar

  const totalPaginas = Math.ceil(juegosFiltrados.length / juegosPorPagina);

  const renderPaginas = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPaginas; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="store-container">
      <div className="sidebar">
        <h3>Filtrar por</h3>
        <div className="filter-section">
          <label>
            <input
              type="checkbox"
              name="masVendidos"
              checked={filtro.masVendidos}
              onChange={handleFiltroChange}
            />
            Juegos más vendidos
          </label>
        </div>
        <div className="filter-section">
          <label>Desarrollador:</label>
          <select 
            name="desarrolladorSeleccionado" 
            value={filtro.desarrolladorSeleccionado} 
            onChange={handleFiltroChange}
          >
            <option value="">Todos</option>
            {desarrolladores.map(desarrollador => (
              <option key={desarrollador.idDesarrollador} value={desarrollador.idDesarrollador}>
                {desarrollador.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label>Categoría:</label>
          <select 
            name="categoria" 
            value={filtro.categoria} 
            onChange={handleFiltroChange}
          >
            <option value="">Todas</option>
            {categorias.map(categoria => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label>
            <input
              type="checkbox"
              name="recomendaciones"
              checked={filtro.recomendaciones}
              onChange={handleFiltroChange}
            />
            Recomendaciones
          </label>
        </div>
        <div className="filter-section">
          <label>Rating:</label>
          <select name="ratingMinimo" value={filtro.ratingMinimo} onChange={handleFiltroChange}>
            <option value="">Sin filtro</option>
            <option value="1">1 estrella y más</option>
            <option value="2">2 estrellas y más</option>
            <option value="3">3 estrellas y más</option>
            <option value="4">4 estrellas y más</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
        <div className="filter-section">
          <label>Clasificación:</label>
          <select name="clasificacion" value={filtro.clasificacion} onChange={handleFiltroChange}>
            <option value="">Todas</option>
            <option value="E">E (Everyone)</option>
            <option value="T">T (Teen)</option>
            <option value="M">M (Mature)</option>
            <option value="AO">AO (Adults Only)</option>
          </select>
        </div>
      </div>
      <div className="game-list">
        <h2>Juegos Disponibles</h2>
        <div className="card-container">
            {juegosActuales.map(juego => (
                <div key={juego.idJuego} className="card">
                <h3>{juego.nombre}</h3>
                <p>Desarrolladores: {(juego.desarrolladores || []).join(', ')}</p>
                <p>Categorías: {(juego.categorias || []).join(', ')}</p>
                <p>Clasificación: {juego.clasificacion_edad}</p>
                <p>Calificaciones: {juego.averageRating ? `${juego.averageRating} estrellas` : "Sin rating"}</p>
                <p>Precio: ${juego.precio}</p>
                <p>Descargas: {juego.descargas} veces</p>
                </div>
            ))}
            </div>

        <div className="pagination">
          {renderPaginas()}
        </div>
      </div>
    </div>
  );
};

export default Store;
