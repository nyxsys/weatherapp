
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
       })
    });
})

describe("getPercent", function(){
    it("should return a formatted float from a string", function(){
        var result = server.getPercent("90%");
        expect(result).toBe(0.9);
        
    });
    
});