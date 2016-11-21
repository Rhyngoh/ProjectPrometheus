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
//var latArray = [];
//var longArray = [];
//var placeArray = [];
var lat = "";
var lng = "";
//=======================//
//=======Methods=========//
//=======================//
//Initialize the Google Map at lat, long coords based on address
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: lat, lng: lng},
	  zoom: 15
	});
	//Place a marker on home address
	var homeMarker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          title: 'Home Search Address'
        });
}
//Find nearby locations search
$("#findSearch").on("click", function(){
	//latArray = [];
	//longArray = [];
	//If user has input a zip code, run function storeTheZip
	if (zipCode){
		storeTheZip();
	} else {
		//do something to warn the user to put the correct zip code in
		queryURL = foursquareQueryURL + "78705"; //default to 78705
	}
	//Give searchResults the value of the selection
	searchResults = $("#sel1").val();
	//Convert the searchResults to HTML code
	var convertedSearch = encodeURIComponent(searchResults);
	console.log(convertedSearch);
	//Add the search term to the query
	queryURL = queryURL + "&query=" + convertedSearch;
	console.log(queryURL);
	//Assign searchNumber and searchRadius to the input values
	searchNumber = $("#numRecords").val();
	searchRadius = $("#searchRadius").val();
	//If a search number is provided (number of locations to retrieve), add limit to query
	if (parseInt(searchNumber)){
		queryURL = queryURL + "&limit=" + searchNumber;
		console.log(queryURL);
	} else{ //else default to 10 searches
		searchNumber = 10;
		queryURL = queryURL + "&limit=" + searchNumber;
		console.log(queryURL);
	}
	//If a search radius is provided, add radius to the query
	if (parseInt(searchRadius)){
		queryURL = queryURL + "&radius=" + searchRadius;
		console.log(queryURL);
	} else{ //else default to 2km radius
		queryURL = queryURL + "&radius=2000";
		console.log(queryURL);
	}
	//Clear the previous search results
	$("#foursquareResults").html("");
	locationCounter = 0;
	runQuery(searchNumber, queryURL);
	console.log(queryURL);
	return false;
});
				//var restAddress = "";
				//var restPhone = "";
//Run query to place markers that correspond with foursquare results
//Show the foursquare results with name, address, and phone number
function runQuery(searchNumber, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response) {
			var infowindow;
			var marker;
			//Reset map to center on user address
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
			//for loop to post foursquare results
			for (var i = 0; i < searchNumber; i++){
				locationCounter++;
				//Create an empty div
				var foursquareResults = $("<div>");
				//Add class foursqSearch to the empty div
				foursquareResults.addClass("foursqSearch");
				//Give each foursqSearch a unique id
				foursquareResults.attr("id", "foursqSearch-" + locationCounter);
				//Append the foursqSearch to the foursquareResults section
				$("#foursquareResults").append(foursquareResults);
				//If there is a venue name, append it to the foursqSearch
				if(response.response.groups[0].items[i].venue.name != "null"){
					$("#foursqSearch-" + locationCounter).append("<h3 class='restaurantName'><span class='label label-primary'>" + locationCounter + "</span><strong>	" + response.response.groups[0].items[i].venue.name + '</strong></h3>');
				}
				//If there is a venue address, append it to the foursqSearch
				if(response.response.groups[0].items[i].venue.location.address){
					$("#foursqSearch-" + locationCounter).append("<h4>" + response.response.groups[0].items[i].venue.location.address + "</h4>");
					//restAddress = response.response.groups[0].items[i].venue.location.address;
				}
				//If there is a venue phone number, append it to the foursqSearch
				if(response.response.groups[0].items[i].venue.contact.formattedPhone){
					$("#foursqSearch-" + locationCounter).append("<h5>" + response.response.groups[0].items[i].venue.contact.formattedPhone + "</h5>");
					//restPhone = response.response.groups[0].items[i].venue.contact.formattedPhone;
				}
				//If there is a venue website, append it to the foursqSearch
				if(response.response.groups[0].items[i].venue.url){
					$("#foursqSearch-" + locationCounter).append("<h5><a href='" + response.response.groups[0].items[i].venue.url + "'>" + response.response.groups[0].items[i].venue.url + "</a></h5>");
				}
				//Create a restaurant marker for each location retrieved
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(response.response.groups[0].items[i].venue.location.lat, response.response.groups[0].items[i].venue.location.lng),
					map: map,
					title: response.response.groups[0].items[i].venue.name,
					icon: "assets/images/restaurantmarker.png"
				});
				//On marker click, display an infowindow that shows restaurant details
				(function(marker,i){
					google.maps.event.addListener(marker, "click", function() {
						infowindow = new google.maps.InfoWindow({
							content: response.response.groups[0].items[i].venue.name + "<br>" + response.response.groups[0].items[i].venue.location.address + "<br>" + response.response.groups[0].items[i].venue.contact.formattedPhone
						});
						infowindow.open(map, marker);
					});
				})(marker, i);
			}
		});
}
//storeTheZip stores the zip code value that the user inputs
function storeTheZip(){
	geoLocator();
	zipCode = $("#searchByZip").val().trim();
	queryURL = foursquareQueryURL + zipCode;
	console.log(queryURL);
	//Some unknown javascript stuff to get the google maps working?
	//Create a script tag
	var js_file = document.createElement('script');
	//Give it type text/javascript
	js_file.type = 'text/javascript';
	//Give it a google maps source
	js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + gMapsJSAPI;
	//Append it to the html head
	document.getElementsByTagName('head')[0].appendChild(js_file);
	return false;
}
//On findZip click, run function storeTheZip
$(document).on("click", "#findZip", storeTheZip);
//On ourMission click, display the mission statement
$("#ourMission").on("click", function(){
	$("#map").html("<p id='mission'>Our mission is to provide the simplest home search for the type of lifestyle you want to lead. Whether you are a fitness minded person who wants to be surrounded with healthy choices or a family that wants the best education for their children, this website has it all. We want to make the process of finding that perfect location, the perfect home and the process of buying easy for you! Let our family help your family find the perfect home!</p>");
	$("#map").css({"background": "url('assets/images/pool1.jpg') no-repeat fixed center"});
});
//geoLocator stores the user address input and adds it to google geocode
function geoLocator(){
    var location = $("#searchByAddress").val().trim();
    console.log("loc: "+ location);
	var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=" + gMapsJSAPI;
	console.log(queryGeoURL);
	//ajax call to grab the lat and long of address
	$.ajax({url: queryGeoURL, method: 'GET'})
	      .done(function(geoResponse) {
	    //store the lat and long values into lat and lng variables
		console.log(geoResponse);
		lat = geoResponse.results[0].geometry.location.lat;
		lng = geoResponse.results[0].geometry.location.lng;
		console.log(lat+","+lng);
	});
}