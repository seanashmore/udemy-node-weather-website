const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxpdHRsZWxvc3QiLCJhIjoiY2p4Y2R4cDRuMDBtMjNvcnM5d2RlamFlNyJ9.CxOADEAJCGSGcRcKOTtANg&limit=1'
    
    request({ url, json: true}, (error, { body}) => {
        if(error) {
            callback('Unable to connect to MapBox', undefined)
        } else if(body.features.length === 0) {
            callback('No matches found for query', undefined)
        } else {
            const result = body.features[0]
            callback(undefined, {
                lat: result.center[1],
                lng: result.center[0],
                location: result.place_name
            })
        }
    })
}

module.exports = geocode