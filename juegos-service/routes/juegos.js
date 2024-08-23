const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un nuevo juego
router.post('/', async (req, res) => {
    const { nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio, categorias, desarrolladores } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO Juego (nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio) VALUES (?, ?, ?, ?, ?)',
            [nombre, clasificacion_edad, fecha_lanzamiento, restriccion_region, precio]
        );
        const juegoId = result.insertId;

        // Asociar categorías al juego
        for (const categoriaId of categorias) {
            await pool.execute('INSERT INTO JuegoCategoria (idJuego, idCategoria) VALUES (?, ?)', [juegoId, categoriaId]);
        }

        // Asociar desarrolladores al juego
        for (const desarrolladorId of desarrolladores) {
            await pool.execute('INSERT INTO JuegoDesarrollador (Juego_idJuego, Desarrollador_idDesarrollador) VALUES (?, ?)', [juegoId, desarrolladorId]);
        }

        res.status(201).json({ message: 'Juego creado exitosamente', juegoId });
    } catch (error) {
        console.error('Error al crear el juego:', error);
        res.status(400).json({ message: 'Error al crear el juego', error });
    }
});

// Obtener todos los juegos con sus categorías y desarrolladores asociados
router.get('/', async (req, res) => {
    try {
        const [juegos] = await pool.execute('SELECT * FROM Juego');

        const juegosConDetalles = await Promise.all(juegos.map(async (juego) => {
            const [categorias] = await pool.execute(
                'SELECT c.idCategoria, c.nombre FROM Categoria c ' +
                'JOIN JuegoCategoria jc ON c.idCategoria = jc.idCategoria ' +
                'WHERE jc.idJuego = ?',
                [juego.idJuego]
            );

            const [desarrolladores] = await pool.execute(
                'SELECT d.idDesarrollador, d.nombre FROM Desarrollador d ' +
                'JOIN JuegoDesarrollador jd ON d.idDesarrollador = jd.Desarrollador_idDesarrollador ' +
                'WHERE jd.Juego_idJuego = ?',
                [juego.idJuego]
            );

            return {
                ...juego,
                categorias: categorias.map(c => c.nombre),  // Devolver solo los nombres de las categorías
                desarrolladores: desarrolladores.map(d => d.nombre)  // Devolver solo los nombres de los desarrolladores
            };
        }));

        res.status(200).json(juegosConDetalles);
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(400).json({ message: 'Error al obtener los juegos', error });
    }
});

module.exports = router;
