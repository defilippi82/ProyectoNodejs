const express = require('express')
const router = express.Router()

const registerCtrl = require('../controllers/register.controller');



router.post('/', registerCtrl.registerPost);



module.exports = router;