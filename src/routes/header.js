const express= require('express');
const router= express.Router();

const logueado= require('../controllers/header');


router.get('/', logueado);

//POST


// Ruta para mostrar la temperatura en la navbar
/*app.get('/', async (req, res) => {
    try {
      const url = 'https://ws.smn.gob.ar/map_items/weather';
      const response = await axios.get(url);
      const weatherData = response.data;
  
      // Extraer la temperatura actual de los datos
      const temperature = weatherData.current.temperature;
  
      res.render('index', { temperature });
    } catch (error) {
      res.status(500).send('Error al obtener los datos meteorológicos.');
    }
  });*/
  module.exports = router;