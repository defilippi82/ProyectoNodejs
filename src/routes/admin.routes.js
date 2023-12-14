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
router.get("/admin/usuarios", adminController.getAllUsuarios)

//Crar usuario VIEW
router.get("/admin/crear", adminController.addUsuario)

// Tomar usuario para ACTUALIZAR VIEW
router.get("/admin/editar/:id", adminController.editUsuario)

// BORRAR usuario
router.get("/admin/borrar/:id", adminController.deleteUsuario)

// Manejo de datos del form para Crear usuario
router.post("/admin/editar", adminController.addUsuario)
// 
// Manejo de datos del form para editar usuario
router.post("/admin/editar/:id", adminController.editUsuarioPOST)
// 

//RESERVAS
// OBTENER todos los Reservas 
router.get("/admin/reserva", adminController.getAllReservas)

// Tomar Reserva para VER LAS RESERVAS POR ID VIEW
router.get("/admin/reserva/editar/:id", adminController.editReserva)

// Manejo de datos del form EDITAR LAS RESERVAS POR ID
router.post("/admin/reserva/editar/:id", adminController.editReservaPOST)
// -----]

// BORRAR Reserva
router.get("/admin/reserva/borrar/:id", adminController.deleteReserva)


module.exports = router;