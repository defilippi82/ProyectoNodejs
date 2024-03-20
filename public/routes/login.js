const express = require('express')
const router = express.Router()


const loginController = require('../controllers/login');


// Rutas 
router.post('/', loginController.loginPost);

//GET
router.get('/', function(req, res) {
    res.render('login'); 
  });
  



module.exports = router;