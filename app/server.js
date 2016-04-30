/*
All the api calls will be in here to keep my keys safe

individual and seperate endpoints will be available
*/

var request = require("request");
var http = require("http");
var express = require("express");
var serveStatic = require("serve-static");
var util = require("util");

console.log("Started server");


//console.log("WU key", process.env.WUNDERGROUND_KEY);
//console.log("Forecast key", process.env.FORECASTIO_KEY);

var aRouter = express();
var myServer = http.createServer(aRouter);

aRouter.use(serveStatic('public', {'index':['index.html']}))

aRouter.get('/location/:location', function(req,res){
    getLocation(req.params.location, function(result){
        //console.log("result:", result);
        res.send(result);
    });

})

var getLocation = function (location, callback){
    var url = "http://maps.googleapis.com/maps/api/geocode/json";
    var query = {address: location};

    request({url:url,qs:query}, function(err, res, data)
    {
        
        data = JSON.parse(data);
        
        if(data.status != "OK"){
            
            callback({error:"location: " + location + " unavailable"});
            return console.error("Call failed, location " + location + " likely nonexistent", err);
        }
        
        var coord = {
            address : data.results[0].formatted_address,
            lat : data.results[0].geometry.location.lat,
            lng : data.results[0].geometry.location.lng
        };
        
        
        console.log(data.status);
        
        weatherSummary(coord,function(data){
            console.log("weather summary:",data);
            callback({"location":coord,"weather":data});
        });
        
          
    });
}

var  getTime = function(unixTime){
    var date = new Date(unixTime*1000);
    return {weekday: date.getDay(), day:date.getDate(), month:date.getMonth()+1}
}


var requestWeather = function (site, callback){
    //console.log(site.url);
    request.get(site.url, function(err,res, data){
        if(err){
            return console.err("Call was unable to be made", err); //Hopefully this will catch any overflow calls, but I'm not positive on it.
        }
        data = JSON.parse(data);
        
        var weather = 
        {
            service: site.name,
            today: site.cur(data),
            week: site.week(data)
        };
        callback(weather);

    });
}



var  weatherSummary = function(coord, callback){
    var foreURL = util.format("https://api.forecast.io/forecast/%s/%s,%s",  process.env.FORECASTIO_KEY, coord.lat, coord.lng);
    //var natURL = util.format("http://forecast.weather.gov/MapClick.php?lat=%s&lon=%s&FcstType=json", coord.lat, coord.lng);
    var wuURL = util.format("http://api.wunderground.com/api/%s/features/conditions/forecast10day/q/%s,%s.json", process.env.WUNDERGROUND_KEY, coord.lat, coord.lng);


    
    var sites = [
        {name:"forecast.io", url:foreURL, cur: getFCCurrent, week: getFCWeek},
        //{name:"national weather service",url:natURL, cur: getNatCurrent, week: getNatWeek},// leaving this one out until I figure out why its denying me access
        {name:"weather underground",url:wuURL, cur: getWUCurrent, week: getWUWeek}
    ];
    
    var weather = [];
    for(var i = 0; i< sites.length; i++){
        //console.log(sites[i]);
        requestWeather(sites[i], function(data){
            weather.push({summary:data});
            
            if(weather.length === sites.length){
                callback(weather);
            }
        });
    }
    

    
    
}

/*
The follow process their various api returns to format their respective data to something more uniform.
*/
var getFCCurrent = function (data){
    if(data.currently){
    
        var current = { 
            time : getTime(data.currently.time + (data.offset* 3600)),
            temperature : data.currently.temperature,
            humidity : data.currently.humidity,
            wind : data.currently.windSpeed,
            rainchance : data.currently.precipProbability
        }
        
        return (current);
    
    }
    else{
        return({error:"Malformed dataset"})
    }
}

var getFCWeek = function (data){
    if(data.daily && data.daily.data){
        var weekData = data.daily.data;
        
        var week = []
        
        for(var i = 1; i < 8; i++){ //starts at 1 as 0 is today
            week.push(
                {
                  time : getTime(weekData[i].time),
                  temphi : weekData[i].temperatureMax,
                  templo : weekData[i].temperatureMin,
                  humidity : weekData[i].humidity,
                  wind : weekData[i].windSpeed,
                  rainchance : weekData[i].precipProbability
                }
                
                );
        }
        
        
         return (week);
    }
    else{
        return({error:"Malformed dataset"})
    }
    
}

var getWUCurrent = function (data){
    if(data.current_observation){
    var current = { 
        time : getTime(parseInt(data.current_observation.local_epoch) + parseInt(data.current_observation.local_tz_offset)*36),
        temperature : data.current_observation.temp_f,
        humidity : getPercent(data.current_observation.relative_humidity),
        wind : data.current_observation.wind_mph,
    }
    return (current);
    }
    else{
        return({error:"Malformed dataset"})
    }
}

var getWUWeek = function (data){
    if(data.forecast && data.forecast.simpleforecast.forecastday){
    var weekData = data.forecast.simpleforecast.forecastday;
    
    var week = []
    
    for(var i = 1; i < 8; i++){ //starts at 1 as 0 is today
        week.push(
            {
              time : getTime(weekData[i].date.epoch),
              temphi : parseInt(weekData[i].high.fahrenheit),
              templo : parseInt(weekData[i].low.fahrenheit),
              humidity : weekData[i].avehumidity/100,
              wind : weekData[i].avewind.mph,
              rainchance : weekData[i].pop/100
            }
            
            );
    }
    
     return (week);
    }
    else{
        return({error:"Malformed dataset"})
    }
    

}

/*
function getNatCurrent(data){
    current = { 
        time : getTime(data.currently.time),
        temperature : data.currently.temperature,
        humidity : data.currently.humidity,
        wind : data.currently.windSpeed,
        rainchance : data.currently.precipProbability
    }
     return ("5");
}

function getNatWeek(data){
     return ("6");
}
*/



//helper functions

var getPercent = function (percentString){
    return parseFloat(percentString.slice(0,-1))/100;
}

//export functions for unit testing
exports.getLocation = getLocation;
exports.getTime = getTime;
exports.requestWeather = requestWeather;
exports.weatherSummary = weatherSummary;
exports.getFCWeek = getFCWeek;
exports.getFCCurrent = getFCCurrent;
exports.getWUWeek = getWUWeek;
exports.getWUCurrent = getWUCurrent;
exports.getPercent = getPercent;



myServer.listen(process.env.PORT, process.env.IP);