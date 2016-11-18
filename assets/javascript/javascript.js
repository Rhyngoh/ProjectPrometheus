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
//Zillow API/ZWSID
var zillowAPI = "X1-ZWz19hcd8pk64r_5i268";
//foursquare client id
var foursquareClient = "Z52OIOVPKTHUNPPYWRTVYA0BKBA30MD1PNQ1AG2QAKVI4JIB";
var foursquareSecret = "GY1LWAXZWEUOS1KNUQSHYSR4JQBV4XY4HH0PQN0ULMPTD5GH";
var foursquareQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20161117&near=";
//Initial Google Maps load
var map;
//Yelp variables
var searchResults = "";
var searchNumber = 10;
var searchRadius = 1000;
var zipCode = "";
//var searchRating = 4;
var searchCity = "";
//var yelpQueryURL = "https://api.yelp.com/v2/search/?term=food truck&location=austin,tx&sort=1&limit=10&key=c5rwaF5qpeOdsja0OFZNMA";
var yelpQueryURL = "https://api.yelp.com/v2/search/?key=" + yelpAPI + "&sort=1&term=";
var locationCounter = 0;
var restaurantArray = [
	["Burger Joint", "4bf58dd8d48988d16c941735"],
	["Pizza Place", "4bf58dd8d48988d1ca941735"],
	["Sandwich Place", "4bf58dd8d48988d1c5941735"],
	["Steakhouse", "4bf58dd8d48988d1cc941735"],
	["Food Trucks", "4bf58dd8d48988d1cb941735"],
	["Fast Food", "4bf58dd8d48988d16e941735"],
	["BBQ" , "4bf58dd8d48988d1df931735"],
	["Mexican Restaurant", "4bf58dd8d48988d1c1941735"],
	["Indian Restaurant", "4bf58dd8d48988d10f941735"],
	["Chinese Restaurant" , "4bf58dd8d48988d145941735"],
	["Japanese Restaurant", "4bf58dd8d48988d111941735"],
	["Korean Restaurant" , "4bf58dd8d48988d113941735"],
	["Vietnamese Restaurant" , "4bf58dd8d48988d14a941735"],
	["Bubble Tea", "52e81612bcbc57f1066b7a0c"],
	["Coffee Shop", "4bf58dd8d48988d1e0931735"],
	["Dessert Shop" , "4bf58dd8d48988d1d0941735"],
	["Pet Cafe" , "56aa371be4b08b9a8d573508"],
	["Bars", "4bf58dd8d48988d116941735"],
	["Lounge" , "4bf58dd8d48988d121941735"],
	["Nightclub" , "4bf58dd8d48988d11f941735"]
];
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
	zipCode = $("#searchByCity").val().trim();
	queryURL = foursquareQueryURL + zipCode;
	console.log(queryURL);
	searchResults = $("#sel1").val();
	// convert searchResults into something to compare to the restaurantObjects to grab the id
	// queryURL = queryURL + "&categoryId=" + idnumber;
	var restID = restaurantArray.indexOf(searchResults);
	console.log(restID);
	searchNumber = $("#numRecords").val();
	searchRadius = $("#searchRadius").val();
	if (parseInt(searchNumber)){
		queryURL = queryURL + "&limit=" + searchNumber;
		console.log(queryURL);
	}
	if (parseInt(searchRadius)){
		queryURL = queryURL + "&radius=" + searchRadius;
		console.log(queryURL);
	}
	//runQuery(searchNumber, queryURL);
	console.log(queryURL);
	return false;
});
/*function runQuery(numLocations, queryURL){
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
}*/
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