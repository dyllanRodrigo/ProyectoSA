const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.use(bodyParser.json());

const register = require('./routes/register');  
const confirm = require('./routes/confirm');  
const login = require('./routes/login');  

app.use('/api/register', register);
app.use('/api/confirm', confirm);
app.use('/api/login', login);

// Iniciar el servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
