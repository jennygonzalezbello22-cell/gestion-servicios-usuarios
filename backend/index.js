const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rutas de la API
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});