var $ = require('jquery');
var http = require('http');
var https = require("https");
// var request = require('request');
var request = require('sync-request');

var test = function() {
	var speech = "Something went wrong, can you repeat the question?";
	var action = "FindClosestPharmacy.Address";

	switch(action) {
		case "TodaysOpportunities.Direct":
			speech = "The following people qualify for ";
		    break;

		case "FindClosestPharmacy.Address":
			var address = "18 Kendall Pl";
			var encodedAddress = encodeURIComponent(address);

			speech = "It's working.";
			// url :: 'https://maps.googleapis.com/maps/api/geocode/json?address=18_kendall_pl&sensor=false'
			customUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&sensor=false';

			// function getJSON(myurl) {
			// 	request({url: myurl, method: 'GET', json: true}, function(err, res, json) {
			// 		if (err) {
			// 	    	throw err;
			// 	  	} else {
			// 	  		lat = json.results[0].geometry.location.lat;
			// 	  		lon = json.results[0].geometry.location.lng;
			// 	  		console.log(json.results[0].formatted_address);
			// 	  	}
			// 	});
			// }

			var res = request('GET', customUrl);
			var json = JSON.parse(res.getBody());
			lat = json.results[0].geometry.location.lat;
			lng = json.results[0].geometry.location.lng;
			formattedAddress = json.results[0].formatted_address;
			speech = "The latitude is " + lat + ", and the longitude is " + lng + " for the address " + formattedAddress + ".";
			console.log(speech);

			break;
	}
}

test();