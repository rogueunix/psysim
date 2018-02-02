var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: '4cfdfa1f-e532-4ca3-b35b-ae976a964ab4',
  password: 'JJQzmvVwHThL',
  version: 'v1',
  version_date: '2017-05-26'
});

exports.message = function(req, callback){
  conversation.message(req, function(err, response){
    callback(err, response); 
  });
}
