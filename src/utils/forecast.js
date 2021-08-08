const request = require('postman-request')

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d31ab1548cbde56deeeb681a504805e0&query=' + lat + ',' + lng

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location ' + body.error.info, undefined)
        } else {
            const currentData = body.current
            const temp = currentData.temperature
            const feelsLike = currentData.feelslike

            callback(undefined, {
                result: body.current.weather_descriptions[0] + ". It's currently " + temp + " degrees out. Feels like " + feelsLike + " degrees out."
            })
        }
    })
}

module.exports = forecast