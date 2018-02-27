const patients = [
  {
    name: "Michelle",
    image: "/images/profile/generic-patient.png",
    workspaceId: "ea449515-d489-495e-bf26-268803124a8b"
  }, {
    name: "Frank",
    image: "/images/profile/generic-patient.png",
    workspaceId: "8f943c75-14c7-4264-a475-d84995d96019"
  }
]

// Returns a random patient from the array of patients.
exports.randomPatient = function(){
  return patients[Math.floor(Math.random()*patients.length)];
}

// Returns a specific patient based on name.
exports.getPatient = function(name){
  let matchedPatient = null;

  patients.forEach(function(patient){
    if(patient.name == name){
      matchedPatient = patient; 
    } 
  });

  return matchedPatient;
}

// Returns the array of current patients.
exports.getPatients = patients;
