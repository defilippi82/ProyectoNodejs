const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controllers.js');

const isAdmin = (req, res, next) => {
  if (req.session.rol === 'Administrador') {
    next(); // Continuar si es administrador
  } else {
    res.redirect('/'); // Redirigir si no es administrador
  }
};
// Vista admin
router.get("/", adminCtrl.adminViewGet);

// USUARIOS
// OBTENER todos los usuarios - OK
router.get("/usuarios", adminCtrl.getAllUsuarios)
//Redirect a register usuario VIEW
router.get("/usuarios/crear", adminCtrl.addUsuario)
// Tomar usuario para ACTUALIZAR VIEW
router.get("/usuarios/editar/:id", adminCtrl.editUsuario)
// Manejo de datos del form para editar usuario
router.put("/usuarios/editar/:id", adminCtrl.editUsuarioPOST)

// BORRAR usuario
router.get("/usuarios/borrar/:id", adminCtrl.deleteUsuario)

//RESERVAS
// OBTENER todos los Reservas 
router.get("/reservas", adminCtrl.getAllReservas)

// Tomar Reserva para VER LAS RESERVAS POR ID VIEW
router.get("/reservas/editar/:id", adminCtrl.editReserva)
// Manejo de datos del form EDITAR LAS RESERVAS POR ID
router.put("/reservas/editar/:id", adminCtrl.editReservaPOST)


// BORRAR Reserva
router.get("/reservas/borrar/:id", adminCtrl.deleteReserva)


module.exports = router;