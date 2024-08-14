const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un nuevo desarrollador
router.post('/', async (req, res) => {
    const { nombre } = req.body;

    try {
        const [result] = await pool.execute('INSERT INTO Desarrollador (nombre) VALUES (?)', [nombre]);
        res.status(201).json({ message: 'Desarrollador creado exitosamente', desarrolladorId: result.insertId });
    } catch (error) {
        console.error('Error al crear el desarrollador:', error);
        res.status(400).json({ message: 'Error al crear el desarrollador', error });
    }
});

// Obtener todos los desarrolladores
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Desarrollador');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los desarrolladores:', error);
        res.status(400).json({ message: 'Error al obtener los desarrolladores', error });
    }
});

module.exports = router;
