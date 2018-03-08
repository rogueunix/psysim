/**
 * Users/Patients Handling
 */

const therapist = {
  name: "Dr. Zoidberg",
  image: "/images/profile/zoidberg.png"
}

/**
 * Conversation Handling
 */

function sendMessage(input, user, callback){
  if(input && user){
    addMessageToList(user, input);
  }

  message(patient.workspaceId, input, function(output){
    addMessageToList(patient, output);
    if(textToSpeechEnabled) textToSpeech(output);       
    callback(output);
  });

  $("#message-list").animate({ scrollTop: $('#message-list').prop("scrollHeight")}, 2000);
  $('#sendMessageText').val('');

  if(input != "..." && input != ""){
    emptyResponses = 0; 
    runTimer();
  }
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
  console.log(query);
  discoveryQuery(query, function(results){ 
    $('#search-title').html("Search Results For: " + query);
    $('#search-results').html('');
    $('#discoverySearchText').val('');

	console.log(JSON.parse(results.body));
    addSearchResults(JSON.parse(results.body));

    $('#discoveryModal').modal('show');
  });
}

function addSearchResults(results){
	(results.passages).forEach(function(result){
		var title, author;
		for(var i = 0; i < results.results.length; i++){
			if(results.results[i].id == result.document_id){
				title = results.results[i].metadata.title;
				author = results.results[i].metadata.author;
				break;
			}
		}
		if(title == undefined){
			title = "Title not found";
		}
		if(author == undefined){
			author = "Author not found";
		}
	  $('#search-results').append('<a href="#" class="list-group-item">' +
		  '<h4 class="list-group-item-heading">' + title + ": " + author + '</h4>' +
		  '<p class="list-group-item-text">'+result.passage_text.replace(/<\/?[^>]+(>|$)/g, "")+'</p>' +
		'</a>');
	});
}

/**
 * Speech/Text Handling
 */
var textToSpeechEnabled = false;

function textToSpeech(input){
  var msg = new SpeechSynthesisUtterance(input);
  window.speechSynthesis.speak(msg);
}

function speechToText(){
  var recognition = new webkitSpeechRecognition();
  recognition.start();

  recognition.onstart = function(){
    $('#speechToTextBtn').toggleClass('btn-info btn-danger');
    $('#speechToTextBtn').children().toggleClass('fa-microphone-slash fa-microphone'); 
  }

  recognition.onresult = function(event){
    var last = event.results.length - 1;
    var msg = event.results[last][0].transcript;
    sendMessage(msg, therapist);
  }

  recognition.onspeechend = function(){
    recognition.stop();
    $('#speechToTextBtn').toggleClass('btn-info btn-danger');
    $('#speechToTextBtn').children().toggleClass('fa-microphone-slash fa-microphone'); 
  }
}

if('webkitSpeechRecognition' in window){
  // Add button to window
  $('#messageInputGroup').prepend('<span class="input-group-btn">' +
    '<button class="btn btn-info" id="speechToTextBtn" style="margin-top: 0px;">' +
      '<i class="fa fa-microphone-slash"></i>' +
    '</button>' +
  '</span>');

  // Add event listener to launch speechToText();
  $('#speechToTextBtn').click(function(){
    speechToText();
  });
}

if('speechSynthesis' in window){
  // Add button to window
  $('#messageInputGroup').prepend('<span class="input-group-btn">' +
    '<button class="btn btn-warning" id="textToSpeechBtn" style="margin-top: 0px;">' +
      '<i class="fa fa-volume-off"></i>' +
    '</button>' +
  '</span>');

  // Add event listener to enable textToSpeech()
  $('#textToSpeechBtn').click(function(){
    textToSpeechEnabled = !textToSpeechEnabled;
    $('#textToSpeechBtn').toggleClass('btn-warning btn-success');
    $('#textToSpeechBtn').children().toggleClass('fa-volume-off fa-volume-up'); 
  });
}

/**
 * Event Handlers
 */

$('#sendMessageBtn').click(function(){
  sendMessage($('#sendMessageText').val(), therapist); 
});

$('#sendMessageText').keypress(function(e){
  if(e.which == 13){
    sendMessage($('#sendMessageText').val(), therapist); 
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
 * Rich Text Handling
 */

tinymce.init({
  selector: "textarea",
  plugins : 'advlist autolink link image lists charmap print preview',
  menubar: "false",
  toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent'
});

/**
 * Timer Handling
 */

var timer;
var emptyResponses = 0;

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
      sendMessage("...", therapist);
      emptyResponses++;

      if(emptyResponses < 3){
        runTimer();
      } else {
        $('#patientTimer').html("1:00");
      }
    }
  }, 1000);
}
