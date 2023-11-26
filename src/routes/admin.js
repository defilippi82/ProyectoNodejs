// Rutas protegidas - requieren usuario logueado & rol admin 

const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

// Ruta para la página de administración
router.get('/admin', (req, res) => {
    // Verificar si el usuario tiene el rol de administrador
    if (req.user && req.user.role === 'admin') {
      res.render('admin'); // Renderizar la plantilla admin.ejs si es administrador
    } else {
      res.redirect('/'); // Redirigir a otra página si no es administrador
    }
  });
// Obtener todos los usuarios
router.get('/admin', adminCtrl.getUsuarios);

// Crear nuevo usuario
router.post('/admin', adminCtrl.crearUsuario);  

// Obtener usuario por ID
router.get('/admin/:id', adminCtrl.obtenerUsuarioPorId);

// Actualizar usuario
router.put('/admin/:id', adminCtrl.actualizarUsuario);

// Eliminar usuario
router.delete('/admin/:id', adminCtrl.eliminarUsuario);

module.exports = router;
/*
const express = require('express')
const router = express.Router()

router.get("/admin/usuarios/:id", (req, res) => {
    res.send("Muestra la info y de la DB")
});

router.put("/admin/usuarios/:id", (req, res) => {
    res.send("Actualiza desde un form la info y enviarla a DB")
});
router.post("/admin/usuarios", (req, res) => {
    res.send("Crea desde un form la info y enviarla a DB")
});

router.delete("/admin/usuarios", (req, res) => {
    res.send("Borra desde un form la info y enviarla a DB")
});*/