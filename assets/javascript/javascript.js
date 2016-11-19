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
//Google Maps Javascript API key
var gMapsJSAPI = "AIzaSyB6doLPrG5Th0zwPgg4rqEC5H-_LW5JL5g";
//ANOTHER KEY AIzaSyB56nQD_X5ceDNiShLjhUfrBTMAhKjYaY4
//Transit and Trails API key
var tTrailsAPI = "41e73178218a6deff1d2b78b1b251085da804e04d528a0d6ad601f06db5bb14a";
//Simply RETS API key
// var sRETSAPI = "";
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
var placeArray = [];
var lat = "";
var lng = "";
//=======================//
//=======Methods=========//
//=======================//
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: lat, lng: lng},
	  zoom: 15
	});
	var homeMarker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          title: 'Home Search Address'
        });
}
$("#findSearch").on("click", function(){
	latArray = [];
	longArray = [];
	if (zipCode){
		storeTheZip();
	} else {
		//do something to warn the user to put the correct zip code in
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
	return false;
});
				//var restAddress = "";
				//var restPhone = "";
function runQuery(searchNumber, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response) {
			var infowindow;
			var marker;
			map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: lat, lng: lng},
			  zoom: 15
			});
			var homeMarker = new google.maps.Marker({
	          position: {lat: lat, lng: lng},
	          map: map,
	          title: 'Home Search Address'
	        });
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
					//restAddress = response.response.groups[0].items[i].venue.location.address;
				}
				if(response.response.groups[0].items[i].venue.contact.formattedPhone){
					$("#foursqSearch-" + locationCounter).append("<h5>" + response.response.groups[0].items[i].venue.contact.formattedPhone + "</h5>");
					//restPhone = response.response.groups[0].items[i].venue.contact.formattedPhone;
				}
				if(response.response.groups[0].items[i].venue.url){
					$("#foursqSearch-" + locationCounter).append("<h5><a href='" + response.response.groups[0].items[i].venue.url + "'>" + response.response.groups[0].items[i].venue.url + "</a></h5>");
				}
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(response.response.groups[0].items[i].venue.location.lat, response.response.groups[0].items[i].venue.location.lng),
					map: map,
					title: response.response.groups[0].items[i].venue.name,
					icon: "assets/images/restaurantmarker.png"
				});
				(function(marker,i){
					google.maps.event.addListener(marker, "click", function() {
						infowindow = new google.maps.InfoWindow({
							content: response.response.groups[0].items[i].venue.name
							// + "<br>" + restAddress + "<br>" + restPhone
						});
						infowindow.open(map, marker);
					});
				})(marker, i);
			}
		});
}
function storeTheZip(){
	geoLocator();
	zipCode = $("#searchByZip").val().trim();
	queryURL = foursquareQueryURL + zipCode;
	console.log(queryURL);
	var js_file = document.createElement('script');
	js_file.type = 'text/javascript';
	js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + gMapsJSAPI;
	document.getElementsByTagName('head')[0].appendChild(js_file);
	return false;
}

$(document).on("click", "#findZip", storeTheZip);

$("#ourMission").on("click", function(){
	$("#map").html("<p id='mission'>Our mission is to provide the simplest home search for the type of lifestyle you want to lead. Whether you are a fitness minded person who wants to be surrounded with healthy choices or a family that wants the best education for their children, this website has it all. We want to make the process of finding that perfect location, the perfect home and the process of buying easy for you! Let our family help your family find the perfect home!</p>");
	$("#map").css({"background": "url('assets/images/pool1.jpg') no-repeat fixed center"});
});

function geoLocator(){
    var location = $("#searchByAddress").val().trim();
    console.log("loc: "+ location);
	var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=" + gMapsJSAPI;
	console.log(queryGeoURL);

	$.ajax({url: queryGeoURL, method: 'GET'})
	      .done(function(geoResponse) {

		console.log(geoResponse);
		lat = geoResponse.results[0].geometry.location.lat;
		lng = geoResponse.results[0].geometry.location.lng;

		console.log(lat+","+lng);
	});
}