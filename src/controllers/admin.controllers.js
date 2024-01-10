const {model} = require('../model/model.js');


const adminCtrl = {
    
    adminViewGet: async (req, res) => {
       
        try {
            const usuarios = await model.getAllUsuariosFromDB(); // Obtener usuarios
            const reservas = await model.getAllReservasFromDB(); // Obtener reservas
            //console.log('datos de los usuarios Controlador', usuarios); 
            res.render('admin/admin', { data: usuarios, reservas: reservas});
           
        } catch (error) {
            console.error('Error getting data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
      

async getAllUsuarios (req, res) {
   
    try {
        const usuarios = await model.getAllUsuariosFromDB(); // Obtener usuarios
        //console.log('datos de los usuarios Controlador', usuarios); 
        res.render('admin', { data: usuarios });
       
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
},
//no se utiliza buscar por id
/*
getUsuarioById: async (req, res) => {
    // obtener usuario por id 
    const user = await User.findById(req.params.id);
    res.json(user);
  },*/

async addUsuario(req, res) {
    res.redirect("/register");
  },

 async  editUsuario(req, res) {
    const usuarioID = req.params.id;
    console.log("usuarioID", usuarioID);
    res.redirect("/admin/usuarios/editar/" + usuarioID);
    //res.redirect("/adminUpdate?id=" + usuarioID);
    /*
    try {
        const usuarios = await model.getUsuarioPorIDFromDB(usuarioID);
        if (usuario) {
           res.render("admin/adminUpdate", {usuarios});
        } else {
            res.status(404).send('Usuario not found');
        }
    } catch (error) {
        console.error('Error getting usuario by ID:', error);
        res.status(500).send('Internal Server Error');
    }*/
},
 async editUsuarioPUT(req, res) {
    const usuarioID = req.params.id;
    console.log("usuarioIDPUT", usuarioID);
    const updatedUsuarioData = req.body;
    try {
        const updatedUsuario = await model.editUsuarioFromDB(usuarioID, updatedUsuarioData);
        if (updatedUsuario) {
           
            res.redirect("/admin?mensaje=Usuario actualizado")
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
    console.log("usuarioIDDELETE", usuarioID);
    try {
        const deletedUsuario = await model.deleteUsuarioFromDB(usuarioID);
        if (deletedUsuario) {
            // res.status(200).json(deletedUsuario);
            res.redirect("/admin?mensaje=Usuario eliminado"   )
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
        res.render("admin/reservas", reservas);

    } catch (error) {
        console.error('Error getting reservas:', error);
        res.status(500).send('Internal Server Error');
    }
},
 async  addReserva(req, res) {   
        res.render("reserva");
},
 async  editReserva(req, res) {
    const reservaID = req.params.id;
    try {
        const reserva = await model.getReservaPorIDFromDB(reservaID);
        if (reserva) {
            // res.status(200).json(reserva);
            res.render("admin/reservaUpdate", { reserva })
        } else {
            res.status(404).send('Reserva not found');
        }
    } catch (error) {
        console.error('Error getting reserva by ID:', error);
        res.status(500).send('Internal Server Error');
    }

},
 async  editReservaPOST(req, res) {
    const reservaID = req.params.id;
    const updatedReservaData = req.body;
    try {
        const updatedReserva = await model.editReservaFromDB(reservaID, updatedReservaData);
        if (updatedReserva) {
            // res.status(200).json(updatedReserva);
            res.redirect("admin/admin" + "?mensaje=Reserva actualizado")
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
        const deletedReserva = await model.deleteReservaFromDB(reservaID);
        if (deletedReserva) {
            
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