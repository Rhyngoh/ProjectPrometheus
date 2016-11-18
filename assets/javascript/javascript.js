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
var foursquareQueryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20161117&near=";
//Initial Google Maps load
var map;
//Yelp variables
var searchResults = "";
var searchNumber = 10;
var searchRadius = 1000;
var zipCode;
//var searchRating = 4;
var searchCity = "";
//var yelpQueryURL = "https://api.yelp.com/v2/search/?term=food truck&location=austin,tx&sort=1&limit=10&key=c5rwaF5qpeOdsja0OFZNMA";
//var yelpQueryURL = "https://api.yelp.com/v2/search/?key=" + yelpAPI + "&sort=1&term=";
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
var latArray = [];
var longArray = [];
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
	latArray = [];
	longArray = [];
	if (zipCode){
		storeTheZip();
	} else {
		queryURL = foursquareQueryURL + "78705";
	}
	searchResults = $("#sel1").val();
	var convertedSearch = encodeURIComponent(searchResults);
	console.log(convertedSearch);
	queryURL = queryURL + "&query=" + convertedSearch;
	console.log(queryURL);
	searchNumber = $("#numRecords").val();
	searchRadius = $("#searchRadius").val();
	if (parseInt(searchNumber)){
		queryURL = queryURL + "&limit=" + searchNumber;
		console.log(queryURL);
	} else{
		searchNumber = 10;
		queryURL = queryURL + "&limit=" + searchNumber;
		console.log(queryURL);
	}
	if (parseInt(searchRadius)){
		queryURL = queryURL + "&radius=" + searchRadius;
		console.log(queryURL);
	} else{
		queryURL = queryURL + "&radius=5000";
		console.log(queryURL);
	}
	$("#foursquareResults").html("");
	locationCounter = 0;
	runQuery(searchNumber, queryURL);
	console.log(queryURL);
	//changeTheMap();
	return false;
});
function runQuery(searchNumber, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response) {
			console.log(response);
			console.log(response.response.groups[0].items[0].venue.location.address);
			for (var i = 0; i < searchNumber; i++){
				locationCounter++;
				var foursquareResults = $("<div>");
				foursquareResults.addClass("foursqSearch");
				foursquareResults.attr("id", "foursqSearch-" + locationCounter);
				$("#foursquareResults").append(foursquareResults);
				if(response.response.groups[0].items[i].venue.name != "null"){
					$("#foursqSearch-" + locationCounter).append("<h3 class='restaurantName'><span class='label label-primary'>" + locationCounter + "</span><strong>	" + response.response.groups[0].items[i].venue.name + '</strong></h3>');
				}
				if(response.response.groups[0].items[i].venue.location.address){
					$("#foursqSearch-" + locationCounter).append("<h4>" + response.response.groups[0].items[i].venue.location.address + "</h4>");
				}
				if(response.response.groups[0].items[i].venue.contact.formattedPhone){
					$("#foursqSearch-" + locationCounter).append("<h5>" + response.response.groups[0].items[i].venue.contact.formattedPhone + "</h5>");
				}
				if(response.response.groups[0].items[i].venue.url){
					$("#foursqSearch-" + locationCounter).append("<h5><a href='" + response.response.groups[0].items[i].venue.url + "'>" + response.response.groups[0].items[i].venue.url + "</a></h5>");
				}
				latArray.push(response.response.groups[0].items[i].venue.location.lat);
				longArray.push(response.response.groups[0].items[i].venue.location.lng);
			}
			console.log(latArray);
			console.log(longArray);
		});
}
function storeTheZip(){
	zipCode = $("#searchByZip").val().trim();
	queryURL = foursquareQueryURL + zipCode;
	console.log(queryURL);
	//init map here
	var js_file = document.createElement('script');
	js_file.type = 'text/javascript';
	js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + gMapsJSAPI;
	document.getElementsByTagName('head')[0].appendChild(js_file);
	return false;
}

$(document).on("click", "#findZip", storeTheZip);

$("#ourMission").on("click", function(){
	$("#map").html("<p>Our mission is to provide</p>");
});

function changeTheMap(){
	var infowindow = new google.maps.InfoWindow();
	var marker;
	for (var j = 0; j < searchNumber;j++){
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(latArray[j], longArray[j]),
			map: map
		});
		google.maps.event.addListener(marker, "click", (function(marker, j) {
			return function(){
				infowindow.setContent(testLocations[j].name);
				infowindow.open(map, marker);
			}
		})(marker, j));
	}
}

$("#enter").on("click", function() {  
    //read value from form
    var location = $("#location").val();
    var searchFor = $("#searchFor").val();
    //check results
    console.log("loc: "+ location + " search: "+ searchFor);
 
var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=" + myKey
console.log(queryGeoURL)

$.ajax({url: queryGeoURL, method: 'GET'})
      //create object
      .done(function(geoResponse) {

console.log(geoResponse)

var lat = geoResponse.results[0].geometry.location.lat;
var lng = geoResponse.results[0].geometry.location.lng;

console.log(lat+","+lng);