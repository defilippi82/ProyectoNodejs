// 1 - Invocamos a Express
const express = require('express');
const app = express();

//const FullCalendar = require('fullcalendar');
const dotenv = require('dotenv');

dotenv.config({
    path: './src/env/.env'
});

//2 -middlewares Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//-seteamos el directorio de estaticos
app.use(express.static('public'));
//app.use('/resources', express.static(__dirname + 'public'));
app.use((req, res, next) => {
    res.locals.login = req.session.loggedin || false;
    res.locals.name = req.session.nombre || 'Debe iniciar sesión';
    next();
});
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
// 8 - Invocamos a la conexion de la DB
const connection = require('./src/database/db');

//9 - establecemos las rutas

const indexRouter = require('./src/routes/index');
const registerRouter = require('./src/routes/register.routes');
const reservaRouter = require('./src/routes/reserva');
const loginRouter = require('./src/routes/login');
const invitadosRouter = require('./src/routes/invitados');
const contactoRouter = require('./src/routes/contacto');
const headerRouter = require('./src/routes/header');

//Usos de rutas
app.use('/register', registerRouter);
app.use('/reserva', reservaRouter);
app.use('/login', loginRouter);
app.use('/invitados', invitadosRouter);
app.use('/index', indexRouter);
app.use('/contacto', contactoRouter);
app.use('/', headerRouter);
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
app.listen(port, () => console.log('Servidor corriendo en el puerto ${port} http://localhost:3000/'));