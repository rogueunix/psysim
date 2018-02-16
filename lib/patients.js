const patients = [
  {
    name: "Michelle",
    image: "/images/profile/patient.jpg",
    workspaceId: "ea449515-d489-495e-bf26-268803124a8b"
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
