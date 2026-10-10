const pool = require('../database');
const productoCtrl = {};

// Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un producto
productoCtrl.createProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, stock, descripcion } = req.body;
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, categoria, precio, stock, descripcion) VALUES (?, ?, ?, ?, ?)',
            [nombre, categoria, precio, stock, descripcion]
        );
        res.json({ status: 'Producto guardado exitosamente', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
productoCtrl.getProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
productoCtrl.editProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, stock, descripcion } = req.body;
        await pool.query(
            'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, stock = ?, descripcion = ? WHERE id = ?',
            [nombre, categoria, precio, stock, descripcion, req.params.id]
        );
        res.json({ status: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto
productoCtrl.deleteProducto = async (req, res) => {
    try {
        await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
        res.json({ status: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = productoCtrl;