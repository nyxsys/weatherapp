
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
           expect(data).toBeUndefined();
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
});

describe("getFCWeek", function(){
    it("Ignores bad input", function(){
        var result = server.getFCWeek({});
        expect(result.error).toBe("Malformed dataset");
    });
    
})

describe("getWUCurrent", function(){
    it("Ignores bad input", function(){
        var result = server.getWUCurrent({});
        expect(result.error).toBe("Malformed dataset");
    });
    
});

describe("getWUWeek", function(){
    it("Ignores bad input", function(){
        var result = server.getWUWeek({});
        expect(result.error).toBe("Malformed dataset");
    });
    
});
