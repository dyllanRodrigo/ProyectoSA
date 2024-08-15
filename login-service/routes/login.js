const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js'); 
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
    const { correo, password } = req.body;

    try {
        const connection = await pool.getConnection();

        // Buscar al usuario por correo
        const [user] = await connection.query('SELECT * FROM Usuario WHERE correo = ?', [correo]);
        if (!user.length) {
            connection.release();
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user[0].pass);
        if (!isMatch) {
            connection.release();
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Verificar si el usuario ha confirmado su cuenta
        if (!user[0].isConfirmed) {
            connection.release();
            return res.status(400).json({ message: 'Por favor confirma tu cuenta' });
        }

        // Generar el token de acceso
        const token = jwt.sign({ id: user[0].idUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        connection.release();
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el login' });
    }
});

module.exports = router;