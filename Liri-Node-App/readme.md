# LIRI Node App :robot:
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

[View the Project](https://github.com/kiacone/Homework/tree/master/Liri-Node-App)

## What Each Command Should Do
------

**node liri.js my-tweets**
This will show your last 20 tweets and when they were created at in your terminal/bash window.

**node liri.js spotify-this-song <song name here>**
This will show the following information about the song in your terminal/bash window. If no song is provided then the program will default to "The Sign" by Ace of Base.

* The song's name
* Artist(s)
* A preview link of the song from Spotify
* The album that the song is from

**node liri.js movie-this <movie name here>**
This will output the following information to your terminal/bash window. If the user doesn't supply a movie name, the program will default to "Mr. Nobody."

* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

**node liri.js do-what-it-says**
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

**Data Output**
In addition to logging the data to the terminal, data will also be output and appended to a .txt file called log.txt.

### Project Built With

JavaScript | Node.js | Twitter, Spotify and OMDB APIs