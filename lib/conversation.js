var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: 'a91df34f-cd98-4b4b-8095-da648cf5d819',
  password: 'rVhRpYHoWzTP',
  version: 'v1',
  version_date: '2017-05-26'
});

exports.message = function(req, callback){
  conversation.message(req, function(err, response){
    callback(err, response); 
  });
}
