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
            // var telefono = "+54911549394232"; // Reemplazar con el número de teléfono de los contactos de la isla
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

//FUNCIONES PARA INVITADOS
function listaInvitado() {
    event.preventDefault();

    const nombreapellido = "<%= session.nombre %>"; //document.getElementById('nombreapellido').value;
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
    document.getElementById('nombreapellido').value = "";
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
function invitado() {
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
    var urlInvitacion = "/resources/pages/invitacion.html"; //pagina de la invitacion
    var msj = "Te envío la invitación para autorizar el ingreso " + urlInvitacion;
    var whatsappUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(msj);

    window.open(whatsappUrl);
}
//FUNCIONES PARA CONTACTO CON EL CLIENTE
function contacto() {
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
// Reserva de canchas
//import express from 'express';
//import FullCalendar from 'fullcalendar'; // Asegúrate de que esta sea la forma correcta de importar 'fullcalendar'

//const FullCalendar = require('fullcalendar');
import FullCalendar from '@fullcalendar/core';
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // Configuración del calendario
        initialView: 'dayGridMonth', // Puedes cambiar la vista predeterminada
        events: [
            // Aquí puedes proporcionar eventos desde tu base de datos
            // Ejemplo:
            {
                title: 'Reserva 1',
                start: '2023-11-01T10:00:00',
                end: '2023-11-01T12:00:00',
                // Otros datos personalizados
            },
            // Más eventos
        ],
        // Otras opciones de configuración
    });
    calendar.render(); // Dibuja el calendario
});
document.addEventListener('DOMContentLoaded', function () {
    const reservaForm = document.getElementById('reservaForm');
    const mensajeDiv = document.getElementById('mensaje');

    reservaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(reservaForm);

        // Enviar una solicitud POST al servidor
        fetch('/reservar', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Mostrar el mensaje al usuario
                mensajeDiv.textContent = data.message;
            })
            .catch(error => {
                console.error('Error al procesar la reserva:', error);
                mensajeDiv.textContent = 'Error al procesar la reserva.';
            });
    });
});