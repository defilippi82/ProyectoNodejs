
const registerController ={
async registerPost(req, res) {
    let nombre = req.body.nombre;
    let email = req.body.email;
    let manzana = req.body.manzana;
    let lote = req.body.lote;
    let isla = req.body.isla;
    let codigoPais = req.body.codigoPais;
    let numeroTelefono = req.body.tel;
    let telefono = codigoPais + numeroTelefono;
    let rol = req.body.rol;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

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
}
}
