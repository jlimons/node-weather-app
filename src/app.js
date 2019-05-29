const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlbars engine ans view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jaime Limón'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jaime Limón'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jaime Limón',
    message: 'Helping you :)'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
  
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
  
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
  
    })
  }) 
})

app.get('/help/*', (req, res) => {
  res.send('Help article not found')
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Jaime Limón'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})