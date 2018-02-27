var request = require('request');
var options = {
    url: 'https://gateway.watsonplatform.net/discovery/api/v1/environments/f862a398-b83e-4c4c-ba54-80f33726f2d5/collections/aaeb9d62-d68e-49f8-9692-532c003eeba7/query?version=2017-11-07&count=5&deduplicate=false&highlight=true&passages=true&passages.count=5&natural_language_query=depression%20symptoms',
    auth: {
        'user': '56e5679e-c106-4226-8136-a58eb9f06025',
        'pass': 'HmbJftPqtdhQ'
    }
};

function callback(error, response, body) {
    return response;
}

exports.query = function(req, callback){
	request(options, callback);
}