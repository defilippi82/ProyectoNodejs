const express = require('express')
const router = express.Router()

const reservaController = require('../controllers/reserva.controller');
const { rollback } = require('../database/db');

/*
router.get('/', function(req, res) {
  
  const userId = req.session.userId;
  
  res.render('reserva', {
    userId  
  });
  
});
*/

router.get('/', reservaController.reservarViewGet);
router.get('/', reservaController.reservaGet);
router.post('/reserva', reservaController.reservaPost);
;
/*
// Ruta para manejar la solicitud de reserva
router.post('/', reservaPost);
*/
module.exports = router;
