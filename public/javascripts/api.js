function message(workspaceId, input, callback){
  let parameters = {
    workspace_id: workspaceId,
    input: {'text': input}
  }
  
  $.getJSON("api/conversation/message", parameters, function(data){
    callback(data.output.text[0]);
  });
}
