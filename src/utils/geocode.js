const request = require('request')

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiamxpbW9ucyIsImEiOiJjanc3N3YzaTUxaTNqNDFvd2RpamFxNDBnIn0.xzqdbbvoi_3J3KmRKn4q3w&limit=1`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (!body.features.length) {
      callback('Incorrect search query', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode