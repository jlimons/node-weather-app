const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/1d6bb3211a70c0098a51e9e9e51edd55/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.error) {
      callback('Incorrect search query', undefined)
    } else {
      const temp = body.currently.temperature
      const rainProb = body.currently.precipProbability
      callback(undefined,`${body.daily.data[0].summary} It is currently ${temp} degrees out. There is a ${rainProb} % chance of rain.`)
    }
  })
}

module.exports = forecast