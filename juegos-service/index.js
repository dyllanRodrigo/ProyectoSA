const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(bodyParser.json());

// Importa las rutas de juegos, categorías, desarrolladores, ratings
const juegosRoutes = require('./routes/juegos');
const categoriasRoutes = require('./routes/categorias');
const desarrolladoresRoutes = require('./routes/desarrolladores');
const ratingsRoutes = require('./routes/ratings');

// Define las rutas base
app.use('/api/juegos', juegosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/desarrolladores', desarrolladoresRoutes);
app.use('/api/ratings', ratingsRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Juegos service running on port ${PORT}`);
});
