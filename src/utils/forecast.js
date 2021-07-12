const doRequest = require('./requestdata');

const forecast = async (latitude, longitude) => {
  const encodedLatitude = encodeURIComponent(latitude);
  const encodedLongitude = encodeURIComponent(longitude);
  const forecastUrl = `http://api.weatherstack.com/current?access_key=1fd03bca277378d586ad6a69f1401fd9&query=${encodedLatitude},${encodedLongitude}&units=f`;

  const { error, response } = await doRequest(forecastUrl);

  if (error) {
    return {
      error: 'Unable to connect to weather service!',
      data: undefined,
    };
  }

  const apiError = response.body.error;
  if (apiError) {
    return {
      error: 'Unable to find location',
      data: undefined,
    };
  }

  const { current = {} } = response.body;
  const { weather_descriptions, temperature, feelslike } = current;

  return {
    error: undefined,
    data: {
      weather: weather_descriptions[0],
      temperature,
      feelslike,
    },
  };
};

module.exports = forecast;
