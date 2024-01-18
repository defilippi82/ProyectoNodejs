// BOTONES DE PANICO
function alerta() {
    if ("geolocation" in navigator) {
        function Location(latitud, longitud) {
            this.latitud = latitud;
            this.longitud = longitud;
          }
          
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            const lote = "5-10"
            const mensaje = "Soy del lote "+lote+ ", escucho ruidos necesito que vengan acá, " + latitud + ", " + longitud;
            var telefono = "+5491154939423"; // Reemplazar con el número de teléfono del contacto
            const location = new Location(latitud, longitud );

            

           var whatsappUrl = "https://api.whatsapp.com/send?phone="+telefono+ "&text=" + encodeURIComponent(mensaje);
            window.location.href = whatsappUrl;
            
        }, function(error) {
            console.log("Error al obtener la ubicación:", error);
        });
    } else {
        console.log("Geolocalización no es compatible con este navegador.");
    }
}
 
function ruidos() {
    if (typeof navigator !== 'undefined' && navigator !== null && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitud = position.coords.latitude;
            var longitud = position.coords.longitude;
            const lote = "5-10"
            const mensaje = "Soy del lote "+lote+" y escucho ruidos sospechosos por acá: " + latitud + ", " + longitud;
            var telefono = "+54911549394232"; // Reemplazar con el número de teléfono del contacto
            
            var whatsappUrl = "https://api.whatsapp.com/send?phone="+telefono+ "&text=" + encodeURIComponent(mensaje);
            
        window.location.href = whatsappUrl;
        }, function(error) {
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
    document.getElementById('nombreapellido').value = "";
    document.getElementById('dni').value = "";
    document.getElementById('patente').value = "";
    nombreapellidoInput.focus();
}
//El invitado envia los datos a un mail
function invitacion(){

    const nombreapellido = document.getElementById('nombreapellido').value;
    const dni = document.getElementById('dni').value;
    const patente = document.getElementById('patente').value;
    if (!nombreapellido || !dni || !patente) {
        alert('Por favor complete todos los campos.');
        return;
      }
    const lote = "5-10" // de base de datos "manzana + terreno"
    var msj = `Soy del lote ${lote} y quiero autorizar para su ingreso a ${nombreapellido} D.N.I. ${dni}, patente del automóvil ${patente}. ${mensaje}`;
    var telefono = "+5491154939423"; // Reemplazar con el número de teléfono del propietario para que lo reenvie a la guardia
    
    var whatsappUrl = "https://api.whatsapp.com/send?phone="+telefono+ "&text=" + encodeURIComponent(msj);
    window.location.href = whatsappUrl;
    //let url = "https://api.whatsapp.com/send?phone="+telefono+"&text=Nombre: %0A" + nombreapellido + "%0A%0AMensaje: %0A" + msj + "%0A";
    //window.open(url);
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
    const lote = "5-10"

    const msj = "Soy del lote "+ lote+" y quiero autorizar para su ingreso a " + nombreapellido + " D.N.I. " + dni + ", patente del automóvil " + patente + ". " + mensaje;
    
    

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
            data.forEach(function(invitadoData) {
                msj2 += invitadoData.nombreapellido + "\t\t" + invitadoData.dni + "\t\t" + invitadoData.patente + "\n";
            });
            const emailSubject = "Lista de Invitados del lote "+ lote;
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


function invitar(){
    var urlInvitacion = "https://defilippi82.github.io/SOS/invitacion.html"; //pagina de la invitacion
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
    const telefono = "+5491154939423";
    let msj = `Soy del ${lote}, quiero ${consulta}. Desde ya, muchas gracias, ${nombre}`;
   

    if (administracion === administracion && whatsapp) {
        
        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(consulta);
        window.location.href = whatsappUrl;
        //let url = "https://api.whatsapp.com/send?phone="+telefono+"&text=Nombre: %0A" + nombre + "%0A%0AMensaje: %0A" + consulta + "%0A";
        //window.location.href = url;
    } else if (administracion === administracion && correo) {
                    
            var emailSubject = "Consulta del lote "+ lote;
            		
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
        //let url = "https://api.whatsapp.com/send?phone="+telefono+"&text=Nombre: %0A" + nombre + "%0A%0AMensaje: %0A" + consulta + "%0A";
        //window.location.href = url;
    } else if (facturacion === facturacion && correo) {
                    
            var emailSubject = "Consulta del lote "+ lote;
                    
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
        //let url = "https://api.whatsapp.com/send?phone="+telefono+"&text=Nombre: %0A" + nombre + "%0A%0AMensaje: %0A" + consulta + "%0A";
        //window.location.href = url;
    } else if (controlDeObras === controlDeObras && correo) {
                    
            var emailSubject = "Consulta del lote "+ lote;
                    
            var emailLink = "mailto:" + encodeURIComponent(destinatarioCorreo2) + "?subject=" + encodeURIComponent(emailSubject) + "&body=" + encodeURIComponent(consulta);

            window.location.href = emailLink;

            const nombreapellidoInput = document.getElementById('nombre');
            document.getElementById('nombre').value = "";
            document.getElementById('lote').value = "";
            document.getElementById('consulta').value = "";
            nombreapellidoInput.focus();
    }
}

//PROYECTO DE BASE DE DATOS
/*



const mysql= require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '54939423Fe',
    database: 'cube'
});

const usuario = document.getElementById('email').value;
  const contrasena =document.getElementById('password').value;
function verificarUsuario(usuario, contrasena) {

   let usuarioValido = false;
   let contrasenaValida = false;
   connection.query('SELECT * FROM usuarios WHERE email=?', [usuario], function(error, results, fields){
    if (results.length > 0){
        usuarioValido = true;
    }
   });
   connection.query('SELECT * FROM contrasena WHERE password=?', [usuario], function(error, results, fields){
    if (results [0].contrasena === contrasena){
        usuarioValido = true;
    }
   });
  
    if(usuarioValido && contrasenaValida) {
      return true; 
    } else {
      return false;
    }
  
  }
  
    
  const esValido = verificarUsuario(usuario, contrasena);
  
  if(esValido) {
    console.log('Inicio de sesión exitoso');
  } else {
    console.log('Datos de acceso incorrectos');
  }
  
  const mysql = require('mysql');

  function crearDB() {
  
    /*const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'tucontraseña' 
    });
  
    connection.query('CREATE DATABASE IF NOT EXISTS cube', function(err) {
      if (err) throw err;
  
      console.log('Base de datos creada');
    });
  
    connection.query('USE cube', function(err) {
      if (err) throw err;
    });
  
    const sql = `
      CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),        
        email VARCHAR(100),        
        manzana INT,
        lote INT,
        isla INT,
        telefono VARCHAR(20),
        contrasena VARCHAR(10)
        
      )
    `;
  
    connection.query(sql, function(err) {
      if (err) throw err;
  
      console.log('Tabla usuarios creada');
    });
  
  
  
  crearDB();
  // Conexión a la base de datos
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tucontraseña',
  database: 'cube'
});

// Datos de prueba
const usuarios = [
  {nombre: 'Federico De Filippi', email: 'f.defilippi@gmail.com', manzana: 5, lote: 10, isla: 3,  telefono: '11-5493-9423', contrasena: '54939423Fe'},
  {nombre: 'Maria', email: 'maria@email.com', manzana: 5, lote: 9, isla: 3, telefono: '444555666', contrasena: '5678'},
];

// Insertar usuarios
usuarios.forEach(usuario => {
  const sql = `
    INSERT INTO usuarios (nombre, email, manzana, lote, isla, telefono, contrasena) 
    VALUES ('${usuario.nombre}', '${usuario.email}', ${usuario.manzana}, ${usuario.lote}, ${usuario.isla}, '${usuario.telefono}', '${usuario.contrasena}')
  `;

  connection.query(sql, function(err) {
    if (err) throw err;

    console.log('Usuario agregado:', usuario.nombre);
  });
});

// Al iniciar sesión
const usuario = obtenerUsuarioDeBD(); 

// Agregar datos al navbar
const navbar = document.getElementById('navbar');

const nombre = document.createElement('span');
nombre.textContent = usuario.nombre;

const email = document.createElement('span'); 
email.textContent = usuario.email;

navbar.appendChild(nombre);
navbar.appendChild(email);

// Verificar en cada ruta si hay sesión activa
router.beforeEach((to, from, next) => {
  const usuario = obtenerUsuarioDeBD();

  if (usuario) {
    // Hay sesión, permite acceder 
    next();
  } else {
    // No hay sesión, redirige al login
    next('/ingresoUsuario.html'); 
  }
})*/

  