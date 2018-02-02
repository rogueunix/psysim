var timer;

/**
 * Discovery Search Handling
 */

$('#discoverySearchBtn').click(function(){
  search();
});

$('#discoverySearchText').keypress(function(e){
  if(e.which == 13){
    search(); 
  }
});

function search(){
  $('#search-title').html("Search Results For: " + $('#discoverySearchText').val());
  $('#discoverySearchText').val('');
  $('#search-results').html('');
  $('#discoveryModal').modal('show');
  demoSearchResults();
}

function demoSearchResults(){
  addSearchResult(
    "PTSD: WedMD", 
    "https://www.webmd.com/mental-health/post-traumatic-stress-disorder#1",
    "Posttraumatic stress disorder (PTSD), once called shell shock or battle fatigue syndrome, is a serious condition that can develop after a person has experienced or witnessed a traumatic or terrifying event in which serious physical harm occurred or was threatened. PTSD is a lasting consequence of..."
  );

  addSearchResult(
    "PTSD: Mayo Clinic",
    "https://www.mayoclinic.org/diseases-conditions/post-traumatic-stress-disorder/symptoms-causes/syc-20355967",
    "Post-traumatic stress disorder (PTSD) is a mental health condition that's triggered by a terrifying event — either experiencing it or witnessing it. Symptoms may include flashbacks, nightmares and severe anxiety, as well as uncontrollable thoughts about the event. Most people who go through..."
  );

  addSearchResult(
    "PTSD: NIMH",
    "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd/index.shtml",
    "PTSD is a disorder that develops in some people who have experienced a shocking, scary, or dangerous event. It is natural to feel afraid during and after a traumatic situation. Fear triggers many split-second changes in the body to help defend against danger or to avoid it. This “fight-or-flight” response is a typical reaction..."
  );

  addSearchResult(
    "PTSD: ADAA",
    "https://adaa.org/understanding-anxiety/posttraumatic-stress-disorder-ptsd/symptoms",
    "PTSD is diagnosed after a person experiences symptoms for at least one month following a traumatic event. However symptoms may not appear until several months or even years later. The disorder is characterized by three main types of symptoms: Re-experiencing the trauma through intrusive distressing recollections of ..."
  );
}

function addSearchResult(heading, link, description){
  $('#search-results').append('<a href="' + link + '" class="list-group-item">' +
      '<h4 class="list-group-item-heading">' + heading + '</h4>' +
      '<p class="list-group-item-text">' + description + '</p>' +
    '</a>');
}

/**
 * Timer Handling
 */

runTimer();

function runTimer(){

  clearInterval(timer);
  $('#patientTimer').html("1:00");

  // Set the date we're counting down to
  var countDownDate = new Date();
  countDownDate.setTime(countDownDate.getTime() + 60*1000);
  countDownDate = countDownDate.getTime();

  // Update the count down every 1 second
  timer = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(seconds < 10){
      $('#patientTimer').html(minutes + ":0" + seconds);
    } else {
      $('#patientTimer').html(minutes + ":" + seconds);
    }

    // If the count down is finished, write some text 
    if (distance < 0) {
      clearInterval(timer);
      addMessageToList("Stephen", "Hello? This time isn't free you know.", "/images/profile/patient.jpg");
      runTimer();
    }
  }, 1000);
}

/**
 * Conversation Handling
 */

var messageId = 0;
var messages = ["I'm very anxious. I'm finding it difficult to operate normally.",
                "I'm sleeping less than four hours every night. I am surprsied by loud noises very easily.",
                "I was in a car crash several weeks ago with my daughter.",
                "No, but we were both terrified.",
                "I see."];

addMessageToList("Stephen", "Hello, I'm Stephen", "/images/profile/patient.jpg");

$('#sendMessageBtn').click(function(){
  demoMessage($('#sendMessageText').val());
});

$('#sendMessageText').keypress(function(e) {
    if(e.which == 13) {
      demoMessage($('#sendMessageText').val());
    }
});

function demoMessage(messageText){
  addMessageToList("Dr. Phil", messageText, "/images/profile/drphil.jpg");
  addMessageToList("Stephen", messages[messageId], "/images/profile/patient.jpg");
  $('#sendMessageText').val('');
  messageId++;
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

