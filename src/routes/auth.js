const express = require('express')
const router = express.Router()

const authPost = require('../controllers/auth');
/*
router.post('/', function(req, res) {
    res.send('auth');  
  });*/
router.post('/auth', authPost.authPost);

module.exports = router;