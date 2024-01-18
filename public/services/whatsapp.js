const WHATSAPP_API_URL = 'https://api.whatsapp.com/send';

async function sendMessage(phone, message) {

  const url = `${WHATSAPP_API_URL}?phone=${phone}&text=${encodeURIComponent(message)}`;
  
  try {
    // Lógica para enviar GET request a la URL
    await axios.get(url);   
  } catch(error) {
    throw new Error('Error enviando mensaje de WhatsApp'); 
  }

}

module.exports = {
  sendMessage
}