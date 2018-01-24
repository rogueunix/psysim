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
    "Anxiety: WedMD", 
    "https://www.webmd.com/anxiety-panic/guide/anxiety-disorders#1", 
    "Jun 12, 2017 - Learn more about anxiety disorders, including types, causes, symptoms, diagnosis, treatment, and prevention."
  );

  addSearchResult(
    "Anxiety: Mayo Clinic",
    "https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961",
    "Aug 16, 2017 - Experiencing occasional anxiety is a normal part of life. However, people with anxiety disorders frequently have intense, excessive and persistent worry and fear about everyday situations. Often, anxiety disorders involve repeated episodes of sudden feelings of intense anxiety and fear or terror that reach a ..."
  );

  addSearchResult(
    "Anxiety: NIMH",
    "https://www.nimh.nih.gov/health/topics/anxiety-disorders/index.shtml",
    "Anti-anxiety medications help reduce the symptoms of anxiety, panic attacks, or extreme fear and worry. The most common anti-anxiety medications are called benzodiazepines. Benzodiazepines are first-line treatments for generalized anxiety disorder."
  );

  addSearchResult(
    "Anxiety: ADAA",
    "https://adaa.org/understanding-anxiety",
    "The term anxiety disorder refers to specific psychiatric disorders that involve extreme fear or worry, and includes generalized anxiety disorder (GAD), panic disorder and panic attacks, agoraphobia, social anxiety disorder, selective mutism, separation anxiety, and specific phobias."
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
      demoMessage("Awkward Silence");
    }
  }, 1000);
}

/**
 * Conversation Handling
 */

addMessageToList("Stephen", "Hello, I'm Stephen", "../img/profile/patient.jpg");

$('#sendMessageBtn').click(function(){
  demoMessage($('#sendMessageText').val());
});

$('#sendMessageText').keypress(function(e) {
    if(e.which == 13) {
      demoMessage($('#sendMessageText').val());
    }
});

function demoMessage(messageText){
  addMessageToList("Dr. Phil", messageText, "../img/profile/drphil.jpg");
  addMessageToList("Stephen", messageText, "../img/profile/patient.jpg");
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

