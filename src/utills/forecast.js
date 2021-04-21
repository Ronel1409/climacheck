const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://http://api.weatherapi.com/v1/forecast.json?key=7f5a01610591467fa16224014211004' + lat + ',' + long
request({ url, json: true }, (error, { body }) => {
        if (error) {
    		console.log('Unable to connect to weather service', undefined)
    	} else if (body.error) {
    		console.log('Unable to find location', undefined)
    	} else {
    		callback(undefined, `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. there's ${body.currently.precipProbability}% chance of rain.`)
    	}
    })
}

module.exports = forecast

//7f5a01610591467fa16224014211004