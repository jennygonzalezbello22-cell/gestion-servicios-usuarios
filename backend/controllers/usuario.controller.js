const pool = require('../database');
const usuarioCtrl = {};

// Obtener todos los usuarios
ususarioCtrlGet = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nombre, email FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
usuarioCtrl.getUsuarios = ususarioCtrlGet;

// Crear un usuario
usuarioCtrl.createUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        res.json({ status: 'Usuario registrado exitosamente', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario
usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        await pool.query(
            'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?',
            [nombre, email, password, req.params.id]
        );
        res.json({ status: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.json({ status: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = usuarioCtrl;