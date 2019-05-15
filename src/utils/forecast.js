const request = require('request')

module.exports = {
	forecast (latitude, longitude, callback) {
		const url = 'https://api.darksky.net/forecast/63b43da6117c872118409c54ed619b55/' + latitude + ',' + longitude + '?units=si&lang=fr'
	
		// request({url: url, json: true}, (error, response) => {
		// 	if (error) {
		// 		callback('Unable to connect to weather Service', undefined)
		// 	}else if (response.body.error){
		// 		callback('Error ' + response.body.code + ': ' + response.body.error, undefined)
		// 	}else {
		// 		callback(undefined, response.body.daily.data[0].summary + ' Il fait actuellement ' + response.body.currently.temperature + '°C dehors. Il y a ' + response.body.currently.precipProbability + '% de chance qu\'il pleuve')
		// 	}
		// })
		request({url: url, json: true}, (error, {body}) => {
			if (error) {
				callback('Unable to connect to weather Service', undefined)
			}else if (body.error){
				callback('Error ' + body.code + ': ' + body.error, undefined)
			}else {
				callback(undefined, body.daily.data[0].summary + ' Il fait actuellement <strong>' + body.currently.temperature + '°C</strong> dehors. La température maximal prévu est de <strong>' + body.daily.data[0].temperatureHigh + '°C</strong> et la température minimale est de <strong>' + body.daily.data[0].temperatureLow + '°C</strong>. Il y a <strong>' + body.currently.precipProbability + '%</strong> de chance qu\'il pleuve.')
			}
		})
	}
}