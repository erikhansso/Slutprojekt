
/* 

Kör sentimentanalys på hårdkodad textsträng via Google Cloud Natural language.
Ni behöver köra npm install --save @google-cloud/language
före ni kör koden, samt fixa ett Google Cloud account, service account till det,
och få ut en keyfil i .json-format. Denna matar ni in på rad 17..
Mer info på:  https://github.com/googleapis/nodejs-language


*/

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({keyFilename: 'minkeyfilfrångoogle.json'}); // !OBS! Här skriver ni in filsökväg till .json-keyfilen som Google Cloud genererar åt er 
// mer info om service account och keyfilen ni behöver få ut: https://cloud.google.com/docs/authentication/getting-started




// The text to analyze
const text = 'I am so happy, this is the best day ever!';

const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Document sentiment:`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


