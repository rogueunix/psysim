var express = require('express');
var router = express.Router();

var elizabot = require('../lib/elizabot');

router.get('/start', function(req, res, next){
  res.send(elizabot.start());
});

router.get('/message', function(req, res, next){
  res.send(elizabot.reply(req.query.input)); 
});

router.get('/end', function(req, res, next){
  res.send(elizabot.bye());
});

module.exports = router;
