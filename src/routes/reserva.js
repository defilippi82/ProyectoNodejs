const express = require('express')
const router = express.Router()
const {
    reservaGet,
    reservaPost
}= require('../controllers/reserva');

router.get('/', reservaGet);

//POST

// Ruta para manejar la solicitud de reserva
router.post('/', reservaPost);

module.exports = router;
