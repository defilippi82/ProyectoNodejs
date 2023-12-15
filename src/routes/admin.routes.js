const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');

const isAdmin = (req, res, next) => {
  if (req.session.rol === 'Administrador') {
    next(); // Continuar si es administrador
  } else {
    res.redirect('/'); // Redirigir si no es administrador
  }
};
// Vista admin
router.get("/", isAdmin, adminController.adminViewGet)

// USUARIOS
// OBTENER todos los usuarios - OK
router.get("/usuarios", adminController.getAllUsuarios)

//Crar usuario VIEW
router.get("/usuarios/crear", adminController.addUsuario)

// Tomar usuario para ACTUALIZAR VIEW
router.get("/usuarios/editar/:id", adminController.editUsuario)

// BORRAR usuario
router.get("/usuarios/borrar/:id", adminController.deleteUsuario)

// Manejo de datos del form para Crear usuario
//router.post("/usuarios/editar", adminController.addUsuario)
// 
// Manejo de datos del form para editar usuario
router.post("/usuarios/editar/:id", adminController.editUsuarioPOST)
// 

//RESERVAS
// OBTENER todos los Reservas 
router.get("/reserva", adminController.getAllReservas)

// Tomar Reserva para VER LAS RESERVAS POR ID VIEW
router.get("/reserva/editar/:id", adminController.editReserva)

// Manejo de datos del form EDITAR LAS RESERVAS POR ID
router.post("/reserva/editar/:id", adminController.editReservaPOST)
// -----]

// BORRAR Reserva
router.get("/reserva/borrar/:id", adminController.deleteReserva)


module.exports = router;