const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


const register = require('./routes/register');  
const confirm = require('./routes/confirm');  
const login = require('./routes/login');  


app.use('/api/register', register);
app.use('/api/confirm', confirm);
app.use('/api/login', login);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
