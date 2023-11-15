const express = require('express')
const router = express.Router()

const authPost = require('./controllers/auth');


router.post('/', authPost);

module.exports = router;