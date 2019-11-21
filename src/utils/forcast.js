const request = require('request');

const forcast = (lat,lon,callback) => {
    const url = 'https://api.darksky.net/forecast/96db0a06b7862ad5868cf09f0ddc904b/'+lat+','+lon;

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Could not connect to forcast', undefined);
        }else if(body.code === 400){
            callback('Please give valid lat/lon', undefined);
        }else{
            callback(undefined,body.daily.data[0].summary
            +"It is currently " 
            + body.currently.temperature 
            + " degrees out. There is a " 
            + body.currently.precipProbability 
            + " chance of rain")
        }
    })
}

module.exports = forcast;