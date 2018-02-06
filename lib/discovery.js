var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: "56e5679e-c106-4226-8136-a58eb9f06025",
  password: "HmbJftPqtdhQ",
  version: "v1",
  version_date: "2017-11-07"
});

var configurationId = "1703f92c-8fae-4235-a173-48ad20eccac3";

exports.query = function(req, callback){
  discovery.query({
    environment_id: "f862a398-b83e-4c4c-ba54-80f33726f2d5",
    collection_id: "aaeb9d62-d68e-49f8-9692-532c003eeba7",
    query: req
  }, function(err, response){
    callback(err, response); 
  });
}
