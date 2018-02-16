describe('randomPatient', () => {
  test('returns a random patient json object', () => {
    const patients = require('../lib/patients.js');
    const allPatients = patients.getPatients;
  
    expect(allPatients).toContain(patients.randomPatient());
  });
});

describe('getPatient', () => {
  describe('given the valid name Michelle', () => {
    test('returns the Michelle patient object', () => {
      const patients = require('../lib/patients.js');  
    
      expect(patients.getPatient("Michelle")).toMatchObject({
        name: "Michelle",
        image: "/images/profile/patient.jpg",
        workspaceId: "ea449515-d489-495e-bf26-268803124a8b"
      });
    }); 
  }); 

  describe('given an invalid name', () => {
    test('returns null', () => {
      const patients = require('../lib/patients.js');  

      expect(patients.getPatient("asdf")).toBeNull();
    });
  }); 
});
