const conn = require('./src/database/conn');


async function getContactsByManzana(manzana) {

  try {
    const results = await conn.queryAsync('SELECT telefono FROM usuarios WHERE manzana = ?', [manzana]);
    return results;

  } catch (error) {
    throw new Error('Error obteniendo contactos');
  }

}

module.exports = {
  getContactsByManzana 
};
  
  
