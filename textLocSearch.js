

$(document).ready(function() {


//****************************//

var myKey= "AIzaSyB6doLPrG5Th0zwPgg4rqEC5H-_LW5JL5g"

//****************************// 

  //when submit button is clicked
  $("#enter").on("click", function() {  
    //read value from form
    var location = $("#location").val().trim();
    var searchFor = $("#searchFor").val().trim();
    //check results
    console.log("loc: "+ location + " search: "+ searchFor);
 

                     
var queryPlaceURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+searchFor+"+near+"+location+"&key="+ myKey
console.log("key="+myKey)
console.log(queryPlaceURL)

$.ajax({url: queryPlaceURL, method: 'GET'})
      //create object
      .done(function(placeResponse) {

console.log(placeResponse)

});

return false;

});

//****************************// 

});

