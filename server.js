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


console.log("WU key", process.env.WUNDERGROUND_KEY);
console.log("Forecast key", process.env.FORECASTIO_KEY);

var aRouter = express();
var myServer = http.createServer(aRouter);

aRouter.use(serveStatic('public', {'index':['index.html']}))

aRouter.get('/location/:location', function(req,res){
    getLocation(req.params.location, function(result){
        console.log(result);
        res.send(result);
    });

})

function getLocation(location, callback){
    var url = "http://maps.googleapis.com/maps/api/geocode/json";
    var query = {address: location};

    request({url:url,qs:query}, function(err, res, data)
    {
        
        data = JSON.parse(data);
        
        if(data.status != "OK"){
            return console.error("Call failed, location likely nonexistent", err);
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

function getTime(unixTime){
    var date = new Date(unixTime*1000);
    return {weekday: date.getDay(), day:date.getDate(), month:date.getMonth()+1}
}


function requestWeather(site, callback){
    console.log(site.url);
    request.get(site.url, function(err,res, data){
        data = JSON.parse(data);
        
        var weather = 
        {
            service: site.name,
            today: site.cur(data),
            tenDay: site.week(data)
        }
        callback(weather);

    });
}



function weatherSummary(coord, callback){
    var foreURL = util.format("https://api.forecast.io/forecast/%s/%s,%s",  process.env.FORECASTIO_KEY, coord.lat, coord.lng);
    //var natURL = util.format("http://forecast.weather.gov/MapClick.php?lat=%s&lon=%s&FcstType=json", coord.lat, coord.lng);
    var wuURL = util.format("http://api.wunderground.com/api/%s/forecast10day/q/%s.json", process.env.WUNDERGROUND_KEY, coord.address);

    
    var sites = [
        {name:"forecast.io", url:foreURL, cur: getFCCurrent, week: getFCWeek},
        //{name:"national weather service",url:natURL, cur: getNatCurrent, week: getNatWeek},
        {name:"weather underground",url:wuURL, cur: getWUCurrent, week: getWUWeek}
    ];
    
    var weather = [];
    for(var i = 0; i< sites.length; i++){
        console.log(sites[i]);
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
function getFCCurrent(data){
    
    return ("1");
}

function getFCWeek(data){
     return ("2");
}

function getWUCurrent(data){
     return ("3");
}

function getWUWeek(data){
     return ("4");
}

function getNatCurrent(data){
     return ("5");
}

function getNatWeek(data){
     return ("6");
}





myServer.listen(process.env.PORT, process.env.IP);
//getLocation("China");