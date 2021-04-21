const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles' + address +'.json?access_token=pk.eyJ1Ijoicm9uZWwtbWljaGFlbDE0IiwiYSI6ImNrbmNkMTdqajFrNDUyb21xNThxaWttd20ifQ.iawBv_o00b_zkqdHq2_spQ&limit=1' //geocodeURL at mapbox,api
	request({ url, json: true}, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to location services', undefined)
		} else if (body.features === 0) {
			callback('Unable to find location. Try another search.', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features.place_name
			})
		}
	})
}

module.exports = geocode