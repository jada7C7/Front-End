/* Initiate
--------------------------------------------- */

require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

// Include the request npm package - DO I NEED THIS?
var request = require("request");

// Store all of the arguments in a variable
var nodeArgs = process.argv;

// Action (i.e. "my-tweets", "spotify-this-song", "movie-this", "do-what-it-says")
var action = process.argv[2];

// Create an empty variable for holding the movie or song name
var mediaName = "";

// Movie URL
var queryUrl;

/* Direct which function gets run
--------------------------------------------- */

switch (action) {
  case "my-tweets":
  tweetThis()
  break;

  case "spotify-this-song":
  setMedia();
  spotifyThis(mediaName);
  break;

  case "movie-this":
  setMedia();
  movieThis(mediaName)
  break;

  case "do-what-it-says":
  doThis();
  break;

  default:
  console.log("Sorry, I don\'t understand that. Try one of these commands: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
}

/* Functions
--------------------------------------------- */

// Set name of media type
function setMedia() {
  
  // Handle movies or songs with mutltiple words
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      mediaName = mediaName + "+" + nodeArgs[i];
    }
    else {
      mediaName += nodeArgs[i];
    }
  }

  // Defualt for Spotify
  if (action === "spotify-this-song" && nodeArgs.length <= 3) {
    mediaName = "The+Sign+Ace+of+Base"
  }

  // Pass default or user input for movie
  if (action === "movie-this" && nodeArgs.length <= 3) {
    queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
  } else {
    queryUrl = "http://www.omdbapi.com/?t=" + mediaName + "&y=&plot=short&apikey=trilogy";
  }
}

// Twitter Function
function tweetThis() {
  var client = new Twitter(keys.twitter);
  var params = {screen_name: 'lumpy_cat'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      return console.log('Error occurred: ' + err);
    } else {
      console.log("--------------Tweets from @lumpy_cat--------------");
      for (i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;

        // Log tweets to console
        console.log("** Tweet **" + "\n" +
        tweets[i].text + "\n" + 
        "Created on: " + date.substring(0, 10) + "\n" + "\n");

        // Write tweets to log.txt
        fs.appendFile('log.txt', "** Tweet **" + "\n" + tweets[i].text + "\n" + "Created on: " + date.substring(0, 10) + "\n" + "\n", 'utf8', function (err) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
        });
      }
    }
  });
}

// Spotify Function
function spotifyThis(mediaName) {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: mediaName }, function(error, data) {
    if (error) {
      return console.log('Error occurred: ' + err);
    } else {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        
        // Log song info to console
        console.log("--------------Song: " + songData.name + "--------------" + "\n" + "Artist: " + songData.artists[0].name + "\n" + "Preview URL: " + songData.preview_url + "\n" + "Album: " + songData.album.name);
        
        // Write song info to log.txt
        fs.appendFile('log.txt', "--------------Song: " + songData.name + "--------------" + "\n" + "Artist: " + songData.artists[0].name + "\n" + "Preview URL: " + songData.preview_url + "\n" + "Album: " + songData.album.name + "\n" + "\n", 'utf8', function (err) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
        });
      }
    }
  });
}

// Movie Function
function movieThis(){
  
  // Then create a request to the queryUrl
  request(queryUrl, function(error, response, body) {
    var movieData =  JSON.parse(body);

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Log movie info to console
      console.log("--------------Movie--------------" + "\n" + "Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\n" + "Country of production: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n");

      // Write movie info to log.txt
      fs.appendFile('log.txt', "--------------Movie--------------" + "\n" + "Title: " + movieData.Title + "\n" + "Release Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.Ratings[0].Value + "\n" + "Rotten Tomatoes: " + movieData.Ratings[1].Value + "\n" + "Country of production: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "\n", 'utf8', function (err) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
      });
    }
  });
}

// Do what it says function
function doThis(){
  fs.readFile('random.txt', "utf8", function(error, data){
    if (error) {
      return console.log("Error occurred: " + err);
    } else {
      var content = data.split(',');
      var mediaName = content[1].replace(/^"(.+(?="$))"$/, '$1');
      spotifyThis(mediaName);
    }
  });
}