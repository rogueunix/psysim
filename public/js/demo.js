$('#discoverySearchBtn').click(function(){
  $('#discoveryModal').modal('show');
});


addMessageToList("Stephen", "Hello, I'm Stephen", "../img/profile/patient.jpg");

$('#sendMessageBtn').click(function(){
  addMessageToList("Dr. Phil", $('#sendMessageText').val(), "../img/profile/drphil.jpg");
  addMessageToList("Stephen", $('#sendMessageText').val(), "../img/profile/patient.jpg");
  $('#sendMessageText').val('');
});

$('#sendMessageText').keypress(function(e) {
    if(e.which == 13) {
      addMessageToList("Dr. Phil", $('#sendMessageText').val(), "../img/profile/drphil.jpg");
      addMessageToList("Stephen", $('#sendMessageText').val(), "../img/profile/patient.jpg");
      $('#sendMessageText').val('');
    }
});

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
