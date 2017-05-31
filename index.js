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
	if (req.result && req.result.parameters) {
		speech = req.body.result.parameters.oppType;
	} else {
		speech = "Something went wrong.";
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