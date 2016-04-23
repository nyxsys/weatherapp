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
    var url = "http://maps.googleapis.com/maps/api/geocode/json";
    var query = {address: req.params.location};

    console.log(query);
    request({url:url,qs:query}, function(err, response, data)
    {
        if(err){
            return console.error("Call failed, ", err);
        }
        res.send(data);
          
    });

})






myServer.listen(process.env.PORT, process.env.IP);
//getLocation("China");