const express = require('express')
const router = express.Router()

const {
    invitadosGet,
    listaInvitados,
    invitacion,
    invitadosPost,
    invitar
 }= require('../controllers/invitados');

router.get('/', invitadosGet);
router.post('/', invitadosPost);
router.post('/', invitar);
router.post('/', listaInvitados);
router.post('/', invitacion);

module.exports = router;