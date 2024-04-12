const adminService = require('./admin.service');

const adminController = {
  // Vista admin
  adminViewGet: async (req, res) => {
    try {
      const usuarios = await adminService.getAllUsuarios(req, res);
      const reservas = await adminService.getAllReservas(req, res);
      res.render('admin/admin', { users: usuarios, reservations: reservas });
    } catch (error) {
      console.error('Error getting data:', error);
      res.status(500).send('Internal Server Error en esta parte');
    }
  },

  getAllUsuarios: adminService.getAllUsuarios,
  deleteUsuario: adminService.deleteUsuario,
  getAllReservas: adminService.getAllReservas,
  deleteReserva: adminService.deleteReserva
};

module.exports = adminController;