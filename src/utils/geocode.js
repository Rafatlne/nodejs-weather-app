const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicmFmYXRsbmUiLCJhIjoiY2syY3FhZTlmM29ybzNtbWxjM3hkYnpkdCJ9.33XflLizxdkiYkw7N2H3-Q&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect location services',undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined);
        }else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode;