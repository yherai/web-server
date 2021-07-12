const doRequest = require('./requestdata');

const geocode = async (adress) => {
  const encodedAdress = encodeURIComponent(adress);
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAdress}.json?access_token=pk.eyJ1IjoieWhlYWkiLCJhIjoiY2twMnZhOGkxMTQ0bTMybXdxNW9qNXM3dCJ9.dyOisG52jhDNR5Kq4HHbZA&limit=1`;

  const { error, response } = await doRequest(geocodeUrl);

  if (error) {
    return {
      error: 'Unable to connect to location service!',
      data: undefined,
    };
  }

  const { features = [] } = response.body;

  if (features.length === 0) {
    return {
      error: 'Unable to find location. Please try other location',
      data: undefined,
    };
  }

  const { place_name, center } = features[0];
  return {
    error: undefined,
    data: {
      location: place_name,
      latitude: center[1],
      longitude: center[0],
    },
  };
};

module.exports = geocode;
