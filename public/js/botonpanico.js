// BOTONES DE PANICO

function alerta() {
    if ("geolocation" in navigator) {
        function Location(latitud, longitud) {
            this.latitud = latitud;
            this.longitud = longitud;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            const lote = "<%= lote %>";
            const manzana = "<%= manzana %>";
            const telefono = "<%= telefono %>"; //"+5491154939423"; // Reemplazar con el número de teléfono del contacto
            const mensaje = "Soy del lote " + manzana + "-" + lote + ", escucho ruidos necesito que vengan acá, " + latitud + ", " + longitud;
            const location = new Location(latitud, longitud);



            var whatsappUrl = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(mensaje);
            window.location.href = whatsappUrl;

        }, function (error) {
            console.log("Error al obtener la ubicación:", error);
        });
    } else {
        console.log("Geolocalización no es compatible con este navegador.");
    }
}

function ruidos() {
    if (typeof navigator !== 'undefined' && navigator !== null && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            const lote = "<%= lote %>";
            const manzana = "<%= manzana %>";

            const mensaje = "Soy del lote " + lote + " y escucho ruidos sospechosos por acá: " + latitud + ", " + longitud;
             var telefono = "+54911549394232"; // Reemplazar con el número de teléfono de los contactos de la isla
            connection.query('SELECT telefono FROM usuarios WHERE manzana = ?', [manzana], (error, results) => {
                if (error) {
                    console.log("Error al buscar contactos:", error);
                } else {
                    // Envía mensajes de WhatsApp a los contactos encontrados
                    results.forEach((contact) => {
                        const telefono = contact.telefono;
                        const whatsappUrl = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(mensaje);
                        window.open(whatsappUrl);
                    });
                }
            });
        }, function (error) {
            console.log("Error al obtener la ubicación:", error);
        });
    } else {
        console.log("Geolocalización no es compatible con este navegador.");
    }
}

function emergencia() {
    var telefono = "911";
    var telefonoUrl = "tel:" + telefono;
    window.open(telefonoUrl, '_self');
}

// FUNCIONES DEL HEADER
function logueado(req, res) {
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
};
/*
//POST
//Metodo para la autenticacion
function authPost(req, res) {
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
};*/