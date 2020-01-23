var request = require('request'); 
var express = require('express');
var router = express.Router();

var client_id = '8845cf75bde342a18a16e9cf7ffde940'; 
var client_secret = 'ce7f3156bb2847eabfe5aa67ce7b1c0e'; 
var spotifyURLbyCountry = {
  ES: "https://api.spotify.com/v1/playlists/37i9dQZEVXbNFJfN1Vw8d9/tracks",
  USA: "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks",
  UK: "https://api.spotify.com/v1/playlists/37i9dQZEVXbLnolsZ8PSNw/tracks",
  DE: "https://api.spotify.com/v1/playlists/37i9dQZEVXbJiZcmkrIHGU/tracks",
  FR: "https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI/tracks",
  JP: "https://api.spotify.com/v1/playlists/37i9dQZEVXbKXQ4mDTEBXq/tracks",
};
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.get('/:id', function(req, res, next) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
      var token = body.access_token;
      var options = {
        url: spotifyURLbyCountry[req.params.id],
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        

        
          var myDictAnswer = {track_name: [], url: []};
          for (var i = 0; i < 3; i++) {
            if(!error && response.statusCode === 200){
              myDictAnswer.track_name.push(body.items[i].track.name);
              myDictAnswer.url.push(body.items[i].track.external_urls.spotify);
            }
            else {
              myDictAnswer.track_name.push("NA");
              myDictAnswer.url.push("NA");
            }
          }
          res.json(myDictAnswer);
      });
    }
  });
});

module.exports = router;




