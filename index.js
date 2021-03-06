'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var request = require('sync-request');
const restService = express();


// Using the encoded address, pull the json from the google apis to return the speech.
function createSpeech(encodedAddress) {
	var speech = "It's working.";

	var customUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&sensor=false';
	var res = request('GET', customUrl);
	var json = JSON.parse(res.getBody());

	var lat = json.results[0].geometry.location.lat;
	var lng = json.results[0].geometry.location.lng;
	var formattedAddress = json.results[0].formatted_address;

	speech = "The latitude is " + lat + ", and the longitude is " + lng + " for the address " + formattedAddress + ".";
	return speech;
}


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
			var address = req.body.result.parameters.userAddress;
			var encodedAddress = encodeURIComponent(address);			
			speech = createSpeech(encodedAddress);
			break;
	}

	return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
	});
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening.");
});