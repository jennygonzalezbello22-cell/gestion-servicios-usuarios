const mongoose = require('mongoose');

// Puedes reemplazar esta cadena por tu URI de MongoDB Atlas
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_app';

mongoose.connect(URI)
    .then(db => console.log('Base de Datos Conectada correctamente'))
    .catch(err => console.error('Error de conexión a la Base de Datos:', err));

module.exports = mongoose;