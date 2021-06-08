const path = require('path');
const express = require('express');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

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
    helpText: 'This is some helpful text',
  });
});

app.get('/weather', (req, res) => {
  res.send({ forecast: 'It is sunny', location: 'Madrid' });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
