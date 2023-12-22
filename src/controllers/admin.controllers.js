const {model} = require('../model/model.js');


const adminCtrl = {
    
    adminViewGet: async (req, res) => {
       
        try {
            const usuarios = await model.getAllUsuariosFromDB(); // Obtener usuarios
            const reservas = await model.getAllReservasFromDB(); // Obtener reservas
            console.log('datos de los usuarios Controlador', usuarios); 
            res.render('admin', { data: usuarios, reservas: reservas});
           
        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
      

async getAllUsuarios (req, res) {
   
    try {
        const usuarios = await model.getAllUsuariosFromDB(); // Obtener usuarios
        console.log('datos de los usuarios Controlador', usuarios); 
        res.render('admin', { data: usuarios });
       
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
},
getUsuarioById: async (req, res) => {
    // obtener usuario por id 
    const user = await User.findById(req.params.id);
    res.json(user);
  },
// OK

 async  addUsuario(req, res) {
    
        res.redirect("register");

},

 async  editUsuario(req, res) {
    const usuarioID = req.params.id;
    try {
        const usuario = await getUsuarioPorIDFromDB(usuarioID);
        if (usuario) {
            // res.status(200).json(usuario);
            res.render("adminUpdate", {
                data: usuario
            })
        } else {
            res.status(404).send('Usuario not found');
        }
    } catch (error) {
        console.error('Error getting usuario by ID:', error);
        res.status(500).send('Internal Server Error');
    }

},

// OK
 async editUsuarioPOST(req, res) {
    const usuarioID = req.params.id;
    const updatedUsuarioData = req.body;
    try {
        const updatedUsuario = await editUsuarioFromDB(usuarioID, updatedUsuarioData);
        if (updatedUsuario) {
            // res.status(200).json(updatedUsuario);
            res.redirect("/admin" + "?mensaje=Usuario actualizado")
        } else {
            res.status(404).send('Usuario not found');
        }
    } catch (error) {
        console.error('Error editing Usuario:', error);
        res.status(500).send('Internal Server Error');
    }

},

 async  deleteUsuario(req, res) {
    const usuarioID = req.params.id;
    try {
        const deletedUsuario = await deleteUsuarioFromDB(usuarioID);
        if (deletedUsuario) {
            // res.status(200).json(deletedUsuario);
            res.redirect("/admin" + "?mensaje=Usuario Borrado")
        } else {
            res.status(404).send('usuario not found');
        }
    } catch (error) {
        console.error('Error deleting usuario:', error);
        res.status(500).send('Internal Server Error');
    }

},
//RESERVAS

 async  getAllReservas(req, res) {
    try {
        const reservas = await model.getAllReservasFromDB();
        console.log('datos de las reservas Controlador', reservas);
        res.render("/reservas", reservas);

    } catch (error) {
        console.error('Error getting reservas:', error);
        res.status(500).send('Internal Server Error');
    }
},

// OK
 async  addReserva(req, res) {
   
        res.render("reserva");

},

// OK
 async  editReserva(req, res) {
    const reservaID = req.params.id;
    try {
        const reserva = await getReservaPorIDFromDB(reservaID);
        if (reserva) {
            // res.status(200).json(reserva);
            res.render("reservaUpdate", {
                reservas: reserva
            })
        } else {
            res.status(404).send('Reserva not found');
        }
    } catch (error) {
        console.error('Error getting reserva by ID:', error);
        res.status(500).send('Internal Server Error');
    }

},

// OK
 async  editReservaPOST(req, res) {
    const reservaID = req.params.id;
    const updatedReservaData = req.body;
    try {
        const updatedReserva = await editReservaFromDB(reservaID, updatedReservaData);
        if (updatedReserva) {
            // res.status(200).json(updatedReserva);
            res.redirect("/admin" + "?mensaje=Reserva actualizado")
        } else {
            res.status(404).send('Reserva not found');
        }
    } catch (error) {
        console.error('Error editing Reserva:', error);
        res.status(500).send('Internal Server Error');
    }

},

 async  deleteReserva(req, res) {
    const reservaID = req.params.id;
    try {
        const deletedReserva = await deleteReservaFromDB(reservaID);
        if (deletedReserva) {
            // res.status(200).json(deletedReserva);
            res.redirect("/admin" + "?mensaje=reserva Borrado")
        } else {
            res.status(404).send('reserva not found');
        }
    } catch (error) {
        console.error('Error deleting reserva:', error);
        res.status(500).send('Internal Server Error');
    }

}
};
module.exports = adminCtrl;