const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    descripcion: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);