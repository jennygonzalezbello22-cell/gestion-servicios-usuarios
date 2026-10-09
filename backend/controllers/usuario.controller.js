const Usuario = require('../models/Usuario');
const usuarioCtrl = {};

// Obtener todos los usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, { password: 0 });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({ status: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener usuario por ID
usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id, { password: 0 });
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Editar usuario
usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.json({ status: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ status: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = usuarioCtrl;