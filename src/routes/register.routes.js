const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/register.controller');



router.post('/register', function(req, res) {

    const newUser = registerCtrl.registerUser(req.body);
    
    res.status(201).json(newUser);
  
  });

module.exports = router;