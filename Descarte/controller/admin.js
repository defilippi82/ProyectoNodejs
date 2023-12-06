
const conn = require('../database/conn');
const connection = require('../database/db');
const userService = require('../controllers/adminServices');

const adminController = {
  adminViewGet: async (req, res) => {
    //const usuarios = await userService.obtenerUsuarios();
   
    res.render('admin'); 
  }};

  

  // Obtener todos los usuarios
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await userService.obtenerUsuarios(); // Función para obtener usuarios de la base de datos
      res.json(usuarios); // Responder con los usuarios obtenidos
    } catch (error) {
      throw new Error('Error al obtener usuarios desde la base de datos');
    }
  };

  // Obtener y mostrar reservas
  getReservas: async (req, res) => {
    try {
      const reservas = await connection.obtenerReservas(); // Función para obtener reservas de la base de datos
      res.json(reservas); // Responder con las reservas obtenidas
    } catch (error) {
      throw new Error('Error al obtener reservas desde la base de datos');
    }
  };

  // Obtener usuario por ID
  obtenerUsuarioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuarios = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
      if (usuario.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json({ usuario: usuarios[0] }); // Devolver el usuario encontrado
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).send('Error al obtener usuario por ID');
    }
  };

  // Actualizar usuario por ID
  actualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nombre, email, manzana, lote, isla, telefono, contrasena, rol } = req.body;
    try {
      await connection.execute(
        'UPDATE usuarios SET nombre = ?, email = ?, manzana = ?, lote = ?, isla = ?, telefono = ?, contrasena = ?, rol = ? WHERE id = ?',
        [nombre, email, manzana, lote, isla, telefono, contrasena, rol, id]
      );
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).send('Error al actualizar usuario');
    }
  };

  // Eliminar usuario por ID
  eliminarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).send('Error al eliminar usuario');
    }
  }
;
module.exports = adminController;