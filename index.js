'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
	var speech = "The following people qualify for ";
    speech += req.body.result && req.body.result.parameters && req.body.result.parameters.oppType ? req.body.result.parameters.oppType : "Seems like some problem. Speak again."
    speech += ": Bobby, Jonny, Terry, Jerry";
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'pw-assistant-js'
    });
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});