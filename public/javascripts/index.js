/**
 * Conversation Handling
 */

const therapist = {
  name: "Dr. Phil",
  image: "/images/profile/drphil.jpg"
}

const workspaceId = "ea449515-d489-495e-bf26-268803124a8b";

const patient = {
  name: "Stephen",
  image: "/images/profile/patient.jpg"
}

sendMessage(); // Initial greeting from patient

function sendMessage(input){

  if(input){
    addMessageToList(therapist, input);
  }

  message(workspaceId, input, function(output){
    addMessageToList(patient, output);
  });

  $("#message-list").animate({ scrollTop: $('#message-list').prop("scrollHeight")}, 2000);
  $('#sendMessageText').val('');
  runTimer();
}

function addMessageToList(sender, message){
  $('#message-list').append('<a href="#">' +
    '<li>' +
      '<img src="' + sender.image + '" class="profile-img pull-left">' +
      '<div class="message-block">' +
        '<div>' + 
          '<span class="username">' + sender.name + '</span> ' +
          '<span class="message-datetime">' + new Date() + '</span>' +
        '</div>' +
        '<div class="message">' + message + '</div>' +
      '</div>' +
    '</li>' +
  '</a>');
}

/**
 * Discovery Handling
 */

function search(){
  var query = $('#discoverySearchText').val();

  discoveryQuery(query, function(results){ 
    $('#search-title').html("Search Results For: " + query);
    $('#search-results').html('');
    $('#discoverySearchText').val('');

    results.forEach(function(result){
      console.log(result);
      addSearchResult(result);
    });

    $('#discoveryModal').modal('show');
  });
}

function addSearchResult(result){
  $('#search-results').append('<a href="#" class="list-group-item">' +
      '<h4 class="list-group-item-heading">' + result.id + '</h4>' +
      '<p class="list-group-item-text">Document Sentiment: ' + result.enriched_text.sentiment.document.score + '</p>' +
    '</a>');
}

/**
 * Event Handlers
 */

$('#sendMessageBtn').click(function(){
  sendMessage($('#sendMessageText').val()); 
});

$('#sendMessageText').keypress(function(e){
  if(e.which == 13){
    sendMessage($('#sendMessageText').val()); 
  }
});

$('#discoverySearchBtn').click(function(){
  search();
});

$('#discoverySearchText').keypress(function(e){
  if(e.which == 13){
    search();
  }
});

/**
 * Timer Handling
 */

var timer;
runTimer();

function runTimer(){

  clearInterval(timer);
  $('#patientTimer').html("1:00");

  var countDownDate = new Date();
  countDownDate.setTime(countDownDate.getTime() + 60*1000);
  countDownDate = countDownDate.getTime();

  timer = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(seconds < 10){
      $('#patientTimer').html(minutes + ":0" + seconds);
    } else {
      $('#patientTimer').html(minutes + ":" + seconds);
    }

    if (distance < 0) {
      clearInterval(timer);
      sendMessage();
      runTimer();
    }
  }, 1000);
}
