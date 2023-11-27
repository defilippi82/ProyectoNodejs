// Lógica de negocio
const conn = require('../database/conn');

const adminController = {
  // Redirección para crear un nuevo usuario
  crearUsuario: (req, res) => {
    res.redirect('/register'); // Redirigir a la ruta de registro
  },

  // Obtener todos los usuarios
  getUsuarios: async (req, res) => {
    try {
      const usuarios= await conn.execute('SELECT * FROM usuarios');
      return usuarios;
      
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).send('Error al obtener usuarios');
    }
  },

  // Obtener y mostrar reservas
  getReservas: async (req, res) => {
    try {
      const reservas = await obtenerReservas(); // Lógica para obtener reservas desde la base de datos
      res.render('reservas', { reservas });
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      res.status(500).send('Error al obtener reservas');
    }
  },

  // Obtener usuario por ID
  obtenerUsuarioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuarios = await conn.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
      if (usuario.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json({ usuario });
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).send('Error al obtener usuario por ID');
    }
  },

  // Actualizar usuario por ID
  actualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nombre, email, manzana, lote, isla, telefono, contrasena, rol } = req.body;
    try {
      await conn.execute(
        'UPDATE usuarios SET nombre = ?, email = ?, manzana = ?, lote = ?, isla = ?, telefono = ?, contrasena = ?, rol = ? WHERE id = ?',
        [nombre, email, manzana, lote, isla, telefono, contrasena, rol, id]
      );
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).send('Error al actualizar usuario');
    }
  },

  // Eliminar usuario por ID
  eliminarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await conn.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).send('Error al eliminar usuario');
    }
  }
};
module.exports = adminController;