var request = require('request');
var queryOptions = {
    url: 'https://gateway.watsonplatform.net/discovery/api/v1/environments/f862a398-b83e-4c4c-ba54-80f33726f2d5/collections/aaeb9d62-d68e-49f8-9692-532c003eeba7/query?',
	auth: {
        'user': '56e5679e-c106-4226-8136-a58eb9f06025',
        'pass': 'HmbJftPqtdhQ'
    }
};

var metadataOptions = {
	url : 'https://gateway.watsonplatform.net/discovery/api/v1/environments/f862a398-b83e-4c4c-ba54-80f33726f2d5/collections/aaeb9d62-d68e-49f8-9692-532c003eeba7/query?return=metadata&version=2017-11-07',
	auth: {
        'user': '56e5679e-c106-4226-8136-a58eb9f06025',
        'pass': 'HmbJftPqtdhQ'
    }
}	

function callback(error, response, body) {
    return response;
}

exports.query = function(req, callback){
	console.log(req);
	queryOptions.qs = {	
			version : '2017-11-07',
			deduplicate: 'true',
			'deduplicate.field': 'passage_score',
			'passages.count': 5,
			count: '5',
			highlight: 'true',
			passages: 'true',
			natural_language_query: Object.keys(req)[0]
	};
	console.log(queryOptions);
	request(queryOptions, callback);
}

exports.metadata = function(callback){
	request(metadataOptions, callback);
}