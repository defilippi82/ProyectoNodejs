const conn = require('../database/conn');

const adminService = {
  getAllUsuarios: async (req, res) => {
    try {
      const result = await conn.query('SELECT * FROM usuarios');
      return result[0];
    } catch (error) {
      console.error('Error al obtener users:', error);
      throw error;
    }
  },

  getAllReservas: async (req, res) => {
    try {
      const resultR = await conn.query('SELECT * FROM reservas');
      return resultR[0];
    } catch (error) {
      console.error('Error al obtener reservations:', error);
      throw error;
    }
  },

  deleteUsuario: async (req, res) => {
    try {
      const userId = req.params.id;
      await conn.query('DELETE FROM usuarios WHERE id = ?', [userId]);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  deleteReserva: async (req, res) => {
    try {
      const reservaId = req.params.id;
      await conn.query('DELETE FROM reservas WHERE id = ?', [reservaId]);
      return true;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  }
};

module.exports = adminService;