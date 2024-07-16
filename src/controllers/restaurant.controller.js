const axios = require('axios');
const { logTransaction } = require('./transaction.controller');

exports.getRestaurants = async (req, res) => {
  try {
    const { city, userName } = req.body.data;
    console.log("🚀 ~ exports.getRestaurants= ~ city:", city)

    // Primero, obtenemos las coordenadas de la ciudad
    const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: city,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    if (geocodeResponse.data.results.length === 0) {
      return res.status(400).json({ error: 'No se pudo encontrar la ubicación de la ciudad' });
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

    // Ahora usamos las coordenadas para buscar restaurantes
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type: 'restaurant',
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    console.log("🚀 ~ exports.getRestaurants= ~ response:", response.data.results);
    // Registrar la transacción
    await logTransaction(
      userName,
      'RESTAURANT_SEARCH'
    );
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
};
