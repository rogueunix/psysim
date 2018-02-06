var express = require('express');
var router = express.Router();

var conversation = require('../lib/conversation');
var discovery = require('../lib/discovery');

/* Conversation Message */
router.get('/conversation/message', function(req, res, next){
  conversation.message(req.query, function(err, response){
    if(err)
      res.status(500).json({ error: err });
    else
      res.json(response);
  });
});

/* Discovery Query */
router.get('/discovery/query', function(req, res, next){
  discovery.query(req.query, function(err, response){
    if(err)
      res.status(500).json({ error: err });
    else
      res.json(response);
  });
});

module.exports = router;
