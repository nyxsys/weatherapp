

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