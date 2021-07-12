const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'JGA',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'JGA',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'JGA',
    helpText: 'This is some helpful text',
  });
});

app.get('/weather', async (req, res) => {
  if (!req?.query?.address) {
    return res.send({
      error: 'Address must be provided!',
    });
  }

  const { address } = req.query;

  const { error: geocodeError, data: geocodeData } = await geocode(address);
  if (geocodeError) {
    return res.send({
      error: geocodeError,
    });
  }

  const { location, latitude, longitude } = geocodeData;

  const { error: forecastError, data: forecastData } = await forecast(
    latitude,
    longitude
  );
  if (forecastError) {
    return res.send({
      error: forecastError,
    });
  }

  const { weather, temperature, feelslike } = forecastData;

  res.send({
    address,
    weather,
    temperature,
    feelslike,
    location,
  });
});

// Hanlde 404 errors from help
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'JGA',
    errorMessage: 'Help article not found',
  });
});

// Handle any 404 errors
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'JGA',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
