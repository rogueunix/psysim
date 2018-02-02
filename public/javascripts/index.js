/**
 * Conversation Handling
 */

sendMessage(); // Initial greeting from patient

function sendMessage(input){
  var workspaceId = "b26bfb94-1c30-4461-8801-853ac02a574a";

  if(input){
    addMessageToList("Dr. Phil", input, "/images/profile/drphil.jpg");
  }

  message(workspaceId, input, function(output){
    addMessageToList("Stephen", output, "/images/profile/patient.jpg");
  });

  $('#sendMessageText').val('');
  runTimer();
}

function addMessageToList(name, message, img){
  $('#message-list').append('<a href="#">' +
    '<li>' +
      '<img src="' + img + '" class="profile-img pull-left">' +
      '<div class="message-block">' +
        '<div>' + 
          '<span class="username">' + name + '</span> ' +
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

  $('#search-title').html("Search Results For: " + query);
  $('#discoverySearchText').val('');
  $('#search-results').html('');
  $('#discoveryModal').modal('show');
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
