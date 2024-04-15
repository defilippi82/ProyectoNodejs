function invitadosGet(req, res) {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;
    res.render('invitados', {
        login,
        name,
        userId
    });
};
//FUNCIONES PARA INVITADOS
function listaInvitado() {
    event.preventDefault();

    const nombreapellido = document.getElementById('nombreapellido').value;
    const dni = document.getElementById('dni').value;
    const patente = document.getElementById('patente').value;

    let tbody = document.getElementById('tabla');

    let fila = '<tr>';
    fila += '<td>' + nombreapellido + '</td>';
    fila += '<td>' + dni + '</td>';
    fila += '<td>' + patente + '</td>';
    fila += '</tr>';

    tbody.innerHTML += fila;

    const nombreapellidoInput = document.getElementById('nombreapellido');
    document.getElementById('nombreyapellido').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('patente').value = "";
    nombreapellidoInput.focus();
}
//El invitado envia los datos a un whatsapp
function invitacion() {

    const nombreapellido = document.getElementById('nombreapellido').value;
    const dni = document.getElementById('dni').value;
    const patente = document.getElementById('patente').value;
    if (!nombreapellido || !dni || !patente) {
        alert('Por favor complete todos los campos.');
        return;
    }
    const lote = "<%= lote %>";
    const manzana = "<%= manzana %>"; // de base de datos "manzana + terreno"
    var msj = `Soy del lote ${manzana}-${lote} y quiero autorizar para su ingreso a ${nombreapellido} D.N.I. ${dni}, patente del automóvil ${patente}. ${mensaje}`;
    const telefono = "<%= telefono %>";

    var whatsappUrl = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(msj);
    window.location.href = whatsappUrl;
    setTimeout(function () {
        window.close();
    }, 2000);
    const nombreapellidoInput = document.getElementById('nombreapellido');
    document.getElementById('nombreapellido').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('patente').value = "";
    documente.getElementById('mensaje').value = "";
    nombreapellidoInput.focus();
    
}
//SE ENVIA EL CORREO A LA GUARDIA O LA LISTA DE INVITADOS
function invitadosPost() {
    event.preventDefault();

    const nombreapellido = document.getElementById('nombreapellido').value;
    const dni = document.getElementById('dni').value;
    const patente = document.getElementById('patente').value;
    const mensaje = document.getElementById('mensaje').value;
    const enviarCorreo = document.getElementById('enviarCorreo').checked;
    const lote = "<%= lote %>";
    const manzana = "<%= manzana %>";
    const telefono = "<%= telefono %>";

    const msj = "Soy del lote " + manzana + "-" + lote + " y quiero autorizar para su ingreso a " + nombreapellido + " D.N.I. " + dni + ", patente del automóvil " + patente + ". " + mensaje;



    if (enviarCorreo) {
        const tabla = document.getElementById('tabla');
        const filas = tabla.getElementsByTagName('tr');
        const destinatarioCorreo = "f.defilippi@gmail.com" // modificar mail que corresponda

        const data = [];
        for (var i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            const nombreapellidoCell = celdas[0].textContent.trim();
            const dniCell = celdas[1].textContent.trim();
            const patenteCell = celdas[2].textContent.trim();

            if (nombreapellidoCell && dniCell && patenteCell) {
                data.push({
                    nombreapellido: nombreapellidoCell,
                    dni: dniCell,
                    patente: patenteCell
                });
            }
        }
        if (data.length > 0) {
            let msj2 = "Soy del lote " + lote + " y quiero autorizar para su ingreso a las siguientes personas:\n";
            msj2 += "Nombre\t\t\tD.N.I.\t\t\tPatente\n";
            data.forEach(function (invitadoData) {
                msj2 += invitadoData.nombreapellido + "\t\t" + invitadoData.dni + "\t\t" + invitadoData.patente + "\n";
            });
            const emailSubject = "Lista de Invitados del lote " + lote;
            const emailLink = "mailto:" + encodeURIComponent(destinatarioCorreo) + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(msj2);

            window.location.href = emailLink;


        }
    } else {

        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(msj);
        window.location.href = whatsappUrl;
        const nombreapellidoInput = document.getElementById('nombreapellido');
        document.getElementById('nombreapellido').value = "";
        document.getElementById('dni').value = "";
        document.getElementById('patente').value = "";
        documente.getElementById('mensaje').value = "";
        nombreapellidoInput.focus();

    }
}


function invitar() {
    var urlInvitacion = "/public/pages/invitacion.html"; //pagina de la invitacion
    var msj = "Te envío la invitación para autorizar el ingreso " + urlInvitacion;
    var whatsappUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(msj);

    window.open(whatsappUrl);
}