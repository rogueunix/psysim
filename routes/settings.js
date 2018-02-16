var express = require('express');
var router = express.Router();

var patients = require('../lib/patients');

/* GET settings page. */
router.get('/', function(req, res, next){
  res.render('settings', { 
    title: 'Settings',
    subtitle: "Settings",
    patients: patients.getPatients
  });
});

module.exports = router;
