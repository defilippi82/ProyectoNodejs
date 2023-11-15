const express = require('express')
const router = express.Router()

const {
    contactoGet,
    contactoPost
}=require('../controllers/contacto');

router.get('/', contactoGet);

router.post('/send', contactoPost); 

module.exports = router;