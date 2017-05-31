'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();

restService.use(bodyParser.urlencoded({
	extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
	var oppType = "";
	if (true) {
		oppType = req.result.parameters.oppType;
	}
	var speech = "This is working -- " + oppType;
	return res.json({
		speech: speech,
		displayText: speech,
		source: 'pw-assistant-test'
	});
});

restService.listen((process.env.PORT || 8000), function() {
	console.log("Server up and running.");
});