const patients = [
  {
    name: "Michelle",
    image: "/images/profile/patient.jpg",
    workspaceId: "ea449515-d489-495e-bf26-268803124a8b"
  }
]

exports.randomPatient = function(){
  return patients[Math.floor(Math.random()*patients.length)];
}

exports.getPatient = function(name){
}
