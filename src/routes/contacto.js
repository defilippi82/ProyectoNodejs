const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('contacto'); 
  });

  /*
const {
    contactoGet,
    contactoPost
}=require('../controllers/contacto');


router.get('/', contactoGet);

router.post('/send', contactoPost); 
*/
module.exports = router;