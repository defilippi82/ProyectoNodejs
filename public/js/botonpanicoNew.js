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

            const mensaje = "Soy del lote " + manzana + "-" + lote + ", escucho ruidos necesito que vengan acá, " + latitud + ", " + longitud;
            const location = new Location(latitud, longitud);

            // Obtener contactos de la misma manzana
            obtenerContactosPorManzana(manzana, mensaje);

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

            // Obtener contactos de la misma manzana
            obtenerContactosPorManzana(manzana, mensaje);

        }, function (error) {
            console.log("Error al obtener la ubicación:", error);
        });
    } else {
        console.log("Geolocalización no es compatible con este navegador.");
    }
}

// Función para obtener contactos por manzana y enviar mensajes
function obtenerContactosPorManzana(manzana, mensaje) {
    connection.query('SELECT telefono FROM usuarios WHERE manzana = ?', [manzana], (error, results) => {
        if (error) {
            console.log("Error al buscar contactos:", error);
        } else {
            // Envía mensajes de WhatsApp a los contactos encontrados
            results.forEach((contact) => {
                const telefono = contact.telefono;
                const whatsappUrl = "https://api.whatsapp.com/send?phone=" + telefono + "&text=" + encodeURIComponent(mensaje);
                // Aquí puedes agregar lógica para enviar SMS
                // Ejemplo: enviarSMS(telefono, mensaje);
                window.open(whatsappUrl);
            });
        }
    });
}
