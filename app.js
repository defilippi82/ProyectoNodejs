// 1 - Invocamos a Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override');
const FullCalendar = require('fullcalendar');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config({
    path: './src/env/.env'
});
//Session
//const name = req.session.nombre || 'Debe iniciar sesión';
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "session",
    cookie: { maxAge: 60000 * 10 },
    resave: true,
    saveUninitialized: true,
}));

app.use(function (req, res, next) {  

    res.header("Access-Control-Allow-Origin", "*"); // permitir requests de cualquier origen
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });
//2 -middlewares Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('node_modules'));
app.use(methodOverride('_method'));

//motor de Vistas
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));

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

// 8 - Invocamos a la conexion de la DB
//const connection = require('./src/database/db');
const conn = require('./src/database/conn');

//9 - establecemos las rutas
//console.log(__dirname);

const indexRouter = require('./src/routes/index');
const registerRouter = require('./src/routes/register.routes');
const invitadosRouter = require('./src/routes/invitados');
const reservaRouter = require('./src/routes/reserva');
const loginRouter = require('./src/routes/login');
const contactoRouter = require('./src/routes/contacto');
const authRouter = require('./src/routes/login');
const adminRoute = require('./src/routes/admin.routes');

//const mainRouter = require('./src/routes/mainRouter');

//Usos de rutas
//app.use('/', mainRouter);
app.use('/index', indexRouter);
app.use('/register', registerRouter);
app.use('/invitados', invitadosRouter);
app.use('/reserva', reservaRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/contacto', contactoRouter);
app.use('/admin', adminRoute);
app.use('/adminUpdate', adminRoute);
app.use('/reservas', adminRoute);
app.use('/usuarios', adminRoute);
app.use("/usuarios/editar/:id", adminRoute);
app.use("/reservas/editar/:id", adminRoute);
app.use("/usuarios/borrar/:id", adminRoute);
app.use("/reservas/borrar/:id", adminRoute);

//función para limpiar la caché luego del logout
app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.get('/', (req, res) => {
    const login = req.session.loggedin || false;
    const name =req.session.nombre || 'Debe iniciar sesión';
    res.render('index', {
        login,
        name
    });
});
//Logout
//Destruye la sesión.
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

function logueado(req, res) {
    if (req.session.loggedin) {
        const login = true;
        const name = req.session.nombre;
        const telefono = req.session.telefono;
        const lote = req.session.lote;
        const manzana = req.session.manzana;
        const isla = req.session.isla;
        const userId = req.session.id;
        const rol = req.session.rol;
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
};
app.get('/', (req, res) => {
    logueado(req, res); // Llamada a la función logueado dentro de la ruta '/'
});

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port} http://localhost:3000/`));