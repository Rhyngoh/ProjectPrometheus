/* Grabbing the user's location and putting it on google maps when they open the html page
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }
 */
//=======================//
//=======Variables=======//
//=======================//
//Google Maps Embed API key
var gMapsEmbedAPI = "AIzaSyCTdAHDFgylm2HfbLYX93tWJ_zesUk03mI";
//Google Maps Javascript API key
var gMapsJSAPI = "AIzaSyB6doLPrG5Th0zwPgg4rqEC5H-_LW5JL5g";
//ANOTHER KEY AIzaSyB56nQD_X5ceDNiShLjhUfrBTMAhKjYaY4
//Transit and Trails API key
var tTrailsAPI = "41e73178218a6deff1d2b78b1b251085da804e04d528a0d6ad601f06db5bb14a";
//Simply RETS API key
// var sRETSAPI = "";
//Street Food App API only for canada/boston
//base url: http://data.streetfoodapp.com/1.1/
//Yelp API key
var yelpAPI = "c5rwaF5qpeOdsja0OFZNMA";
//Zillow API
var zillowAPI = "X1-ZWz19hcd8pk64r_5i268";

//Initial Google Maps load
var map;
//Yelp variables
var searchResults = "";
var searchNumber = 10;
//var searchRating = 4;
var searchCity = "";
//var yelpQueryURL = "https://api.yelp.com/v2/search/?term=food truck&location=austin,tx&sort=1&limit=10&key=c5rwaF5qpeOdsja0OFZNMA";
var yelpQueryURL = "https://api.yelp.com/v2/search/?key=" + yelpAPI + "&sort=1&term=";
var locationCounter = 0;

//=======================//
//=======Methods=========//
//=======================//
//to place markers
	/*	var austinMarker = new google.maps.Marker({
			position: austinUT,
			map: map
		});
	}*/
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 30.2870079, lng: -97.7312834},
	  zoom: 15
	});
}
$("#findSearch").on("click", function(){
	searchResults = $("#searchByName").val().trim();
	queryURL = yelpQueryURL + searchResults;
	searchNumber = $("#numRecords").val();
//	searchRating = $("#yelpRating").val();
	searchCity = $("#searchByCity").val().trim();
	if (parseInt(searchNumber)){
		queryURL = queryURL + "&limit=" + searchNumber;
	}
	if (parseInt(searchCity)){
		queryURL = queryURL + "&location=" + searchCity;
	}
	runQuery(searchNumber, queryURL);

	return false;
});
function runQuery(numLocations, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(yelpData) {
			console.log(yelpData);
			for (var i = 0; i < numLocations; i++){
				locationCounter++;
				var yelpSearchResults = $("<div>");
				yelpSearchResults.addClass("yelpSearch");
				yelpSearchResults.attr("id", "yelpSearch-" + locationCounter);
				$("#yelpSearchResults").append(yelpSearchResults);

			}
		})
}
$(document).ready(function() {
	//on click search button for first accordion, do function
	/*function yelpCall(){
		var yelpQueryURL = "https://api.yelp.com/v2/search/?term=food truck&location=austin,tx&sort=1&limit=10&key=c5rwaF5qpeOdsja0OFZNMA";
		$.ajax({url: yelpQueryURL, method: "GET"}).done(function(response){
			console.log(response);
		});
	}
	yelpCall();*/
	
}); 
/*
var testLocations = [
	songla = {
		name: "Song La",
		address: "411 W 23rd St",
		lat: "30.2861",
		long: "-97.7425",
		city: "austin"
	},
	chipotle = {
		name: "Chipotle",
		address: "2230 Guadalupe St",
		lat: "30.2857",
		long: "-97.8123",
		city: "austin"
	},
	torchys = {
		name: "Torchys Tacos",
		address: "2801 Guadalupe St",
		lat: "30.2938",
		long: "-97.8120",
		city: "austin"
	}
]
var infowindow = new google.maps.InfoWindow();
var marker;
for (var i = 0; i < testLocations.length;i++){
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(testLocations[i].lat, testLocations[i].long),
		map: map
	});
	google.maps.event.addListener(marker, "click", (function(marker, i) {
		return function(){
			infowindow.setContent(testLocations[i].name);
			infowindow.open(map, marker);
		}
	})(marker, i));
}*/