var request = require('request'); 
var express = require('express');
var router = express.Router();

var api_key = 'AIzaSyASXRVsV6PnRsrNLigSkkmmoe0rUTZeAJY'; 
var youtubeCountryCode = {
  ES: "ES",
  USA: "US",
  UK: "GB",
  DE: "DE",
  FR: "FR",
  JP: "JP",
};

router.get('/:id', function(req, res, next) {
    var options = {
        url: `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${youtubeCountryCode[req.params.id]}&maxResults=3&key=${api_key}`,
        json: true
        };
    request.get(options, function(error, response, body) {
        var myDictAnswer = {name: [], url: []};
        for (var i = 0; i < 3; i++) {
            myDictAnswer.name.push(body.items[i].snippet.title);
            myDictAnswer.url.push(`https://www.youtube.com/watch?v=${body.items[i].id}`);
        }
        res.json(myDictAnswer);
    });
});

module.exports = router;