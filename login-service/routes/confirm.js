const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js'); 
const router = express.Router();
require('dotenv').config();

// /confirm/:token
router.get('/:token', async (req, res) => {
    try {
        const { token } = req.params;
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const connection = await pool.getConnection();

        //console.log(decoded.id);

        // Encontrar y actualizar el usuario
        const [user] = await connection.query('SELECT * FROM Usuario WHERE idUsuario = ? ', [decoded.id]);
        if (!user.length) {
            connection.release();
            return res.status(400).json({ message: 'Token inválido', error: user.length });
        }

        await connection.query('UPDATE Usuario SET isConfirmed = ? WHERE idUsuario = ?', [true, decoded.id]);

        connection.release();
        res.status(200).json({ message: 'Cuenta confirmada exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Token expirado o inválido', error: error });
    }
});

module.exports  = router;
