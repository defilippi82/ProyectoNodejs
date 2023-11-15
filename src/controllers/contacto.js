
function contactoGet(req, res) {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;
    res.render('contacto', {
        login,
        name,
        userId
    });
};

function contactoPost(req, res) { {
    const nombre = document.getElementById('nombre').value;
    const lote = document.getElementById('lote').value;
    const consulta = document.getElementById('consulta').value;
    const administracion = document.getElementById('radio-administracion').value;
    const facturacion = document.getElementById('radio-facturacion').value;
    const controlDeObras = document.getElementById('radio-controlDeObras').value;
    const whatsapp = document.getElementById('whatsapp').checked;
    const correo = document.getElementById('correo').checked;
    const destinatarioCorreo = "f.defilippi@gmail.com" // modificar mail que corresponda
    const destinatarioCorreo1 = "f.defilippi@gmail.com" // modificar mail que corresponda
    const destinatarioCorreo2 = "f.defilippi@gmail.com" // modificar mail que corresponda
    const telefono = "<%= telefono %>";
    let msj = `Soy del ${lote}, quiero ${consulta}. Desde ya, muchas gracias, ${nombre}`;


    if (administracion === administracion && whatsapp) {

        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(consulta);
        window.location.href = whatsappUrl;
        //let url = "https://api.whatsapp.com/send?phone="+telefono+"&text=Nombre: %0A" + nombre + "%0A%0AMensaje: %0A" + consulta + "%0A";
        //window.location.href = url;
    } else if (administracion === administracion && correo) {

        var emailSubject = "Consulta del lote " + lote;

        var emailLink = "mailto:" + encodeURIComponent(destinatarioCorreo) + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(consulta);

        window.location.href = emailLink;

        const nombreapellidoInput = document.getElementById('nombre');
        document.getElementById('nombre').value = "";
        document.getElementById('lote').value = "";
        document.getElementById('consulta').value = "";
        nombreapellidoInput.focus();
    }
    if (facturacion === facturacion && whatsapp) {

        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(consulta);
        window.location.href = whatsappUrl;

    } else if (facturacion === facturacion && correo) {

        var emailSubject = "Consulta del lote " + lote;

        var emailLink = "mailto:" + encodeURIComponent(destinatarioCorreo1) + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(consulta);

        window.location.href = emailLink;

        const nombreapellidoInput = document.getElementById('nombre');
        document.getElementById('nombre').value = "";
        document.getElementById('lote').value = "";
        document.getElementById('consulta').value = "";
        nombreapellidoInput.focus();
    }
    if (controlDeObras === controlDeObras && whatsapp) {

        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(consulta);
        window.location.href = whatsappUrl;

    } else if (controlDeObras === controlDeObras && correo) {

        var emailSubject = "Consulta del lote " + lote;

        var emailLink = "mailto:" + encodeURIComponent(destinatarioCorreo2) + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(consulta);

        window.location.href = emailLink;

        const nombreapellidoInput = document.getElementById('nombre');
        document.getElementById('nombre').value = "";
        document.getElementById('lote').value = "";
        document.getElementById('consulta').value = "";
        nombreapellidoInput.focus();
    }
}
res.redirect('/contacto'); 
}