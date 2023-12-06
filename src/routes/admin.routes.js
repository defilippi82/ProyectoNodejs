const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controllers');

// OBTENER todos los usuarios - OK
router.get("/", adminController.getAllUsuarios)

// [-----
// CREAR usuario VIEW
router.get("/admin/crear", adminController.addUsuario)

// Manejo de datos del form
router.post("/admin/editar", adminController.addUsuarioPOST)
// -----]

// [-----
// Tomar usuario para ACTUALIZAR VIEW
router.get("/admin/editar/:id", adminController.editUsuario)

// Manejo de datos del form
router.post("/admin/editar/:id", adminController.editUsuarioPOST)
// -----]

// BORRAR usuario
router.get("/admin/borrar/:id", adminController.deleteUsuario)


//RESERVAS
// OBTENER todos los Reservas - OK
router.get("/admin/reserva", adminController.getAllReservas)


// [-----
// CREAR Reserva VIEW
router.get("/admin/reserva/crear", adminController.addReserva)

// Manejo de datos del form
router.post("/admin/reserva/crear", adminController.addReservaPOST)
// -----]

// [-----
// Tomar Reserva para ACTUALIZAR VIEW
router.get("/admin/reserva/editar/:id", adminController.editReserva)

// Manejo de datos del form
router.post("/admin/reserva/editar/:id", adminController.editReservaPOST)
// -----]

// BORRAR Reserva
router.get("/admin/reserva/borrar/:id", adminController.deleteReserva)


module.exports = router;