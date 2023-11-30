const connection = require('../database/db');

const userService = {
  obtenerUsuarios: async () => {
    try {
      const usuarios = await connection.query('SELECT * FROM usuarios'); // Ejemplo de consulta a la base de datos
      return usuarios; // Devuelve los usuarios obtenidos
    } catch (error) {
      throw new Error('Error al obtener usuarios desde la base de datos');
    }
  },

  // Puedes agregar más funciones para manejar operaciones relacionadas con usuarios aquí
};

module.exports = userService;
