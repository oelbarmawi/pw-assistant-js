'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var $ = require('jquery');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
	var speech = "Something went wrong, can you repeat the question?";
	var action = req.body.result.action;

	switch(action) {
		case "TodaysOpportunities.Direct":
			speech = "The following people qualify for ";
		    speech += req.body.result && req.body.result.parameters && req.body.result.parameters.oppType ? req.body.result.parameters.oppType : "Seems like some problem. Speak again."
		    speech += ": Bobby, Jonny, Terry, Jerry"; 
		    break;

		case "FindClosestPharmacy.Address":
			// var zip = req.body.result.parameters.zipCode;
			// var address = req.body.result.parameters.userAddress;
			// var encodedAddress = encodeURIComponent(userAddress);
			// var ourRequest = new XMLHttpRequest();
			// ourRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&sensor=false');
			// ourRequest.onload = function() {
			// 	var place = JSON.parse(ourRequest.responseText);
			// 	var lat = place.results[0].geometry.location.lat;
			// 	var lng = place.results[0].geometry.location.lat;
			// 	var formatted_address = place.results[0].formatted_address;
			// 	speech = "The latitude is " + lat + ", and the longitude is " + lng + " for the address, " + formatted_address;
			// };
			// ourRequest.send();
			
			// speech = "The closest pharmacy to " + zip + " is...";
			speech = "It's working.";
			break;
	}

	return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
	});
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});