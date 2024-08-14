const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un nuevo juego
router.post('/', async (req, res) => {
    const { nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio, genero, categorias, desarrolladores } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO Juego (nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio, genero) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio, genero]
        );
        const juegoId = result.insertId;

        // Asociar categorías al juego
        for (const categoriaId of categorias) {
            await pool.execute('INSERT INTO JuegoCategoria (idJuego, idCategoria) VALUES (?, ?)', [juegoId, categoriaId]);
        }

        // Asociar desarrolladores al juego
        for (const desarrolladorId of desarrolladores) {
            await pool.execute('INSERT INTO JuegoDesarrollador (Juego_idJuego, Desarrollador_idDesarrollador) VALUES (?, ?)', [juegoId, desarrolladorId]);
        }

        res.status(201).json({ message: 'Juego creado exitosamente', juegoId });
    } catch (error) {
        console.error('Error al crear el juego:', error);
        res.status(400).json({ message: 'Error al crear el juego', error });
    }
});

// Obtener todos los juegos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Juego');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(400).json({ message: 'Error al obtener los juegos', error });
    }
});

module.exports = router;
