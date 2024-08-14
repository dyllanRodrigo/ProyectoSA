const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');
const Categoria = require('../models/Categoria');

// Obtener el catálogo de juegos filtrados por categoría (género)
router.get('/', async (req, res) => {
    try {
        const { genero } = req.query;  // Aquí "genero" se refiere a la categoría

        let juegos;
        if (genero) {
            juegos = await Juego.findAll({
                include: {
                    model: Categoria,
                    where: { nombre: genero }  // Filtra por el nombre de la categoría
                }
            });
        } else {
            juegos = await Juego.findAll({ include: Categoria });
        }

        res.status(200).json(juegos);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el catálogo', error });
    }
});

module.exports = router;
