var express = require('express');
var router = express.Router();

var patients = require('../lib/patients');

/* GET home page. */
router.get('/', function(req, res, next) {
  var randomPatient = patients.randomPatient();

  res.render('index', { 
    title: 'Psy Sim', 
    subtitle: randomPatient.name,
    patients: patients.getPatients,
    currentPatient: randomPatient
  });
});

module.exports = router;
