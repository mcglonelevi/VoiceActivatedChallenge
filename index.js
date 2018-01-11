'use strict';

// require libraries
var fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = function(event, context, callback) {
    // make http request to get HTML content
    fetch('http://www.instructables.com/contest/voiceactivated2018/')
        .then(function(res) {
            // parse the response text
            return res.text();
        }).then(function(body) {
            // get the right value for the number of contests
            const $ = cheerio.load(body);
            const numEntries = $('.contest-entity-count').html();

            // return some json to tell the alexa what to do.
            callback(null, {
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": numEntries + " instructables have been entered into the Voice Activated Challenge."
                    }
                },
                "shouldEndSession": true
            });
        });
};
