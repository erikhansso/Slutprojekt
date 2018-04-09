
/* 

This script is very similar to twiImgDownloader.js, but instead it saves
the tweet texts to a txt-file, ready for sentiment analysis. It also contains
commented-out code examples of filtering tweets that only contain certain data points like
geotag, plus a method for posting tweets on your own account. 

Note that the text-property written to a file is currently the shortened version of the tweet,
not the entire tweet.

*/

console.log('bot is starting');

let Twit = require('twit'); // Import Twit-library

let config = require('./config'); //Import access tokens for Twitter, stored in separate file, config.js in project root

let T = new Twit(config); // Create a Twit-object on which we can call get- and post methods

let query = { q: 'nasa', // Create query string for our search term and desired size of result set
count: 50};


let fs = require('fs'); // Import file I/O-library



T.get('search/tweets',  query, getWholeTweets); // Using search/tweets method on Twitter API, search with query and send response to getWholeTweets-function


function getWholeTweets(err, data, response){ // This function is called with the T.get above, how it gets it's parameters is a mystery
                                            
    let wholeTweet = data.statuses;  // We assign what is basically a json-object containing all the tweet data to a variable, the data comes from the data parameter somehow passed to getWholeTweets
    
    let allTweets = ''; // variable to hold all the Tweet texts

    // console.log(wholeTweet); // If uncommented, would log each entire twitter json-object to console (for debugging or seeing what you can get)
    
    for(let i = 0; i < wholeTweet.length; i++){ // Iterates through the json-object for each tweet
        
        allTweets += wholeTweet[i].text + '\n'; // Concatenates the text-property of each json-object to the string 'allTweets'
      
        
    
    }

    fs.writeFileSync('tweets.txt', allTweets); // Writes out all the tweet texts gathered in the allTweets variable to a txt-file
}



/* 

Code below can be used to post tweets to your own account 

*/





// let tweetToPost = {
//     status: 'Testing twitter API'
// }

// T.post('statuses/update', tweetToPost, postTweet);

// function postTweet(err, data, response){
//     if(err){
//         console.log('Something went wrong');
//     }
//     else{
//         console.log('It worked!');
//     }
// }






/* 

Code below are various scripts for getting only those tweets in the result set
that contain something you require them to have, like a geotag, location etc..
It just shows one way to filter the tweets based on the information you want.

*/






// T.get('search/tweets',  query, getGeos); //get tweets with geotag

// function getGeos(err, data, response) {
//     let tweetsGeo = data.statuses;
//     console.log('Tweets by geo:');
//     for(let i = 0; i < tweetsGeo.length; i++){
//         if(tweetsGeo[i].geo != null){
//         console.log(tweetsGeo[i].geo);
//         console.log(tweetsGeo[i].text);
//         console.log('//////////////////');
//         console.log('//////////////////');
//         }
//     }
// };

// T.get('search/tweets',  query, getCoordinates); //get tweets with coordinates

// function getCoordinates(err, data, response){
//     let tweetsCoord = data.statuses;
//     console.log('Tweets by coordinates:');
//     for(let i = 0; i < tweetsCoord.length; i++){
//         if(tweetsCoord[i].coordinates != null){
//         console.log(tweetsCoord[i].coordinates);
//         console.log(tweetsCoord[i].text)
//         console.log('//////////////////');
//         console.log('//////////////////');    
//     }
//     }
// }

// T.get('search/tweets',  query, getPlace); //get tweets with place

// function getPlace(err, data, response){
//     let tweetsPlace = data.statuses;
//     console.log('Tweets by place:');
//     for(let i = 0; i < tweetsPlace.length; i++){
//         if(tweetsPlace[i].place != null){
//         console.log(tweetsPlace[i].place);
//         console.log(tweetsPlace[i].text)
//         console.log('//////////////////');
//         console.log('//////////////////');
//         }
//     }
// }



// T.get('search/tweets',  query, getLocation); //get tweets with location

// function getLocation(err, data, response){
//     let tweetsLocation = data.statuses;
//     console.log('Tweets by location:');
//     for(let i = 0; i < tweetsLocation.length; i++){
//         if(tweetsLocation[i].location != null){
//         console.log(tweetsLocation[i].location);
//         console.log(tweetsLocation[i].text)
//         console.log('//////////////////');
//         console.log('//////////////////');
//         }
//     }
// }








