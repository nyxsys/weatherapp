/*
All the api calls will be in here to keep my keys safe

individual and seperate endpoints will be available
*/

var request = require("request");
var http = require("http");
var express = require("express");
var serveStatic = require("serve-static");

console.log("Started server");


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

    console.log(query);
    request({url:url,qs:query}, function(err, response, data)
    {
        if(err){
            return console.error("Call failed, ", err);
        }
        callback(data);
          
    });
}







myServer.listen(process.env.PORT, process.env.IP);
//getLocation("China");