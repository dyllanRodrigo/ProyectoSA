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

module.exports = router;
