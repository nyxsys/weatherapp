

function getTime(unixTime){
    var date = new Date(unixTime*1000);
    console.log(date);
    
}


function test(){
    console.log("submit?");
    var location = $(".location").val();
    $.get(
        "location/"+location,
        function(data){
            console.log(data);
        }
    );
    
    $(".location").val(""); 
}