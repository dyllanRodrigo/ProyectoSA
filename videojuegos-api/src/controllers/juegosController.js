const Juego = require('../models/Juego');

exports.crearJuego = async (req, res) => {
    try {
        const nuevoJuego = await Juego.create(req.body);
        res.status(201).json({
            message: 'Juego creado exitosamente',
            juegoId: nuevoJuego.id
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el juego', error });
    }
};

exports.obtenerJuego = async (req, res) => {
    try {
        const juego = await Juego.findByPk(req.params.id);
        if (!juego) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json(juego);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el juego', error });
    }
};

exports.actualizarJuego = async (req, res) => {
    try {
        const [updated] = await Juego.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json({ message: 'Juego actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el juego', error });
    }
};

exports.eliminarJuego = async (req, res) => {
    try {
        const deleted = await Juego.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.status(200).json({ message: 'Juego eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el juego', error });
    }
};
