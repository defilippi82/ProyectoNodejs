const express = require('express')
const router = express.Router()

const loginGet = require('../controllers/login');
//GET
router.get('/login', loginGet);


module.exports = router;