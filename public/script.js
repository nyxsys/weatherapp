

function push(){
    console.log("submitting")
    var location = $(".location").val();
    $.get(
        "location/"+location,
        function(data){
            console.log(data);
            
            $(".week").empty();
            $(".today").empty();
            
            weatherReport(data);
        }
    );
    
    
    $(".location").val(""); 
}

function weatherReport(data){
    
    
}

/*
<p class = "date"></p>
<p class = "temperature"></p>
<p class = "wind"></p>
<p class = "humidity"></p>
<p class = "rainchance"></p>
*/

function appendToday(today){
    $(".today").append("<p>date " + today.date + "</p>");
    $(".today").append("<p>temp " + today.temp + "</p>");
    $(".today").append("<p>wind " + today.wind + "</p>");
    $(".today").append("<p>humidity " + today.humidity + "</p>");
    $(".today").append("<p>rainchance " + today.rainchance + "</p>");
}

/*
<div class = "day">
    <p class = "date"></p>
    <p class = "temp hi"></p>
    <p class = "temp lo"></p>
    <p class = "wind"></p>
    <p class = "humidity"></p>
    <p class = "rainchance"></p>
</div>
*/

function appendWeek(week){
    
    for(var i = 0; i < 7; i ++){
        var day = $("<div'></div>").addClass("day");
        day.append("<p>yo</p>");
        day.append("<br>");
        
        
        
        $(".week").append(day);
    }
    
    
}

$(document).ready(function(){
     
})
   