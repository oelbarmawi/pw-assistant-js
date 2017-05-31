'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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

		case "FindClosestPharmacy":
			var zip = req.body.result.parameters.zipCode;
			speech = "The closest pharmacy to " + zip + " is...";
			break;
	}

	// if (req.body.result.action == "TodaysOpportunities.Direct") {
	// 	speech = "The following people qualify for ";
	//     speech += req.body.result && req.body.result.parameters && req.body.result.parameters.oppType ? req.body.result.parameters.oppType : "Seems like some problem. Speak again."
	//     speech += ": Bobby, Jonny, Terry, Jerry";
	// }
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
	});
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});