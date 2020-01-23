var request = require('request'); 
var express = require('express');
var router = express.Router();

var api_key = 'lnxYsh2bdiSGyH6YkFJWwjDGN'; 
var api_secret_key = 'KjupjgLRherDm9G5I29ruHVHD4dLwgAhizUz7VxqZafLV0RGaN'; 
var twitterWoeidByCountry = {
  ES: 23424950,
  USA: 23424977,
  UK: 23424975,
  JP: 23424856,
  DE: 23424829,
  FR: 23424819,
};

//var that contains the options and credentials to obtain a twitter token. 
var authOptions = {
  url: 'https://api.twitter.com/oauth2/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(api_key + ':' + api_secret_key).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

//if we obtain a token with no error, we will proced with an api get call with the country selected and stored in :id.
router.get('/:id', function(req, res, next) {
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) { 

            var token = body.access_token;
            var options = {
                url: `https://api.twitter.com/1.1/trends/place.json?id=${twitterWoeidByCountry[req.params.id]}`,
                headers: {
                  'Authorization': 'Bearer ' + token
                },
                json: true
              };
            request.get(options, function(error, response, body) {
                var myDictAnswer = {name: [], url: []};
                for (var i = 0; i < 3; i++) {
                    myDictAnswer.name.push(body[0].trends[i].name);
                    myDictAnswer.url.push(body[0].trends[i].url);
                }
                res.json(myDictAnswer);
            });
        }
    })
});

module.exports = router;