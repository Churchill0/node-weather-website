const request = require('request')
const forecast = (latitude,longitude,callback) =>{
const url = 'https://api.darksky.net/forecast/360c43be3a576c6f8fdab4fef1b12ef1/37.8267,-122.4233'
request({url, json:true}, (error, {body}={}) =>{
if(error){
    callback("Establish a network conn", undefined)
}else if(body.error){
    callback("Unable to find location", undefined)
}else{
    callback("There is a" + body.currently.precipProbability + "% chance of rain")
}
})
}
module.exports = forecast