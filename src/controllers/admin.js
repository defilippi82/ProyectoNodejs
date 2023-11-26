// Lógica de negocio

const Usuarios = require('../models/Usuario');

module.exports = {

  getUsuarios: async (req, res) => {
    
    const usuarios = await Usuarios.find({});
    res.render('admin', { usuarios });

  },

  crearUsuario: async (req, res) => {
    
    const usuario = await Usuarios.create(req.body);
    // código para guardar y respuesta 
  },

  // Otros métodos CRUD ...

}