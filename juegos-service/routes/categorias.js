const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombre } = req.body;

    try {
        const [result] = await pool.execute('INSERT INTO Categoria (nombre) VALUES (?)', [nombre]);
        res.status(201).json({ message: 'Categoría creada exitosamente', categoriaId: result.insertId });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(400).json({ message: 'Error al crear la categoría', error });
    }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Categoria');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(400).json({ message: 'Error al obtener las categorías', error });
    }
});

// Obtener categorías de interés para un usuario específico
router.get('/intereses/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const [rows] = await pool.execute(
            `SELECT DISTINCT C.nombre
             FROM Usuario U
             JOIN JuegosUsuario JU ON U.idUsuario = JU.Usuario_idUsuario
             JOIN Juego J ON JU.Juego_idJuego = J.idJuego
             JOIN JuegoCategoria JC ON J.idJuego = JC.idJuego
             JOIN Categoria C ON JC.idCategoria = C.idCategoria
             WHERE U.idUsuario = ?`,
            [usuarioId]
        );

        // Transformar los resultados en un array simple
        const categoriasIntereses = rows.map(row => row.nombre);

        res.status(200).json({ CategoriasIntereses: categoriasIntereses });
    } catch (error) {
        console.error('Error al obtener las categorías de interés:', error);
        res.status(400).json({ message: 'Error al obtener las categorías de interés', error });
    }
});

module.exports = router;
