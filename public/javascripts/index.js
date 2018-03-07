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
	var documentMetadata;
	discoveryMetadata(function(metadata){
		documentMetadata = JSON.parse(metadata.body);
		(results.passages).forEach(function(result){
			var title, author;
			console.log(documentMetadata);
			for(var i = 0; i < documentMetadata.matching_results; i++){
				if(documentMetadata.results[i].id == result.document_id){
					title = documentMetadata.results[i].metadata.title;
					author = documentMetadata.results[i].metadata.author;
					break;
				}
			}
			console.log(result);
			console.log(title);
			console.log(author);
		  $('#search-results').append('<a href="#" class="list-group-item">' +
			  '<h4 class="list-group-item-heading">' + title + ": " + author + '</h4>' +
			  '<p class="list-group-item-text">'+result.passage_text.replace(/<\/?[^>]+(>|$)/g, "")+'</p>' +
			'</a>');
		});
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
