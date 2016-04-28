var request = require("request");

var base_url = "https://weatherapp-nyxsys1.c9users.io";


describe("First Test", function(){
   describe("GET /", function(){
       it("returns status code 200", function(){
           request.get(base_url, function(err,res,body){
               expect(res.statusCode).toBe(200);
               done();
           });
       });
       
       it("returns a form page", function(){
            request.get(base_url, function(err,res,body){
               expect(body).toBe("<title>what's the weather</title>");
               done();
           });
       });
       
   }); 
    
    
});