'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
	var speech = "";
	
	if (parsedBody.result && parsedBody.result.parameters) {
		speech = req.body.result.parameters.oppType;
	} else {
		speech = "Something went wrong.";
	}
	for(var attributename in req) {
    	speech += attributename + ": " + req[attributename] + "\n";
	}
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and running.");
});