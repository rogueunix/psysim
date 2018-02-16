var express = require('express');
var router = express.Router();

var patients = require('../lib/patients');

/* GET patient page. */
router.get('/:name', function(req, res, next) {
  res.render('index', { 
    title: req.params.name + ' - Psy Sim', 
    subtitle: req.params.name,
    patients: patients.getPatients, 
    currentPatient: patients.getPatient(req.params.name)
  });
});

module.exports = router;
