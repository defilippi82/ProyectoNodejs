const express = require('express')
const router = express.Router()

// 1. Importar controlador
const controller = require('../controllers/invitadosController');

// 2. Usar función del controlador en la ruta  
router.get('/invitados', controller.invitadosController);
/*
const {
    invitadosGet,
    listaInvitados,
    invitacion,
    invitadosPost,
    invitar
 }= require('../controllers/invitados');

router.get('/invitados', invitadosGet);
router.post('/invitados', invitadosPost);
router.post('/invitados', invitar);
router.post('/invitados', listaInvitados);
router.post('/invitados', invitacion);
*/
module.exports = router;