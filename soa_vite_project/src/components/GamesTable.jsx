import React, { useState, useEffect } from 'react';
import './GamesTable.css';

const GamesTable = () => {
  const [games, setGames] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [updatedDiscounts, setUpdatedDiscounts] = useState({});

  useEffect(() => {
    fetchGames();
  }, [regionFilter]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MICROSERVICIO1}/juegos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
  
      // Asegúrate de que el filtro de región sea insensible al caso y busque coincidencias parciales
      if (regionFilter.trim()) {
        setGames(data.filter(game => 
          game.restriccion_region.toLowerCase().includes(regionFilter.trim().toLowerCase())
        ));
      } else {
        setGames(data);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  
  

  const handleDiscountChange = (idJuego, value) => {
    setUpdatedDiscounts(prevState => ({
      ...prevState,
      [idJuego]: value
    }));
  };

  const handleUpdateDiscount = async (idJuego, restriccion_region) => {
    const discount = updatedDiscounts[idJuego];
    if (discount === undefined) {
      alert('Please enter a discount value.');
      return;
    }

    try {
        console.log("Descuento: ",discount,", idJuego: ",idJuego,", region: ",restriccion_region);
        const response = await fetch(`${import.meta.env.VITE_MICROSERVICIO3}/descuentos/${idJuego}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descuento: discount ,restriccion_region: restriccion_region}),
      });

      if (response.ok) {
        alert('Discount updated successfully!');
        fetchGames(); // Refetch games to reflect the updated discount
        setUpdatedDiscounts(prevState => ({
          ...prevState,
          [idJuego]: ''
        }));
      } else {
        alert('Failed to update discount.');
      }
    } catch (error) {
      console.error('Error updating discount:', error);
    }
  };

  return (
    <div className="games-table-container">
      <h2>Descuentos en juegos</h2>
      <div className="filter-section">
        <label htmlFor="region-filter">Filtrar por región:</label>
        <input
          type="text"
          id="region-filter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          placeholder="Ingresar la region..."
        />
      </div>
      <table className="games-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Calificacion por edad</th>
            <th>Fecha lanzamiento</th>
            <th>Región</th>
            <th>Precio</th>
            <th>Categorias</th>
            <th>Descuento actual</th>
            <th>Descuento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.idJuego}>
              <td>{game.idJuego}</td>
              <td>{game.nombre}</td>
              <td>{game.clasificacion_edad}</td>
              <td>{new Date(game.fecha_lanzamiento).toLocaleDateString()}</td>
              <td>{game.restriccion_region}</td>
              <td>{"$" + game.precio}</td>
              <td>{game.categorias.join(', ')}</td> {/* Mostrar categorías separadas por comas */}
              <td>{game.descuento}%</td>
              <td>
                <input
                  type="number"
                  value={updatedDiscounts[game.idJuego] || ''}
                  onChange={(e) => handleDiscountChange(game.idJuego, e.target.value)}
                  placeholder="Nuevo descuento..."
                />
              </td>
              <td>
                <button onClick={() => handleUpdateDiscount(game.idJuego, game.restriccion_region)}>
                  Actualizar descuento
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesTable;
