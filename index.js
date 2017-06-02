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
			var address = req.body.result.parameters.userAddress;
			var encodedAddress = encodeURIComponent(address);
			speech = "It's working.";

			// url :: 'https://maps.googleapis.com/maps/api/geocode/json?address=18_kendall_pl&sensor=false'
			// customUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&sensor=false';
			// function getJSON(myurl) {
			// 	request({url: myurl, method: 'GET', json: true}, function(err, res, json) {
			// 		if (err) {
			// 	    	throw err;
			// 	  	} else {
			// 	  		lat = json.results[0].geometry.location.lat;
			// 	  		lng = json.results[0].geometry.location.lng;
			// 	  		formattedAddress = json.results[0].formatted_address;
			// 	  		speech = "The latitude is " + lat ", and the longitude is " + lng + " for the address " + formattedAddress ".";
			// 	  		return res.json({
			// 		        speech: speech,
			// 		        displayText: speech,
			// 		        source: 'pw-assistant-js'
			// 			});
			// 	  	}
			// 	});
			// }
			// return getJSON(customUrl);
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