

$(document).ready(function() {

//****************************//

var myKey= "AIzaSyB6doLPrG5Th0zwPgg4rqEC5H-_LW5JL5g"

//****************************// 

  //when submit button is clicked
  $("#enter").on("click", function() {  
    //read value from form
    var location = $("#location").val();
    var searchFor = $("#searchFor").val();
    //check results
    console.log("loc: "+ location + " search: "+ searchFor);
 
  
//lat/lon info from google

var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=" + myKey
console.log(queryGeoURL)

$.ajax({url: queryGeoURL, method: 'GET'})
      //create object
      .done(function(geoResponse) {

console.log(geoResponse)

var lat = geoResponse.results[0].geometry.location.lat;
var lng = geoResponse.results[0].geometry.location.lng;

console.log(lat+","+lng);

//feed lat/lon into place search

//var myPlaceKey = "AIzaSyACRfkRGSwnKSh44dzXOOKDARJTmORpR44"

var queryPlaceURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=10&type="+searchFor+"&key="+ myKey
console.log("key="+myKey)
console.log(queryPlaceURL)

$.ajax({url: queryPlaceURL, method: 'GET'})
      //create object
      .done(function(placeResponse) {

console.log(placeResponse)

});

});
  
return false;

});

//****************************// 

});

