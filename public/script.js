




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