
/*

Detta script skickar två hårdkodade strängar till Azure Text Analytics,
en engelsk och en svensk. Förhoppningsvis är allt ni behöver göra att
starta ett Azure-konto, lägga till free subscription med pricing f0 för
cognitive services->text analytics, samt i Azure portalen hämta fram
keys för er text analytics subscription. De är bara en sträng med bokstäver
och siffror som ni klistrar in på rad 22. Se till att inte råka dela den på github bara..

Här behöver ni alltså inte installera något node package..

*/


'use strict';

let https = require ('https');



let accessKey = '';  //!!Fyll i din accesskey här direkt (DELA INTE UT DEN), en av de du kan hitta via Azure portal efter du skapat konto och lagt till free subscription för text processing!!!
                     //  Mer info: https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-access-key   
                    // Om du inte skrivit en svensk address osv behöver du också ändra region, men antar att ni gör det



let uri = 'northeurope.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

let get_sentiments = function (documents) {
    let body = JSON.stringify (documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path,
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

let documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'sv', 'text': 'Jag är så himla glad, det här är den bästa dagen i mitt liv!' },
]};

get_sentiments (documents);