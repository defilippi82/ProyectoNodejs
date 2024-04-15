const bcryptjs = require('bcryptjs');
const conn = require('../database/conn');
//const {connectDB}= require('../database/db');

module.exports.loginPost =(req, res) => {

    const user = req.body.user;
    const pass = req.body.pass;
    //let passwordHash= await bcryptjs.hash(pass, 8);
    if (user && pass) {
      conn.query('SELECT * FROM usuarios WHERE email =?', [user], async (error, results) => {
        if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].contrasena))) {
          res.render('login', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario o contraseña incorrecta",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
          })
        } else {
          req.session.loggedin = true;
          req.session.nombre = results[0].nombre;
          req.session.userId = results[0].id; // Configura userId en la sesión
          req.session.rol = results[0].rol;
          res.render('login', {
            alert: true,
            alertTitle: "Conectado!",
            alertMessage: "Usuario correcto",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: ''
          });

        }
        res.end();
      });
    } else {
      res.render('login', {
        alert: true,
        alertTitle: "Advertencia!",
        alertMessage: "Ingrese Usuario o contraseña",
        alertIcon: "warning",
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      });
      res.end();
    }
  
};