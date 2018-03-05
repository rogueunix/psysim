var conversationId;

function message(workspaceId, input, callback){
  var parameters = {
    workspace_id: workspaceId,
    input: {'text': input},
    context: {
      conversation_id: conversationId
    }
  }
  
  $.getJSON("api/conversation/message", parameters, function(data){
    conversationId = data.context.conversation_id;
    callback(data.output.text[0]);
  });
}

function discoveryQuery(query, callback){
  $.getJSON("api/discovery/query", query, function(data){
    callback(data); 
  });
}

function discoveryMetadata(callback){
	$.getJSON("api/discovery/metadata", function(data){
		callback(data);
	});
}	
