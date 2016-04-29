
var wuData = require("../app/testdata/wunderground.json");
var fcData = require("../app/testdata/forecastio.json");

var server = require("../app/server.js");



describe("getLocation", function(){
    it("takes in a location string and returns an object containing the latitude, longitude, and address",function(){
        server.getLocation("Philly", function(data){
            expect(data.lat).toBe(39.9525839);
            expect(data.lng).toBe(-75.1652215);
            expect(data.address).toBe("Philadelphia, PA, USA");
        });
    });
    it("Outputs an error if the location does not exist", function(){
        //junk text  entry
       server.getLocation("erqlwekrjafgxcdaser",function(data){
           expect(data.error).toBe("Call failed, location likely nonexistent");
       });
    });
});





describe("getTime", function(){
    it("Gets a unix timestamp and returns a summarized time object", function(){
        //my birthday in unix time
       var time = server.getTime(761702400);
       expect(time.weekday).toBe(0);
       expect(time.day).toBe(20);
       expect(time.month).toBe(2);
    });
    
});






describe("getPercent", function(){
    it("should return a formatted float from a string", function(){
        var result = server.getPercent("90%");
        expect(result).toBe(0.9);
        
    });
    
});


describe("getFCCurrent", function(){
    it("Ignores bad input", function(){
        var result = server.getFCCurrent({});
        expect(result.error).toBe("Malformed dataset");
    });
    
    it("Processes api data", function(){
        var weather = server.getFCCurrent(fcData);
        expect(weather.time.weekday).toBe(6);
        expect(weather.time.day).toBe(23);
        expect(weather.time.month).toBe(4);
        expect(weather.temperature).toBe(58.43);
        expect(weather.humidity).toBe(0.69);
        expect(weather.wind).toBe(5.63);
        expect(weather.rainchance).toBe(0);
    });
});

describe("getFCWeek", function(){
    it("Ignores bad input", function(){
        var result = server.getFCWeek({});
        expect(result.error).toBe("Malformed dataset");
    });
    it("Processes api data", function(){
        var weather = server.getFCWeek(fcData);
        
        expect(weather[0].time.weekday).toBe(0);
        expect(weather[0].time.day).toBe(24);
        expect(weather[0].time.month).toBe(4);
        expect(weather[0].temphi).toBe(67.49);
        expect(weather[0].templo).toBe(51.23);
        expect(weather[0].humidity).toBe(0.73);
        expect(weather[0].wind).toBe(14.98);
        expect(weather[0].rainchance).toBe(0);
    });
    
})

describe("getWUCurrent", function(){
    it("Ignores bad input", function(){
        var result = server.getWUCurrent({});
        expect(result.error).toBe("Malformed dataset");
    });
    it("Processes api data", function(){
        var weather = server.getWUCurrent(wuData);
        expect(weather.time.weekday).toBe(4);
        expect(weather.time.day).toBe(28);
        expect(weather.time.month).toBe(4);
        expect(weather.temperature).toBe(44.2);
        expect(weather.humidity).toBe(0.93);
        expect(weather.wind).toBe(4);
        expect(weather.rainchance).toBeUndefined();
    });
    
});

describe("getWUWeek", function(){
    it("Ignores bad input", function(){
        var result = server.getWUWeek({});
        expect(result.error).toBe("Malformed dataset");
    });
    it("Processes api data", function(){
        var weather = server.getWUWeek(wuData);
        expect(weather[0].time.weekday).toBe(5);
        expect(weather[0].time.day).toBe(29);
        expect(weather[0].time.month).toBe(4);
        expect(weather[0].temphi).toBe(57);
        expect(weather[0].templo).toBe(46);
        expect(weather[0].humidity).toBe(0.56);
        expect(weather[0].wind).toBe(10);
        expect(weather[0].rainchance).toBe(0.4);
    });
    
});
