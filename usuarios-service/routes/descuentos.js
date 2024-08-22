const express = require('express');
const router = express.Router();
const pool = require('../config/db');


// Obtener todos juegos con descuento por region
router.get('/:region', async (req, res) => {
    const { region } = req.params;
    try {
        const [rows] = await pool.execute('SELECT * from Juego WHERE restriccion_region = ?;',[region]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los juegos con descuento por region, ', error);
        res.status(400).json({ message: 'Error al obtener los juegos con descuento por region, ', error });
    }
});

// Actualizar un juego con descuento
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descuento , restriccion_region} = req.body;

    try {
        const [result] = await pool.execute(
            'UPDATE Juego SET descuento = ? WHERE idJuego= ? AND restriccion_region=?' ,
            [descuento, id, restriccion_region]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Juego no encontrado.' });
        }

        res.status(200).json({ message: 'Descuento de juego actualizado exitosamente!' });
    } catch (error) {
        console.error('Error al actualizar el juego:', error);
        res.status(400).json({ message: 'Error al actualizar el juego', error });
    }
});

module.exports = router;
