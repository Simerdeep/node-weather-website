const request = require("request");

forecast = (lat,lng, callback) => {
    
    const url = `http://api.weatherstack.com/forecast?access_key=75148ede2f92219c8db3319b60cf3f5a&query=${lat,lng}&units=f`;

    request({url, json: true}, (error, response) => {

        if(error) {
            callback("Unable to connect to weather service",response);
        }
        else if(response.body.error) {
            callback("Unable to find location",response);
        }
        else {
            
            const currentData = response.body.current;
            const hourlyData = response.body.hourly;
            callback(error,response)
  // console.log(response.body)
    //        console.log(`It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} `);
        }
    
});
}



// const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/wqertty.json?access_token=pk.eyJ1Ijoic2ltZXJkZWVwIiwiYSI6ImNrY2JlMzZnZjI0Z2cyd21ndHhyazVvamQifQ.LvbUX59_ogXpMT4MGd_f_Q&limit=1"

// request({url, json: true}, (error, response) => {

//     if(error) {
//         console.log("Unable to connect to location service");
//     }
//     else if(response.body.features.length === 0){
//         console.log("Unable to find location")
//     }
//     else {
//         const cityData = response.body.features[0];
//         const latLng = cityData.center;
//         const longitude = latLng[0];
//         const latitude = latLng[1];
    
//         console.log(longitude,latitude)    
//     }
  
// });

const geocode = (address,callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2ltZXJkZWVwIiwiYSI6ImNrY2JlMzZnZjI0Z2cyd21ndHhyazVvamQifQ.LvbUX59_ogXpMT4MGd_f_Q&limit=1`;
    
    request({url, json: true}, (error, response) => {

        callback(error,response)
    });

}

module.exports= {
    geocode,
    forecast
}