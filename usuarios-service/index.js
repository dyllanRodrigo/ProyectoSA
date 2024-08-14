const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Importa las rutas de usuarios
const usuariosRoutes = require('./routes/usuarios');

// Define las rutas base para usuarios
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Usuarios service running on port ${PORT}`);
});
