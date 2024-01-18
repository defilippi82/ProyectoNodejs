const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index'); 
  });
  router.get('/', function(req, res) {
    res.render('invitados'); 
  });
  router.get('/', function(req, res) {
    res.render('contacto'); 
  });
  router.get('/', function(req, res) {
    res.render('register'); 
  });
  router.get('/', function(req, res) {
    res.render('reserva'); 
    router.get('/', function(req, res) {
        res.render('login'); 
      });
  });

module.exports = router;