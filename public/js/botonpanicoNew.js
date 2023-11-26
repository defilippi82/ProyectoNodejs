const geolocation = require('./services/geolocation');
const contacts = require('./services/contacts'); 
const whatsapp = require('./services/whatsapp');
const lote = "<%= lote %>";
const manzana = "<%= manzana %>";

async function alerta() {
try{
  const location = await geolocation.getCurrentPosition();  
  const phoneNumbers = await contacts.getContacts(manzana);
  
  phoneNumbers.forEach(number => {
    const message= buildAlertMessage(location)
    whatsapp.sendMessage(number, message); 
  });

} catch (error) {
    console.log(error);
    
  }
  function buildAlertMessage(location) {
    
    const message = "Soy del lote " + manzana + "-" + lote + ", escucho ruidos necesito que vengan acá, " + location;
            
  return message; 
}
}

async function ruidos() {

    try{
        const location = await geolocation.getCurrentPosition();  
        const phoneNumbers = await contacts.getContacts(manzana);
        
        phoneNumbers.forEach(number => {
          const message= buildAlertMessage(location)
          whatsapp.sendMessage(number, message); 
        });
      
      } catch (error) {
          console.log(error);
          
        }   
    /*
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
    }*/
}
function emergencia() {
    var telefono = "911";
    var telefonoUrl = "tel:" + telefono;
    window.open(telefonoUrl, '_self');
};

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