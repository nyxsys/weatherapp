

function push(){
    console.log("submitting")
    var location = $(".location").val();
    $.get(
        "location/"+location,
        function(data){
            //console.log(data);
            
            $(".week").empty();
            $(".today").empty();
            $(".locale").empty();
            $(".title").empty();
            $(".locale").append(data.location.address);
            
            weatherReport(data);
        }
    );
    
    
    $(".location").val(""); 
}

function weatherReport(data){
    
    var today = 
    {
        time:0,
        temperature:0,
        wind:0,
        humidity:0.0,
        rainchance:0
    };
    
    
    var week = [];
    
    for( var i = 0; i < 7; i++){
        week.push({
            time:null,
            temphi:0,
            templo:0,
            wind:0,
            humidity:0.0,
            rainchance:0
        });
    }
    //leaving time out as everything else is possible to get an average for
    var attribcur = ["temperature", "wind", "humidity", "rainchance"];
    var curSums = [0,0,0,0];//for getting averages
    var attribweek = ["temphi", "templo","wind", "humidity","rainchance"];
    var weekSums = [0,0,0,0,0];
    
    for(var i in data.weather){
        var service = data.weather[i];
        //console.log(service);
        today["time"] = service.summary.today["time"];
        for(var n in attribcur){
            if(service.summary.today[attribcur[n]] !== undefined && service.summary.today[attribcur[n]] !== null){
                today[attribcur[n]] += service.summary.today[attribcur[n]];
                curSums[n]++;
            }
            
        }
        

        for(var m = 0; m < 7; m++){
            var day = service.summary.week[m];
            //console.log(day);
            week[m]["time"] = day["time"];

            for(var j in attribweek){
                if(day[attribweek[j]] !== undefined && day[attribweek[j]] !== null){
                    week[m][attribweek[j]] += day[attribweek[j]];
                    if(m ==0){//only check first day for number of services with attribute
                        weekSums[j]++;
                    }
                }
                
            }
        }
    }
    
    
    for(var field in attribcur){
        today[attribcur[field]] = today[attribcur[field]]/curSums[field];
    }
    
    for(var i in week){
        for( var field in attribweek){
            week[i][attribweek[field]] = week[i][attribweek[field]]/weekSums[field];
        }
    }

    //console.log(today);
    //console.log(week);
    
    appendToday(today);
    appendWeek(week);
    
}

/*
<p class = "date"></p>
<p class = "temperature"></p>
<p class = "wind"></p>
<p class = "humidity"></p>
<p class = "rainchance"></p>
*/

function appendToday(today){
    $(".today").append("<h3> current weather </h3>");
    //$(".today").append("<b>date " + today.time.month + "/" + today.time.day + "</b>");
    $(".today").append("<p>temp " + Math.round10(today.temperature, -2) + "</p>");
    $(".today").append("<p>wind " + Math.round10(today.wind, -2) + "</p>");
    $(".today").append("<p>humidity " + Math.round10(today.humidity, -2) + "</p>");
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
    $(".title").append("<h3> seven day forecast </h3>");
    for(var i = 0; i < week.length; i ++){
        var day = $("<div'></div>").addClass("day");
        
        day.append("<br>");
        day.append("<b>date " + week[i].time.month + "/" + week[i].time.day + "</b>");
        day.append("<p>High temp " + Math.round10(week[i].temphi, -2) + "</p>");
        day.append("<p>Low temp " + Math.round10(week[i].templo, -2) + "</p>");
        day.append("<p>wind " + Math.round10(week[i].wind, -2) + "</p>");
        day.append("<p>humidity " + Math.round10(week[i].humidity, -2) + "</p>");
        day.append("<p>rainchance " + week[i].rainchance + "</p>");
        day.append("<br>");
        
        
        $(".week").append(day);
    }
    
    
}

$(document).ready(function(){

})
   