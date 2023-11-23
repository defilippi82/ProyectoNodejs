const express = require('express')
const router = express.Router()



router.get('/', function(req, res) {
    res.render('index'); 
  });
  /*
const {
    alerta,
    ruidos,
    emergencia
}=require('../controllers/index');

router.post('/alerta', alerta);
router.post('/ruidos', ruidos);
router.post('/emergencia', emergencia);
*/

module.exports = router;