const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { mongoose } = require('./database');

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Rutas de la API REST
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));

// Inicio del servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
});