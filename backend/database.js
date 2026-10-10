const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '7040',
    database: 'gestion_servicios_usuarios',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Prueba de conexión opcional al iniciar
async function probarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log('¡Base de datos MySQL conectada exitosamente!');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos MySQL:', error);
    }
}

probarConexion();

module.exports = pool;