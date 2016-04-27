

function push(){
    console.log("submitting")
    var location = $(".location").val();
    console.log(location);
    
    $(".location").val(""); 
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