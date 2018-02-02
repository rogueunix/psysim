var express = require('express');
var router = express.Router();

var conversation = require('../lib/conversation');

/* Conversation Message */
router.get('/conversation/message', function(req, res, next){
  conversation.message(req.query, function(err, response){
    if(err)
      res.status(500).json({ error: err });
    else
      res.json(response);
  });
});

module.exports = router;
