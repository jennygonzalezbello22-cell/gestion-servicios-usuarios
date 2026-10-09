const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ['Administrador', 'Cliente', 'Empleado'], default: 'Cliente' },
    estado: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);