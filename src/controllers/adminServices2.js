const connection = require('../database/db');

const userService = {
  /*obtenerUsuarios: async () => {
    try {
      const resultados = await connection.query('SELECT * FROM usuarios LIMIT 20 OFFSET 1'); // Ejemplo de consulta a la base de datos
      console.log(resultados);
      const usuarios= resultados.rows;
      return usuarios; // Devuelve los usuarios obtenidos
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener usuarios desde la base de datos');
    }*/
   
  },

  
obtenerReservas: async () => {
  try {
    const reservas = await connection.query('SELECT * FROM reservas LIMIT 20 OFFSET 1'); // Ejemplo de consulta a la base de datos
    console.log(reservas);
    return reservas; // Devuelve los reservas obtenidos
  } catch (error) {
    throw new Error('Error al obtener reservas desde la base de datos');
  }
},


};

module.exports = userService;
