//=======================//
//=======Variables=======//
//=======================//
//Google Maps Javascript API key
var gMapsJSAPI = "AIzaSyB6doLPrG5Th0zwPgg4rqEC5H-_LW5JL5g";
//Transit and Trails API key
var tTrailsAPI = "41e73178218a6deff1d2b78b1b251085da804e04d528a0d6ad601f06db5bb14a";
//Yelp API
var yelpAPI = "c5rwaF5qpeOdsja0OFZNMA";
//Zillow API/ZWSID
var zillowAPI = "X1-ZWz19hcd8pk64r_5i268";
//foursquare client id
var foursquareClient = "Z52OIOVPKTHUNPPYWRTVYA0BKBA30MD1PNQ1AG2QAKVI4JIB";
var foursquareSecret = "GY1LWAXZWEUOS1KNUQSHYSR4JQBV4XY4HH0PQN0ULMPTD5GH";
var foursquareQueryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + foursquareClient + "&client_secret=" + foursquareSecret + "&v=20161117";
//Initial Google Maps load
var map;
var searchResults = "";
//Default search number and radius if no user input
var searchNumber = 10;
var searchRadius = 1000;
var zipCode = 78753;
var searchCity = "";
var locationCounter = 0;
var lat = 0;
var lng = 0;
//placeholder variable for certain searches
var placeholder;
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
          icon: "assets/images/bighouse.png",
          title: 'Home Search Address'
        });
}
function findSearch(){
	if(!zipCode)
		return false;
	else
	{
		//Run storeTheZip function to grab the lat/long using the geoLocator function
		storeTheZip();
		//Build the query to search for nearby locations
		searchLL = "&ll=" + lat + "," + lng;
		searchTerm = "&query=" + encodeURIComponent($("#sel"+placeholder).val());
		searchNumber =             ( $("#numRecords"+placeholder).val()   ? parseInt($("#numRecords"+placeholder).val())   : 10   );
		searchRadius = "&radius" + ( $("#searchRadius"+placeholder).val() ? parseInt($("#searchRadius"+placeholder).val()) : 2000 );
		finalQuery = foursquareQueryURL + searchLL + searchTerm + "&limit=" + searchNumber + searchRadius;
		runQuery(searchNumber, finalQuery);
		return false;
	}
}
//Search for nearby restaurants
$("#findSearchRestaurants").on("click", function(){
	placeholder = 1;
	findSearch();
});
//Search for nearby family locations
$("#findSearchFamily").on("click", function(){
	placeholder = 2;
	findSearch();
});
//Search for nearby healthy location
$("#findSearchHealthy").on("click", function(){
	placeholder = 3;
	findSearch();
});
//Search for nearby professional locations
$("#findSearchPro").on("click", function(){
	placeholder = 4;
	findSearch();
});
//Search for nearby nightlife locations
$("#findSearchNight").on("click", function(){
	placeholder = 5;
	findSearch();
});
//Run query to place markers that correspond with foursquare results
//Show the foursquare results with name, address, and phone number
function runQuery(searchNumber, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(response) {
			
			var infowindow = new google.maps.InfoWindow({content: "empty"});
			var marker = null;
			$("#foursquareResults").html("");
			//Reset map to center on user address
			map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: lat, lng: lng},
			  zoom: 15
			});
			var homeMarker = new google.maps.Marker({
	          position: {lat: lat, lng: lng},
	          map: map,
	          icon: "assets/images/bighouse.png",
	          title: 'Home Search Address'
	        });
			console.log(searchNumber);
			//for loop to post foursquare results
			for (var i = 0; i < searchNumber; i++){
				var currentItem = response.response.groups[0].items[i].venue;
				var newDiv = resultToDiv(currentItem, i+1);
				$("#foursquareResults").append(newDiv);
				console.log(newDiv);

				//Create a restaurant marker for each location retrieved*/
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(currentItem.location.lat, currentItem.location.lng),
					map: map,
					title: currentItem.name,
					html: currentItem.name + "<br>" + currentItem.location.address + "<br>" + currentItem.contact.formattedPhone
				});
				//For dynamically created markers, create a popup window when user mouses over
				google.maps.event.addListener(marker, 'mouseover',function(){
					infowindow.setContent(this.html);
					infowindow.open(map, this);
				});
				
			}
		});
}
//storeTheZip stores the zip code value that the user inputs
function storeTheZip(){
	coords = geoLocator();
	//initMap();
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
    var zipCode = $("#searchByZip").val().trim();
    var searchLocation = location ? zipCode ? location + "," + zipCode : location : zipCode; 
    console.log("loc: "+ searchLocation);
	var queryGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+searchLocation+"&key=" + gMapsJSAPI;
	console.log(queryGeoURL);
	var coords = {};
	//ajax call to grab the lat and long of address
	$.ajax({url: queryGeoURL, method: 'GET'})
	      .done(function(geoResponse) {
	    coords.lat = geoResponse.results[0].geometry.location.lat;
		coords.lng = geoResponse.results[0].geometry.location.lng;
		console.log(coords.lat+","+coords.lng);
		lat = coords.lat;
		lng = coords.lng;

		var js_file = document.createElement('script');
		js_file.type = 'text/javascript';
		js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + gMapsJSAPI;
		if(!map)
			document.getElementsByTagName('head')[0].appendChild(js_file);
		return coords;
	});
}

function resultToDiv (item,itemNum) {

	newDiv = $("<div>");
	newDiv.addClass("foursqSearch");
	//If there is a venue name, append it to the foursqSearch
	if(item.name != "null"){
		newDiv.append("<h3><span class='label label-primary'>" + itemNum + "</span><strong>" + item.name + '</strong></h3>');
	}
	//If there is a venue address, append it to the foursqSearch
	if(item.location.address){
		newDiv.append("<h4>" + item.location.address + "</h4>");
	}
	//If there is a venue phone number, append it to the foursqSearch
	if(item.contact.formattedPhone){
		newDiv.append("<h5>" + item.contact.formattedPhone + "</h5>");
	}
	//If there is a venue website, append it to the foursqSearch
	if(item.url){
		newDiv.append( "<h5><a href=\"" + item.url + "\">" + item.url + "</a></h5>");
	}
	//Create a restaurant marker for each location retrieved
	return newDiv;
}