var express = require('express'); // requires express dependency
var app = express(); // sets it to variable app

var ES = require('express-ws')(app); //require ws dependency and sets it to the app variable

var reqId = 0; //variable for that stores unique client ID number
var pers = {}; // a client object


app.ws('/', function (ws,req) {
    var id = reqId;
    pers[id] = {ws: ws};
    reqId++;
    ws.on("message", function(mString){ //called when message is recievd through the websocket
        var msg = JSON.parse(mString); //stores the parsed String to a msg varibale
        var output = JSON.stringify({ clientId:id, message: msg.message}); //Decodes the JSON string
        Object.keys(pers).forEach(function(id) { // loop through the client object
            pers[id].ws.send(output);// Send the output: client ID and message

        });
    });
});

app.use(express.static('C:/Users/ridwan/WebstormProjects/untitled/public/javascripts')); //compiles all the files in the folder provided
app.listen(8888); // listens on this port