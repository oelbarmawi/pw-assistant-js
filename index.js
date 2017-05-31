'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
	var speech = "This is working.";

	if (req) {
		speech += "1";
	}
	if (req.result) {
		speech += "2";
	}
	if (req.result.parameters) {
		speech += "3";
	} 
	if (req.result.parameters.oppType) {
		speech += "4";
	}

	// if (req.body) {
	// 	speech += "a";
	// }
	// if (req.body.result) {
	// 	speech += "b";
	// }
	// if (req.body.result.parameters) {
	// 	speech += "c";
	// } 
	// if (req.body.result.parameters.oppType) {
	// 	speech += "d";
	// }


	
	// if (req.result && req.result.parameters) {
	// 	speech = req.body.result.parameters.oppType;
	// } else {
	// 	speech = "Something went wrong.";
	// }

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and running.");
});