var ws = new WebSocket("ws://localhost:8888"); //Declare Websocket with port on local h


ws.onopen = function(event){
    StartChat();
};


function StartChat(){
    var chat = document.getElementById("chatbox");
    var text = chat.querySelector('.messageInput');
    var send = document.querySelector('.send');
    var message = document.getElementById('messages');

    ws.onmessage = function(event){
       var node = document.createElement('p');
       var msg= JSON.parse(event.data);
       node.innerText = msg.clientId+ ": "+msg.message;
       message.appendChild(node);

    }

    send.addEventListener('click', function () {
        var mess = text.value;
        if(mess.length <= 0){
            return;
        }

        ws.send(JSON.stringify({message: mess}));
        text.value = "";
    });

}