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
			// var lat, lng, formatted_address;
			speech = "It's working.";
			// var showStb = function(speech) {
			//     var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&sensor=false';
			//     $.get(url, '', function(data){
			//             var place = JSON.parse(data);
			//             return place.results[0].geometry.location.lat;
			//     }, 'text');
			// };
			// speech = showStb(speech);
			
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