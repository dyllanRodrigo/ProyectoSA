const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un nuevo rating para un juego
router.post('/', async (req, res) => {
    const { Juego_idJuego, valor } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO Rating (Juego_idJuego, valor) VALUES (?, ?)',
            [Juego_idJuego, valor]
        );

        res.status(201).json({ message: 'Rating creado exitosamente', ratingId: result.insertId });
    } catch (error) {
        console.error('Error al crear el rating:', error);
        res.status(400).json({ message: 'Error al crear el rating', error });
    }
});

// Obtener todos los ratings de un juego
router.get('/juego/:juegoId', async (req, res) => {
    const { juegoId } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Rating WHERE Juego_idJuego = ?',
            [juegoId]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los ratings:', error);
        res.status(400).json({ message: 'Error al obtener los ratings', error });
    }
});

// Obtener un rating específico por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Rating WHERE idrating = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Rating no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el rating:', error);
        res.status(400).json({ message: 'Error al obtener el rating', error });
    }
});

module.exports = router;
