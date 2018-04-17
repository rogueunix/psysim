var elizaRunning;

const eliza = {
  name: "Eliza",
  image: "/images/profile/eliza.png"
}

function elizaStart(){
  $.get("/elizabot/start", function(data){
    sendMessage(data, eliza, function(output){
      elizaMessaging(output);
    });
  });
}

function elizaMessaging(botOutput){
  elizaRunning = setInterval(function(){
    $.get("/elizabot/message", {input: botOutput}, function(data){
      sendMessage(data, eliza, function(output){
        botOutput = output; 
      }); 
    }); 
  }, 3000);
}

function elizaEnd(callback){
  $.get("/elizabot/end", function(data){
    sendMessage(data, eliza);
    clearInterval(elizaRunning);
  });
}

/**
 * Event Handlers
 */

$('#elizaToggle').bootstrapSwitch();

$('#elizaToggle').on('switchChange.bootstrapSwitch', function(event, state) {
  if(state){
    elizaStart();
  } else {
    elizaEnd();
  }
});
