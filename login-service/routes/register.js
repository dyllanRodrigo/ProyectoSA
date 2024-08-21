const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js'); 
const transporter = require('../config/mailer.js');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { nombre, apellido, nickname, correo, telefono, direccion, region, password } = req.body;

    try {
        const connection = await pool.getConnection();

        // Verificar si el usuario ya existe
        const [existingUser] = await connection.query('SELECT * FROM Usuario WHERE correo = ?', [correo]);
        if (existingUser.length) {
            //Verificamos si ya esta verificado:
            const [existingUser] = await connection.query('SELECT * FROM Usuario WHERE correo = ? AND isConfirmed=0', [correo]);
            if (existingUser.length) {
                // Crear el token de confirmación y expira en dos minutos
                const token = jwt.sign({ id: existingUser[0].idUsuario }, process.env.JWT_SECRET, { expiresIn: '2m' });

                // Enviar el correo de confirmación
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: correo,
                    subject: 'Confirma tu cuenta',
                    text: `Confirma tu cuenta con el siguiente enlace: ${process.env.CLIENT_URL}/api/confirm/${token}`,
                };

                //Enviar correo de registro completo
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        connection.release();
                        return res.status(500).json({ message: 'Error enviando el correo',status: "Error" });
                    }
                    connection.release();
                    res.status(200).json({ message: 'Registro exitoso, por favor verifica tu correo para acceder a la plataforma.' ,status: "OK"});
                });


                connection.release();
                return res.status(400).json({ message: 'Correo de confirmacion enviado de nuevo!.' ,status: "OK"});
            }
            connection.release();
            return res.status(400).json({ message: 'Correo ya registrado', status: "OK" });
        }

        // Encriptar la contraseña para mayor seguridad
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const [result] = await connection.query(
            'INSERT INTO Usuario (nombre, apellido, nickname, correo, telefono, direccion, region, rol, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, nickname, correo, telefono, direccion, region, 'user', hashedPassword]
        );

        // Crear el token de confirmación y expira en dos minutos
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '2m' });

        // Enviar el correo de confirmación
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Confirma tu cuenta',
            text: `Confirma tu cuenta con el siguiente enlace: ${process.env.CLIENT_URL}/api/confirm/${token}`,
        };

        //Enviar correo de registro completo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                connection.release();
                return res.status(500).json({ message: 'Error enviando el correo' });
            }
            connection.release();
            res.status(200).json({ message: 'Registro exitoso, por favor verifica tu correo para acceder a la plataforma.' ,status: "OK"});
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el registro de usuario',status: "Error" });
    }
});

module.exports = router;
