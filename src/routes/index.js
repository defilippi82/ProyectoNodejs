const express = require('express')
const router = express.Router()



router.get('/', function(req, res) {
  res.render('index', {
    // Otras variables que necesites pasar a index.ejs
    rol: req.session.rol // Pasando la variable rol a index.ejs
})
});
module.exports = router;