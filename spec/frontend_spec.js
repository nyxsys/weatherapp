
var front = require("../app/public/script.js");
var apiData = require("../app/testdata/weather.json");


describe("WeatherReport", function(){
    it("logs an error on bad calls", function(){
        
        
        front.weatherReport({error:"error"}, 
        function(data){
            expect(data).toBeUndefined();
        },
        function(data){
            expect(data).toBeUndefined();
        });
    });
    
    it("returns averages for the current and forecasted weather", function() {
        front.weatherReport(apiData,
        function(current){
            expect(current.location).toBe("Philadelphia, PA, USA");
            expect(current.time.weekday).toBe(5);
            expect(current.time.day).toBe(29);
            expect(current.time.month).toBe(4);
            expect(current.temperature).toBe((48.9+47.88)/2);
            expect(current.wind).toBe((1+2.95)/2);
            expect(current.humidity).toBe((0.76 + 0.79)/2);
            expect(current.rainchance).toBe(0);
            
        },
        function(week){
            var wu = apiData.weather[0].summary.week;
            var fc = apiData.weather[1].summary.week;
            
            var fields = ["templo", "temphi", "humidity", "wind", "rainchance"];
            
            for(var i in week){
                expect(week[i].time.weekday).toBe(wu[i].time.weekday);
                expect(week[i].time.day).toBe(wu[i].time.day);
                expect(week[i].time.month).toBe(wu[i].time.month);
                
                
                for(var n in fields){
                    expect(week[i][fields[n]]).toBe((wu[i][fields[n]] + fc[i][fields[n]])/2);
                }
            }
            
        }
        )
    })
    
});

describe