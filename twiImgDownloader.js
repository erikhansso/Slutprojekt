
/* 

This script lets you query for tweets based on a search term, and
if the tweet has any media (image, video) associated with it, it
will download it automatically to the root folder of the project.

At the moment will treat everything as pictures, so video won't work.

Apart from the library dependencies (twit, fs, request) which must be
installed using Node Package Manager (npm), it also imports a config.js-file
from the root folder. This file holds your access tokens for the Twitter API.


*/


console.log('bot is starting');

let Twit = require('twit'); // Import Twit-library

let config = require('./config'); //Import access tokens for Twitter, stored in separate file, config.js in project root

let T = new Twit(config);  // Create a Twit-object on which we can call get- and post methods

let query = { q: 'nasa',  // Create query string for our search term and desired size of result set
count: 50};



let fs = require('fs') // Import file I/O-library

let request = require('request'); // Import web file download library

T.get('search/tweets',  query, getWholeTweets); // Using search/tweets method on Twitter API, search with query and send response to getWholeTweets-function


function getWholeTweets(err, data, response){ //This function is called with the T.get above, how it gets it's parameters is a mystery
    let wholeTweet = data.statuses;          // We assign what is basically a json-object containing all the tweet data to a variable, the data comes from the data parameter somehow passed to getWholeTweets
    let tweetImgUrls = '';
    // console.log(wholeTweet);  // If uncommented, would log the entire tweet json-object
    for(let i = 0; i < wholeTweet.length; i++){ // Iterates through the json-object for each tweet
        
      
        if(wholeTweet[i].entities.media != undefined){

            download(wholeTweet[i].entities.media[0].media_url, 'image'+i+'.jpg', function(){ // Calls the download function declared below with url from the tweet json-object and assigns it a file-name
            console.log('Downloaded file: '+ wholeTweet[i].entities.media[0].media_url); // Just shows you what file was downloaded
            });
            tweetImgUrls += wholeTweet[i].entities.media[0].media_url + '\n';  // Makes a string of all the URLs, one per line
      
        }
        
    
    }

    fs.writeFileSync('tweetImgUrls.txt', tweetImgUrls); // This stores all the URLs of your downloaded media in a text file, this was for when I used Java to download the files
}



var download = function(uri, filename, callback){ // This is a download function using the request- and fs packages. Basically just copy paste. Uses nested functions, so not entirely easy to follow
    request.head(uri, function(err, res, body){   // but basically it just uses the request-library to stream some file into the fs.createWriteStream-function from the fs-library.
      console.log('content-type:', res.headers['content-type']); // Logs file-type
      console.log('content-length:', res.headers['content-length']); // Logs file-size
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

 /* Below is just some copy paste method for reading one line at a time
 from a file through node.js . May come in handy some day. */

//   var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('file.in')
//   });
  
//   lineReader.on('line', function (line) {
//     console.log('Line from file:', line);
//   });