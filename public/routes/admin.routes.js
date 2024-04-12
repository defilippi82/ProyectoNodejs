const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.session.rol === 'Administrador') {
    next(); // Continuar si es administrador
  } else {
    res.redirect('/'); // Redirigir si no es administrador
  }
};

// Vista admin
router.get('/', isAdmin, adminController.adminViewGet);

// USUARIOS
// OBTENER todos los usuarios
router.get('/usuarios', isAdmin, adminController.getAllUsuarios);

// Eliminar usuario
router.delete('/usuarios/:id', isAdmin, adminController.deleteUsuario);

// RESERVAS
// OBTENER todas las reservas
router.get('/reservas', isAdmin, adminController.getAllReservas);

// Eliminar reserva
router.delete('/reservas/:id', isAdmin, adminController.deleteReserva);

module.exports = router;