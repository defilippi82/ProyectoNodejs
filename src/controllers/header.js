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
            userId,
            rol
        });
    } else {
        res.render('partials/header', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
};