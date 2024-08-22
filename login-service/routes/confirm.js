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

router.post('/', async (req, res) => {
    const { correo} = req.body;

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
            else{
                connection.release();
                return res.status(200).json({ message: 'Usuario ya esta confirmado o no existe.' ,status: "OK"});
            }
            connection.release();
            return res.status(400).json({ message: 'Correo ya registrado', status: "OK" });
        }

       

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar el correo, verificar información.',status: "Error" });
    }
});

module.exports  = router;
