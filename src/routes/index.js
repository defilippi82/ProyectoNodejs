const express = require('express')
const router = express.Router()

const {
    alerta,
    ruidos,
    emergencia
}=require('../controllers/index');

router.post('/', alerta);
router.post('/', ruidos);
router.post('/', emergencia);


module.exports = router;