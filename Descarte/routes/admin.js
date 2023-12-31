// Rutas protegidas - requieren usuario logueado & rol admin 

const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
// Middleware para verificar el rol de administrador
const isAdmin = (req, res, next) => {
  if (req.session.rol === 'Administrador') {
    next(); // Continuar si es administrador
    } else {
    res.redirect('/'); // Redirigir si no es administrador
  }
};
router.get('/', isAdmin, adminCtrl.adminViewGet);
router.get('/', isAdmin, async (req, res) => {
  try {
    const usuarios = await adminCtrl.getUsuarios(); // Obtiene los usuarios utilizando la función del controlador
    console.log(usuarios);
    res.render('admin', { usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).send('Error al obtener usuarios');
  }
});/*
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await adminCtrl.obtenerUsuarios(); // Llama a la función del controlador para obtener usuarios
    console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});*/

// Obtener reservas
router.get('/reservas', async (req, res) => {
  try {
    const reservas = await adminCtrl.obtenerReservas(); // Llama a la función del controlador para obtener reservas
    console.log(reservas);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

router.get('/usuarios', (req, res) => {
  const usuarios = [
    {
      nombre: 'Fede',
      email: 'prueba@prueba.com'
    }
  ];
  res.json(usuarios)
});

/*
// Obtener todos los usuarios
router.get('/usuarios', adminCtrl.getUsuarios);
router.get('/reservas', adminCtrl.getReservas);
// Crear nuevo usuario
router.post('/usuarios', adminCtrl.crearUsuario);  

// Obtener usuario por ID
router.get('/usuarios/:id', adminCtrl.obtenerUsuarioPorId);

// Actualizar usuario
router.put('/usuarios/:id', adminCtrl.actualizarUsuario);

// Eliminar usuario
router.delete('/usuarios/:id', adminCtrl.eliminarUsuario);
*/
module.exports = router;
