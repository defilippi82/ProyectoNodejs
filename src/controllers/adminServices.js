const connection = require('../database/db');
console.log(connection);

const userService = {
  obtenerUsuarios: async () => {
    try {
      const resultados = await connection.query('SELECT * FROM usuarios'); // Ejemplo de consulta a la base de datos
      console.log(resultados);
      const usuarios= resultados.rows;
      console.log(usuarios);
      return usuarios; // Devuelve los usuarios obtenidos
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener usuarios desde la base de datos');
    }
  },

  
obtenerReservas: async () => {
  try {
    const reservas = await connection.query('SELECT * FROM reservas'); // Ejemplo de consulta a la base de datos
    console.log(reservas);
    return reservas; // Devuelve los reservas obtenidos
  } catch (error) {
    throw new Error('Error al obtener usuarios desde la base de datos');
  }
},

// Puedes agregar más funciones para manejar operaciones relacionadas con usuarios aquí
};

module.exports = userService;
