const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, nickname, correo, telefono, direccion, region, rol } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO Usuario (nombre, apellido, nickname, correo, telefono, direccion, region, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, nickname, correo, telefono, direccion, region, rol]
        );

        res.status(201).json({ message: 'Usuario creado exitosamente', usuarioId: result.insertId });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ message: 'Error al crear el usuario', error });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Usuario');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(400).json({ message: 'Error al obtener los usuarios', error });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.execute('SELECT * FROM Usuario WHERE idUsuario = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(400).json({ message: 'Error al obtener el usuario', error });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, nickname, correo, telefono, direccion, region, rol } = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE Usuario SET nombre = ?, apellido = ?, nickname = ?, correo = ?, telefono = ?, direccion = ?, region = ?, rol = ? WHERE idUsuario = ?',
            [nombre, apellido, nickname, correo, telefono, direccion, region, rol, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(400).json({ message: 'Error al actualizar el usuario', error });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM Usuario WHERE idUsuario = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(400).json({ message: 'Error al eliminar el usuario', error });
    }
});

module.exports = router;
