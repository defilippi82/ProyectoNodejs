// 1 - Invocamos a Express
const express = require('express');
//import express from 'express';
const app = express();

const FullCalendar = require('fullcalendar');
//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//3- Invocamos a dotenv
const dotenv = require('dotenv');

dotenv.config({
    path: './env/.env'
});

//4 -seteamos el directorio de assets
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

//5 - Establecemos el motor de plantillas
app.set('view engine', 'ejs');
//6 -Invocamos a bcrypt
const bcryptjs = require("bcryptjs");
//7- variables de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// middlewares
app.use((req, res, next) => {
    res.locals.login = req.session.loggedin || false;
    res.locals.name = req.session.nombre || 'Debe iniciar sesión';
    next();
});

// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');

//9 - establecemos las rutas

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/invitados', (req, res) => {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;
    res.render('invitados', {
        login,
        name,
        userId
    });
});
app.get('/reserva', (req, res) => {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;

    res.render('reserva', {
        login,
        name,
        userId
    });
});


app.get('/contacto', (req, res) => {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;
    res.render('contacto', {
        login,
        name,
        userId
    });
});
app.get('/partials/header', (req, res) => {
    if (req.session.loggedin) {
        const login = true;
        const name = req.session.nombre;
        const telefono = req.session.telefono;
        const lote = req.session.lote;
        const manzana = req.session.manzana;
        const isla = req.session.isla;
        const userId = req.session.id;
        console.log(req.session);
        res.render('partials/header', {
            login,
            name,
            telefono,
            lote,
            manzana,
            isla,
            userId
        });
    } else {
        res.render('partials/header', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
});


//10 - Método para la REGISTRACIÓN
app.post('/register', async (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const manzana = req.body.manzana;
    const lote = req.body.lote;
    const isla = req.body.isla;
    const codigoPais = req.body.codigoPais;
    const numeroTelefono = req.body.tel;
    const telefono = codigoPais + numeroTelefono;
    const rol = req.body.rol;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // Verifica si la contraseña y la confirmación de contraseña coinciden
    if (password !== confirmPassword) {
        return res.render('register', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Las contraseñas no coinciden",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'register'
        });
    }
    let passwordHash = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO usuarios SET ?', {
        nombre: nombre,
        email: email,
        manzana: manzana,
        lote: lote,
        isla: isla,
        telefono: telefono,
        contrasena: passwordHash,
        rol: rol
    }, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "Usuario registrado correctamente",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
})
//11 - Metodo para la autenticacion
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    //let passwordHash= await bcryptjs.hash(pass, 8);
    if (user && pass) {
        connection.query('SELECT * FROM usuarios WHERE email =?', [user], async (error, results) => {
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
});
//12 - Método para controlar que está auth en todas las páginas
/*app.get('/partials/header', (req,res)=>{
    if(req.session.loggedin){
            const login= true;
            const name= req.session.nombre;
            res.render('partials/header',{login, name});
        
    }else{
        res.render('partials/header',{
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
   
}) */
//función para limpiar la caché luego del logout
app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Logout
//Destruye la sesión.
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

app.get('/', (req, res) => {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    res.render('index', {
        login,
        name
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ${port} http://localhost:3000/');
});
//13// Ruta para manejar la solicitud de reserva
// Ruta para manejar la solicitud de reserva
app.post('/reserva', (req, res) => {
    const {
        fecha,
        hora,
        cancha
    } = req.body;
    const userIdFromSession = req.session.userId;

    if (!fecha || !hora || !cancha) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Datos de reserva incompletos.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }

    const fechaYHora = `${fecha} ${hora}:00:00`;
    const hora_inicio = new Date(fechaYHora);

    if (!hora_inicio || isNaN(hora_inicio.getTime())) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Hora de inicio no válida.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }
    //Verificar que la hora de inicio sea en intervalos de 30 minutos
    if (hora_inicio.getMinutes() % 30 !== 0) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Por favor, seleccione una hora válida en intervalos de 30 minutos.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }
    // Verifica si la cancha es de noche
    const horaDeReferencia = new Date();
    horaDeReferencia.setHours(20, 0, 0, 0); // Establecer la hora de referencia a las 20:00:00

    const esDeNoche = hora_inicio.getHours() >= 20;

    const hora_fin = new Date(hora_inicio);
    hora_fin.setMinutes(hora_inicio.getMinutes() + 59); // Incrementa 60 minutos para una franja horaria de 1 hora


    // Verifica si la cancha está ocupada en el intervalo de tiempo de hora_inicio a hora_fin
    const queryString = 'SELECT COUNT(*) AS count FROM reservas WHERE id_cancha = ? AND fecha = ? AND ((hora_inicio = ?) OR (hora_inicio < ? AND hora_fin > ?))';

    connection.query(queryString, [cancha, fecha, hora_inicio, hora_fin, hora_inicio], (error, results) => {
        if (error) {
            return res.render('reserva', {
                userId: userIdFromSession,
                alert: true,
                alertTitle: "Advertencia!",
                alertMessage: "Error al verificar disponibilidad.",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                ruta: 'reserva'
            });
        }

        if (results[0].count > 0) {
            return res.render('reserva', {
                userId: userIdFromSession,
                alert: true,
                alertTitle: "Advertencia!",
                alertMessage: "La cancha ya está reservada en ese horario.",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                ruta: 'reserva'
            });
        }

        // Verifica si la cancha está ocupada en el intervalo de tiempo de hora_inicio a hora_inicio + 59 minutos
        const queryString2 = 'SELECT COUNT(*) AS count FROM reservas WHERE id_cancha = ? AND fecha = ? AND ((hora_inicio <= ? AND hora_fin >= ?) OR (hora_inicio <= ? AND hora_fin >= ?))';

        const hora_fin_59 = new Date(hora_inicio);
        hora_fin_59.setMinutes(hora_inicio.getMinutes() + 59);

        connection.query(queryString2, [cancha, fecha, hora_inicio, hora_inicio, hora_inicio, hora_fin_59], (error, results) => {
            if (error) {
                return res.render('reserva', {
                    userId: userIdFromSession,
                    alert: true,
                    alertTitle: "Advertencia!",
                    alertMessage: "Error al verificar disponibilidad.",
                    alertIcon: "warning",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'reserva'
                });
            }

            if (results[0].count > 0) {
                return res.render('reserva', {
                    userId: userIdFromSession,
                    alert: true,
                    alertTitle: "Advertencia!",
                    alertMessage: "La cancha ya está reservada en ese horario.",
                    alertIcon: "warning",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'reserva'
                });
            }


            const insertString = 'INSERT INTO reservas (id_usuario, id_cancha, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?)';
            // Calcular la hora de finalización como 30 minutos después de la hora de inicio
            const hora_fin = new Date(hora_inicio);
            hora_fin.setMinutes(hora_inicio.getMinutes() + 29);
            const estado = 'Pendiente';
            let mensaje = 'Reserva exitosa. La cancha está reservada.';
            if (esDeNoche) {
                mensaje += ' Se cobrará la ficha de luz.';
            }

            connection.query(insertString, [userIdFromSession, cancha, fecha, hora_inicio, hora_fin, estado], (error) => {
                if (error) {
                    return res.render('reserva', {
                        userId: userIdFromSession,
                        alert: true,
                        alertTitle: "Advertencia!",
                        alertMessage: "Error al registrar la reserva.",
                        alertIcon: "warning",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'reserva'
                    });
                }
                // Inserta la segunda reserva (30 minutos después)
                const segundaHoraInicio = new Date(hora_inicio);
                segundaHoraInicio.setMinutes(hora_inicio.getMinutes() + 30);
                const segundaHoraFin = new Date(segundaHoraInicio);
                segundaHoraFin.setMinutes(segundaHoraInicio.getMinutes() + 29);

                connection.query(insertString, [userIdFromSession, cancha, fecha, segundaHoraInicio, segundaHoraFin, estado], (error) => {
                    if (error) {
                        return res.render('reserva', {
                            userId: userIdFromSession,
                            alert: true,
                            alertTitle: "Advertencia!",
                            alertMessage: "Error al registrar la segunda reserva.",
                            alertIcon: "warning",
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'reserva'
                        });
                    }


                    return res.render('reserva', {
                        userId: userIdFromSession,
                        alert: true,
                        alertTitle: "Reserva exitosa.",
                        alertMessage: mensaje,
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'reserva'
                    });
                });
            });
        });
    });
});