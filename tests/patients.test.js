const patients = require('../lib/patients.js');

test('returns random patient', () => {
  expect(patients.randomPatient().name).toBe("Michelle");
});
