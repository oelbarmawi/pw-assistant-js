var $ = require('jquery');
var http = require('http');
var https = require("https");
var request = require('request');

// const express = require('express');
// const bodyParser = require('body-parser');
// var $ = require('jquery');

// const restService = express();

// restService.use(bodyParser.urlencoded({
//     extended: true
// }));

// restService.use(bodyParser.json());

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
			var result;
			function getJSON(myurl) {
				request({url: myurl, method: 'GET', json: true}, function(err, res, json) {
					if (err) {
				    	throw err;
				  	} else {
				  		lat = json.results[0].geometry.location.lat;
				  		lon = json.results[0].geometry.location.lng;
				  		console.log(json.results[0].formatted_address);
				  	}
				});
			}
			return getJSON(customUrl);
			break;
	}
}

console.log(test());