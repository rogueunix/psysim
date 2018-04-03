const patients = [
  {
    name: "Michelle",
    image: "/images/profile/amy.png",
    workspaceId: "ea449515-d489-495e-bf26-268803124a8b",
    diagnosis: "Depression"
  }, {
    name: "Frank",
    image: "/images/profile/bender.png",
    workspaceId: "8f943c75-14c7-4264-a475-d84995d96019",
    diagnosis: "Narcissism"
  }, {
    name: "Leah",
    image: "/images/profile/leela.png",
    workspaceId: "78063192-b653-4a88-8720-0d4995500771",
    diagnosis: "OCD"
  }, {
    name: "Kevin",
    image: "/images/profile/scruffy.png",
    workspaceId: "8db74c8b-1eb5-443a-9be3-bb8ff3df3126",
    diagnosis: "Not Diagnosible"
  },
  {
    name: "Madison",
    image: "/images/profile/generic-patient.png",
    workspaceId: "158b2c7a-0633-4012-9318-60ed70cfb505",
    diagnosis: "Dependent Personality Disorder"
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
