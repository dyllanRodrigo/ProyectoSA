const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Importa las rutas
const categoriasRoutes = require('./routes/categorias'); 
const desarrolladoresRoutes = require('./routes/desarrolladores');
const juegosRoutes = require('./routes/juegos');
const ratingsRoutes = require('./routes/ratings');  // Nueva ruta para manejar ratings


app.use('/api/categorias', categoriasRoutes);
app.use('/api/desarrolladores', desarrolladoresRoutes);
app.use('/api/juegos', juegosRoutes);
app.use('/api/ratings', ratingsRoutes);  // Ruta para ratings

// Iniciar el servidor
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
