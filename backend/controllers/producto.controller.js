const Producto = require('../models/Producto');
const productoCtrl = {};

// Obtener todos los productos
productoCtrl.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear producto
productoCtrl.createProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.json({ status: 'Producto/Servicio creado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener producto por ID
productoCtrl.getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// Editar producto
productoCtrl.editProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await Producto.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json({ status: 'Producto/Servicio actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar producto
productoCtrl.deleteProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ status: 'Producto/Servicio eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = productoCtrl;